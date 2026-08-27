import React from 'react';
import { DeveloperSection } from '../DeveloperSection';
import { Terminal, Code, Cpu } from 'lucide-react';

export const DeveloperPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header Banner - Angel One Style */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 text-xs font-mono font-bold mb-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>DEVELOPER PORTAL &amp; REST / WEBSOCKET APIS</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            SAT DCX API &amp; SDK Architecture
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Build on top of SAT DCX Superlayer. Integrate Universal Handles, AI routing engines, and Firewall webhooks into any app.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-bold self-start md:self-auto">
          <Code className="w-4 h-4 text-cyan-600" />
          <span>API VERSION: v1.4.0 (ACTIVE)</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-2">
        <DeveloperSection />
      </div>
    </div>
  );
};
