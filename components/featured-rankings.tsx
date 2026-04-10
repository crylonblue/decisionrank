import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Star } from 'lucide-react';
import type { Ranking } from '@/lib/types';

interface FeaturedRankingsProps {
  rankings: Ranking[];
  categorySlug: string;
  limit?: number;
  title?: string;
  description?: string;
  className?: string;
}

export function FeaturedRankings({
  rankings,
  categorySlug,
  limit = 4,
  title = "Featured Rankings",
  description,
  className = ""
}: FeaturedRankingsProps) {
  if (!rankings || rankings.length === 0) {
    return null;
  }

  // Take top rankings based on position or most recent
  const featuredRankings = rankings.slice(0, limit);

  return (
    <section className={`mb-12 ${className}`}>
      {title && (
        <h2 className="text-2xl font-bold text-foreground mb-6">{title}</h2>
      )}
      {description && (
        <p className="text-sm text-muted-foreground mb-6">{description}</p>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featuredRankings.map((ranking) => {
          // Build proper path with category slug
          const href = `/${categorySlug}/${ranking.slug}`;

          return (
            <Link
              key={ranking.id}
              href={href}
              className="group"
            >
              <Card className="h-full transition-all hover:shadow-md hover:border-slate-400/50 hover:-translate-y-0.5 cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <span className="text-xs font-medium text-muted-foreground">Featured</span>
                  </div>
                  <CardTitle className="text-base group-hover:text-slate-600 transition-colors line-clamp-2">
                    {ranking.question}
                  </CardTitle>
                  {ranking.description && (
                    <CardDescription className="line-clamp-3 text-xs">
                      {ranking.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm font-medium text-slate-500 group-hover:text-slate-600 group-hover:gap-2 transition-all">
                    Read guide
                    <ArrowRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
