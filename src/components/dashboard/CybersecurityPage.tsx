import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  Copy, 
  Check, 
  Eye, 
  EyeOff, 
  RefreshCw, 
  Zap, 
  Smartphone, 
  QrCode, 
  Sliders, 
  AlertTriangle, 
  CheckCircle2, 
  Server, 
  Cpu, 
  Flame, 
  HardDrive,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { COMPATIBLE_WALLETS } from '../../data/mockData';
import { SkeletonCybersecurity } from '../common/ShimmerSkeleton';

export const CybersecurityPage: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showPin, setShowPin] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(COMPATIBLE_WALLETS[0].id);
  const [channelSuccessMsg, setChannelSuccessMsg] = useState<string | null>(null);
  const [isRebalancing, setIsRebalancing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuditing, setIsAuditing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
    }, 550);
  };

  // Address details
  const segwitAddress = 'bc1q9x8w7v6u5t4s3r2q1p0o9n8m7l6k5j4h3g2f1a';
  const taprootAddress = 'bc1p8k7j6h5g4f3d2s1a0z9y8x7w6v5u4t3s2r1q0p';
  const lightningNodePubkey = '02aa77bb88cc99dd00ee11ff2233445566778899aabbccddeeff001122334455';
  const lightningAddress = 'nimish@satdcx.me';
  const securityPin = '1234';

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleRebalanceChannel = () => {
    setIsRebalancing(true);
    setChannelSuccessMsg(null);
    setTimeout(() => {
      setIsRebalancing(false);
      setChannelSuccessMsg('⚡ Lightning Channel Liquidity successfully rebalanced to 2,500,000 sats inbound capacity.');
      setTimeout(() => setChannelSuccessMsg(null), 4000);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner - Angel One Style */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>04 · SECURITY &amp; ENCRYPTED SOVEREIGNTY</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Security Center &amp; Cryptographic Wallet Vault
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Your Bitcoin is saved with 100% non-custodial encryption. Manage your Bitcoin addresses, security PIN, and connected Lightning nodes.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
          <button
            onClick={handleAudit}
            disabled={isAuditing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-bold transition-all cursor-pointer disabled:opacity-50"
            title="Run security health audit"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin text-emerald-600' : ''}`} />
            <span>{isAuditing ? 'Auditing...' : 'Run Audit'}</span>
          </button>

          {/* Security Health Badge */}
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-emerald-700 uppercase font-bold">
                Wallet Security Score
              </div>
              <div className="text-sm font-extrabold font-mono text-emerald-900">
                99 / 100 · ENCRYPTED &amp; SAVED
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLoading || isAuditing ? (
        <SkeletonCybersecurity />
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          {channelSuccessMsg && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-3 animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="font-medium">{channelSuccessMsg}</span>
            </div>
          )}

      {/* Main Security Center Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Your Bitcoin Addresses, Password & Encrypted Status */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-900 uppercase">
                Your Bitcoin Addresses &amp; Security Credentials
              </h2>
            </div>
            <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-200">
              ● 100% Self-Custodial
            </span>
          </div>

          {/* Status Box: Your Bitcoin is Saved */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">
                Your Bitcoin is 100% Secure, Encrypted &amp; Saved
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                SAT DCX servers hold zero private keys. All cryptographic signatures happen locally in your secure client enclave or connected hardware device.
              </p>
            </div>
          </div>

          {/* Address 1: Primary On-Chain SegWit Address */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              Your Primary Native SegWit (Bech32) Bitcoin Address:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={segwitAddress}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-mono text-xs font-bold text-slate-900 bg-slate-50/80 select-all"
              />
              <button
                onClick={() => handleCopy(segwitAddress, 'segwit')}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shrink-0 cursor-pointer"
                title="Copy SegWit Address"
              >
                {copiedField === 'segwit' ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Address 2: Taproot Vault Address */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              Your Taproot (P2TR) Multisig Vault Address:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={taprootAddress}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-mono text-xs font-bold text-slate-900 bg-slate-50/80 select-all"
              />
              <button
                onClick={() => handleCopy(taprootAddress, 'taproot')}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shrink-0 cursor-pointer"
                title="Copy Taproot Address"
              >
                {copiedField === 'taproot' ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Address 3: Lightning Node Pubkey & Universal Lightning Address */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Lightning Address (LNURL):
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={lightningAddress}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-xs font-bold text-blue-700 bg-blue-50/50"
                />
                <button
                  onClick={() => handleCopy(lightningAddress, 'lnurl')}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shrink-0"
                >
                  {copiedField === 'lnurl' ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Security PIN / Password display */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Your Security Authorization PIN:
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type={showPin ? 'text' : 'password'}
                    readOnly
                    value={securityPin}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-xs font-bold text-slate-900 bg-slate-50/80 tracking-widest text-center"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700"
                  >
                    {showPin ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <button
                  onClick={() => handleCopy(securityPin, 'pin')}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shrink-0"
                >
                  {copiedField === 'pin' ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Change Wallet & Lightning Node Management */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900 uppercase">
                  Change Wallet / Lightning Node
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-500">
                Active Node: Phoenix LN
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Seamlessly switch your active signing backend between native mobile Lightning wallets, self-hosted nodes, or cold storage devices without losing your <strong>@handle</strong>.
            </p>

            {/* Wallet Selection Grid */}
            <div className="space-y-2">
              {COMPATIBLE_WALLETS.map((w) => (
                <div
                  key={w.id}
                  onClick={() => setSelectedWallet(w.id)}
                  className={`p-3 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between ${
                    selectedWallet === w.id
                      ? 'bg-blue-50 border-blue-500 shadow-xs'
                      : 'bg-slate-50/50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                        selectedWallet === w.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {w.id === 'phoenix' && <Zap className="w-4 h-4" />}
                      {w.id === 'breez' && <Smartphone className="w-4 h-4" />}
                      {w.id === 'lnd' && <Server className="w-4 h-4" />}
                      {w.id === 'core_lightning' && <Cpu className="w-4 h-4" />}
                      {w.id === 'sparrow' && <HardDrive className="w-4 h-4" />}
                      {w.id === 'exchange' && <Sliders className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{w.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        Ping: {w.pingMs}ms • {w.type}
                      </div>
                    </div>
                  </div>

                  <div>
                    {selectedWallet === w.id ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-200 text-blue-900">
                        ● Connected
                      </span>
                    ) : (
                      <button className="text-[10px] text-blue-600 font-bold hover:underline">
                        Switch
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Lightning Channel Rebalance Action */}
            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                id="rebalance-lightning-btn"
                onClick={handleRebalanceChannel}
                disabled={isRebalancing}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                {isRebalancing ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Rebalance Lightning Liquidity Channels</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
    )}
  </div>
  );
};
