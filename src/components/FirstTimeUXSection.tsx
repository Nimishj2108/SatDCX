import React, { useState } from 'react';
import {
  Sparkles,
  Sliders,
  CheckCircle2,
  Lock,
  ArrowRight,
  Shield,
  Zap,
  Layers,
  Eye,
  Terminal,
} from 'lucide-react';

export const FirstTimeUXSection: React.FC = () => {
  const [mode, setMode] = useState<'beginner' | 'engineer'>('beginner');

  return (
    <section id="first-time-ux" className="py-20 sm:py-28 bg-[#020617] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-amber-500/30 text-xs font-mono text-amber-300 mb-4 font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>12 · LEARN — PROGRESSIVE DISCLOSURE &amp; FIRST-TIME UX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Simple for First-Timers.{' '}
            <span className="text-amber-400">Deep Infrastructure for Engineers.</span>
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            Beginners only see six clear actions: <strong>Save · Send · Receive · Spend · Protect · Learn.</strong> Complex terms like UTXOs, BOLT 12, routing hops, and mempool fee rates are progressively disclosed only when you need them.
          </p>
        </div>

        {/* Mode Selector Switcher */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            id="mode-beginner-btn"
            onClick={() => setMode('beginner')}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2 ${
              mode === 'beginner'
                ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>First-Time Human Mode (Clean FinTech)</span>
          </button>

          <button
            id="mode-engineer-btn"
            onClick={() => setMode('engineer')}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2 ${
              mode === 'engineer'
                ? 'bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Power Engineer Mode (Cryptographic Specs)</span>
          </button>
        </div>

        {/* Live Interface Preview based on Mode */}
        <div className="p-8 sm:p-10 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-800 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs font-mono">
            <span className="text-white font-bold">
              {mode === 'beginner' ? 'CLEAN CONSUMER FINTECH DASHBOARD' : 'DEEP INFRASTRUCTURE TELEMETRY'}
            </span>
            <span className={mode === 'beginner' ? 'text-amber-400' : 'text-cyan-400'}>
              {mode === 'beginner' ? 'Zero Jargon Surface' : 'Low-Level Protocol Surface'}
            </span>
          </div>

          {mode === 'beginner' ? (
            /* Beginner Clean Surface */
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { name: 'Save', desc: 'Goal-based Bitcoin vault', icon: Layers, color: 'text-amber-400' },
                  { name: 'Send', desc: 'To any @handle instantly', icon: Zap, color: 'text-cyan-400' },
                  { name: 'Receive', desc: 'Your universal handle', icon: CheckCircle2, color: 'text-emerald-400' },
                  { name: 'Spend', desc: 'Scan UPI or Lightning', icon: Sparkles, color: 'text-indigo-400' },
                  { name: 'Protect', desc: '2-of-3 Multisig Vault', icon: Shield, color: 'text-rose-400' },
                  { name: 'Learn', desc: 'Learn-by-doing lessons', icon: Lock, color: 'text-teal-400' },
                ].map((action, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center space-y-2 hover:border-amber-400/40 transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center mx-auto">
                      <action.icon className={`w-5 h-5 ${action.color}`} />
                    </div>
                    <div className="text-xs font-bold text-white">{action.name}</div>
                    <div className="text-[10px] text-slate-400 leading-tight">{action.desc}</div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 flex items-center justify-between shadow-inner">
                <span>Total Balance: <strong className="text-white text-base">₹1,42,800 INR</strong></span>
                <span className="text-emerald-400 font-mono">✓ Fully Insured in Self-Custody</span>
              </div>
            </div>
          ) : (
            /* Power Engineer Deep Surface */
            <div className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <div className="text-slate-400 text-[10px]">MEMPOOL TOPOLOGY</div>
                  <div className="text-cyan-300 font-bold">12 sat/vB (24,812 vMB pending)</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <div className="text-slate-400 text-[10px]">LIGHTNING PROTOCOL SPEC</div>
                  <div className="text-amber-400 font-bold">BOLT 11 + BOLT 12 Blinded Paths</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <div className="text-slate-400 text-[10px]">UTXO TREE LEAVES</div>
                  <div className="text-emerald-400 font-bold">8 UTXOs (1 Quarantined Dust)</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                <div className="text-slate-400 text-[10px]">ACTIVE PROVENANCE TXID</div>
                <div className="text-cyan-400 break-all">
                  e84c91a02f34e8b917c5d3a1f9e2b8c4d7a0e3f1a2:0 (P2WSH Multisig)
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
