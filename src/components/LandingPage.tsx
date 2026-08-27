import React, { useState } from 'react';
import { 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Lock, 
  Cpu, 
  Globe, 
  TrendingUp, 
  QrCode, 
  ChevronRight, 
  ArrowUpRight, 
  ExternalLink,
  Search,
  Key,
  Shield,
  Activity,
  Send,
  BookOpen,
  Building2,
  Trash2
} from 'lucide-react';
import { LivePriceTicker } from './LivePriceTicker';
import { UniversalWalletSection } from './UniversalWalletSection';
import { AIRouteIntelligenceSection } from './AIRouteIntelligenceSection';
import { AIPaymentFirewallSection } from './AIPaymentFirewallSection';
import { DustGuardSection } from './DustGuardSection';
import { UpiBridgeSection } from './UpiBridgeSection';
import { TelegramCopilotSection } from './TelegramCopilotSection';
import { SuperlayerOverview } from './SuperlayerOverview';
import { ProblemStory } from './ProblemStory';
import { HowItWorksSection } from './HowItWorksSection';
import { FeatureMatrixSection } from './FeatureMatrixSection';
import { TrustStrip } from './TrustStrip';
import { FooterCTASection } from './FooterCTASection';

interface LandingPageProps {
  onOpenLogin: () => void;
  onOpenSignup: () => void;
  onEnterDemoDashboard: () => void;
  onOpenForeignerPortal?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenLogin,
  onOpenSignup,
  onEnterDemoDashboard,
  onOpenForeignerPortal,
}) => {
  const [handleQuery, setHandleQuery] = useState('');
  const [handleAvailable, setHandleAvailable] = useState<boolean | null>(null);

  const handleCheckHandle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleQuery.trim()) return;
    setHandleAvailable(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-orange-500 selection:text-white">
      {/* 1. REAL-TIME MARKET PRICE, VOLATILITY & MEMPOOL GAS TICKER */}
      <LivePriceTicker />

      {/* 2. TOP NAVIGATION - Angel One Style */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-extrabold font-mono text-slate-900 tracking-tight">
                SAT<span className="text-orange-500"> DCX</span>
              </span>
              <span className="hidden sm:inline-block ml-2 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 text-blue-800">
                SUPERLAYER
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <a href="#overview" className="hover:text-blue-600 transition-colors">6-Pillar Architecture</a>
            <a href="#connect" className="hover:text-blue-600 transition-colors">Sovereign Handles</a>
            <a href="#pay-routing" className="hover:text-blue-600 transition-colors">AI Routing</a>
            <a href="#dustguard" className="hover:text-blue-600 transition-colors">Bitcoin Dustbin</a>
            <a href="#upi-bridge" className="hover:text-blue-600 transition-colors">UPI Bridge</a>
            <a href="#telegram-copilot" className="hover:text-blue-600 transition-colors">Telegram Copilot</a>
          </nav>

          {/* Auth Action Buttons - Angel One Style */}
          <div className="flex items-center gap-2 sm:gap-3">
            {onOpenForeignerPortal && (
              <button
                type="button"
                id="landing-foreigner-portal-btn"
                onClick={onOpenForeignerPortal}
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition-all cursor-pointer shadow-xs"
              >
                <Globe className="w-3.5 h-3.5 text-amber-600" />
                <span>🌐 Foreign Traveler Portal</span>
              </button>
            )}
            <button
              id="landing-login-btn"
              onClick={onOpenLogin}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Log In
            </button>
            <button
              id="landing-signup-btn"
              onClick={onOpenSignup}
              className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-md shadow-orange-500/20 transition-all cursor-pointer"
            >
              Open Free Account
            </button>
            <button
              id="landing-demo-btn"
              onClick={onEnterDemoDashboard}
              className="hidden sm:flex items-center gap-1 px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-bold border border-blue-200 transition-colors cursor-pointer"
            >
              <span>Dashboard Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION - Angel One Clean Fintech Aesthetic */}
      <section className="relative pt-12 pb-20 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Value Proposition & Onboarding */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-mono font-bold">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>INDIA&apos;S FIRST BITCOIN &amp; LIGHTNING FINTECH SUPERLAYER</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Sovereign Bitcoin &amp; Lightning Finance.{' '}
                <span className="text-blue-600">
                  Simple as UPI.
                </span>
              </h1>

              <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
                One universal human handle (<code className="bg-slate-100 px-1.5 py-0.5 rounded text-orange-600 font-mono font-bold">@yourname</code>) for Lightning, LNURL, On-chain, and instant Indian merchant UPI QR settlement. Zero custodial risk, AI routing intelligence, and real-time transaction firewall.
              </p>

              {/* Instant Handle Claim Card (Angel One Quick Form Style) */}
              <div className="bg-white p-5 rounded-2xl border-2 border-blue-200 shadow-xl space-y-3 max-w-xl">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">Claim Your Sovereign Handle</span>
                  <span className="text-emerald-600 font-mono font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Free &amp; Non-Custodial
                  </span>
                </div>

                <form onSubmit={handleCheckHandle} className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <span className="text-slate-400 font-mono text-sm absolute left-3 top-1/2 -translate-y-1/2">
                      @
                    </span>
                    <input
                      type="text"
                      id="hero-handle-input"
                      value={handleQuery}
                      onChange={(e) => {
                        setHandleQuery(e.target.value);
                        setHandleAvailable(null);
                      }}
                      placeholder="nimish.sat"
                      required
                      className="w-full pl-8 pr-3 py-3 rounded-xl border border-slate-300 font-mono text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50/50"
                    />
                  </div>
                  <button
                    type="submit"
                    id="hero-claim-btn"
                    className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 transition-all shrink-0 cursor-pointer"
                  >
                    <span>Claim Handle</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {handleAvailable && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center justify-between">
                    <span>
                      🎉 <strong>@{handleQuery}</strong> is available! Complete OTP verification to claim.
                    </span>
                    <button
                      onClick={onOpenSignup}
                      className="text-xs font-bold text-emerald-700 underline hover:text-emerald-900"
                    >
                      Open Account →
                    </button>
                  </div>
                )}

                {/* International Tourist Quick Link */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">
                    Visiting India as a Foreign Tourist?
                  </span>
                  <button
                    type="button"
                    onClick={onOpenForeignerPortal}
                    className="font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Verify Passport &amp; Enable UPI</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Trust Metrics Strip (Angel One Style) */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 text-xs">
                <div>
                  <div className="font-extrabold text-slate-900 text-base sm:text-lg font-mono">
                    ₹500+ Cr
                  </div>
                  <div className="text-slate-500 text-[11px]">Settled via Lightning</div>
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-base sm:text-lg font-mono text-emerald-600">
                    100%
                  </div>
                  <div className="text-slate-500 text-[11px]">Self-Custody (You Own Keys)</div>
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-base sm:text-lg font-mono text-blue-600">
                    0.00%
                  </div>
                  <div className="text-slate-500 text-[11px]">Forced Auto-Sell Fee</div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive App Preview Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#0b1e48] rounded-3xl p-6 text-white shadow-2xl border border-blue-900 space-y-5 relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-xs font-mono text-slate-300 ml-2 font-bold">
                      SATCONNECT TERMINAL
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    LIVE MAINNET
                  </span>
                </div>

                {/* Portfolio Preview */}
                <div className="bg-slate-900/80 rounded-2xl p-5 border border-white/10 space-y-2">
                  <div className="flex justify-between text-xs text-slate-400 font-mono">
                    <span>PORTFOLIO BALANCE</span>
                    <span className="text-emerald-400 font-bold">+2.45% (24h)</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                    ₹1,42,800 <span className="text-xs text-slate-400 font-normal">INR</span>
                  </div>
                  <div className="text-xs font-mono text-orange-400">
                    1.70186000 BTC • @nimish.sat
                  </div>
                </div>

                {/* Instant Action Simulator */}
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-white/10">
                    <div className="text-slate-400 text-[10px]">AI FIREWALL</div>
                    <div className="text-emerald-400 font-bold">0 Anomalies</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-white/10">
                    <div className="text-slate-400 text-[10px]">MEMPOOL WINDOW</div>
                    <div className="text-cyan-300 font-bold">12 sat/vB</div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onEnterDemoDashboard}
                    className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                  >
                    <span>Launch Live Interactive Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TRUST & SECURITY STRIP */}
      <section id="trust" className="bg-white py-12 border-b border-slate-200">
        <TrustStrip />
      </section>

      {/* 5. 6-PILLAR SUPERLAYER ARCHITECTURE */}
      <section id="overview" className="py-20 bg-slate-50 border-b border-slate-200">
        <SuperlayerOverview />
      </section>

      {/* 6. PILLAR 1: UNIVERSAL WALLET IDENTITY */}
      <UniversalWalletSection />

      {/* 7. PILLAR 2: AI ROUTE INTELLIGENCE */}
      <AIRouteIntelligenceSection />

      {/* 8. PILLAR 3: AI PAYMENT FIREWALL */}
      <AIPaymentFirewallSection />

      {/* 9. PILLAR 4: BITCOIN DUST & DUSTBIN */}
      <DustGuardSection />

      {/* 10. PILLAR 5: LIGHTNING TO UPI BRIDGE */}
      <UpiBridgeSection />

      {/* 11. PILLAR 6: TELEGRAM SOVEREIGN COPILOT */}
      <TelegramCopilotSection />

      {/* 12. PROBLEM STATEMENT & THE SATCONNECT SOLUTION */}
      <section className="py-20 bg-white border-b border-slate-200">
        <ProblemStory />
      </section>

      {/* 13. HOW IT WORKS */}
      <section id="how-it-works" className="py-20 bg-slate-50 border-b border-slate-200">
        <HowItWorksSection />
      </section>

      {/* 14. COMPARISON MATRIX (SATCONNECT VS OTHERS) */}
      <section id="comparison" className="py-20 bg-white border-b border-slate-200">
        <FeatureMatrixSection />
      </section>

      {/* 15. FOOTER & CTA */}
      <FooterCTASection onClaimHandle={onOpenSignup} />
    </div>
  );
};
