import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function RankingDetailLoading() {
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
            <div className="h-4 w-24 rounded bg-slate-100 animate-pulse" />
            <div className="h-4 w-4 rounded bg-slate-100 animate-pulse" />
            <div className="h-4 w-40 rounded bg-slate-200 animate-pulse" />
          </div>

          {/* Title skeleton */}
          <div className="h-12 w-3/4 rounded bg-slate-200 animate-pulse mb-4" />
          <div className="h-5 w-full rounded bg-slate-100 animate-pulse mb-4" />

          {/* Date/meta skeleton */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-4 w-36 rounded bg-slate-100 animate-pulse" />
            <div className="h-4 w-36 rounded bg-slate-100 animate-pulse" />
            <div className="h-4 w-28 rounded bg-slate-100 animate-pulse" />
          </div>

          {/* Verdict card skeleton */}
          <Card className="mb-8 border-slate-200/50 bg-slate-50/30">
            <CardHeader>
              <div className="h-6 w-20 rounded bg-slate-200 animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-slate-100 animate-pulse" />
                <div className="h-4 w-5/6 rounded bg-slate-100 animate-pulse" />
                <div className="h-4 w-4/6 rounded bg-slate-100 animate-pulse" />
              </div>
            </CardContent>
          </Card>

          {/* Methodology link skeleton */}
          <div className="h-4 w-72 rounded bg-slate-100 animate-pulse mb-8" />

          {/* Table skeleton */}
          <div className="border rounded-lg overflow-hidden mb-8">
            <div className="bg-slate-50 px-4 py-3 border-b">
              <div className="flex items-center gap-4">
                <div className="h-4 w-8 rounded bg-slate-200 animate-pulse" />
                <div className="h-4 w-32 rounded bg-slate-200 animate-pulse" />
                <div className="h-4 w-16 rounded bg-slate-200 animate-pulse ml-auto" />
              </div>
            </div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="px-4 py-4 border-b last:border-0">
                <div className="flex items-center gap-4">
                  <div className="h-5 w-6 rounded bg-slate-100 animate-pulse" />
                  <div className="h-5 w-40 rounded bg-slate-200 animate-pulse" />
                  <div className="h-8 w-12 rounded-full bg-slate-100 animate-pulse ml-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
