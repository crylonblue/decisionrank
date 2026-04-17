/**
 * Category relationship mappings for DecisionRank.
 * Defines which categories are considered adjacent in intent for cross-linking.
 * Unmapped categories fall back to random selection.
 */
export function getRelatedCategorySlugs(categorySlug: string): string[] {
  const relations: Record<string, string[]> = {
    'standing-desks': ['air-purifiers', 'coffee-makers', 'robot-vacuums'],
    'wireless-earbuds': [],
    'air-purifiers': ['standing-desks', 'robot-vacuums', 'air-fryers', 'coffee-makers'],
    'coffee-makers': ['air-fryers', 'standing-desks', 'air-purifiers'],
    'robot-vacuums': ['air-purifiers', 'standing-desks', 'air-fryers', 'coffee-makers'],
    'air-fryers': ['coffee-makers', 'air-purifiers', 'robot-vacuums'],
  };
  return relations[categorySlug] ?? [];
}
