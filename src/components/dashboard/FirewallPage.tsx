import React from 'react';
import { AIPaymentFirewallSection } from '../AIPaymentFirewallSection';
import { ShieldCheck, Lock, AlertTriangle } from 'lucide-react';

export const FirewallPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header Banner - Angel One Style */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>03 · PROTECT — REAL-TIME TRANSACTION FIREWALL</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            AI Payment Firewall &amp; Anti-Scam Shield
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Pre-flight payment risk scoring, duplicate invoice interception, amount deviation flags, and known scam address blacklist protection.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold self-start md:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>FIREWALL ACTIVE · 0 ANOMALIES</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-2">
        <AIPaymentFirewallSection />
      </div>
    </div>
  );
};
