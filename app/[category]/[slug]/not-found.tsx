import Link from 'next/link';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Suspense } from 'react';

export default function RankingNotFound() {
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
          <Breadcrumbs items={[{ label: 'Not Found' }]} />

          <div className="py-16 text-center">
            <div className="mb-4 text-6xl font-bold tracking-tighter text-slate-200 select-none">
              404
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-3">
              Ranking Not Found
            </h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              This ranking doesn&apos;t exist or may have been moved.
              Try searching for what you need or browse our categories.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link href="/categories">
                <Button>Browse Categories</Button>
              </Link>
              <Link href="/">
                <Button variant="outline">Go Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
