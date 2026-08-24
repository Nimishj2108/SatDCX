import React, { useState } from 'react';
import { TraceabilitySection } from '../TraceabilitySection';
import { SelfCustodyMultisigSection } from '../SelfCustodyMultisigSection';
import { GitBranch, Shield, Key } from 'lucide-react';

export const TraceabilityPage: React.FC = () => {
  const [tab, setTab] = useState<'provenance' | 'multisig'>('provenance');

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

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold self-start md:self-auto">
          <button
            onClick={() => setTab('provenance')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              tab === 'provenance'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Provenance Graph
          </button>
          <button
            onClick={() => setTab('multisig')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              tab === 'multisig'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            2-of-3 Multisig Vault
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {tab === 'provenance' ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-2">
            <TraceabilitySection />
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-2">
            <SelfCustodyMultisigSection />
          </div>
        )}
      </div>
    </div>
  );
};
