import { getEnhancedDescription } from '@/lib/category-enhancements';
import { getRelatedCategorySlugs } from '@/lib/category-relations';
import { getCategoryUseCaseData } from '@/lib/category-use-cases';
import type { Category } from '@/lib/types';

export interface ThinFamilyClusterConfig {
  id: string;
  title: string;
  intro: string;
  categorySlugs: string[];
}

export interface ThinFamilyClusterSection extends ThinFamilyClusterConfig {
  categories: Category[];
  buyerSearchLinks: Array<{ slug: string; phrase: string }>;
  relatedCategories: Category[];
}

export const THIN_FAMILY_CLUSTERS: ThinFamilyClusterConfig[] = [
  {
    id: 'wearable-tech-audio',
    title: 'Wearable Tech & Audio',
    intro:
      'Wearable and personal-audio buyers usually compare comfort, battery life, ecosystem fit, and how reliably a device stays useful across workouts, commutes, and daily notifications. This family is still compact on DecisionRank, so these links group the core smartwatch and earbud guides together with adjacent buyer paths to make the cluster easier to crawl and easier to browse.',
    categorySlugs: ['smart-watches', 'wireless-earbuds'],
  },
  {
    id: 'kitchen-cooking',
    title: 'Kitchen & Cooking Essentials',
    intro:
      'Kitchen buyers rarely shop one appliance in isolation. They compare countertop footprint, cleanup, speed, consistency, and whether a device actually improves the daily cooking routine. Grouping the strongest kitchen categories together gives air fryers, coffee makers, and espresso machines more shared context and more internal-link support from high-authority discovery pages.',
    categorySlugs: ['air-fryers', 'coffee-makers', 'espresso-machines'],
  },
  {
    id: 'developer-tools',
    title: 'Developer Tools & Software',
    intro:
      'Developer-tool searches tend to spread across workflows rather than single products, from code editing and debugging to CI pipelines and API collaboration. This cluster brings those categories into one richer browse surface so each guide picks up stronger internal links from related evaluation, comparison, and buyer-intent paths.',
    categorySlugs: ['code-editors', 'ci-cd-tools', 'api-testing-tools', 'cloud-hosting', 'issue-tracking', 'project-management'],
  },
];

const uniqueBySlug = (categories: Category[]) => {
  const seen = new Set<string>();
  return categories.filter((category) => {
    if (seen.has(category.slug)) return false;
    seen.add(category.slug);
    return true;
  });
};

export function buildThinFamilyClusterSections(categories: Category[]): ThinFamilyClusterSection[] {
  const categoryMap = new Map(categories.map((category) => [category.slug, category]));

  return THIN_FAMILY_CLUSTERS.map((cluster) => {
    const clusterCategories = cluster.categorySlugs
      .map((slug) => categoryMap.get(slug))
      .filter((category): category is Category => !!category);

    const buyerSearchLinks = cluster.categorySlugs.flatMap((slug) => {
      const data = getCategoryUseCaseData(slug);
      return (data.queryIntentPhrases || [])
        .slice(0, 3)
        .map((phrase) => ({ slug, phrase }));
    }).slice(0, 6);

    const relatedCategorySlugs = Array.from(
      new Set(
        cluster.categorySlugs.flatMap((slug) => getRelatedCategorySlugs(slug))
      )
    ).filter((slug) => !cluster.categorySlugs.includes(slug));

    const relatedCategories = uniqueBySlug(
      relatedCategorySlugs
        .map((slug) => categoryMap.get(slug))
        .filter((category): category is Category => !!category)
    ).slice(0, 6);

    return {
      ...cluster,
      categories: clusterCategories.map((category) => ({
        ...category,
        description: getEnhancedDescription(category.slug, category.description),
      })),
      buyerSearchLinks,
      relatedCategories,
    };
  }).filter((cluster) => cluster.categories.length >= 2);
}
