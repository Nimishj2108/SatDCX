import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Shield,
  Zap,
  Sparkles,
  Layers,
  HelpCircle,
} from 'lucide-react';

export const ProblemStory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'comparison' | 'interactive'>('comparison');

  const beforePoints = [
    {
      title: 'Wallet Fragmentation',
      desc: 'Users juggle Phoenix, Breez, and cold storage with zero interoperable identity.',
    },
    {
      title: 'Cryptic 64-Char Strings',
      desc: 'Anxiety-inducing copy-pasting of raw public keys and expiry-prone invoices.',
    },
    {
      title: 'Payment Routing Failures',
      desc: 'Sudden HTLC timeouts and stuck liquidity at un-rebalanced intermediary hops.',
    },
    {
      title: 'Uneconomical UTXO Dust',
      desc: 'Tiny unspent outputs get eaten by on-chain fees or become tracking vectors.',
    },
    {
      title: 'Unmanaged Volatility Risk',
      desc: 'First-time savers panic-sell during routine short-term drawdowns.',
    },
  ];

  const afterPoints = [
    {
      title: 'One Universal Identity',
      desc: 'Human handle (@etant) resolves to any wallet, LNURL, or BOLT 12 Offer automatically.',
    },
    {
      title: 'AI Route Intelligence',
      desc: 'Pre-evaluates hop liquidity & success probability before broadcast.',
    },
    {
      title: 'AI Payment Firewall',
      desc: 'Behavioral anomaly detection blocks unusual spikes and unfamiliar recipients.',
    },
    {
      title: 'DustGuard UTXO Intelligence',
      desc: 'Consolidates small balances during low-fee windows & quarantines dust attacks.',
    },
    {
      title: 'Goal-Based Savings Health',
      desc: 'Actionable volatility insights aligned with your purchase timeline, 100% non-custodial.',
    },
  ];

  return (
    <section id="problem-story" className="py-20 sm:py-28 bg-[#020617] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono text-cyan-400 mb-4 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>THE BITCOIN INFRASTRUCTURE GAP</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Bitcoin is Powerful. But for Everyday FinTech,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
              It Is Still Fragmented.
            </span>
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            New users want the mathematical sovereignty of Bitcoin with the intuitive simplicity of modern consumer FinTech. SATCONNECT bridges the gap without sacrificing self-custody.
          </p>
        </div>

        {/* Side by side comparison grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* BEFORE CARD */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/30 backdrop-blur-md border border-red-500/20 shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 px-4 py-1.5 bg-red-500/10 text-red-400 text-xs font-mono font-semibold border-b border-l border-red-500/20 rounded-bl-xl flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>BEFORE SATCONNECT</span>
            </div>

            <div>
              <div className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <span>The Fragmented Reality</span>
              </div>
              <p className="text-xs text-slate-400 mb-6">
                Cryptic interfaces, high routing uncertainty, and unmanaged risk isolate users from self-custody.
              </p>

              <div className="space-y-4">
                {beforePoints.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-950/70 border border-red-950/40 flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      ✕
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">{item.title}</h4>
                      <p className="text-[11px] text-slate-400 leading-snug mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] font-mono text-red-400/80 flex items-center justify-between">
              <span>Result: High Friction &amp; Custodial Reliance</span>
              <span className="font-bold">❌ Fragile UX</span>
            </div>
          </div>

          {/* AFTER CARD */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-amber-500/40 shadow-2xl shadow-amber-500/5 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 px-4 py-1.5 bg-amber-500/20 text-amber-300 text-xs font-mono font-semibold border-b border-l border-amber-500/30 rounded-bl-xl flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>WITH SATCONNECT</span>
            </div>

            <div>
              <div className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <span>The Unified Superlayer</span>
              </div>
              <p className="text-xs text-slate-300 mb-6">
                One identity, intelligent AI assistance, and sovereign custody unified into a trustworthy FinTech experience.
              </p>

              <div className="space-y-4">
                {afterPoints.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-950/80 border border-amber-500/30 flex items-start gap-3 shadow-sm hover:border-amber-400/60 transition-colors"
                  >
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{item.title}</h4>
                      <p className="text-[11px] text-slate-300 leading-snug mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] font-mono text-emerald-400 flex items-center justify-between">
              <span>Outcome: 100% Self-Custody + Consumer FinTech Simplicity</span>
              <span className="font-bold">✓ Sovereign &amp; Seamless</span>
            </div>
          </div>
        </div>

        {/* Transition Summary Bar */}
        <div className="mt-12 p-5 rounded-2xl bg-slate-900/70 backdrop-blur-md border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shadow-inner">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                One Unified Architecture: Connect · Pay · Protect · Save · Optimize · Learn
              </div>
              <div className="text-xs text-slate-400">
                Underlying everything: Bitcoin + Lightning + AI Intelligence + Cryptographic Self-Custody.
              </div>
            </div>
          </div>
          <a
            href="#superlayer"
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 shadow-md shadow-amber-500/15"
          >
            <span>Explore 6 Layers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
