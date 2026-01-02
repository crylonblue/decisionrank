import { getCategoryBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import type { Ranking } from '@/lib/supabase';
import type { Metadata } from 'next';
import { getBaseUrl, generateBreadcrumbJsonLd } from '@/lib/seo';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}

const RANKINGS_PER_PAGE = 25;

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  
  let category;
  try {
    category = await getCategoryBySlug(categorySlug);
  } catch (error) {
    return {
      title: 'Category Not Found | DecisionRank',
    };
  }

  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/${categorySlug}`;

  return {
    title: `${category.name} Rankings | DecisionRank`,
    description: category.description || `Browse product rankings in ${category.name}`,
    openGraph: {
      title: `${category.name} Rankings`,
      description: category.description || undefined,
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${category.name} Rankings`,
      description: category.description || undefined,
    },
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const { page } = await searchParams;
  
  let category;
  try {
    category = await getCategoryBySlug(categorySlug);
  } catch (error) {
    notFound();
  }

  const { rankings } = category;

  // Pagination logic
  const currentPage = Math.max(1, parseInt(page || '1', 10));
  const totalRankings = rankings.length;
  const totalPages = Math.ceil(totalRankings / RANKINGS_PER_PAGE);
  const startIndex = (currentPage - 1) * RANKINGS_PER_PAGE;
  const endIndex = startIndex + RANKINGS_PER_PAGE;
  const paginatedRankings = rankings.slice(startIndex, endIndex);

  const baseUrl = getBaseUrl();
  
  // Generate breadcrumb JSON-LD
  const breadcrumbItems = [
    { name: 'Home', url: `${baseUrl}/` },
    { name: category.name, url: `${baseUrl}/${categorySlug}` },
  ];
  const breadcrumbJsonLd = generateBreadcrumbJsonLd(breadcrumbItems);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Breadcrumb JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-slate-600 transition-colors"
        >
          ← Back to rankings
        </Link>

        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-foreground mb-3 tracking-tight">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-lg text-muted-foreground">
              {category.description}
            </p>
          )}
        </div>

        {/* Rankings List */}
        {rankings.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">
                No rankings found in this category.
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="space-y-6">
              {paginatedRankings.map((ranking: Ranking) => (
                <Link key={ranking.id} href={`/${category.slug}/${ranking.slug}`}>
                  <Card className="group transition-all hover:shadow-lg hover:border-slate-400/50 hover:-translate-y-1 cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-xl group-hover:text-slate-600 transition-colors">{ranking.question}</CardTitle>
                      {ranking.description && (
                        <CardDescription className="line-clamp-2">
                          {ranking.description}
                        </CardDescription>
                      )}
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex items-center justify-center gap-2">
                <Link
                  href={currentPage > 1 ? `/${categorySlug}?page=${currentPage - 1}` : `/${categorySlug}?page=${currentPage}`}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                >
                  <Button variant="outline" size="sm" disabled={currentPage === 1}>
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                </Link>

                <div className="flex items-center gap-1">
                  {(() => {
                    const pages: (number | 'ellipsis')[] = [];
                    const pageNumbers = new Set<number>();
                    
                    // Always show first page
                    pages.push(1);
                    pageNumbers.add(1);
                    
                    // Add ellipsis if there's a gap after page 1
                    if (currentPage > 3) {
                      pages.push('ellipsis');
                    }
                    
                    // Add pages around current page
                    const startPage = Math.max(2, currentPage - 1);
                    const endPage = Math.min(totalPages - 1, currentPage + 1);
                    
                    for (let i = startPage; i <= endPage; i++) {
                      if (i !== 1 && i !== totalPages && !pageNumbers.has(i)) {
                        pages.push(i);
                        pageNumbers.add(i);
                      }
                    }
                    
                    // Add ellipsis if there's a gap before last page
                    if (currentPage < totalPages - 2) {
                      pages.push('ellipsis');
                    }
                    
                    // Always show last page (if more than 1 page)
                    if (totalPages > 1 && !pageNumbers.has(totalPages)) {
                      pages.push(totalPages);
                    }
                    
                    return pages.map((page, index) => {
                      if (page === 'ellipsis') {
                        return (
                          <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">
                            ...
                          </span>
                        );
                      }
                      
                      return (
                        <Link key={page} href={`/${categorySlug}?page=${page}`}>
                          <Button
                            variant={page === currentPage ? 'default' : 'outline'}
                            size="sm"
                          >
                            {page}
                          </Button>
                        </Link>
                      );
                    });
                  })()}
                </div>

                <Link
                  href={currentPage < totalPages ? `/${categorySlug}?page=${currentPage + 1}` : `/${categorySlug}?page=${currentPage}`}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                >
                  <Button variant="outline" size="sm" disabled={currentPage === totalPages}>
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
          </>
        )}
      </div>
      </main>
      <Footer />
    </div>
  );
}

