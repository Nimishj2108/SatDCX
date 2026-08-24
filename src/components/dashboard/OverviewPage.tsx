import React from 'react';
import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Zap, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Lock, 
  QrCode, 
  CheckCircle2, 
  ChevronRight,
  Send,
  ExternalLink,
  Activity,
  Cpu,
  Info
} from 'lucide-react';
import { UserProfile, DashboardPageType } from '../../types';
import { TransactionHistorySection } from './TransactionHistorySection';

interface OverviewPageProps {
  user: UserProfile;
  onNavigate: (page: DashboardPageType) => void;
  onOpenQuickPay: () => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({
  user,
  onNavigate,
  onOpenQuickPay,
}) => {
  return (
    <div className="space-y-6">
      {/* Top Welcome Banner - Angel One Style */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
              NON-CUSTODIAL ACCOUNT
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Handle: <strong className="text-slate-900">{user.handle}</strong>
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Welcome back, {user.name} 👋
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Your self-custody Bitcoin &amp; Lightning superlayer is active with 100% cryptographic integrity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="overview-quick-pay-btn"
            onClick={onOpenQuickPay}
            className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-orange-500/20 transition-all cursor-pointer"
          >
            <QrCode className="w-4 h-4" />
            <span>Pay UPI QR / Send Sats</span>
          </button>
          <button
            id="overview-go-firewall"
            onClick={() => onNavigate('firewall')}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Security Center</span>
          </button>
        </div>
      </div>

      {/* Main Stats Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Total Balance Card (Angel One Navy/Blue Theme) */}
        <div className="md:col-span-7 bg-[#0b1e48] rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute right-6 bottom-6 opacity-10 text-white pointer-events-none">
            <Zap className="w-36 h-36" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                Total Sovereign Portfolio
              </span>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+₹3,420 (+2.45%) 24h</span>
              </div>
            </div>

            <div className="space-y-1 mb-6">
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight font-mono">
                ₹{user.balanceInr.toLocaleString('en-IN')}{' '}
                <span className="text-lg font-normal text-slate-300">INR</span>
              </div>
              <div className="text-sm font-mono text-orange-400 flex items-center gap-2">
                <span>{user.balanceBtc.toFixed(8)} BTC</span>
                <span className="text-slate-400">• (170,186,000 sats)</span>
              </div>
            </div>
          </div>

          {/* Quick Portfolio Rails */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-xs font-mono">
            <div>
              <span className="text-slate-400 text-[11px] block">Lightning Channels</span>
              <span className="text-white font-bold">{user.channelsCount} Active (Zero-Fee)</span>
            </div>
            <div>
              <span className="text-slate-400 text-[11px] block">Cold Multisig Vault</span>
              <span className="text-emerald-400 font-bold">2-of-3 Quorum</span>
            </div>
            <div>
              <span className="text-slate-400 text-[11px] block">Firewall Shield</span>
              <span className="text-cyan-300 font-bold">Active &amp; Insured</span>
            </div>
          </div>
        </div>

        {/* Live Network & Market Stats (Angel One Style) */}
        <div className="md:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-slate-900 uppercase">Live Network Indices</span>
            </div>
            <span className="flex items-center gap-1 text-[11px] text-emerald-600 font-mono font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Mainnet Connected
            </span>
          </div>

          <div className="space-y-3 my-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Bitcoin Price (INR)</span>
              <span className="font-mono font-bold text-slate-900">₹83,92,400 <span className="text-emerald-600">(+1.8%)</span></span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Mempool Next Block Gas</span>
              <span className="font-mono font-bold text-blue-600">12 sat/vB (Low Fee Window)</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">UPI ↔ Lightning Settlement</span>
              <span className="font-mono font-bold text-emerald-600">~1.4 seconds avg</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">AI Route Success Probability</span>
              <span className="font-mono font-bold text-orange-600">99.94% Optimal</span>
            </div>
          </div>

          <button
            id="overview-explore-routes-btn"
            onClick={() => onNavigate('pay-settle')}
            className="w-full py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Launch Universal Payment Terminal</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 Feature Action Cards (Angel One Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Pay & Settle */}
        <div 
          onClick={() => onNavigate('pay-settle')}
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Send className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-mono text-slate-400">01 · PAY</span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              Universal Pay &amp; Settle
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Send to any @handle, LNURL, or scan merchant UPI QR directly.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
            <span>Open Terminal</span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* Card 2: AI Payment Firewall */}
        <div 
          onClick={() => onNavigate('firewall')}
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-mono text-emerald-600 font-bold">100% SECURE</span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
              AI Payment Firewall
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Pre-flight risk analysis, scam interception, and zero duplicate invoices.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
            <span>Inspect Threat Logs</span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* Card 3: UTXO DustGuard */}
        <div 
          onClick={() => onNavigate('dustguard')}
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-orange-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-colors">
              <Layers className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-mono text-orange-600 font-bold">8 UTXOs</span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
              UTXO DustGuard
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Mempool gas forecaster &amp; 1-click batch consolidation saves ₹1,840.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-orange-600">
            <span>Optimize UTXOs</span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* Card 4: Smart Savings & DCA */}
        <div 
          onClick={() => onNavigate('savings')}
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-mono text-indigo-600 font-bold">DCA ACTIVE</span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
              Smart Savings Vault
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Non-custodial recurring Bitcoin goals with automated stress testing.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
            <span>View Goals</span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Full Transaction History Component with Risk Metadata & Deep Inspection */}
      <TransactionHistorySection />
    </div>
  );
};

