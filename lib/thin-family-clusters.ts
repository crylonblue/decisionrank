import { getEnhancedDescription } from '@/lib/category-enhancements';
import { getRelatedCategorySlugs } from '@/lib/category-relations';
import { getCategoryUseCaseData } from '@/lib/category-use-cases';
import type { Category } from '@/lib/types';

export interface ThinFamilyBrowseGroupConfig {
  id: string;
  title: string;
  intro: string;
  categorySlugs: string[];
}

export interface ThinFamilyClusterConfig {
  id: string;
  title: string;
  intro: string;
  categorySlugs: string[];
  browseGroups?: ThinFamilyBrowseGroupConfig[];
}

export interface ThinFamilyClusterBrowseGroup extends ThinFamilyBrowseGroupConfig {
  categories: Category[];
}

export interface ThinFamilyClusterSection extends ThinFamilyClusterConfig {
  categories: Category[];
  browseGroups: ThinFamilyClusterBrowseGroup[];
  buyerSearchLinks: Array<{ slug: string; phrase: string }>;
  relatedCategories: Category[];
}

export const THIN_FAMILY_CLUSTERS: ThinFamilyClusterConfig[] = [
  {
    id: 'wearable-tech-audio',
    title: 'Wearable Tech & Audio',
    intro:
      'Wearable and personal-audio shoppers usually compare portability, overnight comfort, battery life, fit, awareness, and everyday usefulness across sleep, recovery, workouts, calls, commuting, and casual listening. This family groups the seeded smartwatch, tracker, smart-ring, earbud, headphone, and speaker categories into one stronger browse surface so buyers and crawlers can move across the full decision journey without hitting thin dead ends.',
    categorySlugs: ['smart-watches', 'fitness-trackers', 'sleep-trackers', 'smart-rings', 'wireless-earbuds', 'open-ear-headphones', 'over-ear-headphones', 'bluetooth-speakers'],
    browseGroups: [
      {
        id: 'wearables',
        title: 'Track health, recovery, and daily readiness',
        intro: 'Start here when the buyer journey is about wellness data, sleep quality, training load, recovery, and low-friction all-day wear.',
        categorySlugs: ['smart-watches', 'fitness-trackers', 'sleep-trackers', 'smart-rings'],
      },
      {
        id: 'personal-audio',
        title: 'Choose the right audio format for every setting',
        intro: 'Compare compact earbuds, awareness-first open-ear listening, immersive over-ear headphones, and room-filling speaker setups depending on where and how people listen most.',
        categorySlugs: ['wireless-earbuds', 'open-ear-headphones', 'over-ear-headphones', 'bluetooth-speakers'],
      },
    ],
  },
  {
    id: 'kitchen-cooking',
    title: 'Kitchen & Cooking Essentials',
    intro:
      'Kitchen appliance shoppers rarely stop at one purchase. They compare speed, cleanup, countertop space, drink quality, and how often a tool genuinely improves the routine. This family ties together the seeded air-fryer, coffee-maker, and espresso-machine hubs so the kitchen cluster has thicker editorial context and clearer internal-link paths on high-authority pages.',
    categorySlugs: ['air-fryers', 'coffee-makers', 'espresso-machines'],
    browseGroups: [
      {
        id: 'coffee-routine',
        title: 'Build a better coffee routine at home',
        intro: 'Browse the coffee side of the family first if the buyer is comparing convenience, grind-and-brew workflows, milk drinks, or café-style results.',
        categorySlugs: ['coffee-makers', 'espresso-machines'],
      },
      {
        id: 'faster-cooking',
        title: 'Speed up weeknight cooking and countertop prep',
        intro: 'Use the air-fryer path for quick meals, easy cleanup, and compact appliance buyers who care about speed and simplicity most.',
        categorySlugs: ['air-fryers'],
      },
    ],
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

export function buildThinFamilyClusterSections(categories: Category[], rankingCounts?: Record<string, number>): ThinFamilyClusterSection[] {
  const categoryMap = new Map(categories.map((category) => [category.slug, category]));

  const getValidCategory = (slug: string): Category | null => {
    const category = categoryMap.get(slug);
    if (!category) return null;
    if (rankingCounts && !(category.id in rankingCounts)) return null;
    if (rankingCounts && (rankingCounts[category.id] || 0) <= 0) return null;

    return {
      ...category,
      description: getEnhancedDescription(category.slug, category.description),
    };
  };

  return THIN_FAMILY_CLUSTERS.map((cluster) => {
    const clusterCategories = cluster.categorySlugs
      .map((slug) => getValidCategory(slug))
      .filter((category): category is Category => !!category);

    const browseGroups = (cluster.browseGroups || [])
      .map((group) => ({
        ...group,
        categories: group.categorySlugs
          .map((slug) => getValidCategory(slug))
          .filter((category): category is Category => !!category),
      }))
      .filter((group) => group.categories.length > 0);

    const buyerSearchLinks = clusterCategories.flatMap((category) => {
      const data = getCategoryUseCaseData(category.slug);
      return (data.queryIntentPhrases || [])
        .slice(0, 2)
        .map((phrase) => ({ slug: category.slug, phrase }));
    }).slice(0, 6);

    const relatedCategorySlugs = Array.from(
      new Set(
        clusterCategories.flatMap((category) => getRelatedCategorySlugs(category.slug))
      )
    ).filter((slug) => !cluster.categorySlugs.includes(slug));

    const relatedCategories = uniqueBySlug(
      relatedCategorySlugs
        .map((slug) => getValidCategory(slug))
        .filter((category): category is Category => !!category)
    ).slice(0, 6);

    return {
      ...cluster,
      categories: clusterCategories,
      browseGroups,
      buyerSearchLinks,
      relatedCategories,
    };
  }).filter((cluster) => cluster.categories.length >= 2);
}
