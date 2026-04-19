'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Scale, TrendingUp, Zap } from 'lucide-react';
import Link from 'next/link';
import { getCategoryComparisonData } from '@/lib/category-use-cases';

/* -----------------------------------------------------------------------
   ComparisonGuideCard — single comparison guide card
   ----------------------------------------------------------------------- */
interface ComparisonGuideCardProps {
  guide: {
    title: string;
    description: string;
    queryPhrase: string;
  };
  categorySlug: string;
}

function ComparisonGuideCard({ guide, categorySlug }: ComparisonGuideCardProps) {
  const searchQuery = encodeURIComponent(guide.queryPhrase);
  const href = `/${categorySlug}?q=${searchQuery}`;

  return (
    <Link href={href} className="group block">
      <Card className="h-full transition-all hover:shadow-lg hover:border-slate-400/50 hover:-translate-y-1 cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2 mb-2">
            <Scale className="h-4 w-4 text-indigo-500" />
            <Badge variant="secondary" className="text-xs font-medium tracking-wide uppercase">
              Compare
            </Badge>
          </div>
          <CardTitle className="text-lg group-hover:text-slate-600 transition-colors leading-snug">
            {guide.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
            {guide.description}
          </p>
          <span className="flex items-center text-sm font-medium text-slate-600 group-hover:gap-2 transition-all">
            View comparison
            <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}

/* -----------------------------------------------------------------------
   ComparisonModule — section rendering comparison guide cards
   ----------------------------------------------------------------------- */
interface ComparisonModuleProps {
  categorySlug: string;
}

export function ComparisonModule({ categorySlug }: ComparisonModuleProps) {
  const comparisons = getCategoryComparisonData(categorySlug);

  if (!comparisons || comparisons.length === 0) {
    return null;
  }

  return (
    <section className="py-14 sm:py-16 border-t border-border/50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-2">
          <Scale className="h-5 w-5 text-indigo-500" />
          <span className="text-sm font-medium text-indigo-700 uppercase tracking-wide">
            Compare Options
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-2">
          {categorySlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} Comparisons
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Side-by-side comparisons to help you choose between top models, brands, or technology types — find the right fit for your specific needs.
        </p>

        {/* Comparison cards grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {comparisons.map((guide, idx) => (
            <ComparisonGuideCard
              key={`comparison-${idx}`}
              guide={guide}
              categorySlug={categorySlug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
