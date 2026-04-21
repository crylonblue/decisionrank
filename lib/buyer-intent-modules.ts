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
    description: 'Create a productive, comfortable workspace with top-rated monitors, ergonomic office chairs, high-speed external SSDs, versatile USB-C hubs, HD webcams, adjustable laptop stands, monitor arms, and desk cable management solutions. Whether you\'re setting up a remote workstation or upgrading your current setup, our rankings help you choose gear that balances performance, comfort, and value. Explore detailed comparisons and buying guides for each category to ensure every component meets your needs.',
    categorySlugs: ['monitors', 'office-chairs', 'external-ssds', 'usb-c-hubs', 'webcams', 'laptop-stands', 'monitor-arms', 'desk-cable-management'],
  },
  {
    id: 'gaming-streaming',
    title: 'Gaming & Streaming Setup',
    description: 'Upgrade your gaming and streaming rig with the best mechanical keyboards, noise-cancelling headphones, professional microphones, dedicated gaming laptops, and stream decks. From competitive esports to content creation, the right peripherals make a difference. Our evaluations cover switch types, sound signatures, microphone pickup patterns, laptop GPU performance, and how each product performs under pressure. Find the perfect tools to crush your game and engage your audience.',
    categorySlugs: ['mechanical-keyboards', 'noise-cancelling-headphones', 'microphones', 'gaming-laptops', 'stream-decks'],
  },
  {
    id: 'content-creation',
    title: 'Content Creation & Remote Work',
    description: 'Produce high-quality content with top webcams, microphones, adjustable tablet stands, smartphones, and stream decks for streaming, podcasting, and video calls. Remote work and content creation demand reliable, plug-and-play hardware that delivers professional results. We test video clarity, audio fidelity, mounting flexibility, mobile device quality, and durability so you can focus on your message, not your gear. Discover which products offer the best balance of quality and simplicity.',
    categorySlugs: ['webcams', 'microphones', 'tablet-stands-mounts', 'smartphones', 'stream-decks'],
  },
  {
    id: 'kitchen-cooking',
    title: 'Kitchen & Cooking Essentials',
    description: 'Elevate your cooking with the best coffee makers and air fryers, tested for performance, capacity, and ease of use. Whether you\'re a home barista or health-conscious cook, our hands-on testing highlights the top performers for different budgets and kitchen sizes. We consider brew temperature stability, air circulation efficiency, cleanup hassle, and long-term reliability so you can confidently bring new tools into your daily routine.',
    categorySlugs: ['coffee-makers', 'air-fryers'],
  },
  {
    id: 'smart-home-cleaning',
    title: 'Smart Home & Cleaning',
    description: 'Keep your home spotless and smart with top robot vacuums, smart plugs and power strips, and smart lighting solutions. We map each bot\'s cleaning coverage, obstacle avoidance, and app usability across floor types and home layouts. For those who want a truly hands-free experience, we also evaluate self-emptying docks, mopping performance, smart plug scheduling, and lighting automation. Find the robot and smart home gear that matches your floor plan and lifestyle.',
    categorySlugs: ['robot-vacuums', 'smart-plugs-power-strips', 'smart-lighting'],
  },
  {
    id: 'wearable-tech-audio',
    title: 'Wearable Tech & Audio',
    description: 'Stay connected and listen freely with the best smartwatches and wireless earbuds for fitness, notifications, and music on the go. We measure GPS accuracy, health sensor reliability, earbud fit security, and battery longevity. Whether you need a rugged workout companion or a subtle daily driver, our rankings highlight devices that deliver on their promises and integrate seamlessly into your ecosystem.',
    categorySlugs: ['smart-watches', 'wireless-earbuds'],
  },
  {
    id: 'healthy-home',
    title: 'Healthy Home & Workspace',
    description: 'Breathe easier and work healthier with top air purifiers and standing desks for a cleaner, more ergonomic living and working environment. Air purifiers are tested for CADR ratings, filter longevity, and noise levels; standing desks are evaluated for stability, height adjustment speed, and build quality. If you suffer from allergies or back pain, these upgrades can make a tangible difference in daily comfort and productivity.',
    categorySlugs: ['air-purifiers', 'standing-desks'],
  },
  {
    id: 'travel-mobility',
    title: 'Travel & Mobility',
    description: 'Move smartly with the best personal transportation devices and travel gear for commuting, exploring, and getting around efficiently. From electric scooters to luggage with smart features, we assess portability, durability, and real-world performance. If you\'re a frequent traveler or urban commuter, our guides help you find gear that simplifies the journey and survives the road.',
    categorySlugs: ['transportation', 'travel-gear'],
  },
];
