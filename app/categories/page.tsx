import { getAllCategories, getRankingCountsByCategory } from '@/lib/data';
import Link from 'next/link';
import { Suspense } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Metadata } from 'next';
import { getBaseUrl } from '@/lib/seo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { BuyerIntentModules } from '@/components/buyer-intent-modules';

const getCategoryIntro = (name: string, description?: string | null) => {
  const fallback = `Explore ${name.toLowerCase()} rankings, comparison criteria, and recommendation guides for the best options in this category.`;

  if (!description) return fallback;

  return `${description.replace(/[.!?\s]+$/, '')}. Explore our ${name.toLowerCase()} rankings and comparison guides for top picks.`;
};

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = getBaseUrl();
  
  const canonicalUrl = `${baseUrl}/categories`;

  return {
    title: 'All Categories | DecisionRank',
    description: 'Discover every DecisionRank category hub and browse product rankings, comparisons, and category-specific buying guides.',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: 'All Categories | DecisionRank',
      description: 'Discover every DecisionRank category hub and browse product rankings, comparisons, and category-specific buying guides.',
      url: canonicalUrl,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: 'All Categories | DecisionRank',
      description: 'Discover every DecisionRank category hub and browse product rankings, comparisons, and category-specific buying guides.',
    },
  };
}

export default async function CategoriesPage() {
  const categories = await getAllCategories();
  const rankingCounts = await getRankingCountsByCategory();

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
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Breadcrumb navigation */}
          <Breadcrumbs items={[{ label: 'All Categories' }]} />

          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
              All Product Categories | DecisionRank
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore our rankings across {categories.length} product categories. Each category hub includes detailed comparisons, editorial picks, and buyer-focused guidance.
            </p>
            <div className="mt-4">
              <Link
                href="/"
                className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-700"
              >
                Return to homepage
              </Link>
            </div>
          </div>

          {/* Buyer Intent Discovery Modules */}
          <BuyerIntentModules categories={categories} rankingCounts={rankingCounts} />

          {/* Categories Grid */}
          {categories.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">
                  No categories available.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => {
                const count = rankingCounts[category.id] || 0;
                return (
                  <Link
                    key={category.id}
                    href={`/${category.slug}`}
                  >
                    <Card className="group h-full transition-all hover:shadow-lg hover:border-slate-400/50 hover:-translate-y-1 cursor-pointer">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-xl group-hover:text-slate-600 transition-colors">
                            Browse {category.name} rankings
                          </CardTitle>
                          {count > 0 && (
                            <Badge variant="secondary" className="text-xs shrink-0">
                              {count} {count === 1 ? 'ranking' : 'rankings'}
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="line-clamp-3 mt-2">
                          {getCategoryIntro(category.name, category.description)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center text-sm font-medium text-slate-600 group-hover:gap-2 transition-all mt-4">
                          View all {category.name} rankings
                          <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}

          {categories.length > 1 && (
            <section className="mt-16 rounded-2xl border border-border bg-muted/30 p-8">
              <h2 className="text-2xl font-semibold text-foreground">Related Categories</h2>
              <p className="mt-3 text-muted-foreground">
                Continue exploring other category hubs to discover more product rankings and comparisons.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {categories.map((category) => (
                  <Link
                    key={`${category.id}-related-link`}
                    href={`/${category.slug}`}
                    className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-slate-400/50 hover:text-slate-700"
                  >
                    Explore {category.name} rankings
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

