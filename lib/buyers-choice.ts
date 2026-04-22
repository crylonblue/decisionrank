import type { CategoryWithProducts } from './data';
import type { RankingProductWithDetails, Specification, SentimentWithUser } from './types';

export type BuyerChoicePick = {
  product: RankingProductWithDetails['product'];
  score: number;
  badge: 'Best Overall' | 'Best for Budget' | 'Best for Enterprise';
  quickVerdict: string;
  rankingContext: {
    rankingQuestion: string;
    rankPosition: number;
    score: number;
  };
  specifications: Array<{ name: string; value: string; unit?: string | null }>;
  assets: RankingProductWithDetails['product']['assets'];
};

function computeBestOverall(products: RankingProductWithContext[]): BuyerChoicePick | null {
  if (products.length === 0) return null;
  const best = products.reduce((max, p) => (p.score > max.score ? p : max), products[0]);
  const topPros = best.sentiments
    .filter((s: SentimentWithUser) => s.type === 'pro')
    .slice(0, 2)
    .map((s: SentimentWithUser) => s.headline || s.content)
    .filter(Boolean) as string[];

  const quickVerdict = topPros.length > 0
    ? `${best.product.name} delivers top-tier performance with ${topPros.join(' and ')}. The #1 pick for most buyers in this category.`
    : `Top-ranked overall with a score of ${best.score.toFixed(1)}/10. ${best.product.name} leads the category across our test criteria.`;

  return {
    product: best.product,
    score: best.score,
    badge: 'Best Overall',
    quickVerdict,
    rankingContext: {
      rankingQuestion: best.rankingQuestion,
      rankPosition: best.rank_position,
      score: best.score,
    },
    specifications: best.specifications,
    assets: best.product.assets || [],
  };
}

function computeBestForBudget(products: RankingProductWithContext[], categorySlug: string): BuyerChoicePick | null {
  // Find products with price/cost info
  interface PriceInfo {
    rp: RankingProductWithDetails;
    costSpec: Specification;
  }
  const productsWithPrice: PriceInfo[] = products
    .map((rp: RankingProductWithDetails) => {
      const costSpec = rp.specifications.find(
        (s: Specification) => s.name.toLowerCase() === 'cost' || s.name.toLowerCase() === 'price'
      ) as Specification | undefined;
      if (!costSpec) return null as any;
      return { rp, costSpec } as PriceInfo;
    })
    .filter((p): p is PriceInfo => p !== null && p !== undefined);

  if (productsWithPrice.length === 0) {
    return null;
  }

  // Scored by numeric cost
  interface ScoredProduct {
    rp: RankingProductWithDetails;
    costNum: number | null;
    costRaw: string;
  }
  const scored: ScoredProduct[] = productsWithPrice.map(({ rp, costSpec }) => {
    const val = costSpec.value.toLowerCase();
    const numeric = parseFloat(val.replace(/[^0-9.]/g, ''));
    const isNumeric = !isNaN(numeric) && numeric > 0;
    return {
      rp,
      costNum: isNumeric ? numeric : null,
      costRaw: val,
    };
  });

  // Separate free/open-source vs paid
  const freeProducts = scored.filter((s: ScoredProduct) => 
    s.costRaw.includes('free') || s.costRaw.includes('open-source') || s.costRaw.includes('no cost')
  );
  if (freeProducts.length > 0) {
    const bestFree = freeProducts.reduce(
      (max: ScoredProduct, s: ScoredProduct) => (s.rp.score > max.rp.score ? s : max),
      freeProducts[0]
    );
    const rp = bestFree.rp;
    const topPros = rp.sentiments
      .filter((s: SentimentWithUser) => s.type === 'pro')
      .slice(0, 2)
      .map((s: SentimentWithUser) => s.headline || s.content)
      .filter(Boolean) as string[];
    const quickVerdict = topPros.length > 0
      ? `${rp.product.name} offers excellent value at no cost, with ${topPros.join(' and ')}. Perfect for those on a tight budget.`
      : `Best free option with a score of ${rp.score.toFixed(1)}/10. ${rp.product.name} provides solid features without the price tag.`;
    return {
      product: rp.product,
      score: rp.score,
      badge: 'Best for Budget',
      quickVerdict,
      rankingContext: { rankingQuestion: (rp as any).rankingQuestion || rp.ranking_id, rankPosition: rp.rank_position, score: rp.score },
      specifications: rp.specifications,
      assets: rp.product.assets || [],
    };
  }

  // Among paid, prefer lowest numeric cost
  const numericPaid = scored.filter((s: ScoredProduct) => s.costNum !== null && s.costNum > 0);
  if (numericPaid.length > 0) {
    const sorted = [...numericPaid].sort((a: ScoredProduct, b: ScoredProduct) => (a.costNum as number) - (b.costNum as number));
    const cheapest = sorted[0];
    const rp = cheapest.rp;
    const topPros = rp.sentiments
      .filter((s: SentimentWithUser) => s.type === 'pro')
      .slice(0, 2)
      .map((s: SentimentWithUser) => s.headline || s.content)
      .filter(Boolean) as string[];
    const quickVerdict = topPros.length > 0
      ? `${rp.product.name} is the most budget-friendly at $${(cheapest.costNum as number).toFixed(0)}, with ${topPros.join(' and ')}. Great value for the price.`
      : `Best value pick at $${(cheapest.costNum as number).toFixed(0)} with a score of ${rp.score.toFixed(1)}/10. ${rp.product.name} is the most affordable top-tier option.`;
    return {
      product: rp.product,
      score: rp.score,
      badge: 'Best for Budget',
      quickVerdict,
      rankingContext: { rankingQuestion: (rp as any).rankingQuestion || rp.ranking_id, rankPosition: rp.rank_position, score: rp.score },
      specifications: rp.specifications,
      assets: rp.product.assets || [],
    };
  }

  return null;
}

