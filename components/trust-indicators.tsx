import { CheckCircle, Clock, Award, TrendingUp, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TrustIndicatorsProps {
  lastUpdated: string;
  researchHours?: number;
  productsTested?: number;
  className?: string;
}

export function TrustIndicators({
  lastUpdated,
  researchHours = 20,
  productsTested = 0,
  className = ""
}: TrustIndicatorsProps) {
  const currentYear = new Date().getFullYear();
  const formattedDate = new Date(lastUpdated).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className={`flex flex-wrap items-center gap-3 text-sm ${className}`}>
      {/* Freshness indicator */}
      <Badge variant="outline" className="gap-1.5 border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors">
        <TrendingUp className="h-3.5 w-3.5" />
        <span>Updated for {currentYear}</span>
      </Badge>

      {/* Expert testing badge */}
      <Badge variant="outline" className="gap-1.5 border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">
        <Award className="h-3.5 w-3.5" />
        <span>Expert tested</span>
      </Badge>

      {/* Research hours callout */}
      {researchHours > 0 && (
        <Badge variant="outline" className="gap-1.5 border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors">
          <Clock className="h-3.5 w-3.5" />
          <span>{researchHours}+ hours of research</span>
        </Badge>
      )}

      {/* Products tested count */}
      {productsTested > 0 && (
        <Badge variant="outline" className="gap-1.5 border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors">
          <Activity className="h-3.5 w-3.5" />
          <span>{productsTested} products tested</span>
        </Badge>
      )}

      {/* Technical freshness date */}
      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Clock className="h-3 w-3" />
        <time dateTime={lastUpdated}>Last updated {formattedDate}</time>
      </span>
    </div>
  );
}
