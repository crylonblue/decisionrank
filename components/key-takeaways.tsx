import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import type { RankingProductWithDetails, SentimentWithUser } from '@/lib/types';

interface KeyTakeawaysProps {
  rankingProducts: RankingProductWithDetails[];
  question: string;
}

/**
 * Generates 3–5 concise key takeaways from ranking data.
 * Optimized for Google featured snippet extraction (ordered list format).
 */
function generateTakeaways(
  rankingProducts: RankingProductWithDetails[],
  question: string,
): string[] {
  const sorted = [...rankingProducts].sort((a, b) => a.rank_position - b.rank_position);
  const takeaways: string[] = [];

  if (sorted.length === 0) return takeaways;

  const top = sorted[0];
  const topPros = top.sentiments
    .filter((s: SentimentWithUser) => s.type === 'pro')
    .slice(0, 2);

  // 1. The winner
  const topStrength = topPros[0]
    ? ` — ${(topPros[0].headline || topPros[0].content).toLowerCase()}`
    : '';
  takeaways.push(
    `${top.product.name} leads with a score of ${top.score.toFixed(1)}/100${topStrength}.`,
  );

  // 2. Score spread
  if (sorted.length >= 3) {
    const last = sorted[sorted.length - 1];
    const spread = (top.score - last.score).toFixed(1);
    takeaways.push(
      `Scores range from ${last.score.toFixed(1)} to ${top.score.toFixed(1)} — a ${spread}-point spread across ${sorted.length} products.`,
    );
  }

  // 3. Runner-up differentiator
  if (sorted.length >= 2) {
    const runner = sorted[1];
    const runnerPro = runner.sentiments.find(
      (s: SentimentWithUser) => s.type === 'pro',
    );
    if (runnerPro) {
      takeaways.push(
        `${runner.product.name} (${runner.score.toFixed(1)}) is a strong alternative${runnerPro.headline ? `, especially for ${runnerPro.headline.toLowerCase()}` : ''}.`,
      );
    }
  }

  // 4. Common weakness across top products
  const topConHeadlines = sorted
    .slice(0, 3)
    .flatMap((rp) =>
      rp.sentiments
        .filter((s: SentimentWithUser) => s.type === 'con')
        .map((s: SentimentWithUser) => s.headline || s.content),
    );
  if (topConHeadlines.length > 0) {
    // Pick the first unique con
    const con = topConHeadlines[0];
    takeaways.push(
      `Watch out for trade-offs like ${con.toLowerCase()} even among top-ranked options.`,
    );
  }

  // 5. Product count + methodology nudge
  takeaways.push(
    `All ${sorted.length} products were scored using our research-backed methodology across multiple criteria.`,
  );

  return takeaways.slice(0, 5);
}

export function KeyTakeaways({ rankingProducts, question }: KeyTakeawaysProps) {
  const takeaways = generateTakeaways(rankingProducts, question);

  if (takeaways.length < 2) return null;

  return (
    <Card
      id="key-takeaways"
      className="mb-8 border-indigo-200/40 bg-indigo-50/20 scroll-mt-20"
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-indigo-900">
          <Lightbulb className="h-5 w-5 text-indigo-500" />
          Key Takeaways
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground leading-relaxed">
          {takeaways.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
