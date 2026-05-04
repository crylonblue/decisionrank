#!/usr/bin/env node
/**
 * Import the canonical DecisionRank seed snapshot from scripts/.seed-payload.json.
 *
 * Canonical source of truth for seed content now lives in:
 *   - scripts/.seed-payload.json
 *   - lib/category-enhancements.ts
 *   - lib/category-use-cases.ts
 *
 * This script only imports the existing payload. It does not generate or merge category data.
 *
 * Usage:
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
