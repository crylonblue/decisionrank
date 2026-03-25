import { ImageResponse } from 'next/og';
import { getCategoryBySlug } from '@/lib/data';

export const runtime = 'edge';
export const alt = 'DecisionRank Category Rankings';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const categoryIcons: Record<string, string> = {
  electronics: '🔌',
  fitness: '💪',
  'home-kitchen': '🏠',
  gaming: '🎮',
  audio: '🎧',
  productivity: '⚡',
  photography: '📷',
  'smart-home': '🏡',
  outdoor: '🏕️',
  'standing-desks': '🪑',
  'wireless-earbuds': '🎵',
  'air-purifiers': '🌿',
};

export default async function Image({ params }: { params: { category: string } }) {
  let categoryName = params.category
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  try {
    const category = await getCategoryBySlug(params.category);
    categoryName = category.name;
  } catch {
    // fallback
  }

  const icon = categoryIcons[params.category] || '📊';

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          padding: '60px',
        }}
      >
        <div style={{ fontSize: '72px', marginBottom: '24px' }}>{icon}</div>
        <div
          style={{
            fontSize: '52px',
            fontWeight: 800,
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.2,
            marginBottom: '16px',
          }}
        >
          {categoryName} Rankings
        </div>
        <div
          style={{
            fontSize: '24px',
            color: '#94a3b8',
            textAlign: 'center',
            maxWidth: '800px',
            lineHeight: 1.4,
          }}
        >
          Compare the best products — research-backed editorial rankings
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
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
