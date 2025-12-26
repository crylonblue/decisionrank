# DecisionRank

A read-only, editorial product ranking platform built with Next.js 16, TypeScript, Tailwind CSS, and Supabase.

## Features

- **Rankings Index**: Browse all rankings with search functionality
- **Ranking Detail Pages**: View detailed product comparisons with scores, pros, cons, and specifications
- **Server-Side Rendering**: All content is server-rendered for optimal performance
- **Supabase Integration**: PostgreSQL database with Row Level Security (RLS) enabled

## Tech Stack

- **Next.js 16** (App Router, Server Components)
- **TypeScript**
- **Tailwind CSS**
- **Supabase** (PostgreSQL)
- **Supabase CLI** (for migrations)

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- A Supabase project ([create one here](https://supabase.com))

### Setup

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Set up environment variables**:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   You can find these values in your Supabase project settings under API.

3. **Run database migrations**:
   ```bash
   # If you have Supabase CLI installed locally
   supabase db push
   
   # Or apply migrations manually via Supabase dashboard:
   # 1. Go to SQL Editor in your Supabase dashboard
   # 2. Run the SQL files in supabase/migrations/ in order:
   #    - 20240101000000_initial_schema.sql
   #    - 20240101000001_seed_data.sql
   ```

4. **Start the development server**:
   ```bash
   pnpm dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser.

## Database Schema

The application uses the following tables:

- `rankings` - Main ranking questions
- `products` - Reusable product catalog
- `ranking_products` - Junction table linking rankings to products with scores and rank positions
- `criteria` - Ranking-specific evaluation criteria
- `criterion_scores` - Scores for each product on each criterion
- `specifications` - Product specifications (weight, volume, etc.)
- `sentiments` - Pros, cons, and comments for each product in a ranking

All tables have Row Level Security (RLS) enabled with public SELECT policies only.

## Project Structure

```
├── app/
│   ├── page.tsx                    # Rankings index page
│   ├── rankings/
│   │   └── [slug]/
│   │       ├── page.tsx            # Ranking detail page
│   │       └── not-found.tsx       # 404 page
│   ├── layout.tsx
│   └── globals.css
├── lib/
│   ├── supabase.ts                 # Supabase client and types
│   └── data.ts                     # Data fetching functions
└── supabase/
    └── migrations/
        ├── 20240101000000_initial_schema.sql
        └── 20240101000001_seed_data.sql
```

## Development

- All data fetching is done server-side using Server Components
- No client-side data fetching for core content
- The application is read-only (no write APIs implemented)

## License

MIT
