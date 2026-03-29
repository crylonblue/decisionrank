import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function HomeLoading() {
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

      {/* Hero skeleton */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-100 via-slate-50/60 to-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="h-14 w-96 max-w-full rounded bg-slate-200 animate-pulse mx-auto" />
            <div className="h-6 w-80 max-w-full rounded bg-slate-100 animate-pulse mx-auto mt-6" />
            <div className="h-14 w-full max-w-2xl rounded-xl bg-white border-2 border-slate-100 mx-auto mt-10" />
          </div>
        </div>
      </section>

      {/* Rankings grid skeleton */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="h-9 w-64 rounded bg-slate-200 animate-pulse mx-auto" />
            <div className="h-5 w-80 rounded bg-slate-100 animate-pulse mx-auto mt-4" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="h-full">
                <CardHeader>
                  <div className="h-5 w-20 rounded bg-slate-100 animate-pulse mb-2" />
                  <div className="h-6 w-full rounded bg-slate-200 animate-pulse" />
                  <div className="h-4 w-3/4 rounded bg-slate-100 animate-pulse mt-2" />
                </CardHeader>
                <CardContent>
                  <div className="h-4 w-24 rounded bg-slate-100 animate-pulse mt-4" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
