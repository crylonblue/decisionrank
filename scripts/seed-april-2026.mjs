#!/usr/bin/env node
/**
 * Seed 3 new categories: Laptops, Coffee Makers, Smart Watches
 * April 2026 content expansion
 */
import { ConvexHttpClient } from "convex/browser";
import { randomUUID } from "crypto";

const now = new Date().toISOString();
const uuid = () => randomUUID();

// ─── Categories ───
const categories = [
  { id: uuid(), name: "Laptops", slug: "laptops", description: "The best laptops for work, gaming, and everyday use — ranked by performance, build quality, and value." },
  { id: uuid(), name: "Coffee Makers", slug: "coffee-makers", description: "Top-rated coffee makers and espresso machines for every brewing style and budget." },
  { id: uuid(), name: "Smart Watches", slug: "smart-watches", description: "The best smartwatches ranked by health tracking, battery life, and ecosystem integration." },
];

const catMap = Object.fromEntries(categories.map(c => [c.slug, c.id]));

// ─── Rankings ───
const rankings = [
  {
    id: uuid(), slug: "best-laptops", question: "What Are the Best Laptops in 2026?",
    description: "We tested and ranked the top laptops across performance, display quality, battery life, and portability. From ultrabooks to powerhouses, these are the laptops worth buying right now.",
    verdict_summary: "The MacBook Pro M5 retains its crown for creator workflows, but the ThinkPad X1 Carbon Gen 14 is the best all-around business laptop. Budget pick: the Framework Laptop 16 offers unmatched upgradeability under $1,200.",
    category_id: catMap["laptops"],
  },
  {
    id: uuid(), slug: "best-coffee-makers", question: "What Are the Best Coffee Makers in 2026?",
    description: "Our comprehensive ranking of the best coffee makers, covering drip machines, espresso makers, and single-serve brewers for every taste and budget.",
    verdict_summary: "The Breville Barista Express Impress is the best home espresso machine for most people, while the Technivorm Moccamaster produces the best drip coffee money can buy. For convenience, the Nespresso Vertuo Pop+ is hard to beat.",
    category_id: catMap["coffee-makers"],
  },
  {
    id: uuid(), slug: "best-smart-watches", question: "What Are the Best Smart Watches in 2026?",
    description: "We evaluated the top smartwatches on health tracking accuracy, battery life, app ecosystem, and design to find the best options for fitness enthusiasts and everyday wearers.",
    verdict_summary: "The Apple Watch Ultra 3 leads for iPhone users with its rugged build and health sensors, while the Samsung Galaxy Watch 7 Ultra is the Android king. For pure fitness tracking, the Garmin Fenix 8 Pro remains unbeatable.",
    category_id: catMap["smart-watches"],
  },
];

const rankMap = Object.fromEntries(rankings.map(r => [r.slug, r.id]));

// ─── Products ───
const products = [];
const rankingProducts = [];
const specifications = [];
const sentiments = [];

function addProduct(rankSlug, pos, score, name, link, specs, pros, cons) {
  const pid = uuid();
  products.push({ id: pid, name, link });
  const rpId = uuid();
  rankingProducts.push({
    id: rpId, ranking_id: rankMap[rankSlug], product_id: pid,
    score, rank_position: pos,
  });
  for (const [sName, sValue, sUnit] of specs) {
    specifications.push({ id: uuid(), product_id: pid, name: sName, value: sValue, unit: sUnit || undefined });
  }
  for (const pro of pros) {
    sentiments.push({ id: uuid(), ranking_product_id: rpId, type: "pro", content: pro, headline: pro.split(".")[0] });
  }
  for (const con of cons) {
    sentiments.push({ id: uuid(), ranking_product_id: rpId, type: "con", content: con, headline: con.split(".")[0] });
  }
}

