import { MetadataRoute } from 'next';
import { getAllRankings, getAllCategories } from '@/lib/data';
import { getBaseUrl } from '@/lib/seo';

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

  // Fetch all categories
  let categories: MetadataRoute.Sitemap = [];
  try {
    const categoryData = await getAllCategories();
    categories = categoryData.map((category) => ({
      url: `${baseUrl}/${category.slug}`,
      lastModified: new Date(category.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
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

