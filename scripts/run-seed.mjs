#!/usr/bin/env node
/**
 * Seed 3 new categories: Standing Desks, Wireless Earbuds, Air Purifiers
 * 
 * Usage:
 *   1. Make sure you're logged into Convex: npx convex login
 *   2. Run: node scripts/seed-new-categories.mjs  (generates .seed-payload.json)
 *   3. Run: npx convex run imports:importSnapshot "$(cat scripts/.seed-payload.json)"
 * 
 * Or use the HTTP client approach (set CONVEX_URL):
 *   CONVEX_URL=https://your-deployment.convex.cloud node scripts/run-seed.mjs
 */
import { ConvexHttpClient } from "convex/browser";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const payload = JSON.parse(readFileSync(join(__dirname, ".seed-payload.json"), "utf-8"));

const CONVEX_URL = process.env.CONVEX_URL || process.env.NEXT_PUBLIC_CONVEX_URL;
if (!CONVEX_URL) {
  console.error("Set CONVEX_URL or NEXT_PUBLIC_CONVEX_URL env var");
  process.exit(1);
}

const client = new ConvexHttpClient(CONVEX_URL);

console.log("Importing to", CONVEX_URL, "...");
console.log(`  Categories: ${payload.categories.length}, Rankings: ${payload.rankings.length}`);
console.log(`  Products: ${payload.products.length}, RankingProducts: ${payload.ranking_products.length}`);
console.log(`  Sentiments: ${payload.sentiments.length}, Specs: ${payload.specifications.length}, FAQs: ${payload.faqs.length}`);

try {
  const result = await client.mutation("imports:importSnapshot", payload);
  console.log("\n✅ Import successful:", JSON.stringify(result, null, 2));
} catch (err) {
  console.error("❌ Import failed:", err.message || err);
  process.exit(1);
}
