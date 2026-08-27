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
  Volume2
} from 'lucide-react';

export const UpiBridgeSection: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [soundboxPlayed, setSoundboxPlayed] = useState(false);

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
      setSoundboxPlayed(true);
      setTimeout(() => setSoundboxPlayed(false), 4000);
    }, 1000);
  };

  const handleReset = () => {
    setStep(1);
    setIsProcessing(false);
  };

  return (
    <section id="upi-bridge" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-mono font-bold mb-3">
            <Zap className="w-3.5 h-3.5 text-blue-600" />
            <span>06 · PAY — LIGHTNING → UPI CROSS-RAIL SETTLEMENT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Global Bitcoin Sats. <span className="text-blue-600">Instant Indian UPI Settlement.</span>
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Scan any standard Indian merchant UPI QR code (PhonePe, Google Pay, Paytm, BharatPe) and settle directly in INR from your sovereign Bitcoin wallet with zero foreign exchange delays.
          </p>
        </div>

        {/* Compliance Bar */}
        <div className="mb-8 p-4 rounded-2xl bg-blue-50/60 border border-blue-200 flex items-start gap-3 text-xs text-slate-700 shadow-xs">
          <Shield className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-slate-900">Regulatory Architecture:</strong> SAT DCX is a 100% non-custodial cryptographic layer. INR fiat payouts to merchant UPI handles settle via registered partner gateway rails, while your Bitcoin remains in your self-custody until instant invoice settlement.
          </div>
        </div>

        {/* 4-Step Orchestrated Flow Strip */}
        <div className="mb-10 p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono">
          <div className="text-[11px] text-slate-500 uppercase tracking-wider mb-3 font-bold">
            Settlement Pipeline
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="text-blue-600 font-bold">01. Scan UPI QR</span>
              <p className="text-[11px] text-slate-500 font-sans mt-0.5">
                Camera decodes standard NPCI UPI payload &amp; amount in INR.
              </p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="text-blue-600 font-bold">02. Micro-Quotation</span>
              <p className="text-[11px] text-slate-500 font-sans mt-0.5">
                Engine locks live INR/BTC rate &amp; generates Lightning invoice.
              </p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="text-blue-600 font-bold">03. Local Signature</span>
              <p className="text-[11px] text-slate-500 font-sans mt-0.5">
                Your wallet signs payment hash in sub-second Lightning hop.
              </p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="text-emerald-700 font-bold">04. Merchant Soundbox</span>
              <p className="text-[11px] text-slate-500 font-sans mt-0.5">
                Merchant receives instant ₹ INR credit on their UPI soundbox.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Payment Scanner Mockup */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <QrCode className="w-5 h-5 text-blue-600" />
              <span className="font-bold text-slate-900 text-sm">Merchant UPI Payment Demo</span>
            </div>
            <span className="text-xs font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-bold">
              ● Live Sandbox
            </span>
          </div>

          {step === 1 && (
            <div className="space-y-4 text-center">
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto border border-blue-200">
                <Coffee className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Third Wave Coffee Roasters (Indiranagar, BLR)
                </h3>
                <p className="text-xs font-mono text-slate-500 mt-0.5">
                  UPI VPA: thirdwavecoffee@icici
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 font-mono text-center">
                <div className="text-xs text-slate-500">Total Bill Amount:</div>
                <div className="text-2xl font-extrabold text-slate-900 mt-1">₹240.00 INR</div>
                <div className="text-xs font-bold text-orange-600 mt-0.5">
                  ≈ 2,860 satoshis (0.00002860 BTC)
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-blue-500/20"
              >
                <span>Authorize Sovereign Lightning Settle</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Merchant:</span>
                  <span className="font-bold text-slate-900">Third Wave Coffee</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Amount:</span>
                  <span className="font-bold text-slate-900">₹240.00 INR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Routing Path:</span>
                  <span className="font-bold text-blue-600">Mesh Route A (0.4s)</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSimulatePayment}
                disabled={isProcessing}
                className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-orange-500/20"
              >
                {isProcessing ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Pay 2,860 Sats via Lightning Now</span>
                  </>
                )}
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Settlement Completed in 0.38 Seconds!
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  ₹240 INR successfully credited to merchant account.
                </p>
              </div>

              {soundboxPlayed && (
                <div className="p-3 rounded-xl bg-orange-50 border border-orange-200 text-orange-900 text-xs font-mono font-bold flex items-center justify-center gap-2 animate-bounce">
                  <Volume2 className="w-4 h-4 text-orange-600" />
                  <span>Soundbox: "Paytm par ₹240 prapt hue!"</span>
                </div>
              )}

              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
              >
                Reset Simulation
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
