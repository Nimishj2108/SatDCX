import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Fingerprint,
  AlertOctagon,
  Clock,
  ArrowRight,
  RefreshCw,
  Sliders,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { RISK_FIREWALL_SAMPLE } from '../data/mockData';

export const AIPaymentFirewallSection: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<'high_risk' | 'low_risk'>('high_risk');
  const [isScanning, setIsScanning] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const triggerScan = (scenario: 'high_risk' | 'low_risk') => {
    setSelectedScenario(scenario);
    setIsScanning(true);
    setIsVerified(false);
    setTimeout(() => {
      setIsScanning(false);
    }, 700);
  };

  const isHigh = selectedScenario === 'high_risk';
  const riskScore = isHigh ? 87 : 12;
  const paymentAmount = isHigh ? 18400 : 450;
  const recipient = isHigh ? '@crypto_vendor_99' : '@bangalore_chai_co';

  return (
    <section id="firewall" className="py-20 sm:py-28 bg-[#020617] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-emerald-500/30 text-xs font-mono text-emerald-300 mb-4 font-semibold shadow-sm">
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
            <span>03 · PROTECT — AI PAYMENT FIREWALL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Behavioral Anomaly Detection. <span className="text-emerald-400">Zero-Compromise Security.</span>
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            Unlike static blocklists, SATCONNECT AI evaluates behavioral context: transaction size deviations, unfamiliar recipient nodes, time anomalies, and graph provenance before cryptographic signature.
          </p>
        </div>

        {/* 5-Step Pipeline Strip */}
        <div className="mb-12 p-4 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-slate-800 text-xs font-mono shadow-xl">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider mb-3">
            Cybersecurity Verification Pipeline
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[
              { step: '1. Request', desc: 'Payment Intent Received' },
              { step: '2. AI Engine', desc: 'Behavioral Risk Analysis' },
              { step: '3. Risk Score', desc: '0-100 Anomaly Metric' },
              { step: '4. Adaptive Auth', desc: 'Biometric / Cooldown' },
              { step: '5. Execution', desc: 'Sovereign Signature' },
            ].map((p, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 flex flex-col justify-between"
              >
                <div className="font-bold text-amber-400 text-[11px]">{p.step}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Firewall Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Scenario Controller */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-mono text-slate-300 font-bold">
                  SIMULATE TRANSACTION SCENARIO
                </span>
                <span className="text-[10px] font-mono text-cyan-400">Interactive</span>
              </div>

              <div className="space-y-2">
                <button
                  id="firewall-scenario-high-btn"
                  onClick={() => triggerScan('high_risk')}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                    isHigh
                      ? 'bg-red-950/40 border-red-500/80 shadow-md shadow-red-500/10'
                      : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-red-300">
                      ⚠️ Scenario A: Large Spike to New Recipient
                    </span>
                    <span className="text-[10px] font-mono text-red-400">₹18,400</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    6.4× median transaction amount to an unverified recipient handle.
                  </p>
                </button>

                <button
                  id="firewall-scenario-low-btn"
                  onClick={() => triggerScan('low_risk')}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                    !isHigh
                      ? 'bg-emerald-950/40 border-emerald-500/80 shadow-md shadow-emerald-500/10'
                      : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-300">
                      ✓ Scenario B: Routine Micro-Payment
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400">₹450</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Routine daily coffee payment matching 30-day verified historical frequency.
                  </p>
                </button>
              </div>

              <div className="pt-2">
                <button
                  id="firewall-rescan-btn"
                  onClick={() => triggerScan(selectedScenario)}
                  disabled={isScanning}
                  className="w-full py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 hover:bg-slate-800 text-slate-200 text-xs font-mono flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
                  <span>{isScanning ? 'Scanning Telemetry...' : 'Re-Run Anomaly Evaluation'}</span>
                </button>
              </div>
            </div>

            {/* Micro Compliance Card */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 leading-relaxed shadow-sm">
              <strong className="text-slate-300">Security Architecture Notice:</strong> AI risk scoring is advisory and provides behavioral anomaly detection. You retain 100% cryptographic authority to sign or reject transactions.
            </div>
          </div>

          {/* Right Column: Live Anomaly Assessment Output Card */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-800 shadow-2xl relative">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-slate-400">TARGET TRANSACTION</span>
                <div className="text-lg font-bold text-white font-mono mt-0.5">
                  ₹{paymentAmount.toLocaleString('en-IN')} → {recipient}
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-400">STATUS</span>
                <div
                  className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md mt-0.5 ${
                    isHigh
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}
                >
                  {isScanning ? 'EVALUATING...' : isHigh ? 'HIGH RISK DETECTED' : 'LOW RISK · PASSED'}
                </div>
              </div>
            </div>

            {/* Risk Gauge Bar */}
            <div className="my-6">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-slate-300">ANOMALY RISK SCORE</span>
                <span
                  className={`text-lg font-bold ${
                    isHigh ? 'text-red-400' : 'text-emerald-400'
                  }`}
                >
                  {riskScore} / 100
                </span>
              </div>
              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    isHigh
                      ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-500'
                      : 'bg-gradient-to-r from-teal-500 to-emerald-400'
                  }`}
                  style={{ width: `${riskScore}%` }}
                />
              </div>
            </div>

            {/* Anomaly Breakdown */}
            <div className="space-y-2.5 mb-6">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Behavioral Audit Indicators
              </div>
              {isHigh ? (
                RISK_FIREWALL_SAMPLE.reasons.map((reason, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-red-950/20 border border-red-900/30 text-xs text-red-300 flex items-start gap-2.5"
                  >
                    <AlertOctagon className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </div>
                ))
              ) : (
                <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/30 text-xs text-emerald-300 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Amount matches typical spending patterns (0.92× 30-day median). Recipient node is verified.</span>
                </div>
              )}
            </div>

            {/* Adaptive Action Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    isHigh ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'
                  }`}
                >
                  {isHigh ? <Fingerprint className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">
                    {isHigh ? 'Adaptive Verification Required' : 'Instant Signature Authorized'}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {isHigh
                      ? 'Requires biometric re-auth + 60s cooldown confirmation.'
                      : 'Zero additional verification needed.'}
                  </div>
                </div>
              </div>

              {isHigh && (
                <button
                  id="firewall-adaptive-verify-btn"
                  onClick={() => setIsVerified(!isVerified)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold font-mono transition-all shrink-0 ${
                    isVerified
                      ? 'bg-emerald-400 text-slate-950'
                      : 'bg-red-500 hover:bg-red-400 text-white'
                  }`}
                >
                  {isVerified ? '✓ Biometric Verified' : 'Trigger Biometric Auth'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
