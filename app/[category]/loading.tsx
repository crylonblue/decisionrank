import { Card, CardHeader } from '@/components/ui/card';

export default function CategoryLoading() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Nav skeleton */}
      <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="h-6 w-36 rounded bg-slate-200 animate-pulse" />
            <div className="h-9 w-48 rounded-lg bg-slate-100 animate-pulse" />
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Breadcrumb skeleton */}
          <div className="flex items-center gap-2 mb-6">
            <div className="h-4 w-12 rounded bg-slate-100 animate-pulse" />
            <div className="h-4 w-4 rounded bg-slate-100 animate-pulse" />
            <div className="h-4 w-24 rounded bg-slate-200 animate-pulse" />
          </div>

          {/* Title skeleton */}
          <div className="mb-8">
            <div className="h-12 w-64 rounded bg-slate-200 animate-pulse mb-3" />
            <div className="h-5 w-96 max-w-full rounded bg-slate-100 animate-pulse" />
          </div>

          {/* Ranking cards skeleton */}
          <div className="space-y-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="h-6 w-3/4 rounded bg-slate-200 animate-pulse" />
                  <div className="h-4 w-full rounded bg-slate-100 animate-pulse mt-2" />
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