// ─── Laptops ───
addProduct("best-laptops", 1, 9.5, "Apple MacBook Pro 16\" M5 Pro", "https://www.apple.com/macbook-pro/",
  [["Processor", "Apple M5 Pro", null], ["RAM", "24", "GB"], ["Storage", "512 GB", "SSD"], ["Display", "16.2\" Liquid Retina XDR", null], ["Battery Life", "22", "hours"], ["Weight", "2.14", "kg"]],
  ["Unmatched performance per watt — handles 8K video editing without breaking a sweat.", "Stunning mini-LED display with ProMotion 120Hz for buttery-smooth scrolling.", "All-day battery life that actually delivers on Apple's claims."],
  ["Starting price is steep at $2,499 for the base configuration.", "16 GB RAM on the entry model feels stingy in 2026.", "macOS-only limits flexibility for some professional workflows."]
);

addProduct("best-laptops", 2, 9.2, "Lenovo ThinkPad X1 Carbon Gen 14", "https://www.lenovo.com/us/en/laptops/thinkpad/thinkpad-x1/",
  [["Processor", "Intel Core Ultra 9 285H", null], ["RAM", "32", "GB"], ["Storage", "1 TB", "SSD"], ["Display", "14\" 2.8K OLED", null], ["Battery Life", "15", "hours"], ["Weight", "1.09", "kg"]],
  ["Best keyboard on any laptop — period. ThinkPad quality is unmatched.", "Incredibly light at just 1.09 kg without sacrificing port selection.", "OLED display option delivers stunning contrast and color accuracy."],
  ["Fan noise under sustained load is noticeable in quiet rooms.", "OLED panel adds significant cost over the IPS option.", "Webcam quality, while improved, still trails Apple's 1080p+ cameras."]
);

addProduct("best-laptops", 3, 9.0, "Framework Laptop 16", "https://frame.work/laptop-16",
  [["Processor", "AMD Ryzen 9 8945HS", null], ["RAM", "32", "GB"], ["Storage", "1 TB", "SSD"], ["Display", "16\" 2560×1600 165Hz", null], ["Battery Life", "10", "hours"], ["Weight", "2.1", "kg"]],
  ["Fully modular — swap ports, GPU, keyboard, even the display bezel.", "Right-to-repair champion: every component is user-replaceable.", "Strong community and open-source firmware ecosystem."],
  ["Battery life lags behind competitors significantly.", "Build quality feels slightly less premium than ThinkPad or MacBook.", "GPU module options are limited compared to dedicated gaming laptops."]
);

addProduct("best-laptops", 4, 8.7, "Dell XPS 16 (2026)", "https://www.dell.com/en-us/shop/laptops/xps-16/",
  [["Processor", "Intel Core Ultra 7 265H", null], ["RAM", "32", "GB"], ["Storage", "1 TB", "SSD"], ["Display", "16.3\" 4K OLED", null], ["Battery Life", "13", "hours"], ["Weight", "2.0", "kg"]],
  ["Gorgeous near-borderless 4K OLED display is a visual feast.", "Premium build quality with machined aluminum chassis.", "Excellent speaker system with quad speakers and Waves MaxxAudio."],
  ["Thermal throttling under sustained heavy workloads.", "Haptic touchpad is polarizing — some love it, others miss physical clicks.", "Limited port selection without the USB-C dongle."]
);

addProduct("best-laptops", 5, 8.4, "ASUS ROG Zephyrus G16 (2026)", "https://rog.asus.com/us/laptops/rog-zephyrus/rog-zephyrus-g16/",
  [["Processor", "Intel Core Ultra 9 285HX", null], ["RAM", "32", "GB"], ["Storage", "2 TB", "SSD"], ["Display", "16\" ROG Nebula OLED 240Hz", null], ["Battery Life", "10", "hours"], ["GPU", "NVIDIA RTX 5080", null]],
  ["Top-tier gaming performance in a surprisingly thin and light chassis.", "240Hz OLED display is the best gaming panel available in a laptop.", "Impressive cooling system keeps thermals in check during marathon sessions."],
  ["Expensive — gaming power comes at a premium.", "Battery life drops sharply during gaming (as expected).", "Fan noise at full load is significant despite good thermals."]
);

