import React from 'react';
import {
  Zap,
  Globe,
  ArrowRight,
  Shield,
  Layers,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Create Your Identity',
      desc: 'Claim your universal handle (@handle) to represent your Bitcoin and Lightning endpoints.',
      icon: Globe,
      color: 'from-amber-400 to-amber-500',
    },
    {
      num: '02',
      title: 'Connect Any Wallet',
      desc: 'Pair Phoenix, Breez, LND, CLN, or multi-signature cold storage without vendor lock-in.',
      icon: Zap,
      color: 'from-cyan-400 to-blue-500',
    },
    {
      num: '03',
      title: 'Send or Receive',
      desc: 'SATCONNECT automatically resolves recipient protocols, currencies, and addresses.',
      icon: ArrowRight,
      color: 'from-indigo-400 to-purple-500',
    },
    {
      num: '04',
      title: 'AI + Security Engine',
      desc: 'Evaluates hop liquidity, optimizes fees, and intercepts behavioral anomalies in real-time.',
      icon: Shield,
      color: 'from-emerald-400 to-teal-500',
    },
    {
      num: '05',
      title: 'Instant Settlement',
      desc: 'Sub-second cryptographic finality on Lightning or compliant local payment rails.',
      icon: Sparkles,
      color: 'from-orange-400 to-amber-500',
    },
    {
      num: '06',
      title: 'Financial Copilot',
      desc: 'Receive goal-based savings health scores, dust hygiene alerts, and embedded lessons.',
      icon: Layers,
      color: 'from-rose-400 to-pink-500',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-[#020617] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-400 mb-4 font-semibold shadow-sm">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>HOW SATCONNECT WORKS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Six Simple Steps to Sovereign Simplicity.
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            From registration to automated route optimization and security telemetry, SATCONNECT orchestrates the entire lifecycle while keeping you in 100% control of your private keys.
          </p>
        </div>

        {/* 6 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-800 hover:border-amber-500/40 transition-all space-y-4 group relative flex flex-col justify-between shadow-lg hover:shadow-black/60 hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${step.color} flex items-center justify-center text-slate-950 font-extrabold shadow-lg shadow-black/40 group-hover:scale-105 transition-transform`}
                  >
                    <step.icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-extrabold font-mono text-slate-700 group-hover:text-amber-400/40 transition-colors">
                    {step.num}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] font-mono text-cyan-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Non-Custodial Architecture</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
