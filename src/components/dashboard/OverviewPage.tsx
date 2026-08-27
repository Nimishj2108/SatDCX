import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  ArrowUpRight, 
  Zap, 
  ShieldCheck, 
  QrCode, 
  ChevronRight,
  Send, 
  Building2, 
  Users, 
  Trash2, 
  Globe2, 
  Plane, 
  Scale, 
  Lock,
  Coins,
  Shield,
  Cloud,
  ArrowDown
} from 'lucide-react';
import { motion } from 'motion/react';
import { UserProfile, DashboardPageType } from '../../types';
import { TransactionHistorySection } from './TransactionHistorySection';
import { BitcoinWalletUIModal } from '../BitcoinWalletUIModal';
import { SkeletonOverview } from '../common/ShimmerSkeleton';
import { useLiveRates } from '../../services/livePriceService';

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
  const isForeigner = user.nationality === 'foreign' || user.nationality === 'foreigner';
  const isBusiness = user.accountType === 'business';
  const company = user.companyProfile;
  const liveRates = useLiveRates();

  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [showBitcoinUIModal, setShowBitcoinUIModal] = useState(false);
  const [bitcoinUIInitialView, setBitcoinUIInitialView] = useState<'transact' | 'received' | 'deposit' | 'security' | 'cloud_backup' | 'pin_entry'>('transact');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const openBitcoinUI = (view: 'transact' | 'received' | 'deposit' | 'security' | 'cloud_backup' | 'pin_entry') => {
    setBitcoinUIInitialView(view);
    setShowBitcoinUIModal(true);
  };

  if (isInitialLoading) {
    return <SkeletonOverview />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="space-y-6"
    >
      {/* ========================================================================= */}
      {/* BITCOIN DESIGN SYSTEM QUICK ACTION STRIP (FIGMA PROTOTYPE INTEGRATION) */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#F7931A] text-white flex items-center justify-center font-bold text-lg shadow-md shadow-orange-500/20">
            ₿
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <span>Bitcoin Design System Superlayer</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 font-bold">
                100% Open-Source
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono">
              Keypad Transacting • SegWit/Lightning Deposit • Encrypted Cloud Backup • Hardware PIN Enclave
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => openBitcoinUI('transact')}
            className="px-3.5 py-2 rounded-xl bg-[#F7931A] hover:bg-[#e08213] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer transition-all"
          >
            <span>⚡ Sats Keypad</span>
          </button>

          <button
            onClick={() => openBitcoinUI('deposit')}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <QrCode className="w-3.5 h-3.5 text-slate-700" />
            <span>Deposit QR</span>
          </button>

          <button
            onClick={() => openBitcoinUI('received')}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <ArrowDown className="w-3.5 h-3.5 text-emerald-600" />
            <span>Receipt &amp; Fees</span>
          </button>

          <button
            onClick={() => openBitcoinUI('security')}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <Shield className="w-3.5 h-3.5 text-blue-600" />
            <span>Backups &amp; PIN</span>
          </button>
        </div>
      </div>
      {/* ========================================================================= */}
      {/* TOP WELCOME BANNER: DISTINCT FOR FOREIGN TOURIST vs INDIAN CITIZEN/CORP */}
      {/* ========================================================================= */}
      {isForeigner ? (
        /* FOREIGN TOURIST WELCOME BANNER */
        <div className="bg-gradient-to-r from-slate-900 via-[#0b1e48] to-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5" />
                <span>🌐 INTERNATIONAL TOURIST SOVEREIGN HUB</span>
              </span>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <Lock className="w-3 h-3" />
                <span>🛂 PASSPORT ZKP VERIFIED ON-CHAIN</span>
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Welcome to India, {user.name} 👋
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Your self-custody Bitcoin travel bridge is active with real-time Lightning routing and the AI Tourist MRP Fair-Price Firewall.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              id="overview-tourist-pay-btn"
              onClick={() => onNavigate('pay-settle')}
              className="px-4 py-2.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-orange-500/20 transition-all cursor-pointer"
            >
              <QrCode className="w-4 h-4" />
              <span>Travel Pay &amp; MRP AI Scanner</span>
            </button>
            <button
              id="overview-tourist-keys-btn"
              onClick={() => onNavigate('security-center')}
              className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer border border-white/10"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Passport Proofs</span>
            </button>
          </div>
        </div>
      ) : (
        /* INDIAN CITIZEN / CORPORATE MSME WELCOME BANNER */
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                  isBusiness
                    ? 'bg-orange-100 text-orange-900 border border-orange-200'
                    : 'bg-blue-100 text-blue-900 border border-blue-200'
                }`}
              >
                {isBusiness ? '🏢 CORPORATE MSME TREASURY' : '⚡ SOVEREIGN INDIVIDUAL ACCOUNT'}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                Handle: <strong className="text-slate-900">{user.handle}</strong>
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              Welcome back, {user.name} 👋
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {isBusiness
                ? 'Multi-Sig 3-of-5 corporate treasury with 4x limits and cross-border remittance layer active.'
                : 'Your self-custody Bitcoin & Lightning superlayer is active with 100% cryptographic integrity.'}
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
      )}

      {/* TOURIST TRAVEL TRIP CARD (FOREIGNERS ONLY) */}
      {isForeigner && (
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Plane className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  India Tourism &bull; Active Bitcoin Travel Allocation
                </h3>
                <p className="text-[11px] text-slate-500 font-mono">
                  Passport Hash: <strong className="text-slate-800">bc1qpass...882x</strong> &bull; Visa: <strong>30-Day e-Tourist Visa</strong>
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              26 Days Remaining in India
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-slate-500 text-[10px] block">Allocated Trip Bitcoin:</span>
              <span className="font-bold text-orange-600 text-sm">{user.balanceBtc.toFixed(4)} BTC</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-slate-500 text-[10px] block">Live INR Spending Power:</span>
              <span className="font-bold text-slate-900 text-sm">₹{user.balanceInr.toLocaleString('en-IN')}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-slate-500 text-[10px] block">Price Gouge Shield:</span>
              <span className="font-bold text-emerald-700 text-sm">Active (Legal Metrology 2011)</span>
            </div>
          </div>
        </div>
      )}

      {/* If Corporate / Small Business: Render Dedicated Treasury Layer */}
      {!isForeigner && isBusiness && company && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-orange-600" />
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {company.companyName}
                </h3>
                <p className="text-[11px] text-slate-500 font-mono">
                  CIN: <strong>{company.cinNumber}</strong> • PAN: <strong>{company.companyPan}</strong> • GST: <strong>{company.gstNumber}</strong>
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-orange-800 bg-orange-100 px-2.5 py-1 rounded-lg">
              {company.transactionLimitMultiplier}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 text-[10px] block">MSME Udyam Registration:</span>
              <span className="font-bold text-slate-900">{company.msmeUdyamNumber}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 text-[10px] block">Corporate Multi-Sig Quorum:</span>
              <span className="font-bold text-emerald-700">{company.multisigQuorum}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 text-[10px] block">Cross-Border Remit (IEC):</span>
              <span className="font-bold text-blue-700">{company.exportImportCode} (Active)</span>
            </div>
          </div>

          {/* Founders Savings Wallets Strip */}
          <div className="space-y-2 pt-2">
            <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-blue-600" />
              <span>Founders &amp; Authorities Bitcoin Savings Wallets</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
              {company.directors.map((dir) => (
                <div key={dir.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-900 font-sans flex justify-between">
                    <span>{dir.name}</span>
                    <span className="text-orange-600 font-mono">{dir.savingsBalanceBtc.toFixed(2)} BTC</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-sans">
                    {dir.designation} • {dir.shareholdingPercent}% Stake
                  </div>
                  <div className="text-[10px] text-emerald-700 font-semibold truncate">
                    ✓ Key Shard: {dir.multisigKeyShard}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Stats Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Total Balance Card (Angel One Navy/Blue Theme) */}
        <div className="md:col-span-7 bg-[#0b1e48] rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                {isForeigner
                  ? 'Travel Satoshis Allocation'
                  : isBusiness
                  ? 'Corporate Treasury Balance'
                  : 'Total Sovereign Portfolio'}
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
                <span className="text-slate-400 text-xs">
                  (≈ {Math.round(user.balanceBtc * 100000000).toLocaleString()} sats)
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-xs font-mono">
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/10">
              <span className="text-slate-400 text-[10px] block">Lightning Channels</span>
              <span className="font-bold text-white text-sm">{user.channelsCount} Active</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/10">
              <span className="text-slate-400 text-[10px] block">Security Health</span>
              <span className="font-bold text-emerald-400 text-sm">{user.securityScore}% Quorum</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/10">
              <span className="text-slate-400 text-[10px] block">Dustbin Pool</span>
              <span className="font-bold text-orange-300 text-sm">4,850 Sats</span>
            </div>
          </div>
        </div>

        {/* Quick Actions & Dustbin Summary Box */}
        <div className="md:col-span-5 space-y-4">
          {/* Dustbin Card */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <Trash2 className="w-4 h-4 text-orange-500" />
                <span>Bitcoin Dustbin &amp; UTXO Optimizer</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                12 sat/vB Fee
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              4,850 micro-change sats collected from UPI conversions. Ready to club via Lightning Route Intelligence.
            </p>
            <button
              onClick={() => onNavigate('dustguard')}
              className="w-full py-2 rounded-xl bg-slate-100 hover:bg-orange-50 hover:text-orange-700 text-slate-800 font-bold text-xs font-mono transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Manage Dustbin &amp; Sweep Sats</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Pay / Settle Card */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <Send className="w-4 h-4 text-blue-600" />
                <span>
                  {isForeigner ? 'Travel Pay & MRP Scanner' : 'Universal Pay & Settle'}
                </span>
              </div>
              <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-bold">
                Instant 0.4s
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              {isForeigner
                ? 'Scan any Indian merchant QR. Settle in INR with AI price fairness checks on tourist items.'
                : 'Send Bitcoin to another wallet (@handle), or scan merchant UPI QR to settle in INR.'}
            </p>
            <button
              onClick={() => onNavigate('pay-settle')}
              className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>Open Pay Terminal</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Transaction History Component */}
      <TransactionHistorySection />

      {/* Bitcoin Wallet UI Kit Prototype Modal */}
      <BitcoinWalletUIModal
        isOpen={showBitcoinUIModal}
        onClose={() => setShowBitcoinUIModal(false)}
        user={user}
        initialView={bitcoinUIInitialView}
      />
    </motion.div>
  );
};
