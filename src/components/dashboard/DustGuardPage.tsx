import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  Trash2, 
  Sparkles, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowRight, 
  Flame, 
  TrendingDown, 
  CheckCircle2, 
  RefreshCw, 
  Zap, 
  Info, 
  HelpCircle,
  Coins,
  ArrowUpRight,
  Sliders,
  DollarSign
} from 'lucide-react';
import { getLatestMarketData } from '../../services/livePriceService';
import { BitcoinDustbinState, UtxoItem } from '../../types';

export const DustGuardPage: React.FC = () => {
  const [marketRate, setMarketRate] = useState(8392400); // 1 BTC = ₹83,92,400
  const [inputInr, setInputInr] = useState<number>(150);
  const [autoDepositDustbin, setAutoDepositDustbin] = useState<boolean>(true);
  const [isClubbingProcessing, setIsClubbingProcessing] = useState<boolean>(false);
  const [clubSuccessMsg, setClubSuccessMsg] = useState<string | null>(null);

  // Dustbin Live State
  const [dustbinState, setDustbinState] = useState<BitcoinDustbinState>({
    totalDustDepositedSats: 4850,
    totalDustDepositedInr: 407,
    dustSweepsCount: 14,
    handlingChargeSavedInr: 1840,
    pendingDustUtxos: 6,
    autoDustbinDepositEnabled: true,
    nextConsolidationMempoolTarget: 10,
  });

  // UTXO list
  const [utxoList, setUtxoList] = useState<UtxoItem[]>([
    {
      id: 'utxo-1',
      txid: '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b',
      vout: 0,
      amountSats: 15000000,
      amountInr: 125886,
      category: 'Spendable',
      feeToSpendSats: 180,
    },
    {
      id: 'utxo-2',
      txid: '3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d',
      vout: 1,
      amountSats: 240000,
      amountInr: 2014,
      category: 'Spendable',
      feeToSpendSats: 180,
    },
    {
      id: 'utxo-3',
      txid: '5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f',
      vout: 2,
      amountSats: 320,
      amountInr: 2.68,
      category: 'Uneconomical',
      dustWarning: 'Dust Output: Mining fee (360 sats) exceeds output value (320 sats)',
      feeToSpendSats: 360,
    },
    {
      id: 'utxo-4',
      txid: '7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b',
      vout: 0,
      amountSats: 190,
      amountInr: 1.59,
      category: 'Uneconomical',
      dustWarning: 'Sub-Dust: Unspendable without batch consolidation',
      feeToSpendSats: 360,
    },
    {
      id: 'utxo-5',
      txid: '1c2d3e4f5a6b7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
      vout: 1,
      amountSats: 546,
      amountInr: 4.58,
      category: 'Suspicious',
      isQuarantined: true,
      dustWarning: 'Quarantined: Probable tracking dust attack from unverified analytics node',
      feeToSpendSats: 360,
    },
  ]);

  useEffect(() => {
    const market = getLatestMarketData();
    if (market.btcInr) {
      setMarketRate(market.btcInr);
    }
  }, []);

  // Calculate Satoshi amount from Rupee input
  const convertedSats = Math.round((inputInr / marketRate) * 100000000);
  const convertedBtc = (inputInr / marketRate).toFixed(8);
  
  // Standard dust limit is 546 satoshis for SegWit
  const DUST_LIMIT_SATS = 546;
  const isDustPayment = convertedSats > 0 && convertedSats < DUST_LIMIT_SATS;
  const potentialDustGenerated = Math.max(0, DUST_LIMIT_SATS - convertedSats);

  // Handle deposit payment dust simulation
  const handleSimulatePaymentDust = () => {
    if (convertedSats <= 0) return;

    if (isDustPayment || autoDepositDustbin) {
      const addedSats = isDustPayment ? convertedSats : 180;
      const addedInr = Number(((addedSats / 100000000) * marketRate).toFixed(2));
      
      setDustbinState((prev) => ({
        ...prev,
        totalDustDepositedSats: prev.totalDustDepositedSats + addedSats,
        totalDustDepositedInr: prev.totalDustDepositedInr + addedInr,
        dustSweepsCount: prev.dustSweepsCount + 1,
        handlingChargeSavedInr: prev.handlingChargeSavedInr + 45,
      }));

      setClubSuccessMsg(`Deposited ${addedSats} satoshis (₹${addedInr}) into your Bitcoin Dustbin to prevent toxic UTXO bloat.`);
      setTimeout(() => setClubSuccessMsg(null), 5000);
    }
  };

  // Club transactions using Lightning Route Intelligence
  const handleClubDustWithLightning = () => {
    setIsClubbingProcessing(true);
    setClubSuccessMsg(null);

    setTimeout(() => {
      setIsClubbingProcessing(false);
      const sweptSats = dustbinState.totalDustDepositedSats;
      
      setDustbinState((prev) => ({
        ...prev,
        totalDustDepositedSats: 0,
        totalDustDepositedInr: 0,
        pendingDustUtxos: 0,
        handlingChargeSavedInr: prev.handlingChargeSavedInr + 120,
        lastClubbedTxId: 'ln_route_club_' + Math.random().toString(36).substring(2, 9),
      }));

      // Clean up uneconomical UTXOs
      setUtxoList((prev) =>
        prev.filter((u) => u.category !== 'Uneconomical')
      );

      setClubSuccessMsg(
        `⚡ Lightning Route Intelligence successfully clubbed ${sweptSats} sats into your primary SegWit Liquidity Channel with ZERO on-chain fees!`
      );
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner - Angel One Style */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 text-xs font-mono font-bold mb-2">
            <Trash2 className="w-3.5 h-3.5 text-orange-600" />
            <span>05 · BITCOIN DUST &amp; THE SOVEREIGN DUSTBIN</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Bitcoin Dust &amp; UTXO Dustbin Optimizer
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Convert INR micropayments, isolate uneconomical Bitcoin dust (&lt;546 sats), and club change outputs via Lightning Route Intelligence.
          </p>
        </div>

        {/* Live Mempool Fee Window */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
            <Flame className="w-5 h-5 text-orange-300" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-slate-500 uppercase font-semibold">
              Current Mempool Fee
            </div>
            <div className="text-sm font-bold font-mono text-slate-900">
              12 sat/vB <span className="text-xs text-emerald-600 font-semibold">(Low Fee Window)</span>
            </div>
          </div>
        </div>
      </div>

      {clubSuccessMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-3 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="font-medium">{clubSuccessMsg}</span>
        </div>
      )}

      {/* Main Grid: Interactive Dust Generator vs Sovereign Dustbin Pool */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: INR -> Satoshi Dust Calculator & Payment Simulator */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-orange-500" />
              <h2 className="text-sm font-bold text-slate-900 uppercase">
                Interactive Rupee to Satoshi Dust Simulator
              </h2>
            </div>
            <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              1 BTC = ₹{marketRate.toLocaleString('en-IN')}
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            When you pay small amounts in Indian Rupees (e.g. ₹50 or ₹150 for chai), it converts into a small fraction of Bitcoin. If the payment or change is smaller than <strong>546 satoshis</strong>, it creates <em>Bitcoin Dust</em>—an un-economical output where the network fee to spend it exceeds its actual value!
          </p>

          {/* Amount input in Rupees */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              Enter Payment / Settlement Amount in Rupees (INR):
            </label>
            <div className="relative">
              <span className="text-slate-400 font-mono font-bold text-base absolute left-3.5 top-1/2 -translate-y-1/2">
                ₹
              </span>
              <input
                type="number"
                id="dust-inr-input"
                value={inputInr}
                onChange={(e) => setInputInr(Math.max(1, Number(e.target.value)))}
                className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-300 font-mono text-lg font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
              />
            </div>

            {/* Quick Amount Pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[25, 50, 150, 500, 1200, 5000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setInputInr(amt)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold border transition-all ${
                    inputInr === amt
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>
          </div>

          {/* Live Satoshi & Dust Conversion Breakdown */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between text-slate-600">
              <span>Satoshi Equivalent:</span>
              <span className="text-slate-900 font-bold text-sm">
                {convertedSats.toLocaleString()} satoshis
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Bitcoin Value:</span>
              <span className="text-orange-600 font-bold">
                {convertedBtc} BTC
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Standard Dust Threshold:</span>
              <span className="text-slate-700 font-semibold">{DUST_LIMIT_SATS} sats</span>
            </div>

            <div className="pt-2 border-t border-slate-200">
              {isDustPayment ? (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-xs">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>⚠️ Uneconomical Bitcoin Dust Alert!</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    This ₹{inputInr} payment produces only <strong>{convertedSats} sats</strong>. Spending this on-chain would cost ~360 sats in network fees.
                  </p>
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>✓ Economical UTXO Threshold Passed</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    {convertedSats} sats exceeds dust limit. Leftover micro-change (e.g. 180 sats) can still be swept to Dustbin.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Auto Dustbin Deposit Checkbox */}
          <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-orange-500" />
              <div>
                <div className="text-xs font-bold text-slate-900">
                  Auto-Deposit Dust into Sovereign Dustbin
                </div>
                <div className="text-[11px] text-slate-500">
                  Store extra micro-charges into Dustbin to club in bigger transactions.
                </div>
              </div>
            </div>
            <input
              type="checkbox"
              id="toggle-auto-dustbin"
              checked={autoDepositDustbin}
              onChange={(e) => setAutoDepositDustbin(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
            />
          </div>

          <button
            type="button"
            id="simulate-dust-payment-btn"
            onClick={handleSimulatePaymentDust}
            className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 transition-all cursor-pointer"
          >
            <span>Execute ₹{inputInr} Payment &amp; Deposit Dust in Dustbin</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right Column: The Sovereign Dustbin Pool & Lightning Clubbing Engine */}
        <div className="lg:col-span-6 space-y-5">
          {/* Dustbin Pool Card */}
          <div className="bg-[#0b1e48] rounded-2xl p-6 text-white shadow-xl space-y-5 relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Trash2 className="w-5 h-5 text-orange-400" />
                <h3 className="text-sm font-bold font-mono tracking-wide">
                  SOVEREIGN BITCOIN DUSTBIN
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ACTIVE POOL
              </span>
            </div>

            <div>
              <div className="text-xs font-mono text-slate-300 mb-1">
                TOTAL COLLECTED DUST SATS
              </div>
              <div className="text-3xl font-extrabold font-mono text-white">
                {dustbinState.totalDustDepositedSats.toLocaleString()}{' '}
                <span className="text-orange-400 text-base font-normal">SATS</span>
              </div>
              <div className="text-xs font-mono text-slate-300 mt-1">
                ≈ ₹{((dustbinState.totalDustDepositedSats / 100000000) * marketRate).toFixed(2)} INR · ({dustbinState.dustSweepsCount} micro-payments swept)
              </div>
            </div>

            {/* Metrics Strip */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/10">
                <span className="text-slate-400 text-[10px] block">Mempool Fees Saved</span>
                <span className="text-emerald-400 font-bold text-sm">
                  ₹{dustbinState.handlingChargeSavedInr} INR
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/10">
                <span className="text-slate-400 text-[10px] block">Toxic UTXOs Prevented</span>
                <span className="text-cyan-300 font-bold text-sm">
                  {dustbinState.dustSweepsCount} Bloat Avoided
                </span>
              </div>
            </div>

            {/* Lightning Route Intelligence Clubbing Engine */}
            <div className="p-4 rounded-xl bg-blue-950/60 border border-blue-500/40 space-y-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-300" />
                <span className="text-xs font-bold text-white font-mono">
                  Lightning Route Intelligence Clubbing
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                Instead of paying 300+ sats on-chain for each micro-dust output, SATCONNECT clubs your collected dust into your next larger transaction as handling credit or routes it through a zero-fee Lightning mesh channel!
              </p>

              <button
                type="button"
                id="club-dust-lightning-btn"
                onClick={handleClubDustWithLightning}
                disabled={isClubbingProcessing || dustbinState.totalDustDepositedSats === 0}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:brightness-110 text-slate-950 font-bold text-xs font-mono flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                {isClubbingProcessing ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Club &amp; Sweep {dustbinState.totalDustDepositedSats} Sats via Lightning</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Educational Explainer Card */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 text-xs">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span>Why Does Bitcoin Dust Matter for UPI Payments?</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              When buying ₹20 milk or ₹100 coffee in India, converting fiat to Bitcoin on-chain creates micro-change outputs that cost more to spend than they are worth. SATCONNECT solves this through the <strong>Bitcoin Dustbin</strong>, where dust is swept instantly and clubbed into larger transactions using Lightning intelligence.
            </p>
          </div>
        </div>
      </div>

      {/* UTXO Inventory & Quarantine Matrix (Crisp Light Theme) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              Sovereign UTXO Inventory &amp; Dust Quarantine Matrix
            </h3>
            <p className="text-xs text-slate-500">
              Detailed tracking of every unspent transaction output on your native Bitcoin keys.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
            {utxoList.length} UTXOs Tracked
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <th className="p-3">TXID &amp; VOUT</th>
                <th className="p-3">AMOUNT (SATS)</th>
                <th className="p-3">INR VALUE</th>
                <th className="p-3">FEE TO SPEND</th>
                <th className="p-3">CATEGORY</th>
                <th className="p-3 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {utxoList.map((utxo) => (
                <tr key={utxo.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3">
                    <span className="font-bold text-slate-900">
                      {utxo.txid.substring(0, 8)}...{utxo.txid.substring(utxo.txid.length - 6)}
                    </span>
                    <span className="text-slate-400 ml-1">:{utxo.vout}</span>
                  </td>
                  <td className="p-3 font-bold text-slate-900">
                    {utxo.amountSats.toLocaleString()} sats
                  </td>
                  <td className="p-3 text-slate-700 font-semibold">
                    ₹{utxo.amountInr.toLocaleString('en-IN')}
                  </td>
                  <td className="p-3 text-slate-500">
                    {utxo.feeToSpendSats} sats
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        utxo.category === 'Spendable'
                          ? 'bg-emerald-100 text-emerald-800'
                          : utxo.category === 'Uneconomical'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {utxo.category}
                    </span>
                    {utxo.dustWarning && (
                      <div className="text-[10px] text-slate-500 mt-0.5 font-sans truncate max-w-xs">
                        {utxo.dustWarning}
                      </div>
                    )}
                  </td>
                  <td className="p-3 text-right">
                    {utxo.category === 'Uneconomical' ? (
                      <button
                        onClick={handleClubDustWithLightning}
                        className="px-2.5 py-1 rounded bg-orange-100 hover:bg-orange-200 text-orange-800 text-[10px] font-bold transition-colors cursor-pointer"
                      >
                        Sweep to Dustbin
                      </button>
                    ) : utxo.isQuarantined ? (
                      <span className="text-[10px] text-rose-700 font-bold">
                        🛡️ Quarantined
                      </span>
                    ) : (
                      <span className="text-[10px] text-emerald-700 font-semibold">
                        Ready to Spend
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
