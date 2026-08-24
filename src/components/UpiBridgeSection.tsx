import React, { useState } from 'react';
import {
  QrCode,
  CheckCircle2,
  ArrowRight,
  Shield,
  Zap,
  Coffee,
  Sparkles,
  HelpCircle,
  RefreshCw,
} from 'lucide-react';

export const UpiBridgeSection: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 1200);
  };

  const handleReset = () => {
    setStep(1);
    setIsProcessing(false);
  };

  return (
    <section id="upi-bridge" className="py-20 sm:py-28 bg-[#020617] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-4 font-semibold shadow-sm">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>06 · PAY — LIGHTNING → UPI CROSS-RAIL SETTLEMENT (PROTOTYPE)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Seamless Cross-Border Travel.{' '}
            <span className="text-cyan-400">Global Bitcoin, Local UPI.</span>
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            A foreign traveler landing in Bangalore or Mumbai can scan any standard Indian merchant UPI QR code and pay directly from their sovereign Bitcoin / Lightning wallet — orchestrated via compliant local settlement rails without requiring an Indian bank account.
          </p>
        </div>

        {/* Prototype & Compliance Disclaimer Bar */}
        <div className="mb-10 p-4 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-slate-800 flex items-start gap-3 text-xs text-slate-300 shadow-xl">
          <Shield className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-white">Compliance &amp; Architectural Position:</strong> SATCONNECT is not a bank or payment service provider. It functions as a non-custodial payment orchestration and settlement gateway connecting a user&apos;s Bitcoin balance with licensed INR settlement partners. This interface demonstrates a functional prototype simulation.
          </div>
        </div>

        {/* 4-Step Orchestrated Flow Strip */}
        <div className="mb-12 p-4 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-slate-800 text-xs font-mono shadow-xl">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider mb-3">
            Payment Orchestration Architecture
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <span className="text-amber-400 font-bold">1. Bitcoin / Lightning</span>
              <div className="text-[10px] text-slate-400 mt-0.5">User pays $2.82 BTC</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <span className="text-cyan-400 font-bold">2. SATCONNECT Engine</span>
              <div className="text-[10px] text-slate-400 mt-0.5">Risk &amp; FX Verification</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <span className="text-indigo-400 font-bold">3. INR Settlement Partner</span>
              <div className="text-[10px] text-slate-400 mt-0.5">Compliant Rail Conversion</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/70 border border-emerald-500/30">
              <span className="text-emerald-400 font-bold">4. Merchant UPI Instant</span>
              <div className="text-[10px] text-slate-400 mt-0.5">Merchant receives ₹240.00</div>
            </div>
          </div>
        </div>

        {/* Interactive Payment Terminal Demo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Simulated Merchant Terminal / QR */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-800 shadow-2xl space-y-6 text-center">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono text-left">
              <span className="text-white font-bold">MERCHANT UPI QR CODE</span>
              <span className="text-emerald-400">● Live Merchant</span>
            </div>

            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
                <Coffee className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-white">Bangalore Artisanal Chai &amp; Cafe</div>
                <div className="text-xs font-mono text-slate-400">UPI ID: bangalorechai@okhdfcbank</div>
              </div>
            </div>

            {/* QR Mock graphic */}
            <div className="inline-block p-4 bg-white rounded-2xl shadow-xl">
              <div className="w-44 h-44 border-2 border-slate-950 flex flex-col items-center justify-center relative p-2">
                <QrCode className="w-36 h-36 text-slate-950" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center shadow-md">
                    <Zap className="w-4 h-4 text-slate-950 fill-slate-950" />
                  </div>
                </div>
              </div>
            </div>

            <div className="text-xs font-mono text-slate-400">
              Merchant Bill: <span className="text-lg font-bold text-white">₹240.00 INR</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-slate-400">
              Scanned Payload: <span className="text-cyan-300">upi://pay?pa=bangalorechai@okhdfcbank&amp;am=240.00</span>
            </div>
          </div>

          {/* Right Column: SATCONNECT Consumer Settlement View */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-cyan-500/40 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono">
              <span className="text-cyan-300 font-bold">CROSS-RAIL SETTLEMENT ENGINE</span>
              <span className="text-slate-400">Step {step} of 3</span>
            </div>

            {step === 1 && (
              <div className="space-y-5">
                {/* Pre-payment Checklist */}
                <div className="space-y-2 text-xs font-mono">
                  <div className="text-slate-400 uppercase tracking-wider text-[10px]">
                    Pre-Payment Safety &amp; Validation Checklist
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-300">UPI QR Signature Valid</span>
                    <span className="text-emerald-400 flex items-center gap-1 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-300">Requested Amount</span>
                    <span className="text-white font-bold">₹240.00 INR</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-300">Merchant Metadata Match</span>
                    <span className="text-emerald-400 flex items-center gap-1 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Clean
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-300">AI Risk Indicators</span>
                    <span className="text-emerald-400 flex items-center gap-1 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Low Risk (Score: 8/100)
                    </span>
                  </div>
                </div>

                {/* Conversion Quote */}
                <div className="p-4 rounded-xl bg-[#080e1c] border border-cyan-500/30 space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Bitcoin Amount:</span>
                    <span className="text-white font-bold">3,340 sats (~$2.82 USD)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Lightning Mesh Routing Fee:</span>
                    <span className="text-cyan-300 font-bold">₹0.80 (10 sats)</span>
                  </div>
                  <div className="h-px bg-slate-800 my-1" />
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-200 font-bold">Total Equivalent:</span>
                    <span className="text-amber-400 font-bold">₹240.80 INR</span>
                  </div>
                </div>

                <button
                  id="upi-proceed-quote-btn"
                  onClick={() => setStep(2)}
                  className="w-full py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs font-mono flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Review &amp; Authorize Lightning Settlement</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="text-xs font-mono text-slate-400">AUTHORIZE NON-CUSTODIAL HTLC</div>
                  <div className="text-sm font-bold text-white">
                    Send 3,350 sats from Phoenix Wallet to SATCONNECT Liquidity Mesh
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Upon cryptographic preimage reveal, ₹240.00 INR will be disbursed immediately to the merchant&apos;s HDFC Bank VPA via licensed payment infrastructure.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="w-1/3 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 font-mono text-xs hover:bg-slate-800"
                  >
                    Back
                  </button>
                  <button
                    id="upi-execute-payment-btn"
                    onClick={handleSimulatePayment}
                    disabled={isProcessing}
                    className="w-2/3 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs font-mono flex items-center justify-center gap-2"
                  >
                    <Zap className={`w-4 h-4 fill-slate-950 ${isProcessing ? 'animate-bounce' : ''}`} />
                    <span>{isProcessing ? 'Settling Cross-Rail...' : 'Pay ₹240 via Lightning'}</span>
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5 text-center py-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-lg font-bold text-white">Payment Successfully Settled!</div>
                  <div className="text-xs font-mono text-emerald-400 mt-0.5">
                    ₹240.00 INR Credited to Bangalore Chai &amp; Cafe
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-left font-mono text-xs space-y-1.5 text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Payment ID:</span>
                    <span className="text-white">sc_pay_9981aef42</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Preimage Hash:</span>
                    <span className="text-cyan-300 truncate max-w-[180px]">9f8a...33d1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Settlement Time:</span>
                    <span className="text-emerald-400 font-bold">142 milliseconds</span>
                  </div>
                </div>

                <button
                  id="upi-reset-demo-btn"
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300 flex items-center justify-center gap-2 mx-auto"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Test Another UPI Transaction</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
