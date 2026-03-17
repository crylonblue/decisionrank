# decisionrank — PROJECT.md

## What Is This
Editorial product ranking/comparison site with category landing pages, detail pages, and quick search.

## Status
- **Convex migration: COMPLETE** ✅ (Supabase fully removed)
- Stack: Next.js 16, React 19, Tailwind, Convex

## Recent Updates
- **2026-03-17:** Smoke-test passed + Supabase cleanup completed.
  - **Smoke-test results (all ✅):**
    - Homepage (200, renders rankings)
    - Category pages: `/electronics`, `/fitness` — both 200
    - Ranking detail pages: `/home-kitchen/robot-vacuums`, `/electronics/mechanical-keyboards`, `/fitness/massage-guns` — all 200 with full content
    - Sitemap: `/sitemap.xml` — 200, 47 URLs, all well-formed
  - **Supabase cleanup (commit d9d7d81):**
    - Deleted `lib/supabase.ts` (unused — types already in `lib/types.ts`)
    - Removed `@supabase/supabase-js` dependency from package.json
    - Removed migration script `scripts/migrate-supabase-to-convex.mjs`
    - Removed `supabase/` directory (15 migration files, config)
    - Cleared Supabase env vars from `.env.local`
    - Git tag `pre-supabase-cleanup` created for rollback
    - 22 files changed, 1599 lines removed
  - **Remaining Supabase references (intentionally kept):**
    - `supabaseId` fields in Convex schema/queries — these are the ID mapping columns in the live Convex data, not a runtime dependency
  - **Next steps (optional):**
    - Remove Supabase env vars from Vercel dashboard
    - Disable/delete Supabase project once confident
- **2026-03-15:** Technical SEO pass — added `metadataBase` to root layout (resolves all relative canonical/OG URLs), added canonical tags to imprint + privacy-policy pages, improved title template with `%s | DecisionRank` pattern. Commit d736d49.
- **2026-03-14:** SEO foundation pass for canonical/sitemap/robots consistency.
  - Canonical URL generation now consistently uses `https://www.decisionrank.com` outside local development (`lib/seo.ts`).
  - Added explicit `alternates.canonical` metadata on homepage, categories index, category pages (including paginated URLs), and ranking detail pages.
  - Added `/categories` to `app/sitemap.ts` static entries and kept ranking detail + category index/pagination coverage in sitemap generation.
  - `robots.ts` continues to reference `${baseUrl}/sitemap.xml`, which now resolves to the canonical production host.
  - Added concise inline comments where canonical/sitemap intent is non-obvious.
  - Marked ranking/category listing/detail pages as dynamic to avoid fragile build-time prerendering against external data fetches.
- **2026-03-10:** Migrated runtime data layer from Supabase to Convex.

## Cutover Progress (2026-03-10)
- Convex functions/schema deployed to `wooden-trout-116`.
- Supabase snapshot imported successfully:
  - categories: 12, rankings: 33, products: 205, ranking_products: 205
  - users: 8, sentiments: 965, specifications: 1000, assets: 614, faqs: 167
