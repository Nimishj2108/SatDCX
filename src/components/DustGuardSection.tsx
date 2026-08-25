import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  Flame,
  ShieldCheck,
  TrendingDown,
  Trash2,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  Coins,
} from 'lucide-react';
import { UTXO_DATASET } from '../data/mockData';

export const DustGuardSection: React.FC = () => {
  const [selectedUtxos, setSelectedUtxos] = useState<string[]>(['utxo_3', 'utxo_4']);
  const [isConsolidating, setIsConsolidating] = useState(false);
  const [consolidationSuccess, setConsolidationSuccess] = useState(false);

  const toggleSelect = (id: string) => {
    setSelectedUtxos((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleConsolidate = () => {
    setIsConsolidating(true);
    setConsolidationSuccess(false);
    setTimeout(() => {
      setIsConsolidating(false);
      setConsolidationSuccess(true);
    }, 1200);
  };

  return (
    <section id="dustguard" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-mono font-bold mb-3">
            <Trash2 className="w-3.5 h-3.5 text-orange-600" />
            <span>05 · BITCOIN DUST &amp; SOVEREIGN DUSTBIN</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Stop Toxic UTXO Bloat. <span className="text-orange-500">Club Bitcoin Dust.</span>
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            When you pay small fiat amounts like ₹50 or ₹150 in India, micro-change outputs produce un-spendable Bitcoin dust (&lt;546 sats). SATCONNECT sweeps extra micro-charges into your sovereign <strong>Dustbin</strong> and clubs them using Lightning Route Intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Dustbin & Mempool Gas Forecaster */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500" />
                <span className="font-bold text-slate-900 text-sm">MEMPOOL GAS FORECASTER</span>
              </div>
              <span className="font-mono text-xs text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full font-bold">
                Low Fee Window Active
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 font-mono text-xs text-center">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-slate-500 text-[10px]">CURRENT RATE</div>
                <div className="text-slate-900 font-extrabold text-sm mt-0.5">12 sat/vB</div>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                <div className="text-emerald-700 text-[10px]">OPTIMAL WINDOW</div>
                <div className="font-extrabold text-sm mt-0.5">8 sat/vB</div>
              </div>
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900">
                <div className="text-blue-700 text-[10px]">ESTIMATED SAVINGS</div>
                <div className="font-extrabold text-sm mt-0.5">₹1,840 INR</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-orange-50 border border-orange-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-orange-900">
                <Coins className="w-4 h-4 text-orange-600" />
                <span>The Bitcoin Dustbin Mechanism</span>
              </div>
              <p className="text-[11px] text-orange-800 leading-relaxed">
                Leftover dust from INR &harr; Bitcoin micro-conversions is redirected to your Dustbin pool instead of fragmenting the UTXO set. When mempool gas is lowest or during your next larger settlement, the engine clubs them into a zero-fee Lightning channel!
              </p>
            </div>

            <button
              onClick={handleConsolidate}
              disabled={isConsolidating || selectedUtxos.length === 0}
              className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 transition-all cursor-pointer"
            >
              {isConsolidating ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Batch Club {selectedUtxos.length} Dust Outputs via Lightning</span>
                </>
              )}
            </button>

            {consolidationSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Successfully clubbed dust outputs! Saved 1,420 satoshis in mining gas.</span>
              </div>
            )}
          </div>

          {/* Right Column: UTXO Hygiene List */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">
                Live UTXO Hygiene Scanner
              </h3>
              <span className="text-xs font-mono text-slate-500">
                {selectedUtxos.length} of {UTXO_DATASET.length} Selected
              </span>
            </div>

            <div className="space-y-2.5">
              {UTXO_DATASET.map((utxo) => (
                <div
                  key={utxo.id}
                  onClick={() => toggleSelect(utxo.id)}
                  className={`p-3 rounded-xl border text-xs font-mono transition-all cursor-pointer flex items-center justify-between ${
                    selectedUtxos.includes(utxo.id)
                      ? 'bg-blue-50 border-blue-400 shadow-xs'
                      : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedUtxos.includes(utxo.id)}
                      onChange={() => {}}
                      className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                    />
                    <div>
                      <div className="font-bold text-slate-900">
                        {utxo.txid.substring(0, 10)}...:{utxo.vout}
                      </div>
                      <div className="text-[10px] text-slate-500 font-sans">
                        {utxo.category} • Fee to spend: {utxo.feeToSpendSats} sats
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-900">
                      {utxo.amountSats.toLocaleString()} sats
                    </div>
                    <div className="text-[10px] text-slate-500">
                      ₹{utxo.amountInr.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
