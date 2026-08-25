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
  const [searchHandle, setSearchHandle] = useState('@aarav');
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
        name: 'Custom Resolved Sovereign Peer',
        avatar: 'CP',
        lightningAddress: `${handle.replace('@', '')}@satconnect.me`,
        nodePubkey: '02aa77bb88cc99dd00ee11ff2233445566778899aabbccddeeff001122334455',
        supportedProtocols: ['BOLT 11', 'BOLT 12', 'LNURL-Pay'],
        preferredCurrency: 'INR (₹)',
        connectedWallet: 'Auto-Discovered LN Node',
        trustScore: 99,
        status: 'Active & Resolvable',
      };
      setSelectedIdentity(match);
      setIsResolving(false);
    }, 250);
  };

  return (
    <section id="connect" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-mono font-bold mb-3">
            <Zap className="w-3.5 h-3.5 text-blue-600" />
            <span>01 · CONNECT — UNIVERSAL WALLET ABSTRACTION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            One Sovereign Identity. <span className="text-blue-600">Any Bitcoin Wallet.</span>
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Different users hold different mobile and hardware Bitcoin wallets. SATCONNECT provides a unified sovereign handle layer that routes directly to your self-custodial node with zero intermediary lock-in.
          </p>
        </div>

        {/* Main Grid: Interactive Identity Resolver & Protocol Support */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Identity Resolution Simulator */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-600" />
                <span className="font-bold text-slate-900 uppercase">Live Identity Resolver</span>
              </div>
              <span className="font-mono text-[11px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-bold">
                ● DNS &amp; LNURL Ready
              </span>
            </div>

            {/* Input handle box */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
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
                    placeholder="e.g. @aarav, @nimish, @maya"
                    className="w-full bg-slate-50 border border-slate-300 focus:border-blue-500 text-slate-900 px-4 py-2.5 rounded-xl text-xs font-mono font-bold focus:outline-none transition-colors"
                  />
                </div>
                <button
                  id="identity-resolve-btn"
                  onClick={() => handleResolve(searchHandle)}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Resolve</span>
                </button>
              </div>
            </div>

            {/* Quick Demo Handles */}
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="text-slate-500 font-medium">Quick Test:</span>
              {SAMPLE_IDENTITIES.map((id) => (
                <button
                  key={id.handle}
                  onClick={() => handleResolve(id.handle)}
                  className={`px-2.5 py-1 rounded-lg font-mono text-xs font-semibold border transition-all cursor-pointer ${
                    searchHandle.toLowerCase() === id.handle.toLowerCase()
                      ? 'bg-blue-50 text-blue-700 border-blue-300'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  {id.handle}
                </button>
              ))}
            </div>

            {/* Resolved Metadata Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    {selectedIdentity.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{selectedIdentity.name}</div>
                    <div className="text-[11px] text-blue-600 font-semibold">{selectedIdentity.handle}</div>
                  </div>
                </div>
                <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-bold text-[10px]">
                  ✓ Verified Sovereign
                </span>
              </div>

              <div className="space-y-1.5 text-slate-600 text-[11px]">
                <div className="flex justify-between">
                  <span>Lightning Address:</span>
                  <span className="font-bold text-slate-900">{selectedIdentity.lightningAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span>Connected Backend:</span>
                  <span className="font-bold text-slate-900">{selectedIdentity.connectedWallet}</span>
                </div>
                <div className="flex justify-between">
                  <span>Preferred Currency:</span>
                  <span className="font-bold text-slate-900">{selectedIdentity.preferredCurrency}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Protocols & Abstraction Guarantees */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
            <h3 className="text-sm font-bold text-slate-900 uppercase pb-2 border-b border-slate-100">
              Protocol Compatibility Matrix
            </h3>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">BOLT 11 &amp; BOLT 12 Offers</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                    Automated generation of reusable, static QR codes with blinded paths for sender privacy.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">LNURL-Pay &amp; LNURL-Withdraw</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                    Standard human-readable identifiers like <em>handle@satconnect.me</em> across any client.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Native Taproot &amp; SegWit Anchors</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                    Direct on-chain fallback guarantees with zero counterparty risk or custodial escrow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
