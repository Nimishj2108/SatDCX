import React, { useState } from 'react';
import {
  Zap,
  ArrowRight,
  Shield,
  Send,
  Github,
  Globe,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const FooterCTASection: React.FC = () => {
  const [handleInput, setHandleInput] = useState('');
  const [claimed, setClaimed] = useState(false);

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleInput.trim()) return;
    setClaimed(true);
  };

  return (
    <footer className="bg-[#020617] text-slate-400 border-t border-slate-800/80 pt-20 pb-12 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-amber-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main CTA Card */}
        <div className="p-8 sm:p-14 rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-amber-500/30 text-center space-y-8 mb-20 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-amber-500/30 text-xs font-mono text-amber-300 font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>JOIN THE SOVEREIGN FINTECH REVOLUTION</span>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              One Identity. Any Wallet.{' '}
              <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-cyan-400 bg-clip-text text-transparent">
                Every Satoshi Smarter.
              </span>
            </h2>
            <p className="text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Claim your universal handle, connect your favorite Lightning or multisig wallet, and experience the future of intelligent Bitcoin finance.
            </p>
          </div>

          {/* Claim Handle Form */}
          <div className="max-w-md mx-auto">
            {claimed ? (
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 font-mono text-xs flex items-center justify-center gap-2 shadow-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Handle @{handleInput.replace('@', '')} claimed successfully! Check your wallet.</span>
              </div>
            ) : (
              <form onSubmit={handleClaim} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">
                    @
                  </span>
                  <input
                    type="text"
                    placeholder="yourname"
                    value={handleInput}
                    onChange={(e) => setHandleInput(e.target.value)}
                    required
                    className="w-full pl-8 pr-4 py-3.5 rounded-xl bg-slate-950/80 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-amber-400 transition-colors shadow-inner"
                  />
                </div>
                <button
                  id="footer-claim-btn"
                  type="submit"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 hover:brightness-110 text-slate-950 font-bold font-mono text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all shrink-0 cursor-pointer"
                >
                  <span>Claim Handle</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4-Column Navigation & Brand Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-14 border-b border-slate-800 text-xs">
          {/* Col 1: Brand & Philosophy */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-500 flex items-center justify-center text-slate-950 shadow-md">
                <Zap className="w-4 h-4 fill-slate-950" />
              </div>
              <span className="font-extrabold text-lg text-white font-mono tracking-wider">
                SAT DCX
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              Bitcoin&apos;s Security. FinTech&apos;s Simplicity. AI&apos;s Intelligence. The financial infrastructure superlayer built for sovereign individuals and modern commerce.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-400 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-amber-400 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Col 2: Superlayer Architecture */}
          <div className="space-y-3">
            <div className="font-mono text-white uppercase font-bold text-xs tracking-wider">
              Architecture
            </div>
            <ul className="space-y-2 text-slate-400 font-mono">
              <li><a href="#universal-wallet" className="hover:text-amber-400 transition-colors">Universal Wallet</a></li>
              <li><a href="#ai-routing" className="hover:text-cyan-400 transition-colors">AI Route Mesh</a></li>
              <li><a href="#firewall" className="hover:text-emerald-400 transition-colors">Payment Firewall</a></li>
              <li><a href="#smart-savings" className="hover:text-indigo-400 transition-colors">Goal-Based Savings</a></li>
              <li><a href="#dustguard" className="hover:text-orange-400 transition-colors">DustGuard UTXO</a></li>
            </ul>
          </div>

          {/* Col 3: Protocols & Rails */}
          <div className="space-y-3">
            <div className="font-mono text-white uppercase font-bold text-xs tracking-wider">
              Protocols &amp; Rails
            </div>
            <ul className="space-y-2 text-slate-400 font-mono">
              <li><a href="#upi-bridge" className="hover:text-cyan-400 transition-colors">Lightning → UPI Rail</a></li>
              <li><a href="#traceability" className="hover:text-emerald-400 transition-colors">Traceability Graph</a></li>
              <li><a href="#self-custody" className="hover:text-amber-400 transition-colors">2-of-3 Multisig</a></li>
              <li><a href="#developers" className="hover:text-white transition-colors">SDK &amp; APIs</a></li>
              <li><a href="#education" className="hover:text-rose-400 transition-colors">Literacy Academy</a></li>
            </ul>
          </div>

          {/* Col 4: Community & Security */}
          <div className="space-y-3">
            <div className="font-mono text-white uppercase font-bold text-xs tracking-wider">
              Security
            </div>
            <ul className="space-y-2 text-slate-400 font-mono">
              <li><a href="#security-center" className="hover:text-emerald-400 transition-colors">Command Center</a></li>
              <li><a href="#telegram-copilot" className="hover:text-cyan-400 transition-colors">Telegram Copilot</a></li>
              <li><span className="text-slate-500">Non-Custodial Audit</span></li>
              <li><span className="text-slate-500">BIP-67 Compliance</span></li>
            </ul>
          </div>
        </div>

        {/* Mandatory Regulatory & Legal Compliance Disclaimer */}
        <div className="pt-8 text-[11px] text-slate-400 space-y-3 leading-relaxed">
          <p>
            <strong>Regulatory &amp; Architectural Disclaimer:</strong> SAT DCX is an open-source non-custodial financial technology superlayer. SAT DCX does not hold, custody, or manage user funds, private keys, or digital assets at any time. SAT DCX is not a bank, exchange, regulated payment service provider, or licensed deposit-taking institution. All cryptographic actions and state transitions require explicit local signature by the user&apos;s self-custodied keys.
          </p>
          <p>
            Any cross-rail settlement simulations (such as Lightning → UPI) represent prototype demonstrations operating in conjunction with licensed local payment partners in compliant jurisdictions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-900 font-mono text-[10px] text-slate-400">
            <span>© 2026 SAT DCX. Sovereign Bitcoin Infrastructure.</span>
            <span>Zero-Custody Guaranteed · BIP-67 Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
