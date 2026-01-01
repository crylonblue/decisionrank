import { getAllRankings } from '@/lib/data';
import Link from 'next/link';
import { Suspense } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/hero-section';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import { getBaseUrl } from '@/lib/seo';

interface RankingsPageProps {
  searchParams: Promise<{ search?: string }>;
}

export async function generateMetadata({ searchParams }: RankingsPageProps): Promise<Metadata> {
  const { search } = await searchParams;
  const baseUrl = getBaseUrl();
  
  if (search) {
    return {
      title: `Search Results for "${search}" | DecisionRank`,
      description: `Search results for "${search}" - Find product rankings and comparisons`,
      openGraph: {
        title: `Search Results for "${search}"`,
        url: `${baseUrl}/?search=${encodeURIComponent(search)}`,
        type: 'website',
      },
    };
  }

  return {
    title: 'DecisionRank - Editorial Product Rankings and Comparisons',
    description: 'Discover the best products through comprehensive editorial rankings and comparisons. Compare features, prices, and reviews to make informed decisions.',
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
  const recentRankings = searchQuery ? rankings : rankings.slice(0, 9);

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
                {rankings.map((ranking) => (
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
                        <div className="flex items-center text-sm font-medium text-slate-600 group-hover:gap-2 transition-all">
                          View Ranking
                          <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </CardContent>
                    </Card>
                </Link>
              ))}
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Landing page with hero and showcase
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
        <HeroSection />
        
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
                {recentRankings.map((ranking) => (
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
                        <div className="flex items-center text-sm font-medium text-slate-600 group-hover:gap-2 transition-all">
                          View Ranking
                          <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
