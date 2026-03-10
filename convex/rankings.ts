// @ts-nocheck
import { query } from "./_generated/server";
import { v } from "convex/values";

function asNullable<T>(value: T | undefined): T | null {
  return value === undefined ? null : value;
}

export const getAllRankings = query({
  args: { searchQuery: v.optional(v.string()) },
  handler: async (ctx, { searchQuery }) => {
    const rankings = await ctx.db.query("rankings").collect();
    const categories = await ctx.db.query("categories").collect();
    const categoryById = new Map(categories.map((c) => [c._id, c]));

    return rankings
      .filter((r) => !searchQuery || r.question.toLowerCase().includes(searchQuery.toLowerCase()))
      .map((r) => {
        const category = categoryById.get(r.categoryId);
        if (!category) return null;
        return {
          id: r.supabaseId,
          slug: r.slug,
          question: r.question,
          description: asNullable(r.description),
          verdict_summary: asNullable(r.verdictSummary),
          category_id: category.supabaseId,
          created_at: r.createdAt,
          updated_at: r.updatedAt,
          category: {
            id: category.supabaseId,
            name: category.name,
            slug: category.slug,
            description: asNullable(category.description),
            created_at: category.createdAt,
            updated_at: category.updatedAt,
          },
        };
      })
      .filter(Boolean)
      .sort((a, b) => (a!.created_at < b!.created_at ? 1 : -1));
  },
});

export const getAllCategories = query({
  args: {},
  handler: async (ctx) => {
    const categories = await ctx.db.query("categories").collect();
    return categories
      .map((c) => ({
        id: c.supabaseId,
        name: c.name,
        slug: c.slug,
        description: asNullable(c.description),
        created_at: c.createdAt,
        updated_at: c.updatedAt,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  },
});

export const getCategoryBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const category = await ctx.db
      .query("categories")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    if (!category) return null;

    const rankings = await ctx.db
      .query("rankings")
      .withIndex("by_category", (q) => q.eq("categoryId", category._id))
      .collect();

    return {
      id: category.supabaseId,
      name: category.name,
      slug: category.slug,
      description: asNullable(category.description),
      created_at: category.createdAt,
      updated_at: category.updatedAt,
      rankings: rankings
        .map((r) => ({
          id: r.supabaseId,
          slug: r.slug,
          question: r.question,
          description: asNullable(r.description),
          verdict_summary: asNullable(r.verdictSummary),
          category_id: category.supabaseId,
          created_at: r.createdAt,
          updated_at: r.updatedAt,
        }))
        .sort((a, b) => (a.created_at < b.created_at ? 1 : -1)),
    };
  },
});

