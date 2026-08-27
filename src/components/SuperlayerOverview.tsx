import React, { useState } from 'react';
import {
  Zap,
  CreditCard,
  Shield,
  Layers,
  Sparkles,
  BookOpen,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { LayerCategory } from '../types';

export const SuperlayerOverview: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<LayerCategory>('CONNECT');

  const layers: {
    key: LayerCategory;
    name: string;
    tagline: string;
    icon: any;
    color: string;
    badgeColor: string;
    capabilities: string[];
    description: string;
    jumpId: string;
  }[] = [
    {
      key: 'CONNECT',
      name: 'CONNECT',
      tagline: 'Wallet Interoperability & Identity',
      icon: Zap,
      color: 'from-amber-500 to-amber-600',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      capabilities: [
        'Universal Payment Identity (@handle)',
        'Address Resolution & LNURL / BOLT 12 Mapping',
        'Wallet Abstraction (Phoenix, Breez, LND, CLN)',
        'Cross-Wallet Instant Settlement Routing',
      ],
      description:
        'Eliminates wallet silos. Users register a single human-readable identity that routes incoming and outgoing payments seamlessly across any compatible node or mobile wallet.',
      jumpId: '#connect',
    },
    {
      key: 'PAY',
      name: 'PAY',
      tagline: 'AI Routing & Cross-Rail Bridge',
      icon: CreditCard,
      color: 'from-cyan-500 to-blue-600',
      badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
      capabilities: [
        'AI-Assisted Lightning Route Intelligence',
        'Liquidity-Aware Dynamic Path Finding',
        'Sub-Second Fee & Latency Optimization',
        'Lightning → UPI Indian Merchant Bridge (Prototype)',
      ],
      description:
        'Calculates real-time channel liquidity, historical failure points, and optimal fee paths to guarantee instant payment settlement across Bitcoin and local payment rails.',
      jumpId: '#pay-routing',
    },
    {
      key: 'PROTECT',
      name: 'PROTECT',
      tagline: 'Cybersecurity, Firewall & Multisig',
      icon: Shield,
      color: 'from-emerald-500 to-teal-600',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      capabilities: [
        'AI Payment Firewall & Behavioral Anomaly Engine',
        '2-of-3 Multisig & Vault Key Architecture',
        'On-Chain Traceability & Provenance Graph',
        'Unified Cybersecurity Command Center',
      ],
      description:
        'Institutional-grade non-custodial protection. Evaluates behavioral anomalies, recipient history, and on-chain provenance while preserving user-controlled keys.',
      jumpId: '#firewall',
    },
    {
      key: 'SAVE',
      name: 'SAVE',
      tagline: 'Goal-Based Volatility Intelligence',
      icon: Layers,
      color: 'from-indigo-500 to-purple-600',
      badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
      capabilities: [
        'Goal-Based Savings Health Score (0-100)',
        '30-Day Realized Volatility Forecasting',
        'Drawdown Risk vs. Target Horizon Analysis',
        '100% User-Directed Rebalancing Insights',
      ],
      description:
        'A pure financial-intelligence layer. Helps users align Bitcoin accumulation with real-world financial goals without speculative trading or automated custody actions.',
      jumpId: '#smart-savings',
    },
    {
      key: 'OPTIMIZE',
      name: 'OPTIMIZE',
      tagline: 'DustGuard & UTXO Intelligence',
      icon: Sparkles,
      color: 'from-amber-400 to-orange-500',
      badgeColor: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
      capabilities: [
        'Mempool Low-Fee Consolidation Windows',
        'Uneconomical UTXO Detection & Alerts',
        'Malicious Tracking Dust Attack Quarantine',
        'Dust-to-Lightning Micro-Channel Allocation',
      ],
      description:
        'Ensures every satoshi remains economically spendable. Alerts users to optimal fee windows for UTXO consolidation and isolates unsolicited tracking dust.',
      jumpId: '#dustguard',
    },
    {
      key: 'LEARN',
      name: 'LEARN',
      tagline: 'Embedded FinTech Education & Copilot',
      icon: BookOpen,
      color: 'from-pink-500 to-rose-600',
      badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
      capabilities: [
        'Learn-by-Doing Contextual Payment Breakdown',
        'Bitcoin Financial Literacy Score Progression',
        'Telegram FinTech Intelligence Copilot Bot',
        'First-Time Human UX vs. Power Engineer Mode',
      ],
      description:
        'Translates esoteric cryptography into plain financial clarity. Integrated right into payments, savings, and alerts so users learn by doing without fear.',
      jumpId: '#education',
    },
  ];

  const currentLayer = layers.find((l) => l.key === activeLayer) || layers[0];

  return (
    <section id="superlayer" className="py-20 sm:py-28 bg-[#020617] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono text-amber-400 mb-4 shadow-sm">
            <Zap className="w-3.5 h-3.5" />
            <span>THE 6-LAYER ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            One Coherent Ecosystem. Six Core Layers.
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            SAT DCX is not twelve disconnected tools. It is a unified financial operating superlayer designed to make Bitcoin secure, intelligent, and effortless for everyday humans.
          </p>
        </div>

        {/* 6-Layer Selector Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-10">
          {layers.map((layer) => {
            const Icon = layer.icon;
            const isSelected = layer.key === activeLayer;
            return (
              <button
                key={layer.key}
                onClick={() => setActiveLayer(layer.key)}
                className={`p-3.5 rounded-xl text-left border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 border-amber-400 shadow-xl shadow-amber-500/10'
                    : 'bg-slate-950/70 backdrop-blur-md border-slate-800/80 hover:border-slate-700 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-400">
                    {layer.key}
                  </span>
                </div>
                <div className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {layer.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Layer Deep Dive Card */}
        <div className="p-8 sm:p-10 rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Description & Capabilities */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${currentLayer.badgeColor}`}>
                  LAYER: {currentLayer.key}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {currentLayer.tagline}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {currentLayer.name} — {currentLayer.tagline}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                {currentLayer.description}
              </p>

              {/* Capability List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {currentLayer.capabilities.map((cap, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/80 flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs font-medium text-slate-200">{cap}</span>
                  </div>
                ))}
              </div>

              {/* Deep dive CTA */}
              <div className="pt-2">
                <a
                  href={currentLayer.jumpId}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-xs transition-colors"
                >
                  <span>Explore {currentLayer.name} in Detail</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right: Architectural Summary Graphic */}
            <div className="lg:col-span-5 p-6 rounded-xl bg-slate-950/80 border border-slate-800/80 font-mono text-xs text-slate-300 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-[11px] text-slate-400">
                <span className="text-amber-400">LAYER SPECIFICATION</span>
                <span>STATUS: OPERATIONAL</span>
              </div>

              <div className="space-y-2 text-[12px]">
                <div className="flex justify-between py-1 border-b border-slate-900">
                  <span className="text-slate-400">Protocol Stack</span>
                  <span className="text-cyan-400 font-semibold">Lightning BOLT 11/12 + L1</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-900">
                  <span className="text-slate-400">Custody Model</span>
                  <span className="text-emerald-400 font-semibold">100% User Self-Custody</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-900">
                  <span className="text-slate-400">Latency Target</span>
                  <span className="text-amber-300 font-semibold">&lt; 150 ms Sub-Second</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-900">
                  <span className="text-slate-400">AI Role</span>
                  <span className="text-slate-200">Explainable Routing &amp; Risk Guard</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Consumer Surface</span>
                  <span className="text-white font-semibold">INR Native + Sats Transparency</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20 text-[11px] text-amber-200/90 leading-snug">
                💡 <span className="font-semibold">Core Principle:</span> Bitcoin provides the immutable security. FinTech provides the simplicity. AI provides the intelligence.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
