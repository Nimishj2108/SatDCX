import React from 'react';
import { CybersecurityCenterSection } from '../CybersecurityCenterSection';
import { ShieldCheck, Activity, Radio } from 'lucide-react';

export const CybersecurityPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header Banner - Angel One Style */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>10 · PROTECT — CYBERSECURITY COMMAND CENTER</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Real-Time Defense &amp; Cryptographic Auditing
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Autonomous threat interception stream, channel liquidity health, peer gossip monitoring, and wallet integrity audits.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold self-start md:self-auto">
          <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
          <span>ALL NODES SYNCHRONIZED (100% HEALTH)</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-2">
        <CybersecurityCenterSection />
      </div>
    </div>
  );
};
