import { ImageResponse } from 'next/og';

export const ogSize = {
  width: 1200,
  height: 630,
} as const;

export async function loadBrandFonts() {
  try {
    const [regular, semibold] = await Promise.all([
      fetch(
        'https://fonts.gstatic.com/s/cormorantgaramond/v16/co3WmX5slCNRHLxK3NQj.woff'
      ).then((res) => res.arrayBuffer()),
      fetch(
        'https://fonts.gstatic.com/s/cormorantgaramond/v16/co3ZmX5slCNRHLxK3NQGWX5.woff'
      ).then((res) => res.arrayBuffer()),
    ]);

    return [
      { name: 'Cormorant', data: regular, weight: 400 as const, style: 'normal' as const },
      { name: 'Cormorant', data: semibold, weight: 600 as const, style: 'normal' as const },
    ];
  } catch {
    return [];
  }
}

export function BrandShareMark({
  compact = false,
  tiny = false,
}: {
  compact?: boolean;
  tiny?: boolean;
}) {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0A0A0A',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: tiny ? 3 : compact ? 8 : 48,
          border: '1px solid rgba(184, 147, 74, 0.35)',
        }}
      />
      {!compact && !tiny && (
        <div
          style={{
            fontSize: 22,
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            color: '#D4AF6E',
            marginBottom: 28,
            fontFamily: 'Cormorant, Georgia, serif',
          }}
        >
          Fine Jewelry
        </div>
      )}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          fontSize: tiny ? 14 : compact ? 52 : 132,
          lineHeight: 1,
          fontFamily: 'Cormorant, Georgia, serif',
          fontWeight: 600,
          color: '#FFFFFF',
        }}
      >
        AG{' '}
        <span
          style={{
            color: '#B8934A',
            fontStyle: 'italic',
            marginLeft: tiny ? 2 : compact ? 6 : 16,
          }}
        >
          LUXE
        </span>
      </div>
      {!compact && !tiny && (
        <>
          <div
            style={{
              width: 120,
              height: 1,
              background: 'linear-gradient(90deg, transparent, #B8934A, transparent)',
              marginTop: 36,
              marginBottom: 28,
            }}
          />
          <div
            style={{
              fontSize: 24,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.55)',
              fontFamily: 'Cormorant, Georgia, serif',
            }}
          >
            Timeless. Refined. Yours.
          </div>
        </>
      )}
    </div>
  );
}

export async function renderBrandImage(size: { width: number; height: number }) {
  const fonts = await loadBrandFonts();
  const tiny = size.width <= 32;
  const compact = !tiny && size.width <= 180;

  return new ImageResponse(<BrandShareMark compact={compact} tiny={tiny} />, {
    ...size,
    fonts,
  });
}
