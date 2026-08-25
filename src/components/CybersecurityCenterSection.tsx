import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  Copy, 
  Check, 
  Eye, 
  EyeOff, 
  Server, 
  Zap, 
  Smartphone, 
  HardDrive,
  Cpu
} from 'lucide-react';
import { COMPATIBLE_WALLETS } from '../data/mockData';

export const CybersecurityCenterSection: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showPin, setShowPin] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(COMPATIBLE_WALLETS[0].id);

  const segwitAddress = 'bc1q9x8w7v6u5t4s3r2q1p0o9n8m7l6k5j4h3g2f1a';
  const taprootAddress = 'bc1p8k7j6h5g4f3d2s1a0z9y8x7w6v5u4t3s2r1q0p';
  const lightningAddress = 'nimish@satconnect.me';
  const securityPin = '1234';

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <section id="security" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>04 · SECURITY &amp; ENCRYPTED NON-CUSTODIAL VAULT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Your Bitcoin Is Saved. <span className="text-emerald-600">100% Encrypted.</span>
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Every satoshi is anchored to your sovereign private keys. Manage your native SegWit addresses, Lightning pubkeys, and connected nodes with zero server key storage.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Addresses & Credentials */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 uppercase">
                Your Bitcoin Addresses &amp; Master Keys
              </h3>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                ● 100% Self-Custodial
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Native SegWit (Bech32) Bitcoin Address:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={segwitAddress}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-mono text-xs font-bold text-slate-900 bg-slate-50"
                />
                <button
                  onClick={() => handleCopy(segwitAddress, 'segwit')}
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  {copiedField === 'segwit' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Taproot (P2TR) Vault Address:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={taprootAddress}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-mono text-xs font-bold text-slate-900 bg-slate-50"
                />
                <button
                  onClick={() => handleCopy(taprootAddress, 'taproot')}
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  {copiedField === 'taproot' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Universal Lightning Address:
                </label>
                <input
                  type="text"
                  readOnly
                  value={lightningAddress}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-xs font-bold text-blue-700 bg-blue-50/50"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Security PIN / Password:
                </label>
                <div className="relative">
                  <input
                    type={showPin ? 'text' : 'password'}
                    readOnly
                    value={securityPin}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-xs font-bold text-slate-900 bg-slate-50 text-center tracking-widest"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700"
                  >
                    {showPin ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Node Switcher */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase pb-2 border-b border-slate-100">
              Change Wallet / Lightning Node
            </h3>
            <div className="space-y-2">
              {COMPATIBLE_WALLETS.slice(0, 4).map((w) => (
                <div
                  key={w.id}
                  onClick={() => setSelectedWallet(w.id)}
                  className={`p-3 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between ${
                    selectedWallet === w.id
                      ? 'bg-blue-50 border-blue-500'
                      : 'bg-slate-50/50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-bold text-slate-900">{w.name}</div>
                  <span className="text-[10px] font-mono text-slate-500">
                    {selectedWallet === w.id ? '● Active' : 'Switch'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
