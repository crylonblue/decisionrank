# DecisionRank: Supabase → Convex Migration + Cleanup Plan

## What was migrated in code
- Replaced runtime data access layer from Supabase to Convex (`lib/data.ts` now uses Convex queries).
- Added Convex schema and query/mutation functions:
  - `convex/schema.ts`
  - `convex/rankings.ts`
  - `convex/imports.ts`
- Added Convex provider to app layout for client-side search (`components/providers.tsx`, `app/layout.tsx`).
- Migrated quick search from Supabase client calls to Convex query hook.
- Migrated sitemap category count query to Convex.
- Moved shared DB types to `lib/types.ts` and updated imports.
- Added migration script from Supabase to Convex snapshot:
  - `scripts/migrate-supabase-to-convex.mjs`

## One-time cutover steps
1. Configure Convex deployment for this repo:
   - `pnpm convex:dev` (local/dev) or `pnpm convex:deploy` (prod)
2. Set env vars in deployment:
   - `NEXT_PUBLIC_CONVEX_URL`
   - Keep Supabase env vars temporarily for migration script.
3. Run data migration:
   - `pnpm migrate:supabase-to-convex`
4. Smoke test:
   - Homepage rankings
   - Category pages
   - Ranking detail pages
   - Quick search
   - Sitemap generation
5. Deploy.

## Cleanup plan after successful migration
After production has run successfully on Convex for 24-48h:
1. Remove Supabase runtime code and dependency:
   - delete `lib/supabase.ts`
   - remove `@supabase/supabase-js` from dependencies
2. Remove Supabase migration folder if no longer needed:
   - archive or delete `supabase/`
3. Remove Supabase env vars from hosting/dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Keep rollback option:
   - tag git release before cleanup (`pre-convex-cleanup`)
5. Optional hard cleanup:
   - disable Supabase project or rotate anon key once fully decommissioned.

## Rollback plan
- Revert to pre-migration commit
- Restore Supabase env vars
- Redeploy
