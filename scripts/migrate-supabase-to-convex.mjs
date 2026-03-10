import { createClient } from "@supabase/supabase-js";
import { ConvexHttpClient } from "convex/browser";

const required = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "NEXT_PUBLIC_CONVEX_URL",
];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing env var: ${key}`);
  }
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

async function fetchTable(name) {
  const { data, error } = await supabase.from(name).select("*");
  if (error) throw error;
  return data || [];
}

const nil = (v) => (v === null ? undefined : v);

const snapshot = {
  categories: (await fetchTable("categories")).map((r) => ({ ...r, description: nil(r.description) })),
  rankings: (await fetchTable("rankings")).map((r) => ({
    ...r,
    description: nil(r.description),
    verdict_summary: nil(r.verdict_summary),
  })),
  products: (await fetchTable("products")).map((r) => ({ ...r, link: nil(r.link) })),
  ranking_products: await fetchTable("ranking_products"),
  users: (await fetchTable("users")).map((r) => ({ ...r, profile_picture_url: nil(r.profile_picture_url) })),
  sentiments: (await fetchTable("sentiments")).map((r) => ({
    ...r,
    user_id: nil(r.user_id),
    headline: nil(r.headline),
    description: nil(r.description),
  })),
  specifications: (await fetchTable("specifications")).map((r) => ({ ...r, unit: nil(r.unit) })),
  assets: await fetchTable("assets"),
  faqs: await fetchTable("faqs"),
};

console.log("Fetched snapshot:", Object.fromEntries(Object.entries(snapshot).map(([k, v]) => [k, v.length])));

await convex.mutation("imports:resetAll", {});
const res = await convex.mutation("imports:importSnapshot", snapshot);

console.log("Imported:", res);
