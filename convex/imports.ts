// @ts-nocheck
import { mutation } from "./_generated/server";
import { v } from "convex/values";

const rowBase = {
  id: v.string(),
  created_at: v.optional(v.string()),
  updated_at: v.optional(v.string()),
};

export const resetAll = mutation({
  args: {},
  handler: async (ctx) => {
    const tables: Array<
      "faqs" | "sentiments" | "specifications" | "assets" | "rankingProducts" | "rankings" | "products" | "users" | "categories"
    > = [
      "faqs",
      "sentiments",
      "specifications",
      "assets",
      "rankingProducts",
      "rankings",
      "products",
      "users",
      "categories",
    ];

    for (const table of tables) {
      const docs = await ctx.db.query(table).collect();
      for (const doc of docs) {
        await ctx.db.delete(doc._id);
      }
    }
  },
});

export const importSnapshot = mutation({
  args: {
    categories: v.array(v.object({ ...rowBase, name: v.string(), slug: v.string(), description: v.optional(v.string()) })),
    rankings: v.array(v.object({ ...rowBase, slug: v.string(), question: v.string(), description: v.optional(v.string()), verdict_summary: v.optional(v.string()), category_id: v.string() })),
    products: v.array(v.object({ ...rowBase, name: v.string(), link: v.optional(v.string()) })),
    ranking_products: v.array(v.object({ ...rowBase, ranking_id: v.string(), product_id: v.string(), score: v.number(), rank_position: v.number() })),
    users: v.array(v.object({ ...rowBase, name: v.string(), profile_picture_url: v.optional(v.string()) })),
    sentiments: v.array(v.object({ ...rowBase, ranking_product_id: v.string(), user_id: v.optional(v.string()), type: v.union(v.literal("pro"), v.literal("con"), v.literal("comment")), content: v.string(), headline: v.optional(v.string()), description: v.optional(v.string()) })),
    specifications: v.array(v.object({ ...rowBase, product_id: v.string(), name: v.string(), value: v.string(), unit: v.optional(v.string()) })),
    assets: v.array(v.object({ ...rowBase, product_id: v.string(), type: v.union(v.literal("image"), v.literal("youtube")), url: v.string(), display_order: v.number() })),
    faqs: v.array(v.object({ ...rowBase, ranking_id: v.string(), question: v.string(), answer: v.string(), display_order: v.number() })),
  },
  handler: async (ctx, args) => {
    const categoryIdMap = new Map<string, any>();
    const rankingIdMap = new Map<string, any>();
    const productIdMap = new Map<string, any>();
    const rankingProductIdMap = new Map<string, any>();
    const userIdMap = new Map<string, any>();

    for (const c of args.categories) {
      const _id = await ctx.db.insert("categories", {
        supabaseId: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description,
        createdAt: c.created_at || new Date().toISOString(),
        updatedAt: c.updated_at || new Date().toISOString(),
      });
      categoryIdMap.set(c.id, _id);
    }

    for (const r of args.rankings) {
      const categoryId = categoryIdMap.get(r.category_id);
      if (!categoryId) continue;
      const _id = await ctx.db.insert("rankings", {
        supabaseId: r.id,
        slug: r.slug,
        question: r.question,
        description: r.description,
        verdictSummary: r.verdict_summary,
        categoryId,
        createdAt: r.created_at || new Date().toISOString(),
        updatedAt: r.updated_at || new Date().toISOString(),
      });
      rankingIdMap.set(r.id, _id);
    }

    for (const p of args.products) {
      const _id = await ctx.db.insert("products", {
        supabaseId: p.id,
        name: p.name,
        link: p.link,
        createdAt: p.created_at || new Date().toISOString(),
        updatedAt: p.updated_at || new Date().toISOString(),
      });
      productIdMap.set(p.id, _id);
    }

    for (const u of args.users) {
      const _id = await ctx.db.insert("users", {
        supabaseId: u.id,
        name: u.name,
        profilePictureUrl: u.profile_picture_url,
        createdAt: u.created_at || new Date().toISOString(),
        updatedAt: u.updated_at || new Date().toISOString(),
      });
      userIdMap.set(u.id, _id);
    }

    for (const rp of args.ranking_products) {
      const rankingId = rankingIdMap.get(rp.ranking_id);
      const productId = productIdMap.get(rp.product_id);
      if (!rankingId || !productId) continue;
      const _id = await ctx.db.insert("rankingProducts", {
        supabaseId: rp.id,
        rankingId,
        productId,
        score: rp.score,
        rankPosition: rp.rank_position,
        createdAt: rp.created_at || new Date().toISOString(),
        updatedAt: rp.updated_at || new Date().toISOString(),
      });
      rankingProductIdMap.set(rp.id, _id);
    }

    for (const s of args.specifications) {
      const productId = productIdMap.get(s.product_id);
      if (!productId) continue;
      await ctx.db.insert("specifications", {
        supabaseId: s.id,
        productId,
        name: s.name,
        value: s.value,
        unit: s.unit,
        createdAt: s.created_at || new Date().toISOString(),
        updatedAt: s.updated_at || new Date().toISOString(),
      });
    }

    for (const a of args.assets) {
      const productId = productIdMap.get(a.product_id);
      if (!productId) continue;
      await ctx.db.insert("assets", {
        supabaseId: a.id,
        productId,
        type: a.type,
        url: a.url,
        displayOrder: a.display_order,
        createdAt: a.created_at || new Date().toISOString(),
        updatedAt: a.updated_at || new Date().toISOString(),
      });
    }

    for (const s of args.sentiments) {
      const rankingProductId = rankingProductIdMap.get(s.ranking_product_id);
      if (!rankingProductId) continue;
      const userId = s.user_id ? userIdMap.get(s.user_id) : undefined;
      await ctx.db.insert("sentiments", {
        supabaseId: s.id,
        rankingProductId,
        userId,
        type: s.type,
        content: s.content,
        headline: s.headline,
        description: s.description,
        createdAt: s.created_at || new Date().toISOString(),
        updatedAt: s.updated_at || new Date().toISOString(),
      });
    }

    for (const f of args.faqs) {
      const rankingId = rankingIdMap.get(f.ranking_id);
      if (!rankingId) continue;
      await ctx.db.insert("faqs", {
        supabaseId: f.id,
        rankingId,
        question: f.question,
        answer: f.answer,
        displayOrder: f.display_order,
        createdAt: f.created_at || new Date().toISOString(),
        updatedAt: f.updated_at || new Date().toISOString(),
      });
    }

    return {
      categories: args.categories.length,
      rankings: args.rankings.length,
      products: args.products.length,
      rankingProducts: args.ranking_products.length,
      users: args.users.length,
      sentiments: args.sentiments.length,
      specifications: args.specifications.length,
      assets: args.assets.length,
      faqs: args.faqs.length,
    };
  },
});
