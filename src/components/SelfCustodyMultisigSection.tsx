import React, { useState } from 'react';
import {
  Key,
  Shield,
  Smartphone,
  Laptop,
  HardDrive,
  CheckCircle2,
  Lock,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

export const SelfCustodyMultisigSection: React.FC = () => {
  const [activeKeys, setActiveKeys] = useState<{ [key: string]: boolean }>({
    key1: true,
    key2: true,
    key3: false,
  });

  const toggleKey = (keyId: string) => {
    setActiveKeys((prev) => ({ ...prev, [keyId]: !prev[keyId] }));
  };

  const activeCount = Object.values(activeKeys).filter(Boolean).length;
  const isQuorumMet = activeCount >= 2;

  const keyItems = [
    {
      id: 'key1',
      name: 'Key 1: Primary Mobile Device',
      desc: 'Stored on your daily iPhone/Android secure enclave for routine fast signing.',
      icon: Smartphone,
      color: 'text-amber-400',
    },
    {
      id: 'key2',
      name: 'Key 2: Backup Laptop / Tablet',
      desc: 'Kept on your secondary personal device. Authorizes larger savings transactions.',
      icon: Laptop,
      color: 'text-cyan-400',
    },
    {
      id: 'key3',
      name: 'Key 3: Offline Cold Recovery Key',
      desc: 'Stored safely in your home vault. Used only if a primary device is lost or destroyed.',
      icon: HardDrive,
      color: 'text-emerald-400',
    },
  ];

  return (
    <section id="self-custody" className="py-20 sm:py-28 bg-[#020617] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-amber-500/30 text-xs font-mono text-amber-300 mb-4 font-semibold shadow-sm">
            <Key className="w-3.5 h-3.5 text-amber-400" />
            <span>11 · PROTECT — SELF CUSTODY &amp; 2-OF-3 MULTISIG ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Your Bitcoin. Your Wallet.{' '}
            <span className="text-amber-400">Your Keys. Your Control.</span>
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            True Bitcoin security means you never depend on a bank or centralized exchange. With SAT DCX 2-of-3 Multisig, you eliminate single points of failure — even if your phone is stolen, your funds remain 100% safe.
          </p>
        </div>

        {/* 4 Plain-Language First-Time Questions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="p-5 rounded-xl bg-slate-900/40 backdrop-blur-md border border-slate-800 space-y-2 shadow-sm">
            <h4 className="text-xs font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono">01.</span> What is Self-Custody?
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Holding Bitcoin where only you possess the cryptographic mathematical keys — no company or custodian can freeze or seize your money.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/40 backdrop-blur-md border border-slate-800 space-y-2 shadow-sm">
            <h4 className="text-xs font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400 font-mono">02.</span> What is a Private Key?
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              A private digital signature that proves to the global Bitcoin network that you own the funds, without ever revealing your secret phrase.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/40 backdrop-blur-md border border-slate-800 space-y-2 shadow-sm">
            <h4 className="text-xs font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono">03.</span> Why Does It Matter?
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Exchanges can go bankrupt or freeze withdrawals. Self-custody guarantees mathematical ownership backed by the laws of physics.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/40 backdrop-blur-md border border-slate-800 space-y-2 shadow-sm">
            <h4 className="text-xs font-bold text-white flex items-center gap-2">
              <span className="text-indigo-400 font-mono">04.</span> What if a Device is Lost?
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              With 2-of-3 Multisig, losing one device does not lose your Bitcoin. Your second key and offline recovery key combine to restore full access.
            </p>
          </div>
        </div>

        {/* Interactive 2-of-3 Multisig Signing Simulator */}
        <div className="p-8 sm:p-10 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-800 shadow-2xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 text-xs font-mono">
            <div>
              <span className="text-amber-400 font-bold">INTERACTIVE 2-OF-3 MULTISIG QUORUM SIMULATOR</span>
              <p className="text-[11px] text-slate-400 mt-0.5 font-sans">
                Toggle the keys below to test how transactions are authorized or blocked.
              </p>
            </div>
            <div
              className={`px-3 py-1 rounded-lg font-bold border ${
                isQuorumMet
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  : 'bg-red-500/20 text-red-400 border-red-500/40'
              }`}
            >
              {isQuorumMet ? `✓ QUORUM MET (${activeCount}/3 SIGNATURES)` : `✕ INSUFFICIENT QUORUM (${activeCount}/3)`}
            </div>
          </div>

          {/* 3 Keys Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {keyItems.map((item) => {
              const isEnabled = activeKeys[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleKey(item.id)}
                  className={`p-5 rounded-xl border cursor-pointer transition-all space-y-3 ${
                    isEnabled
                      ? 'bg-slate-900/90 border-amber-400/80 shadow-lg shadow-amber-500/10'
                      : 'bg-slate-950/60 border-slate-800 opacity-60 hover:opacity-90'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center">
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                        isEnabled
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isEnabled ? '● Key Active & Signed' : '○ Key Standby'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-white">{item.name}</h3>
                    <p className="text-[11px] text-slate-400 leading-snug mt-1">{item.desc}</p>
                  </div>

                  <div className="pt-2 text-[10px] font-mono text-cyan-400 flex items-center gap-1">
                    <span>{isEnabled ? 'Click to deactivate key' : 'Click to sign with this key'}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Resulting Security Outcome */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-3">
              <Shield className={`w-6 h-6 ${isQuorumMet ? 'text-emerald-400' : 'text-amber-400'}`} />
              <div>
                <div className="text-white font-bold">
                  {isQuorumMet
                    ? 'Transaction Cryptographically Signed & Broadcast'
                    : 'Vault Remains Locked (Single Key Theft Cannot Move Funds)'}
                </div>
                <div className="text-[11px] text-slate-400 font-sans mt-0.5">
                  {isQuorumMet
                    ? 'Any 2 signatures out of 3 satisfy the mathematical script. Broadcast authorized.'
                    : 'An attacker stealing 1 key is mathematically powerless without a 2nd signature.'}
                </div>
              </div>
            </div>

            <span className="text-slate-400 shrink-0">Standard: BIP-67 / Miniscript</span>
          </div>
        </div>
      </div>
    </section>
  );
};
