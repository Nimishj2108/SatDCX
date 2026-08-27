import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Zap,
  Shield,
  Layers,
  ArrowRight,
  Award,
} from 'lucide-react';
import { LEARNING_MODULES } from '../data/mockData';

export const EducateSection: React.FC = () => {
  const [whyExpanded, setWhyExpanded] = useState(false);
  const [selectedModule, setSelectedModule] = useState(LEARNING_MODULES[0]);
  const [completedChecklist, setCompletedChecklist] = useState<{ [key: string]: boolean }>({
    item1: true,
    item2: true,
    item3: true,
    item4: false,
    item5: false,
  });

  const toggleChecklist = (key: string) => {
    setCompletedChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const completedCount = Object.values(completedChecklist).filter(Boolean).length;
  // Financial Literacy Score: base 12, each checked item adds +16
  const literacyScore = 12 + completedCount * 16.5;

  return (
    <section id="education" className="py-20 sm:py-28 bg-[#020617] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-rose-500/30 text-xs font-mono text-rose-300 mb-4 font-semibold shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-rose-400" />
            <span>09 · LEARN — EDUCATE FINTECH (LEARN BY DOING)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Financial Education Embedded in Every Transaction.{' '}
            <span className="text-rose-400">Never a Boring Blog.</span>
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            We don&apos;t dump 40-page whitepapers on first-time users. SAT DCX contextualizes every transaction, fee, and risk score in real time so you master sovereign Bitcoin finance by simply using it.
          </p>
        </div>

        {/* Live "Learn by Doing" Payment Breakdown Box */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-rose-500/30 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono">
            <span className="text-rose-300 font-bold">INTERACTIVE CONTEXTUAL PAYMENT EXPLAINER</span>
            <span className="text-slate-400">Live Simulation</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left payment invoice summary */}
            <div className="lg:col-span-6 p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 font-mono text-xs shadow-inner">
              <div className="text-[11px] text-slate-400 uppercase">You are sending:</div>
              <div className="text-2xl font-bold text-white">₹500.00 INR (6,950 sats)</div>

              <div className="space-y-1.5 pt-2 border-t border-slate-900 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Network Rail:</span>
                  <span className="text-amber-400 font-bold">⚡ Lightning Sub-Second</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Network Fee:</span>
                  <span className="text-emerald-400 font-bold">₹0.80 (11 sats)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Recipient Receives:</span>
                  <span className="text-white font-bold">₹499.20 Net</span>
                </div>
              </div>
            </div>

            {/* Right: Embedded educational prompt with expandable "Why?" */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-4 rounded-xl bg-slate-900/60 backdrop-blur-md border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-white flex items-center justify-between">
                  <span>What You&apos;re Doing:</span>
                  <span className="text-[10px] font-mono text-cyan-400">Layer 2 Payment</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  You are sending Bitcoin through a Lightning channel. Instead of waiting 10 minutes for an on-chain block, this payment settles in 85 milliseconds.
                </p>

                {/* Expandable Why Drawer */}
                <button
                  id="educate-why-toggle-btn"
                  onClick={() => setWhyExpanded(!whyExpanded)}
                  className="mt-2 text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors font-bold"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Why is the fee only ₹0.80?</span>
                  {whyExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {whyExpanded && (
                  <div className="p-3.5 rounded-lg bg-slate-950 border border-amber-500/30 text-xs text-slate-300 mt-2 space-y-1.5 leading-relaxed shadow-sm">
                    <p>
                      <strong>Because Lightning is off-chain:</strong> Payment channels update cryptographic balance sheets directly between nodes without burdening all global Bitcoin miners with this micro-transaction.
                    </p>
                    <p className="text-slate-400 text-[11px]">
                      This makes buying a ₹20 chai or a ₹500 book just as cheap and instant as UPI or Visa, while maintaining sovereign Bitcoin ownership.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bitcoin Financial Literacy Score & 6 Core Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Literacy Score Checklist */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono font-bold text-white">LITERACY PROGRESSION SCORE</span>
              </div>
              <span className="text-xs font-mono text-cyan-400">Interactive</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-extrabold font-mono text-amber-400">
                  {Math.round(literacyScore)} <span className="text-sm font-normal text-slate-400">/ 100</span>
                </div>
                <div className="text-xs font-mono text-slate-400 mt-0.5">
                  {literacyScore >= 70 ? 'Advanced Sovereign Master' : 'Competent FinTech Practitioner'}
                </div>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-900 px-2.5 py-1 rounded">
                {completedCount}/5 Milestones
              </span>
            </div>

            {/* Checklist items */}
            <div className="space-y-2 text-xs font-mono">
              {[
                { id: 'item1', label: '1. Self-Custody Keys Mastered', desc: 'Hold private keys directly.' },
                { id: 'item2', label: '2. Lightning Channel Routing', desc: 'Execute instant micro-payment.' },
                { id: 'item3', label: '3. Network Fee Understanding', desc: 'Mempool sat/vB vs. Lightning.' },
                { id: 'item4', label: '4. DustGuard UTXO Hygiene', desc: 'Consolidate small outputs.' },
                { id: 'item5', label: '5. Multisig Vault Configuration', desc: 'Set up 2-of-3 quorum.' },
              ].map((item) => {
                const isDone = completedChecklist[item.id];
                return (
                  <button
                    key={item.id}
                    id={`literacy-milestone-${item.id}`}
                    onClick={() => toggleChecklist(item.id)}
                    className={`w-full p-3 rounded-xl border text-left transition-all flex items-start gap-3 ${
                      isDone
                        ? 'bg-slate-900/90 border-emerald-500/40 text-slate-200 shadow-sm'
                        : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center ${
                        isDone ? 'bg-emerald-400 text-slate-950 font-bold' : 'border border-slate-700'
                      }`}
                    >
                      {isDone && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <div className="font-bold text-white">{item.label}</div>
                      <div className="text-[10px] text-slate-400">{item.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: 6 Core Learning Modules Explorer */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-800 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono">
              <span className="text-white font-bold">THE 6 SOVEREIGN FINTECH MODULES</span>
              <span className="text-slate-400">{selectedModule.estimatedMins} min read</span>
            </div>

            {/* Modules Grid Tabs */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
              {LEARNING_MODULES.map((mod) => (
                <button
                  key={mod.id}
                  onClick={() => setSelectedModule(mod)}
                  className={`p-2 rounded-lg border text-center font-mono text-xs font-bold transition-all ${
                    selectedModule.id === mod.id
                      ? 'bg-rose-500 text-white border-rose-400 shadow-md'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {mod.code}
                </button>
              ))}
            </div>

            {/* Selected Module Detail */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <div>
                <span className="text-[10px] font-mono text-rose-400 uppercase font-bold">
                  MODULE {selectedModule.code}
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">{selectedModule.title}</h3>
                <div className="text-xs font-mono text-slate-400">{selectedModule.subtitle}</div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{selectedModule.description}</p>

              <div className="space-y-1.5 pt-2 border-t border-slate-900 text-xs">
                <div className="text-[11px] font-mono text-slate-400 uppercase">Key Core Takeaways:</div>
                {selectedModule.keyTakeaways.map((takeaway, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-[11px] leading-snug">{takeaway}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
