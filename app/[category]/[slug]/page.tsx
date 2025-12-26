import { getRankingBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RankingTable } from '@/components/ranking-table';
import { LazyProductList } from '@/components/lazy-product-list';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import type { RankingProductWithDetails } from '@/lib/supabase';

interface RankingDetailPageProps {
  params: Promise<{ category: string; slug: string }>;
}

export default async function RankingDetailPage({ params }: RankingDetailPageProps) {
  const { category: categorySlug, slug } = await params;
  
  let ranking;
  try {
    ranking = await getRankingBySlug(slug, categorySlug);
  } catch (error) {
    notFound();
  }

  const { ranking_products, category } = ranking;

  // Collect all unique specification names across all products
  const allSpecNames = new Set<string>();
  ranking_products.forEach((rp: RankingProductWithDetails) => {
    rp.specifications.forEach((spec) => {
      allSpecNames.add(spec.name);
    });
  });
  const specNames = Array.from(allSpecNames).sort();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Suspense fallback={
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between gap-4">
              <div className="text-xl font-bold bg-gradient-to-r from-slate-600 to-slate-500 bg-clip-text text-transparent">
                DecisionRank
              </div>
            </div>
          </div>
        </nav>
      }>
        <Navigation />
      </Suspense>
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <Link
            href="/"
            className="hover:text-slate-600 transition-colors"
          >
            Home
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link
            href={`/${category.slug}`}
            className="hover:text-slate-600 transition-colors"
          >
            {category.name}
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground font-medium">{ranking.question}</span>
        </nav>

        {/* Question */}
        <h1 className="text-5xl font-bold text-foreground mb-4 tracking-tight">
          {ranking.question}
        </h1>

        {/* Description */}
        {ranking.description && (
          <p className="text-lg text-muted-foreground mb-8">
            {ranking.description}
          </p>
        )}

        {/* Verdict Summary */}
        {ranking.verdict_summary && (
          <Card className="mb-8 border-slate-200/50 bg-slate-50/30">
            <CardHeader>
              <CardTitle className="text-slate-700">Verdict</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {ranking.verdict_summary}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Ranking Table */}
        <RankingTable
          rankingProducts={ranking_products}
          specNames={specNames}
        />

        {/* Product Sections - Lazy Loaded */}
        <LazyProductList 
          rankingProducts={ranking_products}
          initialCount={3}
          loadMoreCount={3}
        />
        </div>
      </main>
      <Footer />
    </div>
  );
}

