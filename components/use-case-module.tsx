'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Lightbulb, Search, BarChart2 } from 'lucide-react';
import Link from 'next/link';
import { getCategoryUseCaseData } from '@/lib/category-use-cases';

/* -----------------------------------------------------------------------
   UseCaseBlock — single "Best for X" editorial section targeting a buyer scenario
   ----------------------------------------------------------------------- */
interface UseCaseBlockProps {
  label: string;
  title: string;
  description: string;
  categorySlug: string;
}

function UseCaseBlock({ label, title, description, categorySlug }: UseCaseBlockProps) {
  // Build a long-tail search URL (e.g. /monitors?q=best+gaming+monitor+144hz)
  const searchQuery = encodeURIComponent(title.replace(/^Best\s+/i, '').replace(/\s+/g, '+'));
  const href = `/${categorySlug}?q=${searchQuery}`;

  return (
    <Link href={href} className="group block">
      <Card className="h-full transition-all hover:shadow-lg hover:border-slate-400/50 hover:-translate-y-1 cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="text-xs font-medium tracking-wide uppercase">
              {label}
            </Badge>
          </div>
          <CardTitle className="text-lg group-hover:text-slate-600 transition-colors leading-snug">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
            {description}
          </p>
          <span className="flex items-center text-sm font-medium text-slate-600 group-hover:gap-2 transition-all">
            Browse picks
            <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}

/* -----------------------------------------------------------------------
   QueryIntentRow — single long-tail phrase row rendered as an H3 anchor target
   ----------------------------------------------------------------------- */
const INTENT_COLORS: Record<string, string> = {
  informational: 'bg-blue-50 text-blue-700 border-blue-200',
  transactional: 'bg-green-50 text-green-700 border-green-200',
  comparational: 'bg-amber-50 text-amber-700 border-amber-200',
  navigational: 'bg-purple-50 text-purple-700 border-purple-200',
};

const INTENT_LABELS: Record<string, string> = {
  informational: 'Guide',
  transactional: 'Buy',
  comparational: 'Compare',
  navigational: 'Find',
};

interface QueryIntentRowProps {
  phrase: string;
  intent: string;
  categorySlug: string;
}

function QueryIntentRow({ phrase, intent, categorySlug }: QueryIntentRowProps) {
  const searchQuery = encodeURIComponent(phrase);
  const href = `/${categorySlug}?q=${searchQuery}`;

  return (
    <Link
      href={href}
      className="flex items-center justify-between gap-3 py-2 px-3 rounded-md border border-transparent hover:border-slate-200 hover:bg-slate-50/50 transition-all group"
    >
      <span className="text-sm text-foreground group-hover:text-slate-700 transition-colors">
        {phrase}
      </span>
      <Badge
        className={`shrink-0 text-xs ${INTENT_COLORS[intent] ?? 'bg-slate-50 text-slate-600 border-slate-200'}`}
      >
        {INTENT_LABELS[intent] ?? intent}
      </Badge>
    </Link>
  );
}

/* -----------------------------------------------------------------------
   UseCaseModule — full section wrapping use-case cards + query-intent phrases
   ----------------------------------------------------------------------- */
interface UseCaseModuleProps {
  categorySlug: string;
}

const RANKING_BLOCK_LABELS: Record<string, string> = {
  'use-case': 'Use Cases',
  comparison: 'Compare',
  'buyer-questions': 'Buyer Questions',
};

export function UseCaseModule({ categorySlug }: UseCaseModuleProps) {
  const { useCases, queryIntents, rankingDetailBlocks } = getCategoryUseCaseData(categorySlug);

  return (
    <>
      {/* ── Use-case blocks ─────────────────────────────────────────── */}
      <section className="py-14 sm:py-16 border-t border-border/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="flex items-center gap-3 mb-2">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            <span className="text-sm font-medium text-amber-700 uppercase tracking-wide">
              Editor&apos;s Picks
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-2">
            Find the Right Fit for Your Needs
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Beyond general rankings, we break down the best {categorySlug.replace(/-/g, ' ')} for specific
            scenarios — from budget buyers to professional workflows.
          </p>

          {/* Use-case cards grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((uc) => (
              <UseCaseBlock
                key={uc.label}
                label={uc.label}
                title={uc.title}
                description={uc.description}
                categorySlug={categorySlug}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Query-intent long-tail phrases ──────────────────────────── */}
      {queryIntents.length > 0 && (
        <section className="py-10 sm:py-12 bg-muted/20 border-t border-border/50">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-2">
              <Search className="h-5 w-5 text-slate-500" />
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                People Also Search
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-1">
              Common Questions &amp; Search Queries
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Long-tail phrases real buyers search alongside &ldquo;{categorySlug.replace(/-/g, ' ')}&rdquo;,
              each links to ranked results filtered for that intent.
            </p>

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {queryIntents.map((qi) => (
                <QueryIntentRow
                  key={qi.phrase}
                  phrase={qi.phrase}
                  intent={qi.intent}
                  categorySlug={categorySlug}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {rankingDetailBlocks && rankingDetailBlocks.length > 0 && (
        <section className="py-12 sm:py-14 border-t border-border/50">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-2">
              <BarChart2 className="h-5 w-5 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700 uppercase tracking-wide">
                Ranking Detail Intent
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-2">
              Deep-dive ranking paths buyers actually search
            </h2>
            <p className="text-sm text-muted-foreground mb-8 max-w-3xl">
              These grouped long-tail modules turn existing category scenarios, comparisons, and buyer questions into stronger ranking-detail entry points.
            </p>

            <div className="grid gap-5 lg:grid-cols-3">
              {rankingDetailBlocks.map((block) => (
                <Card key={block.title} className="h-full border-slate-200/80">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs font-medium tracking-wide uppercase">
                        {RANKING_BLOCK_LABELS[block.type] ?? 'Ranking'}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg leading-snug">{block.title}</CardTitle>
                    <CardDescription>{block.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {block.queryPhrases.map((phrase) => (
                      <QueryIntentRow
                        key={`${block.title}-${phrase}`}
                        phrase={phrase}
                        intent={block.type === 'comparison' ? 'comparational' : 'transactional'}
                        categorySlug={categorySlug}
                      />
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
