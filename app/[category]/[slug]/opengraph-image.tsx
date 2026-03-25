import { ImageResponse } from 'next/og';
import { getRankingBySlug } from '@/lib/data';

export const runtime = 'edge';
export const alt = 'DecisionRank Product Ranking';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: { category: string; slug: string };
}) {
  let question = params.slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  let categoryName = params.category
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  let productCount = 0;
  let topProducts: string[] = [];

  try {
    const ranking = await getRankingBySlug(params.slug, params.category);
    question = ranking.question;
    categoryName = ranking.category.name;
    productCount = ranking.ranking_products.length;
    topProducts = ranking.ranking_products
      .slice(0, 3)
      .map(
        (rp: { rank_position: number; product: { name: string }; score: number }) =>
          `#${rp.rank_position} ${rp.product.name}`
      );
  } catch {
    // Use formatted slugs as fallback
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'system-ui, sans-serif',
          padding: '60px',
        }}
      >
        {/* Category badge */}
        <div
          style={{
            display: 'flex',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              background: 'rgba(99, 102, 241, 0.2)',
              border: '1px solid rgba(99, 102, 241, 0.4)',
              borderRadius: '9999px',
              padding: '8px 20px',
              fontSize: '18px',
              color: '#a5b4fc',
            }}
          >
            {categoryName}
          </div>
        </div>

        {/* Question / title */}
        <div
          style={{
            fontSize: question.length > 50 ? '40px' : '48px',
            fontWeight: 800,
            color: 'white',
            lineHeight: 1.2,
            marginBottom: '28px',
            maxWidth: '900px',
          }}
        >
          {question}
        </div>

        {/* Top products preview */}
        {topProducts.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              marginBottom: '20px',
            }}
          >
            {topProducts.map((p) => (
              <div
                key={p}
                style={{
                  fontSize: '22px',
                  color: '#cbd5e1',
                }}
              >
                {p}
              </div>
            ))}
          </div>
        )}

        {/* Product count */}
        {productCount > 0 && (
          <div style={{ fontSize: '18px', color: '#64748b', marginTop: 'auto' }}>
            {productCount} products compared
          </div>
        )}

        {/* Brand */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '60px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              fontSize: '16px',
              color: 'white',
            }}
          >
            DR
          </div>
          <span style={{ color: '#64748b', fontSize: '20px' }}>DecisionRank</span>
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '6px',
            background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
