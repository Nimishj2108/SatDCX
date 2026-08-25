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
  Building2,
  User,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { COMPATIBLE_WALLETS } from '../data/mockData';
import { WalletNode } from '../types';

interface HeroProps {
  onConnectWallet?: () => void;
  onLaunchSandbox?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onConnectWallet, onLaunchSandbox }) => {
  const [selectedWallet, setSelectedWallet] = useState<WalletNode>(COMPATIBLE_WALLETS[0]);

  const handleOpenAuth = () => {
    if (onConnectWallet) onConnectWallet();
  };

  const handleLaunch = () => {
    if (onLaunchSandbox) onLaunchSandbox();
  };

  return (
    <section className="relative pt-10 pb-16 sm:pb-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top Pill - Angel One High Contrast Style */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-800 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>THE SOVEREIGN BITCOIN &amp; LIGHTNING FINTECH SUPERLAYER</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Sovereign Bitcoin Payments. <br />
              <span className="text-blue-600">Universal Indian UPI Settle.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Connect your sovereign Bitcoin &amp; Lightning wallet. Claim your custom <strong>@handle</strong>, settle instant Indian merchant UPI QRs in INR, and manage corporate multi-sig Bitcoin treasuries with 100% self-custody.
            </p>

            {/* Action Buttons: Individual vs Small Business Onboarding */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              {/* Primary Signup CTA */}
              <button
                type="button"
                id="hero-claim-handle-btn"
                onClick={handleOpenAuth}
                className="px-7 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-orange-500/25 transition-all cursor-pointer hover:-translate-y-0.5"
              >
                <Zap className="w-4 h-4 text-amber-200" />
                <span>Claim Sovereign Handle (Free)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Business Onboarding CTA */}
              <button
                type="button"
                id="hero-business-onboard-btn"
                onClick={handleOpenAuth}
                className="px-6 py-3.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-300 font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Building2 className="w-4 h-4 text-blue-600" />
                <span>Join as Small Business (4x Limits)</span>
              </button>
            </div>

            {/* Key Trust Signals */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-mono">
              <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero Custodial Risk</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Sub-Second Finality</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>MCA21 &amp; GSTIN Ready</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Superlayer Terminal Preview */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
              {/* Header Bar */}
              <div className="bg-[#0b1e48] p-4 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono font-bold ml-2 text-slate-200">
                    SATCONNECT MESH v3.2
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  ● MAINNET ACTIVE
                </span>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4 font-mono text-xs">
                {/* Resolved Handle Card */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">
                    Universal Identity Anchor
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-extrabold text-blue-600 font-sans">
                      @nimish.sat
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      100% Non-Custodial
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600 truncate">
                    LNURL: nimish@satconnect.me
                  </div>
                </div>

                {/* Live Route Intelligence Matrix */}
                <div className="space-y-1.5">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">
                    Multi-Hop Route Latency
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 flex justify-between items-center text-emerald-900">
                    <span className="font-bold">Route A (Direct Peer Mesh)</span>
                    <span className="font-bold">0.42s • 0 sat fee</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex justify-between items-center text-slate-700">
                    <span>Route B (Multi-Hop Lightning)</span>
                    <span>1.14s • 2 sats fee</span>
                  </div>
                </div>

                {/* Interactive Launch Button */}
                <button
                  type="button"
                  onClick={handleLaunch}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer font-sans"
                >
                  <span>Explore Live Sovereign Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
