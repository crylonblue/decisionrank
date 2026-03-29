import Link from 'next/link';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Search, Grid3X3 } from 'lucide-react';
import { Suspense } from 'react';

export default function NotFound() {
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

      <main className="flex-1 flex items-center justify-center">
        <div className="mx-auto max-w-2xl px-4 py-20 text-center">
          {/* 404 indicator */}
          <div className="mb-6 text-8xl font-bold tracking-tighter text-slate-200 select-none">
            404
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-3 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. 
            Try searching for what you need, or browse our categories.
          </p>

          {/* Action cards */}
          <div className="grid gap-4 sm:grid-cols-3 mb-10">
            <Link href="/">
              <Card className="group h-full transition-all hover:shadow-md hover:border-slate-400/50 cursor-pointer">
                <CardContent className="flex flex-col items-center gap-2 p-6">
                  <Home className="h-6 w-6 text-slate-500 group-hover:text-slate-700 transition-colors" />
                  <span className="text-sm font-medium text-foreground">Home</span>
                </CardContent>
              </Card>
            </Link>
            <Link href="/?search=">
              <Card className="group h-full transition-all hover:shadow-md hover:border-slate-400/50 cursor-pointer">
                <CardContent className="flex flex-col items-center gap-2 p-6">
                  <Search className="h-6 w-6 text-slate-500 group-hover:text-slate-700 transition-colors" />
                  <span className="text-sm font-medium text-foreground">Search</span>
                </CardContent>
              </Card>
            </Link>
            <Link href="/categories">
              <Card className="group h-full transition-all hover:shadow-md hover:border-slate-400/50 cursor-pointer">
                <CardContent className="flex flex-col items-center gap-2 p-6">
                  <Grid3X3 className="h-6 w-6 text-slate-500 group-hover:text-slate-700 transition-colors" />
                  <span className="text-sm font-medium text-foreground">Categories</span>
                </CardContent>
              </Card>
            </Link>
          </div>

          <Link href="/">
            <Button variant="outline" size="lg">
              Back to Homepage
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
