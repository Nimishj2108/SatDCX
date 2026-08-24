import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  Layers,
  CheckCircle2,
  Lock,
  RefreshCw,
  Coins,
} from 'lucide-react';
import { UTXO_DATASET } from '../data/mockData';

export const DustGuardSection: React.FC = () => {
  const [utxoList, setUtxoList] = useState(UTXO_DATASET);
  const [isConsolidating, setIsConsolidating] = useState(false);
  const [consolidatedSuccess, setConsolidatedSuccess] = useState(false);

  const handleToggleQuarantine = (id: string) => {
    setUtxoList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isQuarantined: !item.isQuarantined } : item
      )
    );
  };

  const handleConsolidate = () => {
    setIsConsolidating(true);
    setTimeout(() => {
      setIsConsolidating(false);
      setConsolidatedSuccess(true);
      setTimeout(() => setConsolidatedSuccess(false), 4000);
    }, 900);
  };

  return (
    <section id="dustguard" className="py-20 sm:py-28 bg-[#020617] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-orange-500/30 text-xs font-mono text-orange-300 mb-4 font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>05 · OPTIMIZE — DUSTGUARD UTXO INTELLIGENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Make Every Satoshi <span className="text-amber-400">Economically Useful &amp; Secure.</span>
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            Tiny unspent transaction outputs (UTXOs) get eroded by network fee spikes and can even expose your privacy to malicious tracking dust attacks. DustGuard monitors mempool fee rates and quarantines tracking dust automatically.
          </p>
        </div>

        {/* UTXO Summary Telemetry Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          <div className="p-4 rounded-xl bg-slate-900/40 backdrop-blur-md border border-slate-800 shadow-sm">
            <span className="text-[10px] font-mono text-slate-400">TOTAL BALANCE</span>
            <div className="text-lg font-bold text-white font-mono mt-0.5">₹1,42,800</div>
            <span className="text-[10px] font-mono text-slate-400">1,701,860 sats</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 backdrop-blur-md border border-emerald-500/20 shadow-sm">
            <span className="text-[10px] font-mono text-emerald-400">SPENDABLE BALANCE</span>
            <div className="text-lg font-bold text-emerald-400 font-mono mt-0.5">₹1,41,920</div>
            <span className="text-[10px] font-mono text-slate-400">High-efficiency outputs</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 backdrop-blur-md border border-amber-500/20 shadow-sm">
            <span className="text-[10px] font-mono text-amber-300">TINY UTXOS</span>
            <div className="text-lg font-bold text-amber-300 font-mono mt-0.5">₹880</div>
            <span className="text-[10px] font-mono text-slate-400">10,400 sats (Sub-optimal)</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 backdrop-blur-md border border-orange-500/20 shadow-sm">
            <span className="text-[10px] font-mono text-orange-400">UNECONOMICAL</span>
            <div className="text-lg font-bold text-orange-400 font-mono mt-0.5">₹240</div>
            <span className="text-[10px] font-mono text-slate-400">High fee-to-value ratio</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 backdrop-blur-md border border-red-500/30 shadow-sm">
            <span className="text-[10px] font-mono text-red-400">SUSPICIOUS DUST</span>
            <div className="text-lg font-bold text-red-400 font-mono mt-0.5">₹0.83</div>
            <span className="text-[10px] font-mono text-red-300">10 sats (Quarantined)</span>
          </div>
        </div>

        {/* Interactive UTXO List & Consolidation Optimizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Active UTXO Table */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono">
              <span className="text-white font-bold">WALLET UTXO DISTRIBUTION (5 SAMPLED)</span>
              <span className="text-cyan-400">Mempool: 12 sat/vB</span>
            </div>

            <div className="space-y-2.5">
              {utxoList.map((utxo) => (
                <div
                  key={utxo.id}
                  className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    utxo.category === 'Suspicious'
                      ? 'bg-red-950/20 border-red-900/40'
                      : utxo.category === 'Uneconomical'
                      ? 'bg-orange-950/20 border-orange-900/30'
                      : 'bg-slate-950/80 border-slate-800'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-white">
                        {utxo.txid} (vout:{utxo.vout})
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                          utxo.category === 'Spendable'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : utxo.category === 'Tiny'
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : utxo.category === 'Uneconomical'
                            ? 'bg-orange-950 text-orange-400 border border-orange-800'
                            : 'bg-red-950 text-red-400 border border-red-800'
                        }`}
                      >
                        {utxo.category}
                      </span>
                    </div>

                    <div className="text-xs text-slate-300 font-mono mt-1">
                      ₹{utxo.amountInr.toLocaleString('en-IN')} ·{' '}
                      <span className="text-slate-400">{utxo.amountSats.toLocaleString()} sats</span>
                    </div>

                    {utxo.dustWarning && (
                      <p className="text-[11px] text-amber-300/90 mt-1 font-sans leading-tight">
                        ⚠️ {utxo.dustWarning}
                      </p>
                    )}
                  </div>

                  {utxo.category === 'Suspicious' && (
                    <button
                      id={`quarantine-toggle-${utxo.id}`}
                      onClick={() => handleToggleQuarantine(utxo.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all shrink-0 ${
                        utxo.isQuarantined
                          ? 'bg-red-500 text-white'
                          : 'bg-slate-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      {utxo.isQuarantined ? '🔒 Quarantined' : 'Quarantine UTXO'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Low-Fee Consolidation Window Opportunity */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-amber-500/40 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono text-amber-300 font-bold">
                BATCH CONSOLIDATION OPPORTUNITY
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-900 px-2 py-0.5 rounded">
                Optimal Window Active
              </span>
            </div>

            <div className="space-y-3">
              <div className="text-sm text-slate-200 leading-relaxed">
                <strong className="text-white">8 Small UTXOs Detected.</strong> Consolidating now during low mempool traffic saves you from paying peak surge fees in the future.
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">Standard Peak Fee Cost:</span>
                  <span className="text-red-400 font-bold">₹74 (65 sat/vB)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Current Low-Fee Window Cost:</span>
                  <span className="text-emerald-400 font-bold">₹31 (11 sat/vB)</span>
                </div>
                <div className="h-px bg-slate-800 my-1" />
                <div className="flex justify-between text-amber-300 font-bold">
                  <span>Estimated Savings:</span>
                  <span>+ ₹146 Future Fee Buffer</span>
                </div>
              </div>
            </div>

            <button
              id="dustguard-optimize-wallet-btn"
              onClick={handleConsolidate}
              disabled={isConsolidating}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:brightness-110 text-slate-950 font-bold text-xs font-mono flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isConsolidating ? 'animate-spin' : ''}`} />
              <span>{isConsolidating ? 'Consolidating UTXOs...' : 'Optimize Wallet (Consolidate 8 UTXOs)'}</span>
            </button>

            {consolidatedSuccess && (
              <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-800 text-xs font-mono text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Consolidation transaction crafted &amp; ready for self-custody key signature!</span>
              </div>
            )}

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400 leading-snug">
              🔒 <strong className="text-slate-300">Dust Attack Isolation:</strong> Tracking dust (tiny unsolicited 10-sat payments) are locked in quarantine so your wallet never co-spends them, protecting your address privacy.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
