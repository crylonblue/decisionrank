/**
 * SEO use-case and query-intent data for category pages.
 *
 * Use-case blocks   → "Best for X" editorial intent sections targeting
 *                     specific buyer scenarios (family cooking, small spaces, etc.)
 * Query-intent phrases → long-tail keyword clusters that real searchers use
 *                     alongside core category terms, used for H2/H3 targeting.
 */

export interface UseCase {
  /** Short label shown in the card eyebrow */
  label: string;
  /** User-facing headline */
  title: string;
  /** Supporting description */
  description: string;
}

export interface QueryIntent {
  /** The long-tail phrase */
  phrase: string;
  /** One-line intent tag e.g. "informational" | "transactional" | "comparative" */
  intent: 'informational' | 'transactional' | 'comparational' | 'navigational';
}

export interface CategoryUseCaseData {
  /** Use-case blocks shown below the hero */
  useCases: UseCase[];
  /** Long-tail query-intent phrases for section headings and SEO copy */
  queryIntents: QueryIntent[];
}

export const CATEGORY_USE_CASE_DATA: Record<string, CategoryUseCaseData> = {
  "air-fryers": {
    useCases: [
      {
        label: "Small Spaces",
        title: "Best Air Fryers for Small Kitchens",
        description: "Compact models with 2–3 quart capacity that fit any countertop without sacrificing performance. Ideal for apartments, solo users, and dorm rooms."
      },
      {
        label: "Family Size",
        title: "Best Large-Capacity Air Fryers for Families",
        description: "5–7 quart baskets that handle family-sized portions, whole chickens, and batch cooking with even heat distribution and fast preheat times."
      },
      {
        label: "Budget Friendly",
        title: "Best Affordable Air Fryers Under $100",
        description: "Entry-level models that deliver crispy results without the premium price tag — perfect for first-time buyers or casual home cooks."
      },
      {
        label: "Easy Cleaning",
        title: "Easiest-to-Clean Air Fryers",
        description: "Dishwasher-safe baskets and nonstick coatings that cut down cleanup time so you can enjoy your meal without the post-cooking scrub."
      }
    ],
    queryIntents: [
      { phrase: "best air fryer for small kitchen", intent: "transactional" },
      { phrase: "air fryer vs oven which is better", intent: "comparational" },
      { phrase: "how to use an air fryer for beginners", intent: "informational" },
      { phrase: "air fryer recipes healthy", intent: "informational" },
      { phrase: "air fryer family size 6 quart", intent: "transactional" },
      { phrase: "air fryer dishwasher safe basket", intent: "transactional" },
      { phrase: "quiet air fryer for apartments", intent: "transactional" },
      { phrase: "air fryer temperature guide", intent: "informational" },
    ]
  },
  "air-purifiers": {
    useCases: [
      {
        label: "Allergies",
        title: "Best Air Purifiers for Allergies and Dust",
        description: "True HEPA filtration that captures 99.97% of airborne allergens including pollen, dust mites, and pet dander. Essential for allergy sufferers."
      },
      {
        label: "Large Rooms",
        title: "Best Air Purifiers for Large Rooms and Open Plans",
        description: "High-CADR units designed to clean 500+ sq ft spaces efficiently, with coverage maps and runtime indicators for whole-home use."
      },
      {
        label: "Pet Owners",
        title: "Best Air Purifiers for Pet Dander and Odors",
        description: "HEPA plus activated carbon filtration that neutralizes pet hair, dander, and odors without generating ozone. A must for multi-pet households."
      },
      {
        label: "Sleep Quality",
        title: "Quietest Air Purifiers for Bedrooms",
        description: "Near-silent operation at sleep settings (below 30 dB) with optional night-light modes for unobtrusive, restful night-time air cleaning."
      }
    ],
    queryIntents: [
      { phrase: "best air purifier for allergies", intent: "transactional" },
      { phrase: "air purifier CADR rating explained", intent: "informational" },
      { phrase: "HEPA vs carbon filter air purifier", intent: "comparational" },
      { phrase: "air purifier for pet dander", intent: "transactional" },
      { phrase: "quiet air purifier for bedroom", intent: "transactional" },
      { phrase: "air purifier for large room 500 sq ft", intent: "transactional" },
      { phrase: "how often to replace air purifier filter", intent: "informational" },
      { phrase: "air purifier energy consumption cost", intent: "informational" },
    ]
  },
  "coffee-makers": {
    useCases: [
      {
        label: "Morning Routine",
        title: "Best Coffee Makers for Quick Morning Brews",
        description: "Fast brew times under 5 minutes, programmable timers, and thermal carafes that keep coffee hot without a hot plate. Built for busy mornings."
      },
      {
        label: "Espresso Home Barista",
        title: "Best Espresso Machines Under $500",
        description: "Semi-automatic machines that pull cafe-quality shots without the professional price tag. Ideal for espresso lovers who want to master the craft at home."
      },
      {
        label: "Single Serve",
        title: "Best Single-Serve Coffee Makers",
        description: "Pod-compatible machines with fast startup and minimal cleanup — great for offices or households where one person drinks at a time."
      },
      {
        label: "Iced Coffee",
        title: "Best Coffee Makers for Iced Coffee and Cold Brew",
        description: "Built-in cold brew makers and fast-cooling carafes that produce smooth, less acidic iced coffee without dilution or long steep times."
      }
    ],
    queryIntents: [
      { phrase: "best coffee maker for morning routine", intent: "transactional" },
      { phrase: "drip coffee maker vs espresso machine", intent: "comparational" },
      { phrase: "best espresso machine under $500", intent: "transactional" },
      { phrase: "single serve coffee maker for office", intent: "transactional" },
      { phrase: "how to make cold brew coffee at home", intent: "informational" },
      { phrase: "coffee maker thermal carafe vs glass", intent: "comparational" },
      { phrase: "best coffee maker for two people", intent: "transactional" },
      { phrase: "programmable coffee maker with auto on", intent: "transactional" },
    ]
  },
  "external-ssds": {
    useCases: [
      {
        label: "Video Production",
        title: "Best External SSDs for 4K and 8K Video Editing",
        description: "Thunderbolt 4 and USB4 drives that sustain high-speed transfers for ProRes and RAW video workflows without thermal throttling."
      },
      {
        label: "Gaming",
        title: "Best External SSDs for Game Libraries",
        description: "Fast load times and large capacity for storing AAA titles on PS5, Xbox, or PC. Look for durable designs that survive frequent transport."
      },
      {
        label: "Photography",
        title: "Best External SSDs for Photographers",
        description: "Fast sequential reads that accelerate Lightroom catalog access and large file transfers from SD and CFexpress cards."
      },
      {
        label: "Travel Ready",
        title: "Most Rugged Portable SSDs for Travel",
        description: "IP55+ rated drives with shock, water, and dust resistance for on-location shoots, fieldwork, and travel journalists who need reliable storage anywhere."
      }
    ],
    queryIntents: [
      { phrase: "best external SSD for video editing", intent: "transactional" },
      { phrase: "Thunderbolt 4 vs USB4 external SSD", intent: "comparational" },
      { phrase: "external SSD for PS5 game storage", intent: "transactional" },
      { phrase: "fastest portable SSD 2026", intent: "transactional" },
      { phrase: "external SSD for photography workflow", intent: "transactional" },
      { phrase: "rugged portable SSD waterproof", intent: "transactional" },
      { phrase: "how long do external SSDs last", intent: "informational" },
      { phrase: "external SSD heat throttling fix", intent: "informational" },
    ]
  },
  "microphones": {
    useCases: [
      {
        label: "Streaming",
        title: "Best Microphones for Twitch and YouTube Streaming",
        description: "USB condenser mics with built-in monitoring, mute buttons, and good off-axis rejection for gaming streamers who need clear voice in echoey rooms."
      },
      {
        label: "Podcasting",
        title: "Best Microphones for Podcast Recording",
        description: "XLR and USB podcast mics optimized for voice clarity, with cardioid pickup patterns that isolate speech from room noise and background chatter."
      },
      {
        label: "Remote Work",
        title: "Best Microphones for Video Calls and Remote Work",
        description: "Plug-and-play USB mics that elevate call quality beyond laptop built-ins, with noise suppression compatibility and compact desk footprints."
      },
      {
        label: "Studio Recording",
        title: "Best XLR Microphones for Home Studios",
        description: "Professional-grade XLR condensers with wide frequency response and low self-noise for voice-over, audiobook, and music recording."
      }
    ],
    queryIntents: [
      { phrase: "best USB microphone for streaming", intent: "transactional" },
      { phrase: "XLR vs USB microphone for podcast", intent: "comparational" },
      { phrase: "best microphone for remote work video calls", intent: "transactional" },
      { phrase: "how to set up a home recording studio microphone", intent: "informational" },
      { phrase: "cardioid vs omnidirectional microphone", intent: "informational" },
      { phrase: "best budget microphone for YouTube", intent: "transactional" },
      { phrase: "pop filter and shock mount worth it", intent: "informational" },
      { phrase: "microphone for acoustic guitar recording", intent: "transactional" },
    ]
  },
  "monitors": {
    useCases: [
      {
        label: "Gaming",
        title: "Best Gaming Monitors for Competitive and Casual Play",
        description: "High refresh rate (144–360 Hz) with low response times and adaptive sync — from esports panels to immersive OLED gaming displays."
      },
      {
        label: "Photo Editing",
        title: "Best Monitors for Photo and Video Editing",
        description: "Wide gamut displays (AdobeRGB, DCI-P3) with factory calibration and hardware LUT support for color-accurate photo and video work."
      },
      {
        label: "Productivity",
        title: "Best Ultrawide Monitors for Productivity",
        description: "34-inch+ ultrawide monitors that replace dual-screen setups with a single expansive canvas — ideal for analysts, developers, and content writers."
      },
      {
        label: "Budget",
        title: "Best Budget Monitors Under $250",
        description: "1080p IPS monitors that deliver solid color accuracy and 60–75 Hz performance for students and home office users on a tight budget."
      }
    ],
    queryIntents: [
      { phrase: "best gaming monitor 144hz 4k", intent: "transactional" },
      { phrase: "IPS vs VA vs OLED monitor which is best", intent: "comparational" },
      { phrase: "best monitor for photo editing color accuracy", intent: "transactional" },
      { phrase: "ultrawide monitor for software development", intent: "transactional" },
      { phrase: "how to calibrate monitor colors at home", intent: "informational" },
      { phrase: "best budget monitor for home office 2026", intent: "transactional" },
      { phrase: "monitor refresh rate explained 60 vs 144 vs 240", intent: "informational" },
      { phrase: "USB-C monitor hub built in", intent: "transactional" },
    ]
  },
  "noise-cancelling-headphones": {
    useCases: [
      {
        label: "Frequent Flyers",
        title: "Best Noise-Cancelling Headphones for Air Travel",
        description: "Industry-leading ANC with 25+ hour battery life, compact folding design, and optional airline adapter — engineered to silence engine noise and cabin chatter."
      },
      {
        label: "Work From Home",
        title: "Best ANC Headphones for the Office",
        description: "Comfortable over-ear design for all-day wear with multipoint Bluetooth for switching between laptop and phone, plus transparency mode for quick conversations."
      },
      {
        label: "Audiophile",
        title: "Best Noise-Cancelling Headphones for Sound Quality",
        description: "Flagship ANC headphones that don't compromise on audio fidelity — with LDAC/aptX support, customizable EQ, and detailed soundstage."
      },
      {
        label: "Athletes",
        title: "Best Sweat-Resistant ANC Headphones for Workouts",
        description: "IPX4+ rated ANC headphones with secure fit, stable wings, and ambient awareness modes for gym users who need silence but also situational awareness."
      }
    ],
    queryIntents: [
      { phrase: "best noise cancelling headphones for flying", intent: "transactional" },
      { phrase: "over ear vs earbuds noise cancellation", intent: "comparational" },
      { phrase: "best ANC headphones for office work", intent: "transactional" },
      { phrase: "how does active noise cancellation work", intent: "informational" },
      { phrase: "best sounding noise cancelling headphones 2026", intent: "transactional" },
      { phrase: "ANC headphones battery life comparison", intent: "informational" },
      { phrase: "best wireless headphones for big ears", intent: "transactional" },
      { phrase: "can you use noise cancelling headphones with cable", intent: "informational" },
    ]
  },
  "office-chairs": {
    useCases: [
      {
        label: "Budget",
        title: "Best Ergonomic Office Chairs Under $300",
        description: "Value-driven chairs with adjustable lumbar, armrests, and breathable mesh that deliver 80% of an ergonomic chair's comfort at a fraction of the cost."
      },
      {
        label: "Executive",
        title: "Best Premium Ergonomic Chairs for All-Day Comfort",
        description: "High-end chairs with fully articulated lumbar, 4D armrests, and premium materials for users who spend 6+ hours per day in a chair and need maximum support."
      },
      {
        label: "Tall Users",
        title: "Best Office Chairs for Tall and Big People",
        description: "Chairs rated for 300+ lbs with tall backrests, deep seat pans, and wide seat widths designed for taller frames without sacrificing adjustability."
      },
      {
        label: "Gaming Setup",
        title: "Best Office Chairs for Gaming and Long Sessions",
        description: "Gaming-style ergonomic chairs with bold aesthetics, recline locks, and neck pillow support — built for extended gaming marathons without sacrificing spine health."
      }
    ],
    queryIntents: [
      { phrase: "best ergonomic office chair under 300", intent: "transactional" },
      { phrase: "Herman Miller Aeron vs Steelcase Leap", intent: "comparational" },
      { phrase: "office chair for back pain relief", intent: "transactional" },
      { phrase: "mesh vs foam office chair which is better", intent: "comparational" },
      { phrase: "best office chair for tall people", intent: "transactional" },
      { phrase: "how to adjust office chair lumbar support", intent: "informational" },
      { phrase: "gaming chair vs office chair ergonomic", intent: "comparational" },
      { phrase: "office chair warranty what to look for", intent: "informational" },
    ]
  },
  "robot-vacuums": {
    useCases: [
      {
        label: "Pet Owners",
        title: "Best Robot Vacuums for Pet Hair and Allergies",
        description: "High-Pa suction, tangle-free brush rolls, and HEPA filtration that handles shedding pets without clogging. Self-emptying docks reduce hands-on maintenance."
      },
      {
        label: "Carpet and Hardwood",
        title: "Best Robot Vacuums for Mixed Floor Types",
        description: "Adaptive bristle/barbar combo brushes that transition from low-pile carpet to hardwood without scattering debris — plus carpet boost modes for deeper clean."
      },
      {
        label: "Mopping",
        title: "Best Robot Vacuums with Mopping",
        description: "2-in-1 units with active mopping plates, water tank management, and scrubbing patterns that handle everyday kitchen and bathroom floor maintenance."
      },
      {
        label: "Large Homes",
        title: "Best Robot Vacuums for Large Homes Over 2,000 sq ft",
        description: "120+ minute runtime, multi-floor mapping, and self-recharging resume that covers expansive layouts without leaving sections uncleaned."
      }
    ],
    queryIntents: [
      { phrase: "best robot vacuum for pet hair", intent: "transactional" },
      { phrase: "robot vacuum with self emptying dock", intent: "transactional" },
      { phrase: "roomba vs Roborock which is better", intent: "comparational" },
      { phrase: "can robot vacuum replace regular vacuum", intent: "informational" },
      { phrase: "best robot vacuum for carpet and hardwood", intent: "transactional" },
      { phrase: "how to map multiple floors with robot vacuum", intent: "informational" },
      { phrase: "robot vacuum mop combo effectiveness", intent: "informational" },
      { phrase: "how often to run robot vacuum", intent: "informational" },
    ]
  },
  "smart-watches": {
    useCases: [
      {
        label: "Fitness Tracking",
        title: "Best Smartwatches for Fitness and Running",
        description: "Built-in GPS, heart rate zones, VO2 max estimation, and workout detection for athletes who want standalone tracking without carrying a phone."
      },
      {
        label: "iOS Users",
        title: "Best Apple Watch Alternatives for iPhone",
        description: "Non-Apple watches that offer deep iOS integration, notification mirroring, and health tracking for users who prefer not to buy into the Apple ecosystem."
      },
      {
        label: "Battery Life",
        title: "Best Smartwatches with Long Battery Life",
        description: "Smartwatches that last 7–14 days between charges with essential health tracking — ideal for users frustrated by daily charging routines."
      },
      {
        label: "Outdoor Adventure",
        title: "Best Rugged Smartwatches for Hiking and Outdoor Sports",
        description: "MIL-STD-810H rated watches with topographic maps, barometric altimeter, and multi-band GPS for adventurers who need durability and navigation tools."
      }
    ],
    queryIntents: [
      { phrase: "best smartwatch for fitness tracking and running", intent: "transactional" },
      { phrase: "Apple Watch vs Garmin which is better", intent: "comparational" },
      { phrase: "best smartwatch for iPhone users", intent: "transactional" },
      { phrase: "how long does smartwatch battery last", intent: "informational" },
      { phrase: "rugged smartwatch for hiking", intent: "transactional" },
      { phrase: "血氧和心率监测 智能手表推荐", intent: "transactional" },
      { phrase: "best lightweight smartwatch for women", intent: "transactional" },
      { phrase: "sleep tracking smartwatch accuracy", intent: "informational" },
    ]
  },
  "standing-desks": {
    useCases: [
      {
        label: "Budget",
        title: "Best Standing Desks Under $400",
        description: "Affordable electric and manual desks with solid stability, smooth height adjustment, and reliable memory presets — built for home offices on a budget."
      },
      {
        label: "Heavy Duty",
        title: "Best Standing Desks for Dual Monitors and Heavy Loads",
        description: "Desks rated for 300+ lbs with rigid frames, large surface area, and high wattage motors that lift heavy monitor setups without wobbling."
      },
      {
        label: "Small Spaces",
        title: "Best Standing Desks for Small Home Offices",
        description: "Compact footprint desks with full height range that fit in tight apartments and closets without sacrificing the ability to sit and stand."
      },
      {
        label: "Shared Workspace",
        title: "Best Standing Desks for Multiple Users",
        description: "Desks with four+ memory presets, fast adjustment speed, and anti-collision sensors that accommodate households or offices with multiple people sharing the same desk."
      }
    ],
    queryIntents: [
      { phrase: "best standing desk under 400 dollars", intent: "transactional" },
      { phrase: "electric vs manual standing desk", intent: "comparational" },
      { phrase: "standing desk for heavy monitor setup", intent: "transactional" },
      { phrase: "how to prevent back pain with standing desk", intent: "informational" },
      { phrase: "best standing desk for small apartment", intent: "transactional" },
      { phrase: "standing desk bamboo top vs wood", intent: "comparational" },
      { phrase: "standing desk converter vs full size", intent: "comparational" },
      { phrase: "best standing desk for shared office", intent: "transactional" },
    ]
  },
  "webcams": {
    useCases: [
      {
        label: "Remote Work",
        title: "Best Webcams for Professional Video Calls",
        description: "1080p at 30 fps webcams with auto-exposure, noise-reducing microphones, and wide field of view — designed for daily Zoom, Teams, and Meet calls."
      },
      {
        label: "Streaming",
        title: "Best Webcams for Twitch and YouTube Streaming",
        description: "60 fps webcams at 1080p or 4K with background removal, color correction, and face-tracking that give streamers a polished on-camera presence."
      },
      {
        label: "Low Light",
        title: "Best Webcams for Dark Home Offices",
        description: "Large pixel sensors with excellent low-light performance — no more grainy evening calls thanks to hardware-based light correction and HDR."
      },
      {
        label: "Travel",
        title: "Best Portable Webcams for Travel and Digital Nomads",
        description: "Compact, lightweight webcams that slip into a laptop bag and work reliably across hotel Wi-Fi and shared workspaces worldwide."
      }
    ],
    queryIntents: [
      { phrase: "best webcam for zoom calls professional", intent: "transactional" },
      { phrase: "1080p vs 4K webcam which is better", intent: "comparational" },
      { phrase: "best webcam for streaming twitch", intent: "transactional" },
      { phrase: "how to improve webcam video quality lighting", intent: "informational" },
      { phrase: "webcam with microphone for mac", intent: "transactional" },
      { phrase: "best budget webcam 2026", intent: "transactional" },
      { phrase: "external webcam vs built-in macbook camera", intent: "comparational" },
      { phrase: "best webcam for low light office", intent: "transactional" },
    ]
  },
  "wireless-earbuds": {
    useCases: [
      {
        label: "Gym and Workout",
        title: "Best Wireless Earbuds for Exercise and Sports",
        description: "IPX5+ sweat resistance, wing tips or ear hooks, and secure fit that stays put during runs, lifts, and HIIT sessions without sacrificing sound quality."
      },
      {
        label: "Long Flights",
        title: "Best Wireless Earbuds for Long Flights and Commutes",
        description: "Active noise cancellation with 6+ hour battery (plus case), compact design, and comfortable ear tips for extended wearing on transcontinental flights."
      },
      {
        label: "Apple Ecosystem",
        title: "Best Wireless Earbuds for iPhone Users",
        description: "Earbuds with seamless iOS pairing, spatial audio head tracking, and one-tap device switching across iPhone, iPad, MacBook, and Apple TV."
      },
      {
        label: "Calls and Meetings",
        title: "Best Wireless Earbuds for Voice and Video Calls",
        description: "Clear call quality with AI noise suppression, comfortable all-day fit, and multipoint Bluetooth for staying connected to laptop and phone simultaneously."
      }
    ],
    queryIntents: [
      { phrase: "best wireless earbuds for gym and working out", intent: "transactional" },
      { phrase: "best earbuds for long flights noise cancelling", intent: "transactional" },
      { phrase: "AirPods Pro vs Sony WF-1000XM5", intent: "comparational" },
      { phrase: "best earbuds for voice calls and meetings", intent: "transactional" },
      { phrase: "how to get best fit wireless earbuds", intent: "informational" },
      { phrase: "earbuds with best battery life 2026", intent: "transactional" },
      { phrase: "waterproof wireless earbuds for swimming", intent: "transactional" },
      { phrase: "best earbuds for small ears", intent: "transactional" },
    ]
  },
  "mechanical-keyboards": {
    useCases: [
      {
        label: "Gaming",
        title: "Best Mechanical Keyboards for Competitive Gaming",
        description: "Low-latency switches, N-key rollover, and per-key RGB with 1000 Hz polling rate — built for esports pros and gamers who demand millisecond reaction times."
      },
      {
        label: "Typing",
        title: "Best Mechanical Keyboards for Writers and Developers",
        description: "Quiet linear or tactile switches with excellent key stability, full-size layouts, and wrist rests for all-day typing comfort without fatigue or noise complaints."
      },
      {
        label: "Compact",
        title: "Best Compact 60% and 65% Keyboards for Portability",
        description: "Compact layouts that free up desk space for mouse movement and are easy to carry — ideal for developers, writers, and travelers who value a minimal setup."
      },
      {
        label: "Budget",
        title: "Best Mechanical Keyboards Under $100",
        description: "Budget-mech boards with genuine Cherry MX or clone switches, solid build quality, and programmable macros that prove you don't need to spend $200+ for a great typing feel."
      }
    ],
    queryIntents: [
      { phrase: "best mechanical keyboard for gaming", intent: "transactional" },
      { phrase: "cherry mx red vs brown which switch", intent: "comparational" },
      { phrase: "best mechanical keyboard for programming", intent: "transactional" },
      { phrase: "60% keyboard pros and cons", intent: "informational" },
      { phrase: "best budget mechanical keyboard under 100", intent: "transactional" },
      { phrase: "how to clean mechanical keyboard switches", intent: "informational" },
      { phrase: "tactile vs linear vs clicky switches", intent: "informational" },
      { phrase: "best keyboard for wrist pain carpal tunnel", intent: "transactional" },
    ]
  },
  "espresso-machines": {
    useCases: [
      {
        label: "Beginners",
        title: "Best Espresso Machines for Home Baristas Starting Out",
        description: "Super-automatic and semi-automatic machines with intuitive controls, built-in grinders, and automated milk texturing for users new to espresso without a learning curve."
      },
      {
        label: "Advanced",
        title: "Best Semi-Automatic Espresso Machines for Enthusiasts",
        description: "Dual-boiler or heat-exchanger machines with PID temperature control, pressure profiling, and manual steam wands for experienced baristas who want to dial in every variable."
      },
      {
        label: "Super Automatic",
        title: "Best Super-Automatic Espresso Machines for Convenience",
        description: "One-touch machines that grind, dose, tamp, and extract with consistent quality — ideal for households that want cafe-quality espresso without the barista skill requirement."
      },
      {
        label: "Small Kitchens",
        title: "Best Compact Espresso Machines for Small Kitchens",
        description: "Narrow, countertop-friendly designs with decent boiler size and pressure for apartments and kitchens where counter space is at a premium."
      }
    ],
    queryIntents: [
      { phrase: "best espresso machine for beginners home", intent: "transactional" },
      { phrase: "super automatic vs semi automatic espresso", intent: "comparational" },
      { phrase: "best espresso machine for small kitchen", intent: "transactional" },
      { phrase: "how to make espresso without machine", intent: "informational" },
      { phrase: "best espresso machine with grinder built in", intent: "transactional" },
      { phrase: "dual boiler vs heat exchanger espresso machine", intent: "comparational" },
      { phrase: "how to dial in espresso grind size", intent: "informational" },
      { phrase: "best espresso machine for latte art", intent: "transactional" },
    ]
  },
};

