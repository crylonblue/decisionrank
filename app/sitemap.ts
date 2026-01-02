import { MetadataRoute } from 'next';
import { getAllRankings, getAllCategories } from '@/lib/data';
import { getBaseUrl } from '@/lib/seo';
import { supabase } from '@/lib/supabase';

const RANKINGS_PER_PAGE = 25;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/imprint`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  // Fetch all categories with pagination URLs
  let categories: MetadataRoute.Sitemap = [];
  try {
    const categoryData = await getAllCategories();
    
    // Get ranking counts per category
    const { data: rankingCounts, error: countError } = await supabase
      .from('rankings')
      .select('category_id')
      .not('category_id', 'is', null);
    
    if (countError) {
      console.error('Error fetching ranking counts for sitemap:', countError);
    }
    
    // Count rankings per category
    const countsByCategory = new Map<string, number>();
    if (rankingCounts) {
      rankingCounts.forEach((ranking) => {
        if (ranking.category_id) {
          countsByCategory.set(
            ranking.category_id,
            (countsByCategory.get(ranking.category_id) || 0) + 1
          );
        }
      });
    }
    
    // Generate category URLs with pagination
    categoryData.forEach((category) => {
      const rankingCount = countsByCategory.get(category.id) || 0;
      const totalPages = Math.ceil(rankingCount / RANKINGS_PER_PAGE);
      
      // Always include page 1 (base category URL)
      categories.push({
        url: `${baseUrl}/${category.slug}`,
        lastModified: new Date(category.updated_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      });
      
      // Add pagination URLs if there are multiple pages
      if (totalPages > 1) {
        for (let page = 2; page <= totalPages; page++) {
          categories.push({
            url: `${baseUrl}/${category.slug}?page=${page}`,
            lastModified: new Date(category.updated_at),
            changeFrequency: 'weekly' as const,
            priority: 0.7, // Slightly lower priority for paginated pages
          });
        }
      }
    });
  } catch (error) {
    console.error('Error fetching categories for sitemap:', error);
  }

  // Fetch all rankings
  let rankings: MetadataRoute.Sitemap = [];
  try {
    const rankingsData = await getAllRankings();
    rankings = rankingsData.map((ranking) => ({
      url: `${baseUrl}/${ranking.category.slug}/${ranking.slug}`,
      lastModified: new Date(ranking.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));
  } catch (error) {
    console.error('Error fetching rankings for sitemap:', error);
  }

  return [...staticPages, ...categories, ...rankings];
}

