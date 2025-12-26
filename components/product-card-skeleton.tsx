import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
          <div className="flex gap-6 w-full">
            {/* Image skeleton */}
            <div className="w-[140px] h-[140px] rounded-xl bg-muted flex-shrink-0 animate-shimmer" />
            
            <div className="flex-1 space-y-3">
              {/* Title skeleton */}
              <div className="h-8 w-3/4 bg-muted rounded animate-shimmer" />
              
              {/* Description skeleton */}
              <div className="space-y-2">
                <div className="h-4 w-full bg-muted rounded animate-shimmer" />
                <div className="h-4 w-5/6 bg-muted rounded animate-shimmer" />
              </div>
              
              {/* Link skeleton */}
              <div className="h-4 w-32 bg-muted rounded animate-shimmer" />
            </div>
          </div>
          
          {/* Score section skeleton */}
          <div className="text-right sm:text-left sm:min-w-[140px]">
            <div className="h-4 w-24 bg-muted rounded mb-2 animate-shimmer" />
            <div className="h-10 w-16 bg-muted rounded mb-2 animate-shimmer" />
            <div className="h-6 w-20 bg-muted rounded animate-shimmer" />
          </div>
        </div>
      </CardHeader>

      {/* Specifications skeleton */}
      <CardContent>
        <Separator className="mb-6" />
        <div className="h-4 w-32 bg-muted rounded mb-4 animate-shimmer" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 w-20 bg-muted rounded animate-shimmer" />
              <div className="h-4 w-16 bg-muted rounded animate-shimmer" />
            </div>
          ))}
        </div>
      </CardContent>

      {/* Pros and Cons skeleton */}
      <CardContent>
        <Separator className="mb-6" />
        <div className="grid gap-8 sm:grid-cols-2">
          {/* Pros skeleton */}
          <div>
            <div className="h-4 w-16 bg-muted rounded mb-4 animate-shimmer" />
            <ul className="space-y-6">
              {[1, 2].map((i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex-shrink-0 animate-shimmer" />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-12 bg-muted rounded animate-shimmer" />
                      <div className="h-4 w-3/4 bg-muted rounded animate-shimmer" />
                    </div>
                    <div className="h-3 w-full bg-muted rounded animate-shimmer" />
                    <div className="h-3 w-5/6 bg-muted rounded animate-shimmer" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Cons skeleton */}
          <div>
            <div className="h-4 w-16 bg-muted rounded mb-4 animate-shimmer" />
            <ul className="space-y-6">
              {[1, 2].map((i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex-shrink-0 animate-shimmer" />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-12 bg-muted rounded animate-shimmer" />
                      <div className="h-4 w-3/4 bg-muted rounded animate-shimmer" />
                    </div>
                    <div className="h-3 w-full bg-muted rounded animate-shimmer" />
                    <div className="h-3 w-5/6 bg-muted rounded animate-shimmer" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

