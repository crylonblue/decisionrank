import { getCategoryBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import type { Ranking } from '@/lib/supabase';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  
  let category;
  try {
    category = await getCategoryBySlug(categorySlug);
  } catch (error) {
    notFound();
  }

  const { rankings } = category;

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
          <div className="space-y-4">
            {rankings.map((ranking: Ranking) => (
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
        )}
      </div>
      </main>
      <Footer />
    </div>
  );
}

