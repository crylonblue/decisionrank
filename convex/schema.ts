import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  categories: defineTable({
    supabaseId: v.string(),
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    createdAt: v.string(),
    updatedAt: v.string(),
  })
    .index("by_supabase_id", ["supabaseId"])
    .index("by_slug", ["slug"]),

  rankings: defineTable({
    supabaseId: v.string(),
    slug: v.string(),
    question: v.string(),
    description: v.optional(v.string()),
    verdictSummary: v.optional(v.string()),
    categoryId: v.id("categories"),
    createdAt: v.string(),
    updatedAt: v.string(),
  })
    .index("by_supabase_id", ["supabaseId"])
    .index("by_slug", ["slug"])
    .index("by_category", ["categoryId"]),

  products: defineTable({
    supabaseId: v.string(),
    name: v.string(),
    link: v.optional(v.string()),
    createdAt: v.string(),
    updatedAt: v.string(),
  }).index("by_supabase_id", ["supabaseId"]),

  rankingProducts: defineTable({
    supabaseId: v.string(),
    rankingId: v.id("rankings"),
    productId: v.id("products"),
    score: v.number(),
    rankPosition: v.number(),
    createdAt: v.string(),
    updatedAt: v.string(),
  })
    .index("by_supabase_id", ["supabaseId"])
    .index("by_ranking", ["rankingId"])
    .index("by_product", ["productId"]),

  specifications: defineTable({
    supabaseId: v.string(),
    productId: v.id("products"),
    name: v.string(),
    value: v.string(),
    unit: v.optional(v.string()),
    createdAt: v.string(),
    updatedAt: v.string(),
  })
    .index("by_supabase_id", ["supabaseId"])
    .index("by_product", ["productId"]),

  users: defineTable({
    supabaseId: v.string(),
    name: v.string(),
    profilePictureUrl: v.optional(v.string()),
    createdAt: v.string(),
    updatedAt: v.string(),
  }).index("by_supabase_id", ["supabaseId"]),

  sentiments: defineTable({
    supabaseId: v.string(),
    rankingProductId: v.id("rankingProducts"),
    userId: v.optional(v.id("users")),
    type: v.union(v.literal("pro"), v.literal("con"), v.literal("comment")),
    content: v.string(),
    headline: v.optional(v.string()),
    description: v.optional(v.string()),
    createdAt: v.string(),
    updatedAt: v.string(),
  })
    .index("by_supabase_id", ["supabaseId"])
    .index("by_ranking_product", ["rankingProductId"]),

  assets: defineTable({
    supabaseId: v.string(),
    productId: v.id("products"),
    type: v.union(v.literal("image"), v.literal("youtube")),
    url: v.string(),
    displayOrder: v.number(),
    createdAt: v.string(),
    updatedAt: v.string(),
  })
    .index("by_supabase_id", ["supabaseId"])
    .index("by_product", ["productId"]),

  faqs: defineTable({
    supabaseId: v.string(),
    rankingId: v.id("rankings"),
    question: v.string(),
    answer: v.string(),
    displayOrder: v.number(),
    createdAt: v.string(),
    updatedAt: v.string(),
  })
    .index("by_supabase_id", ["supabaseId"])
    .index("by_ranking", ["rankingId"]),
});