addProduct("best-laptops", 6, 8.0, "HP Spectre x360 16 (2026)", "https://www.hp.com/us-en/shop/spectre-x360-16.html",
  [["Processor", "Intel Core Ultra 7 265H", null], ["RAM", "16", "GB"], ["Storage", "512 GB", "SSD"], ["Display", "16\" 3K OLED Touch", null], ["Battery Life", "14", "hours"], ["Weight", "1.95", "kg"]],
  ["2-in-1 convertible design with excellent hinge and pen support.", "Stunning 3K OLED touchscreen works beautifully in tent and tablet mode.", "Premium gem-cut design stands out in any meeting room."],
  ["Base model ships with only 16 GB RAM.", "Heavier than pure clamshell competitors.", "Pen included but stylus performance trails Surface Pro and iPad."]
);

// ─── Coffee Makers ───
addProduct("best-coffee-makers", 1, 9.4, "Breville Barista Express Impress", "https://www.breville.com/barista-express-impress",
  [["Type", "Semi-Automatic Espresso", null], ["Grinder", "Built-in Conical Burr", null], ["Boiler", "ThermoJet", null], ["Water Tank", "67", "oz"], ["Pressure", "15", "bar"], ["Dimensions", "13.5 × 12.5 × 16", "inches"]],
  ["Assisted tamping takes the guesswork out of espresso for beginners.", "Built-in grinder with dose control delivers consistent shots.", "ThermoJet heats to extraction temperature in just 3 seconds."],
  ["Steep learning curve despite the 'Impress' assistance features.", "Cleaning and maintenance require dedicated time.", "Counter footprint is substantial for smaller kitchens."]
);

addProduct("best-coffee-makers", 2, 9.1, "Technivorm Moccamaster KBGV Select", "https://us.moccamaster.com/products/kbgv-select",
  [["Type", "Drip Coffee", null], ["Capacity", "40", "oz (10 cups)"], ["Brew Time", "4–6", "minutes"], ["Carafe", "Glass", null], ["Certification", "SCA Golden Cup", null], ["Made In", "Netherlands", null]],
  ["SCA-certified brewing produces coffee shops struggle to match.", "Handmade in the Netherlands with a 5-year warranty.", "Full pot brews in under 6 minutes — fastest drip machine tested."],
  ["No built-in grinder — you need a separate quality grinder.", "Premium price for what looks like a basic drip machine.", "No programmable timer or smart features."]
);

addProduct("best-coffee-makers", 3, 8.8, "Nespresso Vertuo Pop+", "https://www.nespresso.com/vertuo-pop-plus",
  [["Type", "Single-Serve Capsule", null], ["Brew Sizes", "5 (Espresso to Carafe)", null], ["Heat-up Time", "20", "seconds"], ["Water Tank", "20", "oz"], ["Dimensions", "5.6 × 16.5 × 12.6", "inches"], ["Capsule System", "Vertuo (barcode)", null]],
  ["Dead-simple operation — insert pod, press button, perfect coffee.", "Centrifusion barcode scanning optimizes every brew automatically.", "Compact footprint fits even the tiniest kitchen counters."],
  ["Locked into Nespresso's proprietary capsule ecosystem.", "Per-cup cost is significantly higher than beans or ground coffee.", "Environmental concerns around single-use aluminum capsules."]
);

addProduct("best-coffee-makers", 4, 8.5, "Fellow Aiden Precision Brewer", "https://fellowproducts.com/products/aiden-precision-brewer",
  [["Type", "Precision Drip", null], ["Capacity", "40", "oz"], ["Brew Profiles", "Customizable (App)", null], ["Water Tank", "Rear-fill", null], ["Certification", "SCA Golden Cup", null], ["Smart Features", "Wi-Fi, Fellow App", null]],
  ["App-controlled brew profiles let you dial in temperature, bloom, and pulse.", "Beautiful minimalist design with a small countertop footprint.", "Community brew profiles mean you can replicate café recipes at home."],
  ["Premium price point — more expensive than the Moccamaster.", "App dependency for advanced features can be frustrating.", "Glass carafe doesn't retain heat as long as thermal options."]
);

