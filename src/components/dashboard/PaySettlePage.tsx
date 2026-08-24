import React, { useState } from 'react';
import { UniversalWalletSection } from '../UniversalWalletSection';
import { AIRouteIntelligenceSection } from '../AIRouteIntelligenceSection';
import { UpiBridgeSection } from '../UpiBridgeSection';
import { Send, Zap, QrCode, Sliders } from 'lucide-react';

export const PaySettlePage: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'universal' | 'ai-route' | 'upi-bridge'>('all');

  return (
    <div className="space-y-6">
      {/* Header Banner - Angel One Style */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-mono font-bold mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>01 &amp; 02 &amp; 07 · UNIVERSAL PAY &amp; SETTLE SUITE</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Universal Payment &amp; Cross-Rail Settlement
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Resolve any human handle, AI-optimize routing fees &amp; reliability, and settle directly to Indian UPI merchant QRs.
          </p>
        </div>

        {/* Sub-tab Navigation Filter */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold self-start md:self-auto">
          <button
            onClick={() => setActiveSubTab('all')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeSubTab === 'all'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Tools
          </button>
          <button
            onClick={() => setActiveSubTab('universal')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeSubTab === 'universal'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Universal Resolver
          </button>
          <button
            onClick={() => setActiveSubTab('ai-route')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeSubTab === 'ai-route'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            AI Routing Engine
          </button>
          <button
            onClick={() => setActiveSubTab('upi-bridge')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeSubTab === 'upi-bridge'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            UPI ↔ Lightning Bridge
          </button>
        </div>
      </div>

      {/* RENDER SECTIONS BASED ON SUB-TAB */}
      <div className="space-y-8">
        {(activeSubTab === 'all' || activeSubTab === 'universal') && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-2">
            <UniversalWalletSection />
          </div>
        )}

        {(activeSubTab === 'all' || activeSubTab === 'ai-route') && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-2">
            <AIRouteIntelligenceSection />
          </div>
        )}

        {(activeSubTab === 'all' || activeSubTab === 'upi-bridge') && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-2">
            <UpiBridgeSection />
          </div>
        )}
      </div>
    </div>
  );
};
