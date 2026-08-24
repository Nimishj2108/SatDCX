import React, { useState } from 'react';
import { Terminal, Code, Copy, Check, Sparkles, BookOpen, Key, Cpu } from 'lucide-react';

export const DeveloperSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'resolve' | 'route' | 'firewall'>('resolve');
  const [copied, setCopied] = useState(false);

  const codeSnippets = {
    resolve: `// Resolve Universal Handle into Sovereign Payment Endpoints
import { SatConnectClient } from '@satconnect/sdk';

const sat = new SatConnectClient({ apiKey: process.env.SATCONNECT_KEY });

const identity = await sat.identity.resolve('@satya_dev');
console.log(identity);
/*
{
  handle: '@satya_dev',
  lightningAddress: 'satya@phoenix.me',
  bolt12Offer: 'lno1qgsqvgnwgcg35z6ee2h3aa6ee2h3aa6ee2h3aa6agcqzpq...',
  multisigPubkey: '0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798',
  riskTier: 'VERIFIED_CLEAN'
}
*/`,
    route: `// AI Route Optimization & Dynamic Liquidity Discovery
const routeQuote = await sat.router.findOptimalRoute({
  fromWallet: 'BREEZ_SDK',
  destination: '@satya_dev',
  amountSats: 25000,
  optimizationGoal: 'LOWEST_FEE' // or 'LOWEST_LATENCY' | 'MAX_PRIVACY'
});

console.log(routeQuote);
/*
{
  recommendedRoute: 'ROUTE_A',
  totalFeeSats: 12,
  estimatedLatencyMs: 95,
  successProbability: 0.994,
  anomaliesDetected: 0
}
*/`,
    firewall: `// AI Behavioral Payment Firewall Inspection
const firewallAudit = await sat.firewall.evaluatePayment({
  recipientHandle: '@crypto_vendor_99',
  amountInr: 18400,
  userContext: { recentVolumeMedianInr: 2875 }
});

if (firewallAudit.riskScore > 80) {
  // Triggers Adaptive Biometric Re-Authentication
  await sat.auth.requireBiometricQuorum();
}`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="developers" className="py-20 sm:py-28 bg-[#020617] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-4 font-semibold shadow-sm">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>DEVELOPER PLATFORM &amp; REST / WEBSOCKET APIS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Build on Bitcoin &amp; Lightning with <span className="text-cyan-400">FinTech APIs.</span>
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            Integrate universal identity resolution, AI liquidity routing, and behavioral firewall scoring into your application with our lightweight TypeScript SDK and REST endpoints.
          </p>
        </div>

        {/* Code Snippet Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-800 shadow-2xl space-y-4">
          {/* Header tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              {(['resolve', 'route', 'firewall'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                    activeTab === tab
                      ? 'bg-cyan-400 text-slate-950 shadow-md'
                      : 'bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {tab === 'resolve' ? 'Identity Resolve' : tab === 'route' ? 'AI Route' : 'Firewall API'}
                </button>
              ))}
            </div>

            <button
              id="dev-copy-code-btn"
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-mono flex items-center gap-1.5 self-start sm:self-auto transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Code'}</span>
            </button>
          </div>

          {/* Pre code block */}
          <div className="bg-[#020617] p-4 sm:p-6 rounded-xl border border-slate-800/80 overflow-x-auto shadow-inner">
            <pre className="font-mono text-xs text-slate-300 leading-relaxed">
              <code>{codeSnippets[activeTab]}</code>
            </pre>
          </div>

          {/* Micro dev telemetry */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Avg Latency: 42ms</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>SDK: TypeScript &amp; Go</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Specs: BOLT 11 / BOLT 12</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
