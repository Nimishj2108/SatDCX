import React, { useState } from 'react';
import { 
  Zap, 
  LayoutDashboard, 
  Send, 
  ShieldCheck, 
  Trash2, 
  Sparkles, 
  GitBranch, 
  BookOpen, 
  Terminal, 
  Activity, 
  Bell, 
  Search, 
  QrCode, 
  LogOut, 
  ChevronDown, 
  Menu, 
  X, 
  ArrowUpRight, 
  CheckCircle2, 
  HelpCircle,
  ExternalLink,
  Shield,
  TrendingUp,
  Cpu,
  Building2,
  Lock,
  Coins,
  Globe2
} from 'lucide-react';
import { UserProfile, DashboardPageType } from '../types';
import { LivePriceTicker } from './LivePriceTicker';

interface DashboardLayoutProps {
  user: UserProfile;
  activePage: DashboardPageType;
  onNavigate: (page: DashboardPageType) => void;
  onLogout: () => void;
  onGoToLanding: () => void;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  user,
  activePage,
  onNavigate,
  onLogout,
  onGoToLanding,
  children,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuickPayModal, setShowQuickPayModal] = useState(false);
  const [quickPayAddress, setQuickPayAddress] = useState('chaiwali@okhdfcbank');
  const [quickPayAmount, setQuickPayAmount] = useState('120');
  const [quickPaySuccess, setQuickPaySuccess] = useState(false);

  const notifications = [
    {
      id: 'n1',
      title: 'Optimal Mempool Window',
      desc: 'Mempool fee dropped to 12 sat/vB. Optimal time to consolidate Dustbin sats.',
      time: '10m ago',
      type: 'dust',
    },
    {
      id: 'n2',
      title: 'Scam Invoice Intercepted',
      desc: 'AI Firewall flagged and quarantined an unverified routing node.',
      time: '1h ago',
      type: 'firewall',
    },
    {
      id: 'n3',
      title: 'Founders Multi-Sig Synced',
      desc: user.accountType === 'business' 
        ? '3-of-5 corporate treasury threshold quorum verified.'
        : 'Daily DCA: ₹500 INR converted to 5,952 sats.',
      time: '4h ago',
      type: 'savings',
    },
  ];

  const isForeigner = user.nationality === 'foreign' || user.nationality === 'foreigner';

  const navSections = isForeigner
    ? [
        {
          group: 'TOURIST TRIP & UPI PAY',
          items: [
            { id: 'overview' as DashboardPageType, label: 'Traveler Hub Overview', icon: LayoutDashboard, badge: 'Trip Active' },
            { id: 'pay-settle' as DashboardPageType, label: 'Travel Pay & Fair-Price AI', icon: Send, badge: 'MRP AI' },
            { id: 'savings' as DashboardPageType, label: 'Trip Budget & FX Rates', icon: Sparkles, badge: 'Live FX' },
          ],
        },
        {
          group: 'DEFENSE & DUSTBIN',
          items: [
            { id: 'dustguard' as DashboardPageType, label: 'Sovereign Dustbin', icon: Trash2, badge: 'Auto-Sweep' },
            { id: 'firewall' as DashboardPageType, label: 'AI Merchant Firewall', icon: ShieldCheck, badge: 'Protected' },
            { id: 'security-center' as DashboardPageType, label: 'Passport ZKP & Sovereign Keys', icon: Lock, badge: 'Verified' },
            { id: 'traceability' as DashboardPageType, label: 'Lightning Travel Routes', icon: GitBranch, badge: 'Mesh A→B→C' },
          ],
        },
        {
          group: 'TOURIST GUIDE & APIS',
          items: [
            { id: 'copilot-learn' as DashboardPageType, label: 'India Travel FinTech Guide', icon: BookOpen, badge: 'Tourist FAQs' },
            { id: 'developers' as DashboardPageType, label: 'Developer API & Webhooks', icon: Terminal, badge: 'v1.4' },
          ],
        },
      ]
    : [
        {
          group: 'PORTFOLIO & TRANSACTIONS',
          items: [
            { id: 'overview' as DashboardPageType, label: 'Dashboard Overview', icon: LayoutDashboard, badge: null },
            { id: 'pay-settle' as DashboardPageType, label: 'Universal Pay & Settle', icon: Send, badge: 'UPI + LN' },
            { id: 'savings' as DashboardPageType, label: 'Smart Savings & DCA', icon: Sparkles, badge: 'Auto' },
          ],
        },
        {
          group: 'DEFENSE & DUST OPTIMIZER',
          items: [
            { id: 'dustguard' as DashboardPageType, label: 'Bitcoin Dust & Dustbin', icon: Trash2, badge: 'Active' },
            { id: 'firewall' as DashboardPageType, label: 'AI Payment Firewall', icon: ShieldCheck, badge: 'Protected' },
            { id: 'security-center' as DashboardPageType, label: 'Security Center & Keys', icon: Lock, badge: '100% Encrypted' },
            { id: 'traceability' as DashboardPageType, label: 'Traceability & Multisig', icon: GitBranch, badge: user.accountType === 'business' ? '3-of-5' : '2-of-3' },
          ],
        },
        {
          group: 'EDUCATION & DEVELOPERS',
          items: [
            { id: 'copilot-learn' as DashboardPageType, label: 'FinTech Academy & FAQs', icon: BookOpen, badge: 'Interactive' },
            { id: 'developers' as DashboardPageType, label: 'Developer API & Webhooks', icon: Terminal, badge: 'v1.4' },
          ],
        },
      ];

  const handleQuickPay = (e: React.FormEvent) => {
    e.preventDefault();
    setQuickPaySuccess(true);
    setTimeout(() => {
      setQuickPaySuccess(false);
      setShowQuickPayModal(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      {/* Real-time Ticker at the absolute top */}
      <LivePriceTicker />

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column Sidebar - Angel One Royal Navy Branding */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0b1e48] text-white flex flex-col justify-between transition-transform duration-200 lg:static lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div>
            {/* Sidebar Brand Header */}
            <div className="p-5 flex items-center justify-between border-b border-blue-950">
              <button
                type="button"
                onClick={onGoToLanding}
                className="flex items-center gap-2.5 text-left group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-xl bg-orange-500 flex items-center justify-center shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="text-base font-bold font-mono tracking-tight text-white block leading-none">
                    SAT<span className="text-orange-400">CONNECT</span>
                  </span>
                  <span className="text-[9px] font-mono text-slate-400 font-semibold tracking-wider block mt-0.5">
                    SOVEREIGN SUPERLAYER
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User Account Tier Badge */}
            <div className="p-4 mx-3 my-3 rounded-xl bg-blue-950/60 border border-blue-900/60 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                {isForeigner ? (
                  <Globe2 className="w-5 h-5 text-amber-300" />
                ) : user.accountType === 'business' ? (
                  <Building2 className="w-5 h-5" />
                ) : (
                  user.handle.substring(1, 3).toUpperCase()
                )}
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-white truncate flex items-center gap-1">
                  <span>{user.name}</span>
                </div>
                <div className="text-[11px] font-mono text-orange-400 font-bold truncate">
                  {user.handle}
                </div>
                <span className="inline-block text-[9px] font-mono text-emerald-300 font-semibold mt-0.5">
                  ● {isForeigner ? 'Tourist Sovereign (Passport ZKP)' : user.accountType === 'business' ? 'Corporate 4x Multiplier' : 'Indian Resident Sovereign'}
                </span>
              </div>
            </div>

            {/* Navigation Menus */}
            <div className="px-3 py-2 space-y-5 overflow-y-auto max-h-[calc(100vh-280px)] scrollbar-none text-xs font-medium">
              {navSections.map((section, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="px-3 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                    {section.group}
                  </div>
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activePage === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        id={`nav-item-${item.id}`}
                        onClick={() => {
                          onNavigate(item.id);
                          setSidebarOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all text-left cursor-pointer ${
                          isActive
                            ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                            : 'text-slate-300 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
                              isActive
                                ? 'bg-white/20 text-white'
                                : 'bg-blue-900/60 text-blue-300 border border-blue-800'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="p-3 border-t border-blue-950 space-y-2">
            <button
              type="button"
              id="sidebar-quick-pay-btn"
              onClick={() => setShowQuickPayModal(true)}
              className="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 transition-all cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Quick Scan &amp; Settle UPI</span>
            </button>

            <div className="flex items-center justify-between text-xs font-medium pt-1 px-1">
              <button
                type="button"
                onClick={onGoToLanding}
                className="text-slate-400 hover:text-white transition-colors"
              >
                ← Public Landing
              </button>
              <button
                type="button"
                id="sidebar-logout-btn"
                onClick={onLogout}
                className="text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Exit</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Top Navbar */}
          <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-500">
                <span>PORTFOLIO /</span>
                <span className="font-bold text-slate-900 uppercase">
                  {activePage.replace('-', ' ')}
                </span>
              </div>
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-3">
              {/* Notification Bell */}
              <div className="relative">
                <button
                  type="button"
                  id="notifications-bell-btn"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 relative transition-colors"
                >
                  <Bell className="w-4 h-4" />
                  <span className="w-2 h-2 rounded-full bg-orange-500 absolute top-1.5 right-1.5" />
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-slate-200 shadow-xl p-4 space-y-3 z-50 text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 font-bold text-slate-900">
                      <span>Real-Time Security &amp; Dust Alerts</span>
                      <span className="text-[10px] text-blue-600 font-mono">3 New</span>
                    </div>
                    <div className="space-y-2">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5"
                        >
                          <div className="font-bold text-slate-900 flex justify-between">
                            <span>{n.title}</span>
                            <span className="text-[10px] text-slate-400 font-normal">{n.time}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 leading-relaxed">{n.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sovereign Status Pill */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Sovereign Enclave Active</span>
              </div>

              {/* User Handle Pill */}
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <div className="text-right hidden sm:block">
                  <div className="text-xs font-bold text-slate-900 leading-tight">
                    {user.name}
                  </div>
                  <div className="text-[11px] font-mono text-blue-600 font-semibold">
                    {user.handle}
                  </div>
                </div>
                <div className="w-9 h-9 rounded-xl bg-[#0b1e48] text-white flex items-center justify-center font-bold text-xs">
                  {user.accountType === 'business' ? 'CORP' : user.handle.substring(1, 3).toUpperCase()}
                </div>
              </div>
            </div>
          </header>

          {/* Page Content Body */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            {children}
          </main>
        </div>
      </div>

      {/* Quick Pay Modal */}
      {showQuickPayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xl max-w-md w-full space-y-4 text-slate-900">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-sm">Quick Scan &amp; Settle Merchant UPI</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowQuickPayModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {quickPaySuccess ? (
              <div className="p-6 text-center space-y-2">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-slate-900">Payment Settled Instantly!</h4>
                <p className="text-xs text-slate-500 font-mono">
                  ₹{quickPayAmount} INR credited to {quickPayAddress} in 0.41s
                </p>
              </div>
            ) : (
              <form onSubmit={handleQuickPay} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Merchant UPI ID or LNURL:
                  </label>
                  <input
                    type="text"
                    value={quickPayAddress}
                    onChange={(e) => setQuickPayAddress(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono font-bold bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Amount in Rupees (INR):
                  </label>
                  <input
                    type="number"
                    value={quickPayAmount}
                    onChange={(e) => setQuickPayAmount(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-mono font-bold bg-slate-50"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Zap className="w-4 h-4" />
                  <span>Settle via Lightning Mesh</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
