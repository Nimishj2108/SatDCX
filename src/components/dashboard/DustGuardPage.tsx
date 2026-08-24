import React from 'react';
import { DustGuardSection } from '../DustGuardSection';
import { Layers, Zap, TrendingDown } from 'lucide-react';

export const DustGuardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header Banner - Angel One Style */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 text-xs font-mono font-bold mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>05 · OPTIMIZE — UTXO INTELLIGENCE &amp; DUSTGUARD</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            UTXO DustGuard &amp; Gas Optimizer
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time mempool fee forecasting, un-economical dust quarantine, and 1-click batch consolidation during optimal low-gas windows.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-200 text-orange-800 text-xs font-mono font-bold self-start md:self-auto">
          <TrendingDown className="w-4 h-4 text-orange-600" />
          <span>CURRENT MEMPOOL: 12 sat/vB</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-2">
        <DustGuardSection />
      </div>
    </div>
  );
};
