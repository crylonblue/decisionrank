"use client";

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { ExpandedTableModal } from '@/components/expanded-table-modal';
import { ProductAssetCarousel } from '@/components/product-asset-carousel';
import { ScoreBadge } from '@/components/score-badge';
import { Maximize2 } from 'lucide-react';
import type { RankingProductWithDetails } from '@/lib/supabase';

interface RankingTableProps {
  rankingProducts: RankingProductWithDetails[];
  specNames: string[];
}

export function RankingTable({ rankingProducts, specNames }: RankingTableProps) {
  const [isExpandedModalOpen, setIsExpandedModalOpen] = useState(false);
  
  // Helper function to get spec value for a product
  const getSpecValue = (rp: RankingProductWithDetails, specName: string) => {
    const spec = rp.specifications.find((s) => s.name === specName);
    if (!spec) return null;
    return `${spec.value}${spec.unit ? ` ${spec.unit}` : ''}`;
  };
  
  // Show only top 3 products initially
  const top3Products = rankingProducts.slice(0, 3);
  const hasMoreProducts = rankingProducts.length > 3;

  return (
    <>
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Considered Options
        </h2>
        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm relative">
          <table className="w-full table-fixed relative z-0">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground" style={{ width: '80px' }}>
                  Rank
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground" style={{ width: '100px' }}>
                  Score
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground" style={{ width: '230px' }}>
                  Product
                </th>
                {specNames.map((specName) => (
                  <th key={specName} className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground overflow-hidden" style={{ width: '230px' }}>
                    <div className="truncate">{specName}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {top3Products.map((rp: RankingProductWithDetails) => (
                <tr key={rp.id} className="hover:bg-slate-50/20 transition-colors">
                  <td className="px-6 py-4" style={{ width: '80px' }}>
                    <Badge variant="secondary" className="w-8 h-8 rounded-full p-0 flex items-center justify-center bg-slate-50/50 text-slate-600 border-slate-200">
                      {rp.rank_position}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right" style={{ width: '100px' }}>
                    <div className="flex justify-end">
                      <ScoreBadge score={rp.score} size="small" />
                    </div>
                  </td>
                  <td className="px-6 py-4 overflow-hidden" style={{ width: '230px' }}>
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex-shrink-0">
                        <ProductAssetCarousel
                          assets={rp.product.assets}
                          productName={rp.product.name}
                          size="xs"
                          showVideoThumbnails={true}
                        />
                      </div>
                      <div className="min-w-0 flex-1 overflow-hidden">
                        <div className="text-sm font-semibold text-card-foreground truncate">
                          {rp.product.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  {specNames.map((specName) => {
                    const specValue = getSpecValue(rp, specName);
                    return (
                      <td key={specName} className="px-6 py-4 overflow-hidden" style={{ width: '230px' }}>
                        {specValue ? (
                          <span className="text-sm font-semibold text-card-foreground truncate block">
                            {specValue}
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Gradient overlay to indicate more content */}
          {specNames.length > 0 && (
            <div 
              className="absolute right-0 top-0 bottom-0 w-32 pointer-events-none z-50 bg-gradient-to-r from-transparent via-card/60 to-card"
            />
          )}
          
          {/* Expand Table Row */}
          {hasMoreProducts && (
            <div 
              className="hover:bg-slate-50/30 transition-colors cursor-pointer border-t border-border"
              onClick={() => setIsExpandedModalOpen(true)}
            >
              <div className="px-6 py-4">
                <div className="flex items-center justify-center gap-2 text-slate-600 hover:text-slate-700 transition-colors">
                  <Maximize2 className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Expand table
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Expanded Table Modal */}
      <ExpandedTableModal
        open={isExpandedModalOpen}
        onOpenChange={setIsExpandedModalOpen}
        rankingProducts={rankingProducts}
        specNames={specNames}
        getSpecValue={getSpecValue}
      />
    </>
  );
}

