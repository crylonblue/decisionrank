import { getAllRankings, getAllCategories, getRankingCountsByCategory } from '@/lib/data';
import Link from 'next/link';
import { Suspense } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/hero-section';
import { BuyerIntentModules } from '@/components/buyer-intent-modules';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock } from 'lucide-react';
import type { Metadata } from 'next';
import { getBaseUrl, generateWebSiteJsonLd, generateOrganizationJsonLd } from '@/lib/seo';

const getCategoryIntro = (name: string, description?: string | null) => {
  const fallback = `Browse DecisionRank's ${name.toLowerCase()} rankings to compare standout options, key features, and buyer-focused recommendations.`;

  if (!description) return fallback;

  return `${description.replace(/[.!?\s]+$/, '')}. Browse our ${name.toLowerCase()} rankings for detailed comparisons and top picks.`;
};

export const dynamic = 'force-dynamic';

interface RankingsPageProps {
  searchParams: Promise<{ search?: string }>;
}

export async function generateMetadata({ searchParams }: RankingsPageProps): Promise<Metadata> {
  const { search } = await searchParams;
  const baseUrl = getBaseUrl();
  
  if (search) {
    const searchUrl = `${baseUrl}/?search=${encodeURIComponent(search)}`;

    return {
      title: `Search Results for "${search}" | DecisionRank`,
      description: `Search results for "${search}" - Find product rankings and comparisons`,
      robots: { index: false, follow: true }, // Prevent thin search-result pages from being indexed
      alternates: {
        canonical: searchUrl,
      },
      openGraph: {
        title: `Search Results for "${search}"`,
        url: searchUrl,
        type: 'website',
      },
    };
  }

  return {
    title: 'DecisionRank - Editorial Product Rankings and Comparisons',
    description: 'Discover the best products through comprehensive editorial rankings and comparisons. Compare features, prices, and reviews to make informed decisions.',
    alternates: {
      canonical: baseUrl,
    },
    openGraph: {
      title: 'DecisionRank - Editorial Product Rankings',
      description: 'Discover the best products through comprehensive editorial rankings and comparisons.',
      url: baseUrl,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'DecisionRank - Editorial Product Rankings',
      description: 'Discover the best products through comprehensive editorial rankings and comparisons.',
    },
  };
}

export default async function RankingsPage({ searchParams }: RankingsPageProps) {
  const { search } = await searchParams;
  const searchQuery = search;
  const rankings = await getAllRankings(searchQuery);

  // Get most recent rankings for showcase (when no search)
  const recentRankings = searchQuery ? rankings : rankings.slice(0, 6);
  
  // Fetch categories for the landing page (when no search)
  const allCategories = searchQuery ? [] : await getAllCategories();
  const rankingCounts = searchQuery ? {} : await getRankingCountsByCategory();
  // Sort by created_at descending to prioritize newer categories for better SEO link equity distribution
  const sortedCategories = searchQuery ? [] : [...allCategories].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  const categories = sortedCategories.slice(0, 6);
  const hasMoreCategories = allCategories.length > 6;

  // If there's a search query, show search results page
  if (searchQuery) {
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
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Search Results
          </h1>
              <p className="text-muted-foreground">
                Found {rankings.length} {rankings.length === 1 ? 'ranking' : 'rankings'} for &quot;{searchQuery}&quot;
          </p>
        </div>

            {rankings.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground">
                    No rankings found matching your search.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rankings.map((ranking) => {
                  const updatedDate = new Date(ranking.updated_at);
                  const formattedDate = updatedDate.toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  });
                  return (
                <Link
                    key={ranking.id} 
                    href={`/${ranking.category.slug}/${ranking.slug}`}
                  >
                    <Card className="group h-full transition-all hover:shadow-lg hover:border-slate-400/50 hover:-translate-y-1 cursor-pointer">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {ranking.category.name}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg group-hover:text-slate-600 transition-colors">
                          {ranking.question}
                        </CardTitle>
                        {ranking.description && (
                          <CardDescription className="line-clamp-3 mt-2">
                            {ranking.description}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mt-4">
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <time dateTime={ranking.updated_at}>{formattedDate}</time>
                          </span>
                          <span className="flex items-center text-sm font-medium text-slate-600 group-hover:gap-2 transition-all">
                            View Ranking
                            <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                </Link>
                  );
                })}
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Landing page with hero and showcase
  const webSiteJsonLd = generateWebSiteJsonLd();
  const orgJsonLd = generateOrganizationJsonLd();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* WebSite JSON-LD — enables Google Sitelinks Search Box */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
      />
      {/* Organization JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
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
        <HeroSection
          rankingCount={rankings.length}
          categoryCount={allCategories.length}
        />
        
        {/* Recent Rankings Showcase */}
        <section id="rankings" className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Recent Rankings
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Explore our latest product comparisons and rankings
              </p>
        </div>

            {recentRankings.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">
                    No rankings available.
              </p>
            </CardContent>
          </Card>
        ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {recentRankings.map((ranking) => {
                  const updatedDate = new Date(ranking.updated_at);
                  const formattedDate = updatedDate.toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  });
                  return (
              <Link 
                key={ranking.id} 
                href={`/${ranking.category.slug}/${ranking.slug}`}
              >
                    <Card className="group h-full transition-all hover:shadow-lg hover:border-slate-400/50 hover:-translate-y-1 cursor-pointer">
                  <CardHeader>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {ranking.category.name}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg group-hover:text-slate-600 transition-colors">
                          {ranking.question}
                        </CardTitle>
                    {ranking.description && (
                          <CardDescription className="line-clamp-3 mt-2">
                        {ranking.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mt-4">
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <time dateTime={ranking.updated_at}>{formattedDate}</time>
                          </span>
                          <span className="flex items-center text-sm font-medium text-slate-600 group-hover:gap-2 transition-all">
                            View Ranking
                            <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </span>
                        </div>
                      </CardContent>
                </Card>
              </Link>
                  );
                })}
          </div>
        )}
      </div>
        </section>

        {/* Buyer Intent Discovery Modules */}
        <BuyerIntentModules categories={allCategories} rankingCounts={rankingCounts} />

        {/* Categories Section */}
        {categories.length > 0 && (
          <section id="categories" className="py-20 sm:py-24 bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-12 text-center">
                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                  <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Browse by Category
                  </h2>
                  <Link
                    href="/categories"
                    className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-700"
                  >
                    View all categories
                  </Link>
                </div>
                <p className="mt-4 text-lg text-muted-foreground">
                  Explore rankings organized by product categories
                </p>
              </div>

              <div className="mb-8 flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <Link
                    key={`${category.id}-quick-link`}
                    href={`/${category.slug}`}
                    className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-slate-400/50 hover:text-slate-700"
                  >
                    View {category.name} rankings
                  </Link>
                ))}
              </div>

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
                            Explore all {category.name} rankings
                            <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>

              {hasMoreCategories && (
                <div className="mt-8 text-center">
                  <Link href="/categories">
                    <Button variant="outline" size="lg">
                      View All Categories
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
