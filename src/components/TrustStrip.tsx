import React from 'react';
import {
  ShieldCheck,
  Zap,
  Lock,
  Sparkles,
  Eye,
  Smartphone,
} from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const trustPillars = [
    {
      icon: Lock,
      title: '100% Self-Custody',
      desc: 'Zero server key storage. You hold all cryptographic private keys.',
      badge: 'Non-Custodial',
    },
    {
      icon: Sparkles,
      title: 'AI Risk Intelligence',
      desc: 'Behavioral anomaly detection without surveillance or data harvesting.',
      badge: 'Privacy-First',
    },
    {
      icon: Zap,
      title: 'Lightning Sub-Second',
      desc: 'Instant micropayments settling with cryptographically proven finality.',
      badge: '< 100ms Speed',
    },
    {
      icon: Eye,
      title: 'Zero Hidden Margins',
      desc: 'Full breakdown of network sats, routing fees, and INR conversions.',
      badge: 'Full Clarity',
    },
    {
      icon: ShieldCheck,
      title: 'DustGuard Defense',
      desc: 'Smart UTXO consolidation & malicious tracking dust quarantine.',
      badge: 'UTXO Safe',
    },
    {
      icon: Smartphone,
      title: 'Human-First FinTech',
      desc: 'Intuitive Indian FinTech UX built for first-time Bitcoin savers.',
      badge: 'Zero Jargon',
    },
  ];

  return (
    <section className="py-8 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {trustPillars.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between group shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

