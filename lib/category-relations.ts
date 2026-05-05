/**
 * Category relationship mappings for DecisionRank.
 * Defines which categories are considered adjacent in intent for cross-linking.
 * Combines manual base adjacency with automatic module-based clustering to maximize relevant internal linking across category families.
 *
 * Cluster map:
 * - home-office:     standing-desks, office-chairs, monitors, monitor-arms, laptop-stands,
 *                    desk-cable-management, usb-c-hubs, webcams, external-ssds
 * - gaming:          gaming-laptops, mechanical-keyboards, noise-cancelling-headphones,
 *                    microphones, stream-decks
 * - smart-home:      smart-lighting, smart-plugs-power-strips, smart-locks, video-doorbells,
 *                    smart-security-cameras, robot-vacuums, air-purifiers
 * - kitchen:        coffee-makers, air-fryers, espresso-machines
 * - wearable:        smart-watches, wireless-earbuds
 * - content-creation: smartphones, tablet-stands-mounts, webcams, microphones, stream-decks
 * - developer-tools: code-editors, ci-cd-tools, api-testing-tools, cloud-hosting,
 *                    issue-tracking, project-management
 * - portable-creator: portable-monitors, docking-stations, external-ssds, laptop-stands
 */
import { buyerIntentModules } from './buyer-intent-modules';

