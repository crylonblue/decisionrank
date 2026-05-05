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
    description: 'Keep your home spotless and smart with top robot vacuums, smart plugs and power strips, smart lighting solutions, and smart security cameras. We map each bot\'s cleaning coverage, obstacle avoidance, and app usability across floor types and home layouts, then compare how cameras, plugs, and lights extend that automation into routines, monitoring, and peace of mind. For those who want a truly hands-free experience, we also evaluate self-emptying docks, mopping performance, smart plug scheduling, lighting automation, and camera alert quality. Find the robot and smart home gear that matches your floor plan and lifestyle.',
    categorySlugs: ['robot-vacuums', 'smart-plugs-power-strips', 'smart-lighting', 'smart-security-cameras'],
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
    title: 'Travel-Friendly Work & Mobile Gear',
    description: 'Build a travel-ready setup with portable monitors, docking stations, laptop stands, USB-C hubs, and external SSDs that make mobile work easier without turning your bag into a brick. We focus on single-cable convenience, packability, port selection, durability, and how well each product handles hotel desks, hot desks, client sites, and hybrid commutes. If you work from multiple locations, these rankings help you choose gear that travels well and still feels dependable when it is time to get real work done.',
    categorySlugs: ['portable-monitors', 'docking-stations', 'laptop-stands', 'usb-c-hubs', 'external-ssds'],
  },
  {
    id: 'portable-creator-workstation',
    title: 'Portable Creator & Developer Workstation',
    description: 'Set up a full-featured workstation anywhere with portable monitors, docking stations, and high-speed external SSDs. Whether you\'re a developer who needs a dual-screen setup on the go, a designer requiring color-accurate secondary displays, or a content creator working from different locations, our rankings help you build a portable rig that doesn\'t compromise on performance. We evaluate USB-C dock bandwidth, monitor panel quality and color accuracy, SSD transfer speeds under sustained load, and how easily everything connects with a single cable. Find the right combination of portable display, connectivity hub, and storage to turn any space into a productive workspace.',
    categorySlugs: ['portable-monitors', 'docking-stations', 'external-ssds'],
  },
  {
    id: 'smart-home-security',
    title: 'Smart Home Entry & Security',
    description: 'Secure and automate your home\'s entry points with smart locks, video doorbells, smart security cameras, and smart lighting. Smart locks let you grant access without keys and monitor entry logs from anywhere, video doorbells show who\'s at the door before you answer, and security cameras extend that visibility across porches, driveways, and side entrances. Combined with smart lighting that schedules and responds to motion, these devices form the foundation of a cohesive smart home security system. Our rankings test installation complexity, app reliability, integration with Alexa, Google Home, and Apple HomeKit, battery life, subscription value, and how well each device handles the daily wear of real homes. Whether you\'re securing a rented apartment or a single-family home, we help you choose the right combination of entry-level and full-featured options.',
    categorySlugs: ['smart-locks', 'video-doorbells', 'smart-security-cameras', 'smart-lighting'],
  },
  {
    id: 'desk-ergonomics-lighting',
    title: 'Desk Ergonomics & Ambient Lighting',
    description: 'Complete your desk setup with the right lighting and ergonomic support accessories. Desk lamps with adjustable color temperature reduce eye strain during long work sessions, monitor arms free up desk space and improve ergonomics, and laptop stands elevate your screen to the correct height for neutral posture. We test each product for the difference it makes in real daily use: Does the desk lamp eliminate glare on your monitor? Does the monitor arm hold ultrawides without sagging? Is the laptop stand stable enough for heavy 17-inch workstations? Our rankings cover budget-friendly basics through premium desk accessories, with testing across different desk sizes, monitor weights, and lighting conditions.',
    categorySlugs: ['desk-lamps', 'monitor-arms', 'laptop-stands', 'desk-cable-management'],
  },
  {
    id: 'developer-tools',
    title: 'Developer Tools & Software',
    description: 'Choose the best code editors, CI/CD platforms, and API testing tools for your development workflow. We evaluate developer software on extensibility, integration ecosystem, automation capabilities, and team collaboration features. Whether you\'re a solo developer or part of a large engineering organization, our hands-on testing highlights the tools that boost productivity without adding complexity. Compare pricing, self-hosting options, AI assistance, and how each platform scales with team size.',
    categorySlugs: ['code-editors', 'ci-cd-tools', 'api-testing-tools'],
  },
];
