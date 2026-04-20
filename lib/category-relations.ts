/**
 * Category relationship mappings for DecisionRank.
 * Defines which categories are considered adjacent in intent for cross-linking.
 * Combines manual base adjacency with automatic module-based clustering to maximize relevant internal linking across category families.
 */
import { buyerIntentModules } from './buyer-intent-modules';

// Base adjacency overrides — high-value cross-module relationships curated manually.
const BASE_RELATIONS: Record<string, string[]> = {
  'standing-desks': ['air-purifiers', 'coffee-makers', 'robot-vacuums'],
  'air-purifiers': ['standing-desks', 'robot-vacuums', 'air-fryers', 'coffee-makers'],
  'coffee-makers': ['air-fryers', 'standing-desks', 'air-purifiers', 'espresso-machines'],
  'robot-vacuums': ['air-purifiers', 'standing-desks', 'air-fryers', 'coffee-makers'],
  'air-fryers': ['coffee-makers', 'air-purifiers', 'robot-vacuums', 'espresso-machines'],
  'espresso-machines': ['coffee-makers', 'air-fryers'],
};

// Build module-based adjacency: category co-occurrence in buyer-intent modules.
const MODULE_ADJ: Record<string, string[]> = {};

for (const mod of buyerIntentModules) {
  for (const slug of mod.categorySlugs) {
    if (!MODULE_ADJ[slug]) MODULE_ADJ[slug] = [];
    for (const other of mod.categorySlugs) {
      if (other !== slug && !MODULE_ADJ[slug].includes(other)) {
        MODULE_ADJ[slug].push(other);
      }
    }
  }
}

/**
 * Get related category slugs for a given category.
 * Merges manual base adjacency with module-based co-occurrence for comprehensive coverage.
 */
export function getRelatedCategorySlugs(categorySlug: string): string[] {
  const combined = new Set<string>();

  if (BASE_RELATIONS[categorySlug]) {
    for (const r of BASE_RELATIONS[categorySlug]) combined.add(r);
  }
  if (MODULE_ADJ[categorySlug]) {
    for (const r of MODULE_ADJ[categorySlug]) combined.add(r);
  }

  return Array.from(combined);
}