/**
 * Generic fallback for categories not yet in the data map.
 * Returns a minimal set of three use cases and three query intents
 * derived from the category slug for immediate SEO coverage.
 */
function buildGenericFallback(slug: string): CategoryUseCaseData {
  const name = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return {
    useCases: [
      {
        label: "Top Rated",
        title: `Best ${name} for Every Budget`,
        description: `Expert-ranked ${name.toLowerCase()} across price tiers — from entry-level picks to premium options for discerning buyers.`
      },
      {
        label: "For Beginners",
        title: `Best ${name} for First-Time Buyers`,
        description: `Accessible options that deliver great results without a steep learning curve or overwhelming feature sets.`
      },
      {
        label: "For Professionals",
        title: `Best ${name} for Professional Use`,
        description: `High-performance models built for demanding workloads, frequent use, and long-term reliability.`
      },
    ],
    queryIntents: [
      { phrase: `best ${name.toLowerCase()} 2026`, intent: "transactional" },
      { phrase: `${name.toLowerCase()} buying guide`, intent: "informational" },
      { phrase: `how to choose a ${name.toLowerCase()}`, intent: "informational" },
      { phrase: `${name.toLowerCase()} vs competing brands`, intent: "comparational" },
      { phrase: `top rated ${name.toLowerCase()} reviews`, intent: "informational" },
      { phrase: `affordable ${name.toLowerCase()} under $200`, intent: "transactional" },
    ],
  };
}

/**
 * Retrieve use-case + query-intent data for a given category slug.
 * Falls back to generic patterns for any category not in the map.
 */
export function getCategoryUseCaseData(slug: string): CategoryUseCaseData {
  if (CATEGORY_USE_CASE_DATA[slug]) {
    return CATEGORY_USE_CASE_DATA[slug];
  }
  return buildGenericFallback(slug);
}
