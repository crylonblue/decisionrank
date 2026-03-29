"use client";

import { QuickSearch } from '@/components/quicksearch';

interface HeroSectionProps {
  rankingCount?: number;
  categoryCount?: number;
  productCount?: number;
}

export function HeroSection({ rankingCount, categoryCount, productCount }: HeroSectionProps) {
  // Format stat display — use actual counts when available
  const rankingStat = rankingCount ? `${rankingCount}+` : '30+';
  const categoryStat = categoryCount ? `${categoryCount}` : '15';
  const productStat = productCount ? `${productCount}+` : '200+';

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-100 via-slate-50/60 to-background py-20 sm:py-28">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-slate-200/50 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-slate-300/50 blur-3xl"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Main Headline */}
          <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Make Better{' '}
            <span className="bg-gradient-to-r from-slate-600 to-slate-500 bg-clip-text text-transparent">
              Decisions
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
            Trusted editorial product rankings and comparisons to help you choose the best products with confidence.
          </p>

          {/* QuickSearch */}
          <div className="mt-10">
            <div className="mx-auto max-w-2xl">
              <QuickSearch 
                placeholder="Search rankings, products, or categories..."
                showButton={true}
                buttonText="Search"
                iconSize="md"
                iconPosition="left-4"
                inputClassName="rounded-xl border-2 py-4 text-base shadow-lg"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-600">{rankingStat}</div>
              <div className="mt-2 text-sm text-muted-foreground">Product Rankings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-600">{categoryStat}</div>
              <div className="mt-2 text-sm text-muted-foreground">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-600">{productStat}</div>
              <div className="mt-2 text-sm text-muted-foreground">Products Reviewed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
