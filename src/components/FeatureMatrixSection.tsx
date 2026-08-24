import React from 'react';
import { Layers, CheckCircle2 } from 'lucide-react';

export const FeatureMatrixSection: React.FC = () => {
  const columns = [
    {
      name: 'CONNECT',
      badge: 'Interoperability',
      color: 'border-amber-500/40 text-amber-400',
      items: [
        'Wallet Interoperability',
        'Universal Payment Identity',
        'Address Resolution',
        'Wallet Abstraction',
        'Cross-Wallet Settlement',
      ],
    },
    {
      name: 'PAY',
      badge: 'Routing & Rails',
      color: 'border-cyan-500/40 text-cyan-400',
      items: [
        'Lightning Sub-Second',
        'AI Route Intelligence',
        'Liquidity-Aware Routing',
        'Lightning → UPI Bridge',
        'Fee & Latency Optimization',
      ],
    },
    {
      name: 'PROTECT',
      badge: 'Cybersecurity',
      color: 'border-emerald-500/40 text-emerald-400',
      items: [
        'AI Payment Firewall',
        'Cybersecurity Center',
        'Adaptive Verification',
        '2-of-3 Multisig Vault',
        'Transaction Provenance',
      ],
    },
    {
      name: 'SAVE',
      badge: 'Risk Intelligence',
      color: 'border-indigo-500/40 text-indigo-400',
      items: [
        'Smart Bitcoin Savings',
        'Volatility Intelligence',
        'Goal-Based Risk',
        'Savings Health Score',
        'Non-Custodial DCA Insights',
      ],
    },
    {
      name: 'OPTIMIZE',
      badge: 'UTXO Management',
      color: 'border-orange-500/40 text-orange-400',
      items: [
        'DustGuard Engine',
        'UTXO Monitoring',
        'UTXO Consolidation',
        'Fee Optimization Window',
        'Dust Attack Quarantine',
      ],
    },
    {
      name: 'LEARN',
      badge: 'Embedded FinTech',
      color: 'border-rose-500/40 text-rose-400',
      items: [
        'Learn by Doing Explainer',
        'Financial Literacy Score',
        'Telegram Financial Copilot',
        '6 Sovereign Modules',
        'First-Time Progressive UX',
      ],
    },
  ];

  return (
    <section id="feature-matrix" className="py-20 sm:py-28 bg-[#020617] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-amber-500/30 text-xs font-mono text-amber-400 mb-4 font-semibold shadow-sm">
            <Layers className="w-3.5 h-3.5" />
            <span>COMPLETE CAPABILITY MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Complete SATCONNECT Feature Grid
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            Every feature traces back to our core mission: Bitcoin&apos;s Security, FinTech&apos;s Simplicity, and AI&apos;s Intelligence.
          </p>
        </div>

        {/* Feature Grid Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {columns.map((col, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-slate-800 flex flex-col justify-between shadow-sm hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="pb-3 mb-4 border-b border-slate-800">
                  <div className={`text-sm font-extrabold font-mono ${col.color}`}>
                    {col.name}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 mt-0.5">{col.badge}</div>
                </div>

                <div className="space-y-3">
                  {col.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-800/80 text-[10px] font-mono text-slate-400">
                100% Operational
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
