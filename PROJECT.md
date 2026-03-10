# decisionrank — PROJECT.md

## What Is This
Editorial product ranking/comparison site with category landing pages, detail pages, and quick search.

## Status
- Active migration: Supabase ➜ Convex (in progress)
- Stack: Next.js 16, React 19, Tailwind

## Recent Updates
- **2026-03-10:** Migrated runtime data layer from Supabase client calls to Convex query layer.
- Added Convex backend files:
  - `convex/schema.ts`
  - `convex/rankings.ts`
  - `convex/imports.ts`
- Added client/provider integration for Convex:
  - `components/providers.tsx`
  - `app/layout.tsx` (wrapped app with provider)
- Moved shared DB types from `lib/supabase.ts` to `lib/types.ts`.
- Updated sitemap and quick search to use Convex instead of Supabase.
- Added one-shot migration script: `scripts/migrate-supabase-to-convex.mjs`.
- Added migration + cleanup runbook: `CONVEX_MIGRATION_PLAN.md`.
- Type-check validated with `pnpm -s tsc --noEmit`.

## Pending Before Final Cutover
- Smoke-test pages/search/sitemap on deployed env.
- After 24-48h stable runtime, perform Supabase cleanup per `CONVEX_MIGRATION_PLAN.md`.

## Cutover Progress (2026-03-10)
- Convex functions/schema deployed to `wooden-trout-116`.
- Supabase snapshot imported successfully:
  - categories: 12
  - rankings: 33
  - products: 205
  - ranking_products: 205
  - users: 8
  - sentiments: 965
  - specifications: 1000
  - assets: 614
  - faqs: 167
- Migration script updated to normalize nullable Supabase fields to Convex optional fields.
