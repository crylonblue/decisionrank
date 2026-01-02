import { getAllCategories } from '@/lib/data';
import Link from 'next/link';
import { Suspense } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import { getBaseUrl } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = getBaseUrl();
  
  return {
    title: 'All Categories | DecisionRank',
    description: 'Browse all product categories and explore rankings organized by category',
    openGraph: {
      title: 'All Categories | DecisionRank',
      description: 'Browse all product categories and explore rankings organized by category',
      url: `${baseUrl}/categories`,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: 'All Categories | DecisionRank',
      description: 'Browse all product categories and explore rankings organized by category',
    },
  };
}

export default async function CategoriesPage() {
  const categories = await getAllCategories();

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
          {/* Back link */}
          <Link
            href="/"
            className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-slate-600 transition-colors"
          >
            ← Back to home
          </Link>

          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
              All Categories
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore rankings organized by product categories
            </p>
          </div>

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
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/${category.slug}`}
                >
                  <Card className="group h-full transition-all hover:shadow-lg hover:border-slate-400/50 hover:-translate-y-1 cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-xl group-hover:text-slate-600 transition-colors">
                        {category.name}
                      </CardTitle>
                      {category.description && (
                        <CardDescription className="line-clamp-2 mt-2">
                          {category.description}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-sm font-medium text-slate-600 group-hover:gap-2 transition-all mt-4">
                        View Category
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

