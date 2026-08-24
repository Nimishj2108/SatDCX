import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Zap,
  Shield,
  Layers,
  ArrowRight,
  Sparkles,
  Server,
  Flame,
  Cpu,
  ArrowLeftRight,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { COMPATIBLE_WALLETS } from '../data/mockData';
import { WalletNode } from '../types';

interface HeroProps {
  onConnectWallet?: () => void;
  onLaunchSandbox?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onConnectWallet, onLaunchSandbox }) => {
  const [selectedWallet, setSelectedWallet] = useState<WalletNode>(COMPATIBLE_WALLETS[0]);
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleConnect = () => {
    if (onConnectWallet) {
      onConnectWallet();
    } else {
      const el = document.getElementById('connect');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLaunch = () => {
    if (onLaunchSandbox) {
      onLaunchSandbox();
    } else {
      const el = document.getElementById('how-it-works') || document.getElementById('superlayer');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sequentialSteps = [
    { label: 'Address Resolution', detail: 'Maps human handle @etant to LNURL / BOLT 12 offer' },
    { label: 'Payment Routing', detail: 'Evaluates channel liquidity & routes via lowest-risk path' },
    { label: 'Cross-Wallet Settlement', detail: 'Sub-second cryptographic finality on Bitcoin & Lightning' },
  ];

  return (
    <section className="relative pt-28 sm:pt-36 pb-20 sm:pb-28 overflow-hidden bg-gradient-to-b from-[#020617] via-[#0b1329] to-[#020617]">
      {/* Background subtle mesh grids and soft light glows */}
      <div className="absolute inset-0 bg-sleek-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-indigo-500/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-amber-300 text-xs font-mono tracking-wider font-semibold shadow-inner"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>BITCOIN × LIGHTNING × AI SUPERLAYER</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]"
            >
              One Identity.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-cyan-300">
                Any Wallet.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl font-medium text-slate-200 leading-relaxed max-w-xl"
            >
              The Bitcoin financial superlayer for saving, spending, securing, and understanding your money.
            </motion.p>

            {/* Supporting copy */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm text-slate-400 leading-relaxed max-w-xl"
            >
              Interconnect wallets, intelligently route payments, protect Bitcoin savings, manage UTXOs, and bring explainable financial intelligence directly to every satoshi.
            </motion.p>

            {/* CTA Button Group */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-3.5 pt-2"
            >
              <button
                id="hero-primary-connect-btn"
                onClick={handleConnect}
                className="px-6 py-3.5 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:brightness-110 shadow-lg shadow-amber-500/25 transition-all flex items-center gap-2 text-sm"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Connect Wallet</span>
              </button>

              <a
                id="hero-secondary-explore-btn"
                href="#superlayer"
                className="px-5 py-3.5 rounded-xl font-semibold text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 transition-all text-sm flex items-center gap-2"
              >
                <span>Explore Platform</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </a>

              <button
                id="hero-tertiary-sandbox-btn"
                onClick={handleLaunch}
                className="px-4 py-3.5 rounded-xl text-xs font-mono text-cyan-300 hover:text-cyan-200 bg-cyan-950/40 hover:bg-cyan-950/70 border border-cyan-800/60 transition-all flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>Launch Interactive App</span>
              </button>
            </motion.div>

            {/* Micro value badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Self-Custody</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Your Keys, Your Control</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>AI-Assisted Security</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Infrastructure Diagram */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative p-6 sm:p-8 rounded-2xl bg-slate-900/70 backdrop-blur-xl border border-slate-800 shadow-2xl shadow-black/90"
            >
              {/* Card top banner */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-800/80 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-slate-300 font-semibold">
                    SATCONNECT INFRASTRUCTURE MESH
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
                  v2.4 Live
                </span>
              </div>

              {/* Central Hub Visualization */}
              <div className="relative my-8 py-6 flex flex-col items-center justify-center">
                {/* Connecting SVG Flow lines */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none stroke-slate-700/60"
                  viewBox="0 0 400 300"
                  fill="none"
                >
                  {/* Lines from 4 corners to center */}
                  <path d="M 60 40 Q 150 70 200 130" strokeDasharray="3 3" />
                  <path d="M 340 40 Q 250 70 200 130" strokeDasharray="3 3" />
                  <path d="M 60 260 Q 140 210 200 170" strokeDasharray="3 3" />
                  <path d="M 340 260 Q 260 210 200 170" strokeDasharray="3 3" />
                  <path d="M 30 150 L 140 150" strokeDasharray="3 3" />
                  <path d="M 370 150 L 260 150" strokeDasharray="3 3" />
                </svg>

                {/* Surrounding Nodes Grid */}
                <div className="w-full grid grid-cols-3 gap-3 sm:gap-4 mb-4">
                  {COMPATIBLE_WALLETS.slice(0, 3).map((wallet) => (
                    <button
                      key={wallet.id}
                      onClick={() => setSelectedWallet(wallet)}
                      className={`p-3 rounded-xl text-left border transition-all ${
                        selectedWallet.id === wallet.id
                          ? 'bg-amber-500/10 border-amber-400 shadow-md shadow-amber-500/10'
                          : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        {wallet.id === 'phoenix' && <Flame className="w-4 h-4 text-amber-400" />}
                        {wallet.id === 'breez' && <Zap className="w-4 h-4 text-cyan-400" />}
                        {wallet.id === 'lnd' && <Server className="w-4 h-4 text-emerald-400" />}
                        <span className="text-[10px] font-mono text-slate-400">{wallet.pingMs}ms</span>
                      </div>
                      <div className="text-xs font-semibold text-white truncate">{wallet.name}</div>
                      <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                        {wallet.status === 'connected' ? '● Connected' : '○ Compatible'}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Center Node: SATCONNECT One Identity Layer */}
                <div className="relative z-10 my-3 w-full max-w-sm p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-2 border-amber-400/80 shadow-[0_0_30px_rgba(245,158,11,0.18)] text-center">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-mono font-bold mb-1.5">
                    <Zap className="w-3 h-3 fill-amber-300" />
                    ONE IDENTITY SUPERLAYER
                  </div>
                  <div className="text-base font-extrabold text-white font-mono tracking-tight">
                    SATCONNECT UNIVERSAL ROUTER
                  </div>
                  <div className="mt-1 text-xs text-slate-300 flex items-center justify-center gap-2">
                    <span className="text-cyan-300 font-mono font-medium">@etant</span>
                    <span className="text-slate-500">↔</span>
                    <span className="text-amber-300 font-mono font-medium">Any LN / BTC Node</span>
                  </div>
                </div>

                {/* Bottom Nodes Grid */}
                <div className="w-full grid grid-cols-3 gap-3 sm:gap-4 mt-4">
                  {COMPATIBLE_WALLETS.slice(3, 6).map((wallet) => (
                    <button
                      key={wallet.id}
                      onClick={() => setSelectedWallet(wallet)}
                      className={`p-3 rounded-xl text-left border transition-all ${
                        selectedWallet.id === wallet.id
                          ? 'bg-cyan-500/10 border-cyan-400 shadow-md shadow-cyan-500/10'
                          : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        {wallet.id === 'core_lightning' && <Cpu className="w-4 h-4 text-cyan-400" />}
                        {wallet.id === 'sparrow' && <Shield className="w-4 h-4 text-emerald-400" />}
                        {wallet.id === 'exchange' && <ArrowLeftRight className="w-4 h-4 text-purple-400" />}
                        <span className="text-[10px] font-mono text-slate-400">{wallet.pingMs}ms</span>
                      </div>
                      <div className="text-xs font-semibold text-white truncate">{wallet.name}</div>
                      <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                        {wallet.status === 'connected' ? '● Connected' : '○ Compatible'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sequential Protocol Reveal */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                  <span>ORCHESTRATION PIPELINE</span>
                  <span>Step {activeStep + 1} of 3</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {sequentialSteps.map((step, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveStep(idx)}
                      className={`p-2 rounded-lg text-left border text-xs transition-all ${
                        activeStep === idx
                          ? 'bg-slate-800/90 border-amber-400/80 text-white shadow-sm'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-300'
                      }`}
                    >
                      <div className="font-semibold truncate">{step.label}</div>
                      <div className="text-[10px] text-slate-400 truncate mt-0.5">{step.detail}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Base Network Anchor */}
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="text-amber-400 font-medium">⚡ Base Layer: Bitcoin + Lightning Network</span>
                <span className="text-slate-400">Selected Node: {selectedWallet.name} ({selectedWallet.pingMs}ms)</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
