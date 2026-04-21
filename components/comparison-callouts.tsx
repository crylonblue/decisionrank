import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Scale, Lightbulb, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import type { Category } from '@/lib/types';

/* -----------------------------------------------------------------------
   CrossCategoryComparison — single callout linking to a related category
   ----------------------------------------------------------------------- */
export interface CrossCategoryComparison {
  title: string;
  description: string;
  relatedCategorySlug: string;
  relatedCategoryName: string;
  type: 'vs' | 'alternative' | 'upgrade';
}

interface ComparisonCalloutCardProps {
  comparison: CrossCategoryComparison;
}

function ComparisonCalloutCard({ comparison }: ComparisonCalloutCardProps) {
  const typeConfig = {
    'vs': { icon: Scale, label: 'Compare', color: 'text-indigo-500' },
    'alternative': { icon: Lightbulb, label: 'Alternative', color: 'text-amber-500' },
    'upgrade': { icon: ArrowUpRight, label: 'Upgrade', color: 'text-emerald-500' },
  };

  const config = typeConfig[comparison.type];
  const IconComponent = config.icon;

  return (
    <Card className="h-full transition-all hover:shadow-lg hover:border-slate-400/50 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 mb-2">
          <IconComponent className={`h-4 w-4 ${config.color}`} />
          <Badge variant="secondary" className="text-xs font-medium tracking-wide uppercase">
            {config.label}
          </Badge>
        </div>
        <CardTitle className="text-lg leading-snug">
          {comparison.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {comparison.description}
        </p>
        <Link 
          href={`/${comparison.relatedCategorySlug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors group"
        >
          <span>Explore {comparison.relatedCategoryName}</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </CardContent>
    </Card>
  );
}

/* -----------------------------------------------------------------------
   ComparisonCallouts — 2-3 comparison callouts with related category links
   ----------------------------------------------------------------------- */
interface ComparisonCalloutsProps {
  categorySlug: string;
  categoryName: string;
  relatedCategories: Category[];
}

export function ComparisonCallouts({ categorySlug, categoryName, relatedCategories }: ComparisonCalloutsProps) {
  if (!relatedCategories || relatedCategories.length === 0) {
    return null;
  }

  // Build 2-3 comparison callouts based on related categories
  const callouts: CrossCategoryComparison[] = [];
  
  // Primary comparison: vs the most related category
  const primaryRelated = relatedCategories[0];
  if (primaryRelated) {
    callouts.push({
      title: `${categoryName} vs ${primaryRelated.name}`,
      description: `Compare top ${categoryName.toLowerCase()} with ${primaryRelated.name.toLowerCase()} to find the best fit for your needs, budget, and kitchen setup.`,
      relatedCategorySlug: primaryRelated.slug,
      relatedCategoryName: primaryRelated.name,
      type: 'vs',
    });
  }
  
  // Alternative pick: from second related category
  const secondRelated = relatedCategories[1];
  if (secondRelated) {
    callouts.push({
      title: `Best ${secondRelated.name} Alternatives`,
      description: `Looking for ${secondRelated.name.toLowerCase()}? See how top ${categoryName.toLowerCase()} compare as alternatives for your specific use case.`,
      relatedCategorySlug: secondRelated.slug,
      relatedCategoryName: secondRelated.name,
      type: 'alternative',
    });
  }
  
  // Upgrade path: from third related category  
  const thirdRelated = relatedCategories[2];
  if (thirdRelated) {
    callouts.push({
      title: `Consider ${thirdRelated.name}`,
      description: `${thirdRelated.name} offer different capabilities and price points that might better match your specific requirements.`,
      relatedCategorySlug: thirdRelated.slug,
      relatedCategoryName: thirdRelated.name,
      type: 'upgrade',
    });
  }

  if (callouts.length === 0) {
    return null;
  }

  return (
    <section className="py-14 sm:py-16 border-t border-border/50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-2">
          <Scale className="h-5 w-5 text-indigo-500" />
          <span className="text-sm font-medium text-indigo-700 uppercase tracking-wide">
            Not Sure Which?
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-2">
          {categoryName} vs Related Categories
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Compare {categoryName.toLowerCase()} with alternative and complementary categories to find the perfect match for your home, workspace, or lifestyle.
        </p>

        {/* Callouts grid — 2-3 cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {callouts.slice(0, 3).map((callout, idx) => (
            <ComparisonCalloutCard
              key={`callout-${idx}`}
              comparison={callout}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
