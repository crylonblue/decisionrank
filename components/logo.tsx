import Link from 'next/link';
import { ChartNoAxesColumn } from 'lucide-react';

interface LogoProps {
  variant?: 'link' | 'div';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Logo({ variant = 'link', size = 'md', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: {
      icon: 'h-3 w-3',
      text: 'text-base',
    },
    md: {
      icon: 'h-4 w-4',
      text: 'text-lg',
    },
    lg: {
      icon: 'h-5 w-5',
      text: 'text-xl',
    },
  };

  const sizeConfig = sizeClasses[size];
  const baseClasses = `flex items-center gap-1.5 font-bold ${sizeConfig.text} ${className}`;
  const iconClasses = `${sizeConfig.icon} text-slate-600`;
  const textClasses = 'bg-gradient-to-r from-slate-600 to-slate-500 bg-clip-text text-transparent';

  const content = (
    <>
      <ChartNoAxesColumn className={iconClasses} strokeWidth={3} />
      <span className={textClasses}>
        DecisionRank
      </span>
    </>
  );

  if (variant === 'link') {
    return (
      <Link 
        href="/" 
        className={`${baseClasses} text-foreground transition-colors hover:text-primary`}
      >
        {content}
      </Link>
    );
  }

  return (
    <div className={baseClasses}>
      {content}
    </div>
  );
}