addProduct("best-coffee-makers", 5, 8.1, "Breville Precision Brewer Thermal", "https://www.breville.com/precision-brewer-thermal",
  [["Type", "Drip Coffee", null], ["Capacity", "60", "oz (12 cups)"], ["Brew Modes", "6 (Gold, Strong, Iced, Cold Brew, My Brew, Fast)", null], ["Carafe", "Thermal Stainless Steel", null], ["Certification", "SCA Golden Cup", null], ["Dimensions", "14.8 × 9.1 × 16.3", "inches"]],
  ["Six brew modes including cold brew and iced coffee — most versatile drip maker.", "Thermal carafe keeps coffee hot for hours without a hot plate.", "SCA-certified Gold Cup mode produces excellent balanced coffee."],
  ["Large footprint demands significant counter space.", "So many options can be overwhelming for simple coffee drinkers.", "Build quality feels slightly plasticky for the price."]
);

addProduct("best-coffee-makers", 6, 7.7, "AeroPress Clear", "https://aeropress.com/products/aeropress-clear",
  [["Type", "Manual Immersion/Pressure", null], ["Capacity", "10", "oz"], ["Brew Time", "1–2", "minutes"], ["Material", "Tritan Clear Plastic", null], ["Weight", "0.35", "kg"], ["Portability", "Excellent", null]],
  ["Incredibly versatile — espresso-style, Americano, cold brew, all from one device.", "Near-indestructible and perfectly portable for travel and camping.", "Clean, smooth cup with almost no grit or bitterness."],
  ["Manual process — not for people who want push-button coffee.", "Single cup only — impractical for households.", "Requires a separate kettle and grinder for best results."]
);

// ─── Smart Watches ───
addProduct("best-smart-watches", 1, 9.5, "Apple Watch Ultra 3", "https://www.apple.com/apple-watch-ultra-3/",
  [["Display", "49mm Always-On LTPO3 OLED", null], ["Battery Life", "72", "hours"], ["Water Resistance", "100", "meters"], ["Health Sensors", "ECG, SpO2, Temperature, Blood Pressure", null], ["GPS", "Dual-frequency L1+L5", null], ["OS", "watchOS 13", null]],
  ["Most comprehensive health sensor suite on any wearable — including blood pressure.", "72-hour battery life finally makes multi-day adventures practical.", "Brightest display of any smartwatch at 3,500 nits — readable in direct sun."],
  ["Only works with iPhone — no Android compatibility.", "Premium price at $849 puts it out of reach for casual users.", "Large 49mm case is too big for smaller wrists."]
);

addProduct("best-smart-watches", 2, 9.2, "Samsung Galaxy Watch 7 Ultra", "https://www.samsung.com/galaxy-watch7-ultra/",
  [["Display", "47mm Sapphire Crystal AMOLED", null], ["Battery Life", "60", "hours"], ["Water Resistance", "100", "meters (10 ATM)"], ["Health Sensors", "BioActive (ECG, BIA, SpO2, Temp)", null], ["GPS", "Dual-frequency", null], ["OS", "Wear OS 6 / One UI Watch 7", null]],
  ["Best smartwatch for Android users — deep Galaxy ecosystem integration.", "Titanium build with sapphire crystal is genuinely rugged.", "BioActive sensor provides body composition analysis unique to Samsung."],
  ["Battery life, while good, trails Apple Watch Ultra.", "Google Assistant and Bixby coexistence can be confusing.", "Some health features are Samsung phone-exclusive."]
);

addProduct("best-smart-watches", 3, 9.0, "Garmin Fenix 8 Pro Solar", "https://www.garmin.com/fenix-8-pro/",
  [["Display", "47mm AMOLED + Solar", null], ["Battery Life", "29 days (smartwatch) / 89 hrs GPS", null], ["Water Resistance", "100", "meters"], ["Health Sensors", "Elevate v5 (HR, SpO2, ECG)", null], ["GPS", "Multi-band GNSS", null], ["Maps", "Full Topo + Ski Maps", null]],
  ["Battery life measured in weeks, not days — solar charging extends it further.", "Full topographic maps and turn-by-turn navigation built in.", "Most advanced training metrics: Training Readiness, HRV Status, Stamina."],
  ["Wear OS app ecosystem is nonexistent — Garmin's IQ store is limited.", "Expensive and complex — overkill for casual fitness users.", "AMOLED display drains battery faster than traditional MIP."]
);

