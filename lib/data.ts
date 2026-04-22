import { convex } from './convex';
import { api } from '@/convex/_generated/api';
import type { Ranking, RankingProductWithDetails, Category, FAQ } from './types';

// Helper type for category with fully populated ranking products
 export type CategoryWithProducts = Category & {
  rankings: Array<{
    id: string;
    slug: string;
    question: string;
    description: string | null;
    verdict_summary: string | null;
    category_id: string;
    created_at: string;
    updated_at: string;
    ranking_products: RankingProductWithDetails[];
  }>;
};

export async function getAllRankings(searchQuery?: string) {
  return (await convex.query(api.rankings.getAllRankings, { searchQuery })) as (Ranking & { category: Category })[];
}

export async function getRankingBySlug(slug: string, categorySlug: string) {
  const ranking = await convex.query(api.rankings.getRankingBySlug, { slug, categorySlug });
  if (!ranking) {
    throw new Error('Ranking not found');
  }
  return ranking as Ranking & {
    ranking_products: RankingProductWithDetails[];
    category: Category;
    faqs: FAQ[];
    relatedRankings: Pick<Ranking, 'id' | 'slug' | 'question' | 'description'>[];
  };
}

export async function getAllCategories() {
  return (await convex.query(api.rankings.getAllCategories, {})) as Category[];
}

export async function getCategoryBySlug(slug: string) {
  const category = await convex.query(api.rankings.getCategoryBySlug, { slug });
  if (!category) {
    throw new Error('Category not found');
  }

  return category as Category & {
    rankings: Ranking[];
  };
}

// New: fetch category with fully populated ranking products for buyer's choice computation
 export async function getCategoryWithProducts(slug: string) {
  return (await convex.query(api.rankings.getCategoryWithProducts, { slug })) as CategoryWithProducts | null;
}

export async function getRankingCountsByCategory() {
  return (await convex.query(api.rankings.getRankingCountsByCategory, {})) as Record<string, number>;
}