export const quickSearch = query({
  args: { query: v.string() },
  handler: async (ctx, { query }) => {
    if (!query.trim()) return [];
    const rankings = await ctx.db.query("rankings").collect();
    const categories = await ctx.db.query("categories").collect();
    const categoryById = new Map(categories.map((c) => [c._id, c]));

    return rankings
      .filter((r) => r.question.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
      .slice(0, 10)
      .map((r) => {
        const category = categoryById.get(r.categoryId);
        if (!category) return null;
        return {
          id: r.supabaseId,
          slug: r.slug,
          question: r.question,
          description: asNullable(r.description),
          verdict_summary: asNullable(r.verdictSummary),
          category_id: category.supabaseId,
          created_at: r.createdAt,
          updated_at: r.updatedAt,
          category: {
            slug: category.slug,
            name: category.name,
          },
        };
      })
      .filter(Boolean);
  },
});

export const getRankingCountsByCategory = query({
  args: {},
  handler: async (ctx) => {
    const rankings = await ctx.db.query("rankings").collect();
    const categories = await ctx.db.query("categories").collect();
    const categoryById = new Map(categories.map((c) => [c._id, c]));

    const counts = new Map<string, number>();
    for (const ranking of rankings) {
      const category = categoryById.get(ranking.categoryId);
      if (!category) continue;
      counts.set(category.supabaseId, (counts.get(category.supabaseId) || 0) + 1);
    }

    return Object.fromEntries(counts.entries());
  },
});

export const getRankingBySlug = query({
  args: { slug: v.string(), categorySlug: v.string() },
  handler: async (ctx, { slug, categorySlug }) => {
    const category = await ctx.db
      .query("categories")
      .withIndex("by_slug", (q) => q.eq("slug", categorySlug))
      .first();

    if (!category) return null;

    const ranking = await ctx.db
      .query("rankings")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    if (!ranking || ranking.categoryId !== category._id) return null;

    const rankingProducts = await ctx.db
      .query("rankingProducts")
      .withIndex("by_ranking", (q) => q.eq("rankingId", ranking._id))
      .collect();

    const products = await ctx.db.query("products").collect();
    const productById = new Map(products.map((p) => [p._id, p]));

    const allAssets = await ctx.db.query("assets").collect();
    const assetsByProduct = new Map<string, typeof allAssets>();
    for (const asset of allAssets) {
      const key = String(asset.productId);
      assetsByProduct.set(key, [...(assetsByProduct.get(key) || []), asset]);
    }

    const allSentiments = await ctx.db.query("sentiments").collect();
    const sentimentsByRankingProduct = new Map<string, typeof allSentiments>();
    for (const sentiment of allSentiments) {
      const key = String(sentiment.rankingProductId);
      sentimentsByRankingProduct.set(key, [...(sentimentsByRankingProduct.get(key) || []), sentiment]);
    }

    const users = await ctx.db.query("users").collect();
    const userById = new Map(users.map((u) => [u._id, u]));

    const allSpecs = await ctx.db.query("specifications").collect();
    const specsByProduct = new Map<string, typeof allSpecs>();
    for (const spec of allSpecs) {
      const key = String(spec.productId);
      specsByProduct.set(key, [...(specsByProduct.get(key) || []), spec]);
    }

    const faqs = await ctx.db
      .query("faqs")
      .withIndex("by_ranking", (q) => q.eq("rankingId", ranking._id))
      .collect();

    const relatedRankings = await ctx.db
      .query("rankings")
      .withIndex("by_category", (q) => q.eq("categoryId", category._id))
      .collect();

    const ranking_products = rankingProducts
      .sort((a, b) => a.rankPosition - b.rankPosition)
      .map((rp) => {
        const product = productById.get(rp.productId)!;
        const assets = (assetsByProduct.get(String(product._id)) || [])
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((a) => ({
            id: a.supabaseId,
            product_id: product.supabaseId,
            type: a.type,
            url: a.url,
            display_order: a.displayOrder,
            created_at: a.createdAt,
            updated_at: a.updatedAt,
          }));

        const sentiments = (sentimentsByRankingProduct.get(String(rp._id)) || [])
          .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
          .map((s) => {
            const user = s.userId ? userById.get(s.userId) : null;
            return {
              id: s.supabaseId,
              ranking_product_id: rp.supabaseId,
              user_id: user?.supabaseId || null,
              type: s.type,
              content: s.content,
              headline: asNullable(s.headline),
              description: asNullable(s.description),
              created_at: s.createdAt,
              updated_at: s.updatedAt,
              user: user
                ? {
                    id: user.supabaseId,
                    name: user.name,
                    profile_picture_url: asNullable(user.profilePictureUrl),
                    created_at: user.createdAt,
                    updated_at: user.updatedAt,
                  }
                : null,
            };
          });

        const specifications = (specsByProduct.get(String(product._id)) || []).map((s) => ({
          id: s.supabaseId,
          product_id: product.supabaseId,
          name: s.name,
          value: s.value,
          unit: asNullable(s.unit),
          created_at: s.createdAt,
          updated_at: s.updatedAt,
        }));

        return {
          id: rp.supabaseId,
          ranking_id: ranking.supabaseId,
          product_id: product.supabaseId,
          score: rp.score,
          rank_position: rp.rankPosition,
          created_at: rp.createdAt,
          updated_at: rp.updatedAt,
          product: {
            id: product.supabaseId,
            name: product.name,
            link: asNullable(product.link),
            created_at: product.createdAt,
            updated_at: product.updatedAt,
            assets,
          },
          sentiments,
          specifications,
        };
      });

    return {
      id: ranking.supabaseId,
      slug: ranking.slug,
      question: ranking.question,
      description: asNullable(ranking.description),
      verdict_summary: asNullable(ranking.verdictSummary),
      category_id: category.supabaseId,
      created_at: ranking.createdAt,
      updated_at: ranking.updatedAt,
      ranking_products,
      category: {
        id: category.supabaseId,
        name: category.name,
        slug: category.slug,
        description: asNullable(category.description),
        created_at: category.createdAt,
        updated_at: category.updatedAt,
      },
      faqs: faqs
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .map((f) => ({
          id: f.supabaseId,
          ranking_id: ranking.supabaseId,
          question: f.question,
          answer: f.answer,
          display_order: f.displayOrder,
          created_at: f.createdAt,
          updated_at: f.updatedAt,
        })),
      relatedRankings: relatedRankings
        .filter((r) => r.supabaseId !== ranking.supabaseId)
        .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
        .slice(0, 4)
        .map((r) => ({
          id: r.supabaseId,
          slug: r.slug,
          question: r.question,
          description: asNullable(r.description),
        })),
    };
  },
});
