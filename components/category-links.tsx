import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Category } from '@/lib/types';

interface CategoryLinksProps {
  categories: Category[];
  rankingCounts?: Record<string, number>;
  title?: string;
  description?: string;
  className?: string;
}

export function CategoryLinks({
  categories,
  rankingCounts = {},
  title = "Browse Categories",
  description,
  className = ""
}: CategoryLinksProps) {
  if (!categories || categories.length === 0) {
    return null;
  }

  // Limit to 4 categories for internal linking blocks
  const displayCategories = categories.slice(0, 4);

  return (
    <section className={`mb-12 ${className}`}>
      {title && (
        <h2 className="text-2xl font-bold text-foreground mb-6">{title}</h2>
      )}
      {description && (
        <p className="text-sm text-muted-foreground mb-6">{description}</p>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {displayCategories.map((category) => {
          const count = rankingCounts[category.id] || 0;
          return (
            <Link
              key={category.id}
              href={`/${category.slug}`}
              className="group"
            >
              <Card className="h-full transition-all hover:shadow-md hover:border-slate-400/50 hover:-translate-y-0.5 cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-base group-hover:text-slate-600 transition-colors">
                    {category.name}
                  </CardTitle>
                  {category.description && (
                    <CardDescription className="line-clamp-2 text-xs">
                      {category.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  {count > 0 && (
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {count} {count === 1 ? 'ranking' : 'rankings'}
                      </Badge>
                      <span className="text-xs font-medium text-slate-500 group-hover:text-slate-600 group-hover:gap-1 transition-all flex items-center">
                        View
                        <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