function computeBestForEnterprise(products: RankingProductWithContext[]): BuyerChoicePick | null {
  const enterpriseKeywords = [
    'team', 'enterprise', 'business', 'organization', 'admin', 'ssо', 'single sign-on',
    'security', 'compliance', 'audit', 'management', 'deployment', 'support', 'sla',
    'custom', 'integration', 'scal', 'cloud', 'on-premise', 'hybrid',
  ];

  interface EnterpriseScore {
    rp: RankingProductWithDetails;
    score: number;
    enterpriseHits: number;
    enterpriseCons: number;
    weight: number;
  }

  const scored: EnterpriseScore[] = products
    .map((rp: RankingProductWithDetails) => {
      const textTokens = [
        rp.product.name,
        ...rp.specifications.map((s: Specification) => s.name + ' ' + s.value),
        ...rp.sentiments
          .filter((s: SentimentWithUser) => s.type === 'pro')
          .map((s: SentimentWithUser) => s.headline || s.content || ''),
      ].join(' ').toLowerCase();

      const hitCount = enterpriseKeywords.filter((kw) => textTokens.includes(kw)).length;

      const enterpriseCons = rp.sentiments
        .filter((s: SentimentWithUser) => s.type === 'con' && enterpriseKeywords.some((kw) => (s.content || '').toLowerCase().includes(kw)))
        .length;

      return { rp, score: rp.score, enterpriseHits: hitCount, enterpriseCons, weight: hitCount - enterpriseCons };
    })
    .filter((s: EnterpriseScore) => s.weight > 0);

  if (scored.length === 0) {
    const sortedByScore = [...products].sort((a, b) => b.score - a.score).slice(0, Math.max(3, Math.floor(products.length / 2)));
    for (const rp of sortedByScore) {
      const nameLower = rp.product.name.toLowerCase();
      const hasEnterprise = enterpriseKeywords.some((kw) => nameLower.includes(kw));
      if (hasEnterprise) {
        const topPros = rp.sentiments
          .filter((s: SentimentWithUser) => s.type === 'pro')
          .slice(0, 2)
          .map((s: SentimentWithUser) => s.headline || s.content)
          .filter(Boolean) as string[];
        const quickVerdict = topPros.length > 0
          ? `${rp.product.name} is built for teams and organizations, with ${topPros.join(' and ')}. Our top pick for enterprise use.`
          : `Best for enterprise environments (score: ${rp.score.toFixed(1)}/10). ${rp.product.name} offers the scalability and management features businesses need.`;
        return {
          product: rp.product,
          score: rp.score,
          badge: 'Best for Enterprise',
          quickVerdict,
          rankingContext: { rankingQuestion: (rp as any).rankingQuestion || rp.ranking_id, rankPosition: rp.rank_position, score: rp.score },
          specifications: rp.specifications,
          assets: rp.product.assets || [],
        };
      }
    }
    return null;
  }

  scored.sort((a: EnterpriseScore, b: EnterpriseScore) => b.weight - a.weight || b.score - a.score);
  const best = scored[0].rp;
  const topPros = best.sentiments
    .filter((s: SentimentWithUser) => s.type === 'pro')
    .slice(0, 2)
    .map((s: SentimentWithUser) => s.headline || s.content)
    .filter(Boolean) as string[];
  const quickVerdict = topPros.length > 0
    ? `${best.product.name} excels for business use with ${topPros.join(' and ')}. The top choice for teams scaling up.`
    : `Best for enterprise teams (score: ${best.score.toFixed(1)}/10). ${best.product.name} provides the robustness and controls businesses require.`;

  return {
    product: best.product,
    score: best.score,
    badge: 'Best for Enterprise',
    quickVerdict,
    rankingContext: { rankingQuestion: (best as any).rankingQuestion || best.ranking_id, rankPosition: best.rank_position, score: best.score },
    specifications: best.specifications,
    assets: best.product.assets || [],
  };
}

// Helper type that extends RankingProductWithDetails with ranking context
type RankingProductWithContext = RankingProductWithDetails & {
  rankingQuestion: string;
};

// Main export: compute buyer's choice picks from category data
export function computeBuyersChoice(category: CategoryWithProducts): BuyerChoicePick[] {
  // Collect all ranking products across all rankings in this category, enriching with ranking question
  const allRankingProducts: RankingProductWithContext[] = [];
  for (const ranking of category.rankings) {
    for (const rp of ranking.ranking_products) {
      allRankingProducts.push({
        ...rp,
        rankingQuestion: ranking.question,
      });
    }
  }

  // Deduplicate products by product_id, keeping highest score and its ranking context
  const productMap = new Map<string, RankingProductWithContext>();
  for (const rp of allRankingProducts) {
    const existing = productMap.get(rp.product_id);
    if (!existing || rp.score > existing.score) {
      productMap.set(rp.product_id, rp);
    }
  }
  const uniqueProducts = Array.from(productMap.values());

  const picks: BuyerChoicePick[] = [];

  // Best Overall: highest score
  const bestOverall = computeBestOverall(uniqueProducts);
  if (bestOverall) picks.push(bestOverall);

  // Best for Budget
  const bestBudget = computeBestForBudget(uniqueProducts, category.slug);
  if (bestBudget) picks.push(bestBudget);

  // Best for Enterprise
  const bestEnterprise = computeBestForEnterprise(uniqueProducts);
  if (bestEnterprise) picks.push(bestEnterprise);

  return picks;
}
