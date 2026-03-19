#!/usr/bin/env node
/**
 * Seed script: Standing Desks, Wireless Earbuds, Air Purifiers
 * Uses the importSnapshot mutation via `npx convex run`
 */
import { execSync } from "child_process";
import { randomUUID } from "crypto";

const now = new Date().toISOString();
const uuid = () => randomUUID();

// ─── Categories ───
const categories = [
  { id: uuid(), name: "Standing Desks", slug: "standing-desks", description: "Top-rated standing desks and sit-stand converters for a healthier workspace." },
  { id: uuid(), name: "Wireless Earbuds", slug: "wireless-earbuds", description: "The best wireless earbuds ranked by sound quality, comfort, and features." },
  { id: uuid(), name: "Air Purifiers", slug: "air-purifiers", description: "High-performance air purifiers for cleaner, healthier indoor air." },
];

const catMap = Object.fromEntries(categories.map(c => [c.slug, c.id]));

// ─── Rankings (one per category) ───
const rankings = [
  {
    id: uuid(), slug: "best-standing-desks", question: "What Are the Best Standing Desks in 2026?",
    description: "We tested and ranked the top standing desks based on build quality, adjustability, motor speed, and value. Whether you work from home or in an office, these are the desks worth your money.",
    verdict_summary: "The Uplift V2 takes the top spot with its rock-solid build and fast motor, but the FlexiSpot E7 Pro offers nearly identical performance at a lower price. For compact spaces, the Fully Jarvis Bamboo is hard to beat.",
    category_id: catMap["standing-desks"],
  },
  {
    id: uuid(), slug: "best-wireless-earbuds", question: "What Are the Best Wireless Earbuds in 2026?",
    description: "Our comprehensive ranking of the best wireless earbuds, covering sound quality, noise cancellation, battery life, and comfort for every budget and use case.",
    verdict_summary: "The Sony WF-1000XM6 leads with class-best ANC and sound, while the AirPods Pro 3 dominate the Apple ecosystem. Budget pick: the Samsung Galaxy Buds FE deliver remarkable quality under $100.",
    category_id: catMap["wireless-earbuds"],
  },
  {
    id: uuid(), slug: "best-air-purifiers", question: "What Are the Best Air Purifiers in 2026?",
    description: "We evaluated air purifiers on CADR, filtration efficiency, noise levels, and smart features to find the best options for bedrooms, living rooms, and large spaces.",
    verdict_summary: "The Coway Airmega 250 dominates mid-size rooms with whisper-quiet operation, while the Dyson Purifier Big Quiet handles large spaces with style. For budget-conscious buyers, the Levoit Core 300S punches well above its price.",
    category_id: catMap["air-purifiers"],
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
  rankingProducts.push({
    id: uuid(), ranking_id: rankMap[rankSlug], product_id: pid,
    score, rank_position: pos,
  });
  for (const [sName, sValue, sUnit] of specs) {
    specifications.push({ id: uuid(), product_id: pid, name: sName, value: sValue, unit: sUnit || undefined });
  }
  const rpId = rankingProducts[rankingProducts.length - 1].id;
  for (const pro of pros) {
    sentiments.push({ id: uuid(), ranking_product_id: rpId, type: "pro", content: pro, headline: pro.split(".")[0] });
  }
  for (const con of cons) {
    sentiments.push({ id: uuid(), ranking_product_id: rpId, type: "con", content: con, headline: con.split(".")[0] });
  }
}

// ─── Standing Desks Products ───
addProduct("best-standing-desks", 1, 9.4, "Uplift V2 Standing Desk", "https://www.upliftdesk.com/uplift-v2-standing-desk/",
  [["Height Range", "25.3–50.9", "inches"], ["Motor Speed", "1.5", "inches/sec"], ["Weight Capacity", "355", "lbs"], ["Noise Level", "< 40", "dB"], ["Warranty", "15", "years"]],
  ["Industry-leading stability at max height with no wobble.", "Fast, quiet dual-motor system raises the desk in seconds.", "Massive range of desktop sizes and finishes."],
  ["Premium configurations get expensive quickly.", "Desktop edges can be sharp on some finishes."]
);

addProduct("best-standing-desks", 2, 9.1, "FlexiSpot E7 Pro", "https://www.flexispot.com/e7-pro-standing-desk",
  [["Height Range", "24.0–50.0", "inches"], ["Motor Speed", "1.4", "inches/sec"], ["Weight Capacity", "310", "lbs"], ["Noise Level", "< 42", "dB"], ["Warranty", "10", "years"]],
  ["Excellent value—comparable performance to desks costing $200+ more.", "Sturdy steel frame with anti-collision sensor.", "Three programmable memory presets included."],
  ["Cable management tray sold separately.", "Assembly instructions could be clearer."]
);

addProduct("best-standing-desks", 3, 8.8, "Fully Jarvis Bamboo", "https://www.fully.com/standing-desks/jarvis-bamboo.html",
  [["Height Range", "25.5–51.1", "inches"], ["Motor Speed", "1.3", "inches/sec"], ["Weight Capacity", "350", "lbs"], ["Desktop Material", "Bamboo", null], ["Warranty", "15", "years"]],
  ["Sustainable bamboo desktop is gorgeous and durable.", "Very compact footprint—great for smaller home offices.", "Smooth, reliable Jarvis motor system."],
  ["Bamboo surface can dent under heavy impacts.", "Limited color/finish options compared to competitors."]
);

addProduct("best-standing-desks", 4, 8.5, "Secretlab MAGNUS Pro", "https://secretlab.co/pages/magnus-pro",
  [["Height Range", "27.5–49.2", "inches"], ["Motor Speed", "1.5", "inches/sec"], ["Weight Capacity", "265", "lbs"], ["Cable Management", "Built-in tray", null], ["Warranty", "5", "years"]],
  ["Best-in-class integrated cable management system.", "Premium metal desktop with magnetic accessories.", "Sleek gaming/productivity hybrid aesthetic."],
  ["Heavier than most desks—difficult to move once set up.", "Lower weight capacity than top picks.", "Premium price for the brand name."]
);

addProduct("best-standing-desks", 5, 8.2, "Branch Standing Desk", "https://www.branchfurniture.com/products/standing-desk",
  [["Height Range", "25.5–52.0", "inches"], ["Motor Speed", "1.2", "inches/sec"], ["Weight Capacity", "275", "lbs"], ["Noise Level", "< 45", "dB"], ["Warranty", "12", "years"]],
  ["Clean, minimal design fits any office aesthetic.", "Solid build quality for the mid-range price.", "Good customer support and easy returns."],
  ["Motor is slightly slower and louder than top picks.", "Limited desktop size options."]
);

addProduct("best-standing-desks", 6, 7.8, "IKEA BEKANT", "https://www.ikea.com/us/en/p/bekant-desk-sit-stand-white-s19022530/",
  [["Height Range", "22.0–48.0", "inches"], ["Motor Speed", "1.0", "inches/sec"], ["Weight Capacity", "154", "lbs"], ["Desktop Size", "63×31.5", "inches"], ["Warranty", "10", "years"]],
  ["Most affordable motorized standing desk from a major brand.", "Available at IKEA stores for same-day pickup.", "Generous desktop surface area."],
  ["Noticeable wobble at standing height.", "No memory presets—single up/down toggle only.", "Lower weight capacity limits monitor arm setups."]
);

// ─── Wireless Earbuds Products ───
addProduct("best-wireless-earbuds", 1, 9.5, "Sony WF-1000XM6", "https://www.sony.com/en/headphones/wf-1000xm6",
  [["Driver Size", "8.4", "mm"], ["ANC", "Yes (Adaptive)", null], ["Battery Life", "8 + 16", "hours"], ["Water Resistance", "IPX4", null], ["Codec Support", "LDAC, AAC, SBC", null]],
  ["Best-in-class noise cancellation silences even loud environments.", "Audiophile-grade sound with rich bass and crisp highs.", "Smaller, more comfortable design than the XM5."],
  ["Premium price—not for casual listeners.", "Touch controls can be finicky with wet fingers."]
);

addProduct("best-wireless-earbuds", 2, 9.2, "Apple AirPods Pro 3", "https://www.apple.com/airpods-pro/",
  [["Driver Size", "Custom Apple H3", null], ["ANC", "Yes (Adaptive Transparency)", null], ["Battery Life", "7.5 + 30", "hours"], ["Water Resistance", "IP54", null], ["Codec Support", "AAC", null]],
  ["Seamless integration across all Apple devices.", "Adaptive transparency mode is natural and responsive.", "USB-C case with built-in speaker for Find My."],
  ["Sound quality slightly behind Sony for critical listening.", "Limited codec support—no LDAC for Android users.", "Only available in one color."]
);

addProduct("best-wireless-earbuds", 3, 8.9, "Sennheiser Momentum True Wireless 4", "https://www.sennheiser.com/momentum-true-wireless-4",
  [["Driver Size", "7", "mm"], ["ANC", "Yes (Adaptive)", null], ["Battery Life", "7.5 + 24", "hours"], ["Water Resistance", "IP54", null], ["Codec Support", "aptX, AAC, SBC, LC3", null]],
  ["Warm, detailed sound signature loved by audiophiles.", "Premium build with real fabric and metal accents.", "Wide codec support including aptX and LC3."],
  ["Bulkier fit may not suit smaller ears.", "ANC is good but not quite Sony-level."]
);

addProduct("best-wireless-earbuds", 4, 8.5, "Samsung Galaxy Buds3 Pro", "https://www.samsung.com/galaxy-buds3-pro/",
  [["Driver Size", "10.5", "mm"], ["ANC", "Yes (Intelligent)", null], ["Battery Life", "7 + 26", "hours"], ["Water Resistance", "IP57", null], ["Codec Support", "Samsung Scalable, AAC, SBC", null]],
  ["New blade design is comfortable and lightweight.", "Strong ANC performance, especially for the price.", "Best Galaxy ecosystem integration with 360 Audio."],
  ["Samsung Scalable codec only works with Galaxy devices.", "Case is slippery and easy to drop."]
);

addProduct("best-wireless-earbuds", 5, 8.1, "Nothing Ear (3)", "https://nothing.tech/products/ear-3",
  [["Driver Size", "11", "mm"], ["ANC", "Yes", null], ["Battery Life", "6.5 + 28", "hours"], ["Water Resistance", "IP54", null], ["Codec Support", "LDAC, AAC, SBC", null]],
  ["Transparent design stands out in a sea of black earbuds.", "LDAC support and solid sound quality for the price.", "ChatGPT voice integration is genuinely useful."],
  ["ANC is adequate but not class-leading.", "Stem design isn't as comfortable for all ear shapes."]
);

addProduct("best-wireless-earbuds", 6, 7.6, "Samsung Galaxy Buds FE", "https://www.samsung.com/galaxy-buds-fe/",
  [["Driver Size", "6.5", "mm"], ["ANC", "Yes", null], ["Battery Life", "6 + 21", "hours"], ["Water Resistance", "IPX2", null], ["Codec Support", "Samsung Scalable, AAC, SBC", null]],
  ["Outstanding value—premium features under $100.", "Comfortable wingtip design stays secure during workouts.", "ANC performance punches above its price class."],
  ["Lower water resistance than competitors.", "Sound quality gap is noticeable vs. flagship buds.", "Case feels plasticky."]
);

// ─── Air Purifiers Products ───
addProduct("best-air-purifiers", 1, 9.3, "Coway Airmega 250", "https://www.cowaymega.com/products/airmega-250",
  [["CADR (Smoke)", "246", "cfm"], ["Room Coverage", "930", "sq ft"], ["Filter Type", "True HEPA + Activated Carbon", null], ["Noise Level", "22–49", "dB"], ["Smart Features", "Wi-Fi, Air Quality Indicator", null]],
  ["Whisper-quiet operation—barely audible on low settings.", "Excellent filtration captures 99.97% of particles down to 0.3 microns.", "Real-time air quality indicator with color ring."],
  ["Replacement filters are moderately expensive.", "Design is functional but not particularly stylish."]
);

addProduct("best-air-purifiers", 2, 9.0, "Dyson Purifier Big Quiet Formaldehyde", "https://www.dyson.com/air-treatment/purifiers/big-quiet-formaldehyde",
  [["CADR (Smoke)", "330", "cfm"], ["Room Coverage", "1,076", "sq ft"], ["Filter Type", "HEPA H13 + Catalytic Oxidation", null], ["Noise Level", "19–56", "dB"], ["Smart Features", "Wi-Fi, Dyson App, Alexa/Siri", null]],
  ["Covers very large rooms with powerful airflow.", "Catalytic formaldehyde destruction is genuinely innovative.", "Sleek design doubles as a statement piece."],
  ["By far the most expensive option on this list.", "Large footprint takes up significant floor space."]
);

addProduct("best-air-purifiers", 3, 8.7, "Blueair Blue Pure 311i+ Max", "https://www.blueair.com/us/blue-pure-311i-max",
  [["CADR (Smoke)", "248", "cfm"], ["Room Coverage", "929", "sq ft"], ["Filter Type", "HEPASilent + Carbon", null], ["Noise Level", "23–53", "dB"], ["Smart Features", "Wi-Fi, Blueair App", null]],
  ["Colorful fabric pre-filter adds personality to any room.", "HEPASilent technology is effective and energy-efficient.", "Simple one-button physical controls."],
  ["Fabric pre-filter needs washing regularly.", "App is functional but basic compared to Dyson."]
);

addProduct("best-air-purifiers", 4, 8.4, "Levoit Core 300S", "https://www.levoit.com/products/core-300s-smart-true-hepa-air-purifier",
  [["CADR (Smoke)", "141", "cfm"], ["Room Coverage", "547", "sq ft"], ["Filter Type", "True HEPA H13", null], ["Noise Level", "24–48", "dB"], ["Smart Features", "Wi-Fi, VeSync App, Alexa/Google", null]],
  ["Best budget smart air purifier—under $150 with Wi-Fi.", "Compact design fits on desks and nightstands.", "VeSync app scheduling and automation work reliably."],
  ["Lower CADR—not ideal for large open spaces.", "No built-in air quality sensor (relies on app)."]
);

addProduct("best-air-purifiers", 5, 8.0, "Winix 5500-2", "https://www.winixamerica.com/product/5500-2/",
  [["CADR (Smoke)", "243", "cfm"], ["Room Coverage", "360", "sq ft"], ["Filter Type", "True HEPA + PlasmaWave", null], ["Noise Level", "27–56", "dB"], ["Smart Features", "Auto Mode, Light Sensor", null]],
  ["PlasmaWave technology provides additional air cleaning without ozone.", "Excellent CADR for its price range.", "Auto mode with smart sensor adjusts fan speed automatically."],
  ["No Wi-Fi or app control.", "Design looks dated compared to modern competitors.", "Slightly louder on high settings."]
);

addProduct("best-air-purifiers", 6, 7.5, "Molekule Air Mini+", "https://molekule.com/air-mini-plus",
  [["CADR (Smoke)", "68", "cfm"], ["Room Coverage", "250", "sq ft"], ["Filter Type", "PECO + HEPA", null], ["Noise Level", "30–58", "dB"], ["Smart Features", "Wi-Fi, Molekule App", null]],
  ["PECO technology claims to destroy pollutants, not just capture them.", "Sleek, compact cylindrical design.", "App provides air quality data and filter tracking."],
  ["Significantly lower CADR than competitors at this price.", "Replacement filters are very expensive.", "Effectiveness of PECO claims debated by independent reviewers."]
);

// ─── FAQs ───
const faqs = [
  // Standing Desks
  { id: uuid(), ranking_id: rankMap["best-standing-desks"], question: "How long should I stand at a standing desk each day?", answer: "Most ergonomics experts recommend alternating between sitting and standing every 30–60 minutes. Aim for 2–4 hours of standing total per day and gradually build up. The key is movement, not standing all day.", display_order: 1 },
  { id: uuid(), ranking_id: rankMap["best-standing-desks"], question: "Do standing desks really improve health?", answer: "Research shows standing desks can reduce back pain, improve energy levels, and slightly increase calorie burn. However, they're most effective as part of an active routine that includes regular movement and proper ergonomics.", display_order: 2 },
  { id: uuid(), ranking_id: rankMap["best-standing-desks"], question: "What's the ideal height for a standing desk?", answer: "Your elbows should be at roughly 90 degrees when typing. For most people, this means the desk surface should be at elbow height. Use a desk height calculator or adjust until your wrists are straight and shoulders relaxed.", display_order: 3 },
  // Wireless Earbuds
  { id: uuid(), ranking_id: rankMap["best-wireless-earbuds"], question: "Do wireless earbuds sound as good as wired?", answer: "Modern flagship wireless earbuds with LDAC or aptX codecs have closed the gap significantly. For critical listening, wired still has a slight edge, but for everyday use the difference is imperceptible to most listeners.", display_order: 1 },
  { id: uuid(), ranking_id: rankMap["best-wireless-earbuds"], question: "How important is ANC in wireless earbuds?", answer: "Active noise cancellation is a game-changer for commuting, flying, and open offices. However, if you primarily use earbuds at home or in quiet environments, you may not need premium ANC—transparency mode is often more useful day-to-day.", display_order: 2 },
  { id: uuid(), ranking_id: rankMap["best-wireless-earbuds"], question: "Can I use wireless earbuds for working out?", answer: "Yes, but check the IP rating. IPX4 handles sweat, while IP55+ is better for rain or intense workouts. Also consider fit—wing tips or ear hooks provide more security during movement than standard tips.", display_order: 3 },
  // Air Purifiers
  { id: uuid(), ranking_id: rankMap["best-air-purifiers"], question: "What does CADR mean and why does it matter?", answer: "CADR (Clean Air Delivery Rate) measures how quickly a purifier filters smoke, dust, and pollen from the air, in cubic feet per minute. Higher CADR = faster air cleaning. Match the CADR to your room size for optimal performance.", display_order: 1 },
  { id: uuid(), ranking_id: rankMap["best-air-purifiers"], question: "How often should I replace air purifier filters?", answer: "Most HEPA filters last 6–12 months with regular use. Carbon/activated charcoal filters may need replacing every 3–6 months. Check your purifier's indicator or app for filter life tracking—running with old filters reduces effectiveness significantly.", display_order: 2 },
  { id: uuid(), ranking_id: rankMap["best-air-purifiers"], question: "Do air purifiers help with allergies?", answer: "Yes, HEPA-rated purifiers capture 99.97% of particles like pollen, dust mites, and pet dander. They're one of the most effective tools for allergy sufferers. For best results, run the purifier continuously in the room where you spend the most time.", display_order: 3 },
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

// Write to temp file for convex run
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const tmpFile = join(__dirname, ".seed-payload.json");
writeFileSync(tmpFile, JSON.stringify(snapshot, null, 2));

console.log("Seed payload written to", tmpFile);
console.log(`Categories: ${snapshot.categories.length}`);
console.log(`Rankings: ${snapshot.rankings.length}`);
console.log(`Products: ${snapshot.products.length}`);
console.log(`Ranking Products: ${snapshot.ranking_products.length}`);
console.log(`Sentiments: ${snapshot.sentiments.length}`);
console.log(`Specifications: ${snapshot.specifications.length}`);
console.log(`FAQs: ${snapshot.faqs.length}`);

// Run the mutation via convex CLI
try {
  const result = execSync(
    `npx convex run imports:importSnapshot < "${tmpFile}"`,
    { cwd: join(__dirname, ".."), stdio: ["pipe", "pipe", "pipe"], timeout: 30000 }
  );
  console.log("\n✅ Import result:", result.toString());
} catch (err) {
  // convex run may need args differently - try with --args flag
  console.log("Trying with --args flag...");
  const payload = JSON.stringify(snapshot);
  try {
    const result = execSync(
      `npx convex run imports:importSnapshot --args '${payload}'`,
      { cwd: join(__dirname, ".."), stdio: ["pipe", "pipe", "pipe"], timeout: 30000, maxBuffer: 10 * 1024 * 1024 }
    );
    console.log("\n✅ Import result:", result.toString());
  } catch (err2) {
    console.error("❌ Import failed:", err2.stderr?.toString() || err2.message);
    console.log("\nPayload saved to", tmpFile, "— run manually with:");
    console.log(`cd ${join(__dirname, "..")} && npx convex run imports:importSnapshot < scripts/.seed-payload.json`);
    process.exit(1);
  }
}
