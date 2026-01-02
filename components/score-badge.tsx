interface ScoreBadgeProps {
  score: number;
  size?: 'small' | 'medium' | 'large' | 'headline';
  showMaxScore?: boolean; // Show "/100" indicator
}

export function ScoreBadge({ score, size = 'medium', showMaxScore = true }: ScoreBadgeProps) {
  // Determine score color and gradient
  const getScoreStyle = () => {
    if (score >= 80) {
      return {
        gradient: 'from-green-500 via-emerald-500 to-teal-500',
        shadow: 'shadow-green-500/30',
      };
    } else if (score >= 60) {
      return {
        gradient: 'from-yellow-500 via-amber-500 to-orange-500',
        shadow: 'shadow-yellow-500/30',
      };
    } else {
      return {
        gradient: 'from-red-500 via-rose-500 to-pink-500',
        shadow: 'shadow-red-500/30',
      };
    }
  };

  const scoreStyle = getScoreStyle();

  // Size variants
  const sizeClasses = {
    small: {
      container: 'px-2 py-1 rounded-lg',
      overlay: 'rounded-lg',
      text: 'text-sm',
      corner: 'w-2 h-2 -top-0.5 -right-0.5',
    },
    medium: {
      container: 'px-4 py-2 rounded-2xl',
      overlay: 'rounded-2xl',
      text: 'text-xl',
      corner: 'w-3 h-3 -top-1 -right-1',
    },
    large: {
      container: 'px-5 py-3 rounded-2xl',
      overlay: 'rounded-2xl',
      text: 'text-2xl',
      corner: 'w-3 h-3 -top-1 -right-1',
    },
    headline: {
      container: 'px-4 py-2 rounded-2xl',
      overlay: 'rounded-2xl',
      text: 'text-2xl',
      corner: 'w-3 h-3 -top-1 -right-1',
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={`relative bg-gradient-to-br ${scoreStyle.gradient} ${currentSize.container} inline-block`}>
      <div className={`absolute inset-0 bg-gradient-to-br from-white/20 to-transparent ${currentSize.overlay}`}></div>
      <span className={`relative ${currentSize.text} font-bold text-white drop-shadow-md`}>
        {score.toFixed(1)}
        {showMaxScore && (
          <span className="text-white/70 font-bold" style={{ fontSize: '0.6em' }}>/100</span>
        )}
      </span>
      {/* Decorative corner accent */}
      <div className={`absolute ${currentSize.corner} bg-white/30 rounded-full`}></div>
    </div>
  );
}

