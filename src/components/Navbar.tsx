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
  Building2,
  Lock
} from 'lucide-react';
import { LivePriceTicker } from './LivePriceTicker';

interface NavbarProps {
  onConnectWallet?: () => void;
  onLaunchSandbox?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onConnectWallet, onLaunchSandbox }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleConnect = () => {
    if (onConnectWallet) onConnectWallet();
  };

  const handleLaunch = () => {
    if (onLaunchSandbox) onLaunchSandbox();
  };

  const navLinks = [
    { name: 'Superlayer Features', href: '#superlayer' },
    { name: 'Sovereign Handles', href: '#connect' },
    { name: 'Bitcoin Dustbin', href: '#dustguard' },
    { name: 'Security Center', href: '#security' },
    { name: 'UPI Bridge', href: '#upi-bridge' },
    { name: 'Telegram Bot', href: '#telegram-copilot' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-xs">
      {/* Real-time BTC/INR, Volatility & Gas Ticker */}
      <LivePriceTicker />

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold font-mono tracking-tight text-slate-900 leading-none">
                SAT<span className="text-orange-500">CONNECT</span>
              </span>
              <span className="text-[9px] font-mono text-slate-500 font-semibold tracking-wider mt-0.5">
                SOVEREIGN FINTECH
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-600">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-blue-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              id="nav-login-btn"
              onClick={handleConnect}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-blue-700 hover:bg-slate-100 transition-all cursor-pointer"
            >
              Log In
            </button>

            <button
              type="button"
              id="nav-open-account-btn"
              onClick={handleConnect}
              className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-orange-500/20 transition-all cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-amber-200" />
              <span>Claim Handle (Free)</span>
            </button>

            <button
              type="button"
              id="nav-launch-dashboard-btn"
              onClick={handleLaunch}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition-all cursor-pointer"
            >
              <span>Launch Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 p-4 space-y-3 font-semibold text-xs text-slate-700 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 rounded-lg hover:bg-slate-50 hover:text-blue-600"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                handleConnect();
              }}
              className="w-full py-2.5 rounded-xl bg-orange-500 text-white font-bold text-xs text-center"
            >
              Claim Sovereign Handle (Free)
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                handleLaunch();
              }}
              className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs text-center"
            >
              Launch Dashboard
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
