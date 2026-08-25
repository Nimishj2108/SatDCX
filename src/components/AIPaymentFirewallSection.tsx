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
    }, 500);
  };

  const isHigh = selectedScenario === 'high_risk';
  const riskScore = isHigh ? 87 : 12;
  const paymentAmount = isHigh ? 18400 : 450;
  const recipient = isHigh ? '@crypto_vendor_99' : '@bangalore_chai_co';

  return (
    <section id="firewall" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold mb-3">
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-600" />
            <span>03 · PROTECT — AI PAYMENT FIREWALL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Behavioral Anomaly Detection. <span className="text-emerald-600">Zero-Compromise Security.</span>
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Unlike static blocklists, SATCONNECT AI evaluates behavioral context: transaction size deviations, unfamiliar recipient nodes, time anomalies, and graph provenance before cryptographic signature.
          </p>
        </div>

        {/* 5-Step Pipeline Strip */}
        <div className="mb-10 p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono">
          <div className="text-[11px] text-slate-500 uppercase tracking-wider mb-3 font-bold">
            Cybersecurity Verification Pipeline
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { step: '1. Request', desc: 'Payment Intent Received' },
              { step: '2. AI Engine', desc: 'Behavioral Risk Analysis' },
              { step: '3. Mempool Check', desc: 'Graph UTXO Traceability' },
              { step: '4. Multi-Sig', desc: 'Threshold Quorum Sign' },
              { step: '5. Settle', desc: 'Cryptographic Finality' },
            ].map((p, idx) => (
              <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-blue-600 font-bold">{p.step}</span>
                <p className="text-[11px] text-slate-500 font-sans mt-0.5">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Firewall Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Risk Analyzer Card */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-bold text-slate-900 text-xs uppercase">Simulate Transaction Risk</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => triggerScan('low_risk')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold border transition-all cursor-pointer ${
                    !isHigh ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  Low Risk (Chai ₹450)
                </button>
                <button
                  type="button"
                  onClick={() => triggerScan('high_risk')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold border transition-all cursor-pointer ${
                    isHigh ? 'bg-rose-600 text-white border-rose-600' : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  High Risk (Anomaly ₹18,400)
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Target Recipient:</span>
                <span className="font-bold text-slate-900">{recipient}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Amount:</span>
                <span className="font-bold text-slate-900">₹{paymentAmount.toLocaleString()} INR</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                <span className="text-slate-700 font-bold">Calculated Risk Score:</span>
                <span
                  className={`px-2.5 py-0.5 rounded-full font-bold text-xs ${
                    isHigh ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {riskScore} / 100 ({isHigh ? 'HIGH RISK' : 'LOW RISK'})
                </span>
              </div>
            </div>

            {isHigh ? (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 font-bold">
                  <AlertOctagon className="w-4 h-4 text-rose-600" />
                  <span>AI Interception: Velocity Anomaly Detected</span>
                </div>
                <p className="text-[11px] text-rose-800 leading-relaxed">
                  Amount ₹18,400 is 14x higher than 30-day baseline median. Destination node has only 2 public hops. Biometric 2FA and time-delay quarantine required.
                </p>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Verified Safe Merchant</span>
                </div>
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  Trusted high-frequency merchant node with 100% historical uptime. Sub-second instant pass authorized.
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Key Security Metrics */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase pb-2 border-b border-slate-100">
              Firewall Enclave Protections
            </h3>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
                <span className="text-slate-600">Local Enclave Sandbox:</span>
                <span className="text-emerald-700 font-bold">✓ Active (Zero Key Leak)</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
                <span className="text-slate-600">Time-Lock Delay Circuit:</span>
                <span className="text-slate-900 font-bold">15 Mins on Anomalies</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
                <span className="text-slate-600">Cross-Hop Node Provenance:</span>
                <span className="text-slate-900 font-bold">Verified Gossip Mesh</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
