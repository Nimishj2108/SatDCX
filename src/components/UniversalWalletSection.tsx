import React, { useState } from 'react';
import {
  Zap,
  Search,
  CheckCircle2,
  Globe,
  Lock,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Flame,
  Server,
  Sparkles,
} from 'lucide-react';
import { SAMPLE_IDENTITIES } from '../data/mockData';

export const UniversalWalletSection: React.FC = () => {
  const [searchHandle, setSearchHandle] = useState('@etant');
  const [selectedIdentity, setSelectedIdentity] = useState(SAMPLE_IDENTITIES[0]);
  const [isResolving, setIsResolving] = useState(false);

  const handleResolve = (handle: string) => {
    setIsResolving(true);
    setSearchHandle(handle);
    setTimeout(() => {
      const match = SAMPLE_IDENTITIES.find(
        (id) => id.handle.toLowerCase() === handle.toLowerCase()
      ) || {
        handle: handle.startsWith('@') ? handle : `@${handle}`,
        name: 'Custom Resolved Peer',
        avatar: 'CP',
        lightningAddress: `${handle.replace('@', '')}@satconnect.net`,
        nodePubkey: '02aa77...88bb11',
        supportedProtocols: ['BOLT 11', 'BOLT 12', 'LNURL-Pay'],
        preferredCurrency: 'INR (₹)',
        connectedWallet: 'Auto-Discovered LN Node',
        trustScore: 95,
        status: 'Active & Resolvable',
      };
      setSelectedIdentity(match);
      setIsResolving(false);
    }, 300);
  };

  return (
    <section id="connect" className="py-20 sm:py-28 bg-[#020617] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-amber-500/30 text-xs font-mono text-amber-300 mb-4 font-semibold shadow-sm">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>01 · CONNECT — UNIVERSAL WALLET CONNECTIVITY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            One Payment Identity. <span className="text-amber-400">Any Compatible Wallet.</span>
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            Different users use different Bitcoin or Lightning wallets. SATCONNECT provides a unified payment identity layer that abstracts away complex node pubkeys, invoice expiration, and cross-wallet routing.
          </p>
        </div>

        {/* Main Grid: Interactive Identity Resolver & Network Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Identity Resolution Simulator */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span className="font-mono font-bold text-white">LIVE IDENTITY RESOLVER</span>
              </div>
              <span className="font-mono text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-900/40 px-2 py-0.5 rounded">
                ● DNS &amp; LNURL Ready
              </span>
            </div>

            {/* Input handle box */}
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-2">
                Enter Universal Payment Handle or Lightning Address
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    id="identity-search-input"
                    type="text"
                    value={searchHandle}
                    onChange={(e) => setSearchHandle(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleResolve(searchHandle)}
                    placeholder="e.g. @etant, @aarav, @maya"
                    className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-amber-400 text-white px-4 py-2.5 rounded-xl text-sm font-mono focus:outline-none transition-colors"
                  />
                </div>
                <button
                  id="identity-resolve-btn"
                  onClick={() => handleResolve(searchHandle)}
                  disabled={isResolving}
                  className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors shrink-0 shadow-md shadow-amber-500/20"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>{isResolving ? 'Resolving...' : 'Resolve'}</span>
                </button>
              </div>

              {/* Sample Quick Pick handles */}
              <div className="flex items-center gap-2 mt-3 text-xs font-mono text-slate-400">
                <span>Try sample:</span>
                {SAMPLE_IDENTITIES.map((sample) => (
                  <button
                    key={sample.handle}
                    onClick={() => handleResolve(sample.handle)}
                    className="text-cyan-400 hover:text-cyan-300 bg-slate-950/80 hover:bg-slate-900 px-2 py-0.5 rounded border border-slate-800 transition-colors"
                  >
                    {sample.handle}
                  </button>
                ))}
              </div>
            </div>

            {/* Resolved Identity Output Card */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-amber-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-400 to-cyan-400 flex items-center justify-center font-bold text-slate-950 text-sm shadow-md">
                    {selectedIdentity.avatar}
                  </div>
                  <div>
                    <div className="text-base font-bold text-white flex items-center gap-2">
                      <span>{selectedIdentity.name}</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-xs font-mono text-amber-300 font-medium">
                      {selectedIdentity.handle}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono text-slate-400">TRUST SCORE</div>
                  <div className="text-sm font-mono font-bold text-emerald-400">
                    {selectedIdentity.trustScore}/100
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-slate-800">
                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80">
                  <div className="text-[10px] text-slate-400">LIGHTNING ENDPOINT</div>
                  <div className="text-cyan-300 truncate mt-0.5 font-semibold">
                    {selectedIdentity.lightningAddress}
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80">
                  <div className="text-[10px] text-slate-400">CONNECTED WALLET</div>
                  <div className="text-slate-200 truncate mt-0.5 font-semibold">
                    {selectedIdentity.connectedWallet}
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 text-xs font-mono">
                <div className="text-[10px] text-slate-400 mb-1">SUPPORTED SETTLEMENT PROTOCOLS</div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedIdentity.supportedProtocols.map((proto, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300 text-[10px]"
                    >
                      {proto}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
                <span>Preferred Currency: <strong className="text-white">{selectedIdentity.preferredCurrency}</strong></span>
                <span className="text-emerald-400">✓ Ready for Instant Routing</span>
              </div>
            </div>
          </div>

          {/* Right Column: Wallet Abstraction Architecture explanation */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-800 space-y-6 shadow-2xl">
              <h3 className="text-xl font-bold text-white">
                How Wallet Abstraction Works
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                The sender never needs to know if the recipient is running Phoenix on Android, Breez on iOS, an LND node on a Raspberry Pi, or a Core Lightning enterprise instance. SATCONNECT performs the translation in milliseconds.
              </p>

              {/* 4 Architectural Pillars */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">1. Address Resolution</h4>
                    <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                      Maps human-friendly handles (@etant) to cryptographic keys, LNURL-pay endpoints, and BOLT 12 static offers.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">2. Wallet Abstraction</h4>
                    <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                      Eliminates vendor lock-in. Connect Phoenix, Breez, LND, CLN, or on-chain cold vaults simultaneously.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <Server className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">3. Payment Routing</h4>
                    <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                      Dynamically discovers the highest-liquidity multi-hop path to avoid channel exhaustion.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">4. Cross-Wallet Settlement</h4>
                    <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                      Sub-second finality with zero custodial intermediary holding funds at any point.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-xs font-mono text-slate-400 flex items-center justify-between">
                <span>Protocols Supported:</span>
                <span className="text-amber-400 font-semibold">LNURL · BOLT 11 · BOLT 12 · Silent Payments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
