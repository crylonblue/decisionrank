export interface BuyerIntentModule {
  id: string;
  title: string;
  description: string;
  categorySlugs: string[];
}

/**
 * Buyer-intent discovery modules: editorial sections grouped by use case or buyer intent.
 * Each module defines a title, description, and a list of category slugs to feature.
 * Used on homepage and /categories page to improve discovery and SEO.
 */
export const buyerIntentModules: BuyerIntentModule[] = [
  {
    id: 'home-office',
    title: 'Build Your Perfect Home Office',
    description: 'Create a productive, comfortable workspace with top-rated monitors, ergonomic office chairs, high-speed external SSDs, versatile USB-C hubs, and HD webcams.',
    categorySlugs: ['monitors', 'office-chairs', 'external-ssds', 'usb-c-hubs', 'webcams'],
  },
  {
    id: 'gaming-streaming',
    title: 'Gaming & Streaming Setup',
    description: 'Upgrade your gaming and streaming rig with the best mechanical keyboards, noise-cancelling headphones, and professional microphones.',
    categorySlugs: ['mechanical-keyboards', 'noise-cancelling-headphones', 'microphones'],
  },
  {
    id: 'content-creation',
    title: 'Content Creation & Remote Work',
    description: 'Produce high-quality content with top webcams, microphones, and adjustable tablet stands for streaming, podcasting, and video calls.',
    categorySlugs: ['webcams', 'microphones', 'tablet-stands-mounts'],
  },
  {
    id: 'kitchen-cooking',
    title: 'Kitchen & Cooking Essentials',
    description: 'Elevate your cooking with the best coffee makers and air fryers, tested for performance, capacity, and ease of use.',
    categorySlugs: ['coffee-makers', 'air-fryers'],
  },
  {
    id: 'smart-home-cleaning',
    title: 'Smart Home & Cleaning',
    description: 'Keep your home spotless with top robot vacuums and mops that offer excellent navigation, suction, and smart features.',
    categorySlugs: ['robot-vacuums'],
  },
];