// Base adjacency — high-value cross-cluster and within-cluster relations curated manually.
const BASE_RELATIONS: Record<string, string[]> = {
  // === Home Office cluster ===
  'standing-desks':   ['air-purifiers', 'coffee-makers', 'robot-vacuums', 'desk-cable-management', 'monitor-arms', 'laptop-stands', 'office-chairs', 'air-fryers'],
  'office-chairs':    ['standing-desks', 'monitors', 'laptop-stands', 'desk-cable-management', 'external-ssds'],
  'monitors':         ['office-chairs', 'standing-desks', 'webcams', 'usb-c-hubs', 'external-ssds', 'monitor-arms'],
  'monitor-arms':     ['standing-desks', 'monitors', 'desk-cable-management', 'laptop-stands'],
  'laptop-stands':    ['monitors', 'standing-desks', 'external-ssds', 'usb-c-hubs', 'desk-cable-management'],
  'desk-cable-management': ['standing-desks', 'monitor-arms', 'laptop-stands', 'usb-c-hubs'],
  'usb-c-hubs':       ['external-ssds', 'monitors', 'laptop-stands', 'webcams'],
  'webcams':          ['monitors', 'microphones', 'usb-c-hubs', 'noise-cancelling-headphones'],
  'external-ssds':    ['usb-c-hubs', 'laptop-stands', 'monitors', 'gaming-laptops'],

  // === Gaming cluster ===
  'gaming-laptops':   ['mechanical-keyboards', 'noise-cancelling-headphones', 'stream-decks', 'microphones', 'external-ssds'],
  'mechanical-keyboards': ['gaming-laptops', 'noise-cancelling-headphones', 'microphones', 'stream-decks'],
  'noise-cancelling-headphones': ['gaming-laptops', 'mechanical-keyboards', 'microphones', 'wireless-earbuds', 'webcams'],
  'microphones':      ['webcams', 'noise-cancelling-headphones', 'stream-decks', 'mechanical-keyboards', 'gaming-laptops'],
  'stream-decks':     ['gaming-laptops', 'microphones', 'mechanical-keyboards', 'smartphones', 'webcams'],

  // === Smart Home cluster ===
  'smart-lighting':   ['robot-vacuums', 'smart-plugs-power-strips', 'smart-locks', 'video-doorbells', 'smart-security-cameras'],
  'smart-plugs-power-strips': ['air-fryers', 'coffee-makers', 'smart-lighting', 'robot-vacuums', 'air-purifiers'],
  'smart-locks':      ['video-doorbells', 'smart-security-cameras', 'smart-lighting', 'smart-watches'],
  'video-doorbells':   ['smart-locks', 'smart-security-cameras', 'smart-lighting', 'smart-watches', 'robot-vacuums'],
  'smart-security-cameras': ['video-doorbells', 'smart-locks', 'smart-lighting', 'robot-vacuums', 'air-purifiers'],
  'robot-vacuums':    ['air-purifiers', 'smart-lighting', 'smart-security-cameras', 'smart-plugs-power-strips', 'standing-desks', 'air-fryers', 'coffee-makers'],
  'air-purifiers':    ['standing-desks', 'robot-vacuums', 'smart-security-cameras', 'smart-plugs-power-strips', 'coffee-makers'],

  // === Kitchen cluster ===
  'coffee-makers':   ['air-fryers', 'standing-desks', 'air-purifiers', 'espresso-machines', 'smart-plugs-power-strips', 'robot-vacuums'],
  'air-fryers':      ['coffee-makers', 'air-purifiers', 'robot-vacuums', 'espresso-machines', 'smart-plugs-power-strips'],
  'espresso-machines': ['coffee-makers', 'air-fryers'],

  // === Wearable cluster ===
  'smart-watches':   ['wireless-earbuds', 'smart-locks', 'video-doorbells', 'noise-cancelling-headphones'],
  'wireless-earbuds': ['smart-watches', 'noise-cancelling-headphones', 'smartphones'],

  // === Content creation cluster ===
  'smartphones':      ['microphones', 'stream-decks', 'wireless-earbuds', 'webcams'],
  'tablet-stands-mounts': ['laptop-stands', 'monitors', 'smartphones'],

  // === Developer tools cluster ===
  'code-editors':    ['ci-cd-tools', 'api-testing-tools', 'issue-tracking', 'project-management'],
  'ci-cd-tools':     ['code-editors', 'api-testing-tools', 'cloud-hosting', 'issue-tracking'],
  'api-testing-tools': ['code-editors', 'ci-cd-tools', 'cloud-hosting', 'issue-tracking'],
  'cloud-hosting':   ['ci-cd-tools', 'api-testing-tools', 'project-management', 'issue-tracking'],
  'issue-tracking':  ['code-editors', 'ci-cd-tools', 'api-testing-tools', 'project-management'],
  'project-management': ['issue-tracking', 'cloud-hosting', 'code-editors', 'ci-cd-tools'],

  // === Portable creator workstation cluster ===
  'portable-monitors': ['docking-stations', 'external-ssds', 'laptop-stands', 'usb-c-hubs'],
  'docking-stations': ['portable-monitors', 'laptop-stands', 'external-ssds', 'usb-c-hubs'],
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
 * Get all category clusters as a Map of clusterId -> displayName -> slugs.
 * Used for cluster-based navigation components.
 */
export interface CategoryCluster {
  id: string;
  name: string;
  slugs: string[];
}

export const CATEGORY_CLUSTERS: CategoryCluster[] = [
  { id: 'home-office',        name: 'Home Office',         slugs: ['standing-desks', 'office-chairs', 'monitors', 'monitor-arms', 'laptop-stands', 'desk-cable-management', 'usb-c-hubs', 'webcams', 'external-ssds'] },
  { id: 'gaming-streaming',    name: 'Gaming & Streaming',  slugs: ['gaming-laptops', 'mechanical-keyboards', 'noise-cancelling-headphones', 'microphones', 'stream-decks'] },
  { id: 'smart-home',          name: 'Smart Home',           slugs: ['smart-lighting', 'smart-plugs-power-strips', 'smart-locks', 'video-doorbells', 'smart-security-cameras', 'robot-vacuums', 'air-purifiers'] },
  { id: 'kitchen-cooking',     name: 'Kitchen & Cooking',    slugs: ['coffee-makers', 'air-fryers', 'espresso-machines'] },
  { id: 'wearable-tech-audio', name: 'Wearable & Audio',     slugs: ['smart-watches', 'wireless-earbuds'] },
  { id: 'content-creation',   name: 'Content Creation',     slugs: ['smartphones', 'tablet-stands-mounts', 'webcams', 'microphones', 'stream-decks'] },
  { id: 'developer-tools',    name: 'Developer Tools',      slugs: ['code-editors', 'ci-cd-tools', 'api-testing-tools', 'cloud-hosting', 'issue-tracking', 'project-management'] },
  { id: 'portable-creator',   name: 'Portable Creator',     slugs: ['portable-monitors', 'docking-stations', 'external-ssds', 'laptop-stands'] },
];

export function getClusterForCategory(slug: string): CategoryCluster | undefined {
  return CATEGORY_CLUSTERS.find(c => c.slugs.includes(slug));
}

/**
 * Get sibling slugs in the same cluster as the given category.
 */
export function getClusterSiblings(slug: string): string[] {
  const cluster = getClusterForCategory(slug);
  if (!cluster) return [];
  return cluster.slugs.filter(s => s !== slug);
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
  // Always include cluster siblings as they are contextually adjacent
  for (const s of getClusterSiblings(categorySlug)) combined.add(s);

  return Array.from(combined);
}
