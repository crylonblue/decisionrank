import { supabase, type Ranking, type RankingProductWithDetails, type Product, type Sentiment, type Specification, type User, type SentimentWithUser, type Category } from './supabase';

// Fetch all rankings with basic info
export async function getAllRankings(searchQuery?: string) {
  let query = supabase
    .from('rankings')
    .select(`
      *,
      category:categories(*)
    `)
    .order('created_at', { ascending: false });

  if (searchQuery) {
    query = query.ilike('question', `%${searchQuery}%`);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to fetch rankings: ${error.message}`);
  }

  // Filter out rankings without categories and map the data
  return (data || [])
    .filter((ranking: any) => ranking.category !== null)
    .map((ranking: any) => ({
      ...ranking,
      category: ranking.category as Category,
    })) as (Ranking & { category: Category })[];
}

// Fetch a single ranking by slug with all related data
// categorySlug is required - rankings must have a category
export async function getRankingBySlug(slug: string, categorySlug: string) {
  // Fetch category first to validate
  const { data: categoryData, error: categoryError } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', categorySlug)
    .single();
  
  if (categoryError || !categoryData) {
    throw new Error(`Category not found: ${categoryError?.message || 'Not found'}`);
  }
  
  const expectedCategoryId = categoryData.id;
  const fetchedCategory = categoryData as Category;

  // Fetch the ranking
  const { data: ranking, error: rankingError } = await supabase
    .from('rankings')
    .select('*')
    .eq('slug', slug)
    .single();

  if (rankingError || !ranking) {
    throw new Error(`Ranking not found: ${rankingError?.message || 'Not found'}`);
  }

  // Validate the ranking belongs to the specified category
  if (!ranking.category_id || ranking.category_id !== expectedCategoryId) {
    throw new Error('Ranking does not belong to the specified category');
  }

  // Fetch ranking products with products
  const { data: rankingProducts, error: rankingProductsError } = await supabase
    .from('ranking_products')
    .select(`
      *,
      product:products(*)
    `)
    .eq('ranking_id', ranking.id)
    .order('rank_position', { ascending: true });

  if (rankingProductsError) {
    throw new Error(`Failed to fetch ranking products: ${rankingProductsError.message}`);
  }

  // Fetch sentiments for all ranking products with user info
  const rankingProductIds = rankingProducts.map(rp => rp.id);
  const { data: sentiments, error: sentimentsError } = await supabase
    .from('sentiments')
    .select(`
      *,
      user:users(*)
    `)
    .in('ranking_product_id', rankingProductIds)
    .order('created_at', { ascending: true });

  if (sentimentsError) {
    throw new Error(`Failed to fetch sentiments: ${sentimentsError.message}`);
  }

  // Fetch specifications for all products
  const productIds = rankingProducts.map(rp => rp.product_id);
  const { data: specifications, error: specsError } = await supabase
    .from('specifications')
    .select('*')
    .in('product_id', productIds);

  if (specsError) {
    throw new Error(`Failed to fetch specifications: ${specsError.message}`);
  }

  // Combine the data
  const rankingProductsWithDetails: RankingProductWithDetails[] = rankingProducts.map(rp => {
    const product = rp.product as Product;
    const productSentiments: SentimentWithUser[] = sentiments
      .filter(s => s.ranking_product_id === rp.id)
      .map(s => ({
        ...s,
        user: s.user as User | null,
      }));
    const productSpecs = specifications.filter(s => s.product_id === product.id);

    return {
      ...rp,
      product,
      sentiments: productSentiments,
      specifications: productSpecs,
    };
  });

  // Use the category we already fetched
  const category = fetchedCategory;

  return {
    ...ranking,
    ranking_products: rankingProductsWithDetails,
    category, // category is always present since we validate it above
  };
}

// Fetch all categories
export async function getAllCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch categories: ${error.message}`);
  }

  return data as Category[];
}

// Fetch a single category by slug with rankings
export async function getCategoryBySlug(slug: string) {
  // Fetch the category
  const { data: category, error: categoryError } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (categoryError || !category) {
    throw new Error(`Category not found: ${categoryError?.message || 'Not found'}`);
  }

  // Fetch rankings for this category
  const { data: rankings, error: rankingsError } = await supabase
    .from('rankings')
    .select('*')
    .eq('category_id', category.id)
    .order('created_at', { ascending: false });

  if (rankingsError) {
    throw new Error(`Failed to fetch rankings: ${rankingsError.message}`);
  }

  return {
    ...category,
    rankings: rankings as Ranking[],
  };
}

