import React, { useState, useEffect } from 'react';
import { TraceabilitySection } from '../TraceabilitySection';
import { SelfCustodyMultisigSection } from '../SelfCustodyMultisigSection';
import { GitBranch, Shield, Key, RefreshCw } from 'lucide-react';
import { SkeletonTraceability } from '../common/ShimmerSkeleton';
import { motion } from 'motion/react';

export const TraceabilityPage: React.FC = () => {
  const [tab, setTab] = useState<'provenance' | 'multisig'>('provenance');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [tab]);

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
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 text-xs font-mono font-bold mb-2">
            <GitBranch className="w-3.5 h-3.5" />
            <span>06 &amp; 11 · PROTECT — ON-CHAIN PROVENANCE &amp; MULTISIG</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Forensic Provenance &amp; 2-of-3 Multisig Vault
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Visual UTXO provenance graph tracking, entity attribution confidence, and enterprise-grade threshold signature key management.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-bold transition-all cursor-pointer disabled:opacity-50"
            title="Re-index UTXO graph"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-cyan-600' : ''}`} />
            <span>{isRefreshing ? 'Indexing...' : 'Re-index'}</span>
          </button>

          {/* Tab Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setTab('provenance')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                tab === 'provenance'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Provenance Graph
            </button>
            <button
              onClick={() => setTab('multisig')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                tab === 'multisig'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2-of-3 Multisig Vault
            </button>
          </div>
        </div>
      </div>

      {isLoading || isRefreshing ? (
        <SkeletonTraceability />
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-8"
        >
          {tab === 'provenance' ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-2">
              <TraceabilitySection />
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-2">
              <SelfCustodyMultisigSection />
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