addProduct("best-smart-watches", 4, 8.6, "Google Pixel Watch 3 (45mm)", "https://store.google.com/product/pixel_watch_3",
  [["Display", "45mm AMOLED", null], ["Battery Life", "36", "hours"], ["Water Resistance", "50", "meters (5 ATM)"], ["Health Sensors", "cEDA, SpO2, HR, Skin Temp", null], ["GPS", "Multi-band", null], ["OS", "Wear OS 5", null]],
  ["Cleanest Wear OS experience with tight Fitbit health integration.", "Gorgeous domed display with excellent brightness and viewing angles.", "Best Google Assistant integration of any smartwatch."],
  ["36-hour battery is merely adequate — requires daily charging.", "Fitbit Premium required to unlock full health insights.", "Aluminum build is less durable than titanium competitors."]
);

addProduct("best-smart-watches", 5, 8.2, "Withings ScanWatch Nova", "https://www.withings.com/scanwatch-nova",
  [["Display", "42mm Hybrid (Analog + OLED)", null], ["Battery Life", "30", "days"], ["Water Resistance", "100", "meters"], ["Health Sensors", "ECG, SpO2, Temperature", null], ["GPS", "Connected (via phone)", null], ["Design", "Traditional Watch Aesthetic", null]],
  ["Looks like a premium analog watch — nobody will know it's a smartwatch.", "30-day battery life eliminates charging anxiety entirely.", "Medical-grade ECG and SpO2 sensors rival dedicated health watches."],
  ["Limited smart features — no app store, no reply to messages.", "Small OLED window limits notification readability.", "No built-in GPS — relies on phone for location tracking."]
);

addProduct("best-smart-watches", 6, 7.9, "Amazfit T-Rex 3", "https://www.amazfit.com/t-rex-3",
  [["Display", "47mm AMOLED", null], ["Battery Life", "24", "days"], ["Water Resistance", "100", "meters"], ["Health Sensors", "BioTracker 5.0 (HR, SpO2)", null], ["GPS", "Dual-band + 6 Satellite Systems", null], ["OS", "Zepp OS 4", null]],
  ["Exceptional battery life at a fraction of Garmin's price.", "Military-grade durability (MIL-STD-810H) for extreme conditions.", "Offline maps and route navigation included without subscription."],
  ["Zepp OS app ecosystem is very limited.", "Health tracking accuracy trails Apple, Samsung, and Garmin.", "Notification handling and phone interaction feels basic."]
);

