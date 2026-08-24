import React, { useState } from 'react';
import { 
  Zap, 
  LayoutDashboard, 
  Send, 
  ShieldCheck, 
  Layers, 
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
  Cpu
} from 'lucide-react';
import { UserProfile, DashboardPageType } from '../types';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [quickPayAddress, setQuickPayAddress] = useState('starbucks@icici');
  const [quickPayAmount, setQuickPayAmount] = useState('250');
  const [quickPaySuccess, setQuickPaySuccess] = useState(false);

  // Notification items
  const notifications = [
    {
      id: 'n1',
      title: 'Optimal Mempool Window',
      desc: 'Mempool fee dropped to 12 sat/vB. Good time for UTXO batch consolidation.',
      time: '10m ago',
      type: 'dust',
    },
    {
      id: 'n2',
      title: 'Scam Invoice Intercepted',
      desc: 'AI Firewall flagged and blocked a spoofed invoice with 0 reputation score.',
      time: '1h ago',
      type: 'firewall',
    },
    {
      id: 'n3',
      title: 'Daily DCA Executed',
      desc: '₹500 INR converted to 5,952 sats in non-custodial savings pool.',
      time: '4h ago',
      type: 'savings',
    },
  ];

  const navSections = [
    {
      group: 'PORTFOLIO & CORE',
      items: [
        { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard, badge: null },
        { id: 'pay-settle', label: 'Universal Pay & Settle', icon: Send, badge: 'UPI + LN' },
        { id: 'savings', label: 'Smart Savings & DCA', icon: Sparkles, badge: 'Auto' },
      ],
    },
    {
      group: 'DEFENSE & SECURITY',
      items: [
        { id: 'firewall', label: 'AI Payment Firewall', icon: ShieldCheck, badge: 'Shielded' },
        { id: 'dustguard', label: 'UTXO DustGuard', icon: Layers, badge: '12 sat/vB' },
        { id: 'traceability', label: 'Traceability & Multisig', icon: GitBranch, badge: '2-of-3' },
        { id: 'security-center', label: 'Cybersecurity Command', icon: Activity, badge: '100%' },
      ],
    },
    {
      group: 'LEARN & DEVELOPER',
      items: [
        { id: 'copilot-learn', label: 'Telegram Copilot & Learn', icon: BookOpen, badge: 'AI Bot' },
        { id: 'developers', label: 'Developer API & SDK', icon: Terminal, badge: 'REST' },
      ],
    },
  ];

  const handleExecuteQuickPay = (e: React.FormEvent) => {
    e.preventDefault();
    setQuickPaySuccess(true);
    setTimeout(() => {
      setQuickPaySuccess(false);
      setShowQuickPayModal(false);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans">
      {/* 1. TOP TICKER STRIP - Angel One Style */}
      <div className="bg-[#0b1e48] text-slate-200 text-xs py-1.5 px-4 border-b border-blue-900/50 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center justify-between">
        <div className="flex items-center gap-6 font-mono text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">BTC/INR:</span>
            <span className="font-bold text-white">₹83,92,400</span>
            <span className="text-emerald-400 font-bold">+1.82% ▲</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">MEMPOOL GAS:</span>
            <span className="font-bold text-orange-400">12 sat/vB (Optimal)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">LIGHTNING NODES:</span>
            <span className="font-bold text-cyan-300">18,420</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">UPI SETTLEMENT:</span>
            <span className="font-bold text-emerald-400">1.4s (Instant)</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-4 text-[11px] font-mono text-slate-300">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Zero Custody Mainnet Connected
          </span>
          <button
            onClick={onGoToLanding}
            className="text-orange-400 hover:text-orange-300 font-bold flex items-center gap-1 transition-colors"
          >
            <span>Landing Page</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 2. TOP MAIN HEADER - Angel One Style */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Mobile Sidebar Toggle & Logo */}
          <div className="flex items-center gap-3">
            <button
              id="mobile-sidebar-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div 
              onClick={() => onNavigate('overview')}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-900 to-blue-700 flex items-center justify-center text-white shadow-md shadow-blue-900/20">
                <Zap className="w-5 h-5 text-orange-400 fill-orange-400" />
              </div>
              <div>
                <span className="text-lg font-extrabold font-mono text-slate-900 tracking-tight">
                  SAT<span className="text-orange-500">CONNECT</span>
                </span>
                <span className="hidden sm:inline-block ml-2 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 text-blue-800">
                  DASHBOARD
                </span>
              </div>
            </div>
          </div>

          {/* Search Bar - Angel One Search Style */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search @handle, UPI VPA, LNURL, or TXID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-100/80 border border-slate-200 text-xs font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Right Action Tools: Quick Pay, Notifications, Profile */}
          <div className="flex items-center gap-3">
            <button
              id="header-quick-pay-btn"
              onClick={() => setShowQuickPayModal(true)}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 transition-all cursor-pointer"
            >
              <QrCode className="w-4 h-4" />
              <span>Quick Settle</span>
            </button>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                id="header-notifications-btn"
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 relative transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="w-2 h-2 rounded-full bg-orange-500 absolute top-1.5 right-1.5 ring-2 ring-white" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 text-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-bold text-slate-900">Live Telemetry Alerts</span>
                    <span className="text-[10px] text-blue-600 font-semibold cursor-pointer">Mark read</span>
                  </div>
                  <div className="space-y-2">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-800">{n.title}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-600">{n.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Badge */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                {user.name.charAt(0)}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                  <span>{user.name}</span>
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                </div>
                <div className="text-[10px] text-slate-400 font-mono">{user.handle}</div>
              </div>
              <button
                id="header-logout-btn"
                onClick={onLogout}
                title="Log Out"
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 3. MAIN DASHBOARD BODY (Sidebar + Page Content) */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6">
        {/* LEFT COLUMN SIDEBAR - Angel One Style */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white lg:bg-transparent border-r lg:border-none border-slate-200 p-4 lg:p-0 flex flex-col justify-between transition-transform duration-200 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="space-y-6">
            {/* User Wallet Info Card in Sidebar */}
            <div className="bg-[#0b1e48] rounded-2xl p-4 text-white shadow-md">
              <div className="flex items-center justify-between text-[11px] text-slate-300 font-mono mb-2">
                <span>WALLET ID</span>
                <span className="text-emerald-400 font-bold">100% NON-CUSTODIAL</span>
              </div>
              <div className="text-base font-bold font-mono text-white mb-0.5">
                ₹{user.balanceInr.toLocaleString('en-IN')}
              </div>
              <div className="text-[11px] font-mono text-orange-400">
                {user.balanceBtc.toFixed(4)} BTC
              </div>
            </div>

            {/* Navigation Groups */}
            <nav className="space-y-5">
              {navSections.map((section, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider px-3 mb-1">
                    {section.group}
                  </div>
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activePage === item.id;
                    return (
                      <button
                        key={item.id}
                        id={`nav-item-${item.id}`}
                        onClick={() => {
                          onNavigate(item.id as DashboardPageType);
                          setSidebarOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                          isActive
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${
                              isActive
                                ? 'bg-white/20 text-white'
                                : 'bg-slate-200 text-slate-700'
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
            </nav>
          </div>

          {/* Sidebar Footer Links */}
          <div className="pt-4 border-t border-slate-200 space-y-2 text-xs">
            <button
              onClick={onGoToLanding}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Landing Page &amp; Docs</span>
            </button>
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors font-medium"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </aside>

        {/* Overlay backdrop for mobile drawer */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-950/40 z-30 lg:hidden"
          />
        )}

        {/* RIGHT MAIN CONTENT AREA */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>

      {/* QUICK PAY / SETTLE MODAL */}
      {showQuickPayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-bold text-slate-900">Quick Pay / Settle via Lightning</span>
              </div>
              <button
                onClick={() => setShowQuickPayModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xs"
              >
                ✕ Close
              </button>
            </div>

            {quickPaySuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Settlement Complete!</h3>
                <p className="text-xs text-slate-500">
                  ₹{quickPayAmount} INR routed to <span className="font-mono font-bold text-slate-800">{quickPayAddress}</span> with 0 fee.
                </p>
              </div>
            ) : (
              <form onSubmit={handleExecuteQuickPay} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Recipient (UPI VPA, @handle, or Lightning Invoice)
                  </label>
                  <input
                    type="text"
                    value={quickPayAddress}
                    onChange={(e) => setQuickPayAddress(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Amount (INR)
                  </label>
                  <div className="relative">
                    <span className="text-slate-400 font-bold text-xs absolute left-3 top-1/2 -translate-y-1/2">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={quickPayAmount}
                      onChange={(e) => setQuickPayAmount(e.target.value)}
                      required
                      min="1"
                      className="w-full pl-7 pr-3 py-2 rounded-xl border border-slate-300 text-sm font-bold font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                    <span>≈ {Math.round(Number(quickPayAmount || 0) * 13.9)} Satoshis</span>
                    <span className="text-emerald-600 font-bold">Routing Fee: 0 sats</span>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>AI Payment Firewall Verified</span>
                  </div>
                  <p className="text-[11px] text-blue-700">
                    Recipient verified clean. Non-custodial Lightning channel will settle instantly.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 transition-all cursor-pointer"
                >
                  Pay ₹{quickPayAmount} via Lightning Channel
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
