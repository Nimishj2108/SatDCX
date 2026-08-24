import React, { useState } from 'react';
import {
  Layers,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Calendar,
  DollarSign,
  Shield,
  Sliders,
  Sparkles,
} from 'lucide-react';

export const SmartSavingsSection: React.FC = () => {
  const [goalAmount, setGoalAmount] = useState<number>(200000);
  const [goalPurpose, setGoalPurpose] = useState<string>('Laptop Workstation');
  const [timeHorizonMonths, setTimeHorizonMonths] = useState<number>(4);
  const [riskTolerance, setRiskTolerance] = useState<'Conservative' | 'Moderate' | 'Aggressive'>('Moderate');
  const [btcExposure, setBtcExposure] = useState<number>(82);

  // Dynamic Savings Health Score calculation based on risk consistency
  // If time horizon is short (e.g. 1-4 months) and exposure is high (80%+), health drops because volatility could delay purchase
  const calculateHealth = () => {
    let base = 90;
    if (timeHorizonMonths < 6 && btcExposure > 70) {
      base -= (btcExposure - 70) * 0.8;
      base -= (6 - timeHorizonMonths) * 3;
    } else if (timeHorizonMonths >= 12 && btcExposure > 70) {
      base += 5; // Long horizon absorbs volatility well
    }
    if (riskTolerance === 'Conservative' && btcExposure > 50) {
      base -= 12;
    }
    return Math.max(35, Math.min(98, Math.round(base)));
  };

  const healthScore = calculateHealth();
  const isElevatedRisk = healthScore < 75;

  return (
    <section id="smart-savings" className="py-20 sm:py-28 bg-[#020617] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-indigo-500/30 text-xs font-mono text-indigo-300 mb-4 font-semibold shadow-sm">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>04 · SAVE — SMART BITCOIN SAVINGS LAYER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Goal-Based Risk Intelligence.{' '}
            <span className="text-indigo-400">Zero Speculation.</span>
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            Don&apos;t predict the market. Predict your risk. SATCONNECT analyzes your savings timeline, portfolio concentration, and 30-day volatility to keep your real-world goals safe — with 100% user-directed control and zero automated trades.
          </p>
        </div>

        {/* Core Philosophy Banner */}
        <div className="mb-10 p-5 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-indigo-500/30 flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold shadow-inner">
              💡
            </div>
            <div>
              <div className="text-xs font-mono text-indigo-300 uppercase">Core Philosophy</div>
              <div className="text-base font-bold text-white">
                &ldquo;Don&apos;t predict the price of Bitcoin. Predict the user&apos;s personal liquidity risk.&rdquo;
              </div>
            </div>
          </div>
          <span className="hidden md:inline-block px-3 py-1 bg-slate-950/80 border border-indigo-800/60 rounded-full text-xs font-mono text-indigo-300">
            Non-Custodial · Zero Auto-Sell
          </span>
        </div>

        {/* Interactive Goal Builder & Risk Assessment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: User Interactive Goal Parameters */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-800 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono">
              <span className="text-white font-bold">CONFIGURABLE SAVINGS GOAL</span>
              <span className="text-cyan-400">Interactive Inputs</span>
            </div>

            {/* Goal Purpose */}
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-2">Savings Goal Purpose</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['Laptop Workstation', 'Emergency Fund', 'Education Fund', 'Dream Trip'].map((purpose) => (
                  <button
                    key={purpose}
                    onClick={() => setGoalPurpose(purpose)}
                    className={`p-2.5 rounded-lg border text-left font-medium transition-all ${
                      goalPurpose === purpose
                        ? 'bg-indigo-600/30 border-indigo-400 text-white shadow-sm'
                        : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {purpose}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Amount */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-slate-400">Target Goal Amount:</span>
                <span className="text-amber-400 font-bold">₹{goalAmount.toLocaleString('en-IN')}</span>
              </div>
              <input
                id="savings-target-slider"
                type="range"
                min="25000"
                max="1000000"
                step="25000"
                value={goalAmount}
                onChange={(e) => setGoalAmount(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            {/* Time Horizon Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-slate-400">Target Time Horizon:</span>
                <span className="text-cyan-400 font-bold">{timeHorizonMonths} Months</span>
              </div>
              <input
                id="savings-horizon-slider"
                type="range"
                min="1"
                max="36"
                step="1"
                value={timeHorizonMonths}
                onChange={(e) => setTimeHorizonMonths(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>1 Month (Short)</span>
                <span>12 Mos (Medium)</span>
                <span>36 Mos (Long)</span>
              </div>
            </div>

            {/* Bitcoin Exposure Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-slate-400">Bitcoin Portfolio Exposure:</span>
                <span className="text-indigo-400 font-bold">{btcExposure}%</span>
              </div>
              <input
                id="savings-exposure-slider"
                type="range"
                min="10"
                max="100"
                step="2"
                value={btcExposure}
                onChange={(e) => setBtcExposure(Number(e.target.value))}
                className="w-full accent-indigo-400 cursor-pointer"
              />
            </div>

            {/* Risk Tolerance */}
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-2">Risk Tolerance</label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {(['Conservative', 'Moderate', 'Aggressive'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setRiskTolerance(r)}
                    className={`py-2 rounded-lg border text-center font-mono font-semibold transition-all ${
                      riskTolerance === r
                        ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                        : 'bg-slate-950/80 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: AI Risk Engine Output */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-800 shadow-2xl space-y-6">
            {/* Header / Health Score */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-slate-400">SAVINGS HEALTH SCORE</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-0.5">
                  {healthScore} <span className="text-sm font-normal text-slate-400">/ 100</span>
                </div>
              </div>
              <div
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border ${
                  healthScore >= 80
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : healthScore >= 65
                    ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                    : 'bg-red-500/10 text-red-400 border-red-500/30'
                }`}
              >
                {healthScore >= 80
                  ? 'HEALTHY · OPTIMAL ALIGNMENT'
                  : healthScore >= 65
                  ? 'MODERATE · VOLATILITY WATCH'
                  : 'ELEVATED DRAWDOWN RISK'}
              </div>
            </div>

            {/* Metric Dimensions 4-Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-[10px] text-slate-400">30-DAY VOLATILITY</span>
                <div className="text-amber-300 font-bold text-sm mt-0.5">
                  {timeHorizonMonths < 6 ? '±14.8% (Rising)' : '±8.2% (Absorbable)'}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-[10px] text-slate-400">PORTFOLIO CONCENTRATION</span>
                <div className="text-white font-bold text-sm mt-0.5">
                  {btcExposure}% in Bitcoin
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-[10px] text-slate-400">TIME HORIZON BUFFER</span>
                <div className="text-cyan-300 font-bold text-sm mt-0.5">
                  {timeHorizonMonths} Months ({timeHorizonMonths < 6 ? 'Short Window' : 'Comfortable'})
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-[10px] text-slate-400">LIQUIDITY ACCESSIBILITY</span>
                <div className="text-emerald-400 font-bold text-sm mt-0.5">
                  Instant (Lightning Mesh)
                </div>
              </div>
            </div>

            {/* AI Actionable Insight Card */}
            <div className="p-4 rounded-xl bg-slate-950 border border-indigo-900/40 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-indigo-300 font-bold">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>AI GOAL-CONSISTENCY INSIGHT</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {timeHorizonMonths < 6 && btcExposure > 70
                  ? `Your Bitcoin exposure (${btcExposure}%) is becoming inconsistent with your short-term ${timeHorizonMonths}-month goal for ${goalPurpose}. A potential routine 12-15% correction could temporarily delay your target date.`
                  : `Your ${timeHorizonMonths}-month horizon for ${goalPurpose} provides sufficient structural time to absorb normal Bitcoin volatility cycles while maintaining self-custody.`}
              </p>
            </div>

            {/* User Controlled Action Recommendation */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
              <Shield className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white">Suggested Non-Custodial Action</h4>
                <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                  {timeHorizonMonths < 6 && btcExposure > 70
                    ? 'Consider manually reallocating a portion to your emergency reserve or scheduling user-approved milestone lockups. SATCONNECT will never auto-execute trades without your explicit cryptographic signature.'
                    : 'Goal is currently well-balanced. Continue dollar-cost averaging into your self-custody vault.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
