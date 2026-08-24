import React, { useState, useEffect } from 'react';
import {
  Zap,
  Shield,
  Layers,
  Sparkles,
  BookOpen,
  Code2,
  Menu,
  X,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';

interface NavbarProps {
  onConnectWallet?: () => void;
  onLaunchSandbox?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onConnectWallet, onLaunchSandbox }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Platform', href: '#superlayer' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Security', href: '#security' },
    { name: 'FinTech Education', href: '#education' },
    { name: 'Developers', href: '#developers' },
  ];

  const solutions = [
    {
      title: 'Universal Wallet Identity',
      desc: 'One payment handle across all Bitcoin & Lightning wallets',
      href: '#connect',
      icon: Zap,
    },
    {
      title: 'AI Route Intelligence',
      desc: 'Predictive liquidity routing for sub-second settlement',
      href: '#pay-routing',
      icon: Sparkles,
    },
    {
      title: 'AI Payment Firewall',
      desc: 'Behavioral anomaly detection & transaction risk scoring',
      href: '#firewall',
      icon: Shield,
    },
    {
      title: 'Smart Bitcoin Savings',
      desc: 'Goal-based volatility & drawdown risk intelligence',
      href: '#smart-savings',
      icon: Layers,
    },
    {
      title: 'DustGuard UTXO Optimizer',
      desc: 'Consolidate small outputs and quarantine dust attacks',
      href: '#dustguard',
      icon: Sparkles,
    },
    {
      title: 'Lightning → UPI Bridge',
      desc: 'Orchestrated INR settlement for global visitors',
      href: '#upi-bridge',
      icon: ArrowRight,
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#020617]/95 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl shadow-black/40'
          : 'bg-transparent border-b border-slate-800/30'
      }`}
    >
      {/* Top micro status bar */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1 bg-slate-950/80 border-b border-slate-800/50 text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Mainnet &amp; Lightning Mesh: 99.98% Operational
          </span>
          <span className="text-slate-700">|</span>
          <span className="text-slate-400">
            Mempool Fee: <span className="text-amber-400 font-medium">12 sat/vB</span> (Low-Fee Window Active)
          </span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span>Non-Custodial Architecture</span>
          <span className="text-slate-700">•</span>
          <span>Zero Server Key Storage</span>
          <span className="text-slate-700">•</span>
          <a
            href="#upi-bridge"
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            INR Settlement Prototype Active →
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 rounded-xl bg-slate-900 border border-amber-500/40 flex items-center justify-center p-1.5 group-hover:border-amber-400 transition-colors shadow-sm shadow-amber-500/10">
              <div className="w-full h-full rounded-lg bg-slate-950 flex items-center justify-center">
                <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
              </div>
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-white font-mono">
                  SAT<span className="text-amber-400">CONNECT</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded">
                  Superlayer
                </span>
              </div>
              <span className="block text-[10px] text-slate-400 tracking-wider font-sans -mt-0.5">
                Bitcoin. Lightning. Seamless.
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSolutionsDropdownOpen(true)}
              onMouseLeave={() => setSolutionsDropdownOpen(false)}
            >
              <button
                id="solutions-nav-dropdown-btn"
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/50 transition-colors"
              >
                <span>Solutions</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {solutionsDropdownOpen && (
                <div className="absolute top-full left-0 w-80 p-2 bg-slate-950/95 backdrop-blur-xl border border-slate-800 rounded-xl shadow-2xl shadow-black/90 flex flex-col gap-1">
                  {solutions.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      onClick={() => setSolutionsDropdownOpen(false)}
                      className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-900/80 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400 group-hover:border-amber-400/40 shrink-0">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white group-hover:text-amber-400">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-slate-400 leading-tight mt-0.5">
                          {item.desc}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/50 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              id="nav-connect-wallet-btn"
              onClick={handleConnect}
              className="px-3.5 py-2 text-xs font-semibold text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-all shadow-sm flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Connect Wallet</span>
            </button>

            <button
              id="nav-launch-sandbox-btn"
              onClick={handleLaunch}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:brightness-110 rounded-lg transition-all shadow-md shadow-amber-500/20 flex items-center gap-1.5 font-sans"
            >
              <span>Launch App</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="nav-mobile-launch-btn"
              onClick={handleLaunch}
              className="px-2.5 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 rounded-lg"
            >
              App
            </button>
            <button
              id="nav-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 px-4 py-6 space-y-4 shadow-2xl">
          <div className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-2">
            Platform Capabilities
          </div>
          <div className="grid grid-cols-2 gap-2">
            {solutions.slice(0, 4).map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-medium text-slate-200 hover:text-amber-400"
              >
                {item.title}
              </a>
            ))}
          </div>

          <div className="h-px bg-slate-800 my-3" />

          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleConnect();
              }}
              className="w-full py-2.5 text-xs font-semibold text-slate-200 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-center gap-2"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Connect Any Wallet
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleLaunch();
              }}
              className="w-full py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 rounded-lg flex items-center justify-center gap-2"
            >
              Launch Interactive Sandbox
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
