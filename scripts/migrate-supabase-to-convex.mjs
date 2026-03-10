import { createClient } from "@supabase/supabase-js";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";

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

const snapshot = {
  categories: await fetchTable("categories"),
  rankings: await fetchTable("rankings"),
  products: await fetchTable("products"),
  ranking_products: await fetchTable("ranking_products"),
  users: await fetchTable("users"),
  sentiments: await fetchTable("sentiments"),
  specifications: await fetchTable("specifications"),
  assets: await fetchTable("assets"),
  faqs: await fetchTable("faqs"),
};

console.log("Fetched snapshot:", Object.fromEntries(Object.entries(snapshot).map(([k, v]) => [k, v.length])));

await convex.mutation(api.imports.resetAll, {});
const res = await convex.mutation(api.imports.importSnapshot, snapshot);

console.log("Imported:", res);
