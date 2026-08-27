import React, { useState, useEffect } from 'react';
import { SmartSavingsSection } from '../SmartSavingsSection';
import { Sparkles, TrendingUp, ShieldCheck, RefreshCw } from 'lucide-react';
import { SkeletonSavingsVault } from '../common/ShimmerSkeleton';
import { motion } from 'motion/react';

export const SavingsVaultPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 550);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner - Angel One Style */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-mono font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>04 · SAVE — SMART BITCOIN SAVINGS &amp; RISK ENGINE</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Smart Savings Goals &amp; Volatility Stress Testing
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Build goal-based recurring Bitcoin stacks with risk modeling, maximum drawdown projections, and zero forced liquidations.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-bold transition-all cursor-pointer disabled:opacity-50"
            title="Recalculate drawdown probabilities"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-indigo-600' : ''}`} />
            <span>{isRefreshing ? 'Recalculating...' : 'Recalculate'}</span>
          </button>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-mono font-bold">
            <TrendingUp className="w-4 h-4 text-indigo-600" />
            <span>HEALTH SCORE: 88/100</span>
          </div>
        </div>
      </div>

      {isLoading || isRefreshing ? (
        <SkeletonSavingsVault />
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-2"
        >
          <SmartSavingsSection />
        </motion.div>
      )}
    </div>
  );
};