// ─── FAQs ───
const faqs = [
  // Laptops
  { id: uuid(), ranking_id: rankMap["best-laptops"], question: "How much RAM do I need in a laptop in 2026?", answer: "16 GB is the minimum for comfortable everyday use and light productivity. For development, video editing, or running multiple apps, 32 GB is the sweet spot. Only specialized workloads (3D rendering, large datasets) justify 64 GB+.", display_order: 1 },
  { id: uuid(), ranking_id: rankMap["best-laptops"], question: "Is it worth buying a laptop with an OLED display?", answer: "Yes, if you value visual quality. OLED offers perfect blacks, vibrant colors, and excellent contrast that LCD/IPS can't match. The trade-offs are potential burn-in risk with static elements and slightly higher power consumption, but modern OLEDs have largely mitigated these issues.", display_order: 2 },
  { id: uuid(), ranking_id: rankMap["best-laptops"], question: "MacBook vs Windows laptop — which should I choose?", answer: "Choose MacBook if you're in the Apple ecosystem, prioritize battery life and build quality, or work in creative fields (video, music, design). Choose Windows if you need broader software compatibility, gaming support, more hardware variety, or prefer a specific form factor like 2-in-1s.", display_order: 3 },
  // Coffee Makers
  { id: uuid(), ranking_id: rankMap["best-coffee-makers"], question: "What's the difference between drip and espresso coffee makers?", answer: "Drip coffee makers use gravity to pass hot water through grounds, producing a lighter-bodied coffee. Espresso machines force pressurized water (9+ bar) through finely-ground coffee, creating a concentrated, full-bodied shot with crema. Drip is simpler and makes more coffee; espresso offers more drink variety but requires more skill.", display_order: 1 },
  { id: uuid(), ranking_id: rankMap["best-coffee-makers"], question: "Is SCA Golden Cup certification worth paying for?", answer: "Yes. SCA (Specialty Coffee Association) certification means the brewer consistently reaches optimal water temperature (92–96°C) and contact time for balanced extraction. Certified brewers reliably produce better-tasting coffee than non-certified ones. It's especially valuable for drip machines.", display_order: 2 },
  { id: uuid(), ranking_id: rankMap["best-coffee-makers"], question: "How much should I spend on a coffee maker?", answer: "For basic drip: $30–80 will get a solid machine. For quality drip (SCA-certified): $150–350. For entry-level espresso: $300–700. For serious home espresso: $700–1,500+. The grinder matters as much as the machine — budget at least $100–200 for a quality burr grinder alongside any brewer.", display_order: 3 },
  // Smart Watches
  { id: uuid(), ranking_id: rankMap["best-smart-watches"], question: "Can smartwatches accurately detect health problems?", answer: "Smartwatches can detect irregular heart rhythms (AFib) and blood oxygen drops with reasonable accuracy, and some are FDA-cleared for ECG. However, they're screening tools, not diagnostic devices. Always consult a doctor for health concerns — a smartwatch alert should prompt a professional evaluation, not replace one.", display_order: 1 },
  { id: uuid(), ranking_id: rankMap["best-smart-watches"], question: "Do I need a smartwatch if I already have a fitness tracker?", answer: "It depends on what you want. Smartwatches add notifications, apps, payments, and voice assistants. If you only care about step counting and sleep tracking, a fitness tracker is fine and usually cheaper. If you want a wrist computer that also tracks health, a smartwatch is the better investment.", display_order: 2 },
  { id: uuid(), ranking_id: rankMap["best-smart-watches"], question: "How important is battery life in a smartwatch?", answer: "Very — it determines how you use the watch. Daily charging (Apple Watch, Pixel Watch) means removing it at night, limiting sleep tracking. Multi-day batteries (Samsung, Garmin) enable continuous wear. If sleep and recovery tracking matter to you, prioritize watches with 3+ day battery life.", display_order: 3 },
];

// ─── Build snapshot payload ───
const snapshot = {
  categories: categories.map(c => ({ ...c, created_at: now, updated_at: now })),
  rankings: rankings.map(r => ({ ...r, created_at: now, updated_at: now })),
  products: products.map(p => ({ ...p, created_at: now, updated_at: now })),
  ranking_products: rankingProducts.map(rp => ({ ...rp, created_at: now, updated_at: now })),
  users: [],
  sentiments: sentiments.map(s => ({ ...s, created_at: now, updated_at: now })),
  specifications: specifications.map(s => ({ ...s, created_at: now, updated_at: now })),
  assets: [],
  faqs: faqs.map(f => ({ ...f, created_at: now, updated_at: now })),
};

// ─── Import via HTTP client ───
const CONVEX_URL = process.env.CONVEX_URL || process.env.NEXT_PUBLIC_CONVEX_URL || "https://wooden-trout-116.eu-west-1.convex.cloud";
const client = new ConvexHttpClient(CONVEX_URL);

console.log("Importing to", CONVEX_URL, "...");
console.log(`  Categories: ${snapshot.categories.length}, Rankings: ${snapshot.rankings.length}`);
console.log(`  Products: ${snapshot.products.length}, RankingProducts: ${snapshot.ranking_products.length}`);
console.log(`  Sentiments: ${snapshot.sentiments.length}, Specs: ${snapshot.specifications.length}, FAQs: ${snapshot.faqs.length}`);

try {
  const result = await client.mutation("imports:importSnapshot", snapshot);
  console.log("\n✅ Import successful:", JSON.stringify(result, null, 2));
} catch (err) {
  console.error("❌ Import failed:", err.message || err);
  process.exit(1);
}
