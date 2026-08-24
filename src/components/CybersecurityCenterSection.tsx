import React from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Lock,
  Sparkles,
  AlertOctagon,
  Activity,
  CheckCircle2,
  Cpu,
} from 'lucide-react';

export const CybersecurityCenterSection: React.FC = () => {
  const telemetryData = [
    { label: 'Payments Protected', value: '1,284', change: '+18 today', icon: ShieldCheck, color: 'text-emerald-400' },
    { label: 'Suspicious Intercepted', value: '17', change: 'Flagged for review', icon: Activity, color: 'text-amber-300' },
    { label: 'High-Risk Events Blocked', value: '4', change: 'Biometric stopped', icon: ShieldAlert, color: 'text-red-400' },
    { label: 'Dust Attacks Quarantined', value: '6', change: '100% address privacy', icon: Sparkles, color: 'text-cyan-400' },
  ];

  const recentIncidents = [
    {
      title: 'High-Risk Lightning Payment Intercepted',
      score: '87/100',
      reason: 'New recipient node, 6.4× median volume spike, zero interaction history.',
      action: 'Biometric Re-Auth Triggered · Pending User Review',
      time: '14 mins ago',
      level: 'HIGH',
    },
    {
      title: 'Tracking Dust Deposit Isolated by DustGuard',
      score: '94/100 Taint',
      reason: '10 sat unsolicited deposit from clustered tracking entity.',
      action: 'Automatically Quarantined · Co-spend Blocked',
      time: '2 hours ago',
      level: 'DEFENSE',
    },
    {
      title: 'Routine 2-of-3 Multisig Vault Heartbeat',
      score: '100% Integrity',
      reason: 'Mobile Key (Key 1) and Hardware Backup (Key 2) synced successfully.',
      action: 'Vault Health Verified · No Action Needed',
      time: '6 hours ago',
      level: 'CLEAN',
    },
  ];

  return (
    <section id="security-center" className="py-20 sm:py-28 bg-[#020617] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-emerald-500/30 text-xs font-mono text-emerald-300 mb-4 font-semibold shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>10 · PROTECT — CYBERSECURITY COMMAND CENTER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Unified Security Telemetry. <span className="text-emerald-400">Total Operational Clarity.</span>
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            The SATCONNECT Command Center ties together our AI Payment Firewall, 2-of-3 Multisig, DustGuard, and on-chain provenance into one coherent defense layer.
          </p>
        </div>

        {/* 4 Telemetry Metric Tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {telemetryData.map((tile, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-slate-800 flex flex-col justify-between shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-400">{tile.label}</span>
                <tile.icon className={`w-4 h-4 ${tile.color}`} />
              </div>
              <div>
                <div className={`text-2xl sm:text-3xl font-extrabold font-mono ${tile.color}`}>
                  {tile.value}
                </div>
                <div className="text-[11px] font-mono text-slate-400 mt-1">{tile.change}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Live Security Feed + System Health Status */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Live Defense Activity Stream */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-800 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono">
              <span className="text-white font-bold">REAL-TIME SECURITY INTERCEPTIONS</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Live Telemetry
              </span>
            </div>

            <div className="space-y-3">
              {recentIncidents.map((incident, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-colors space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <span>{incident.title}</span>
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                        incident.level === 'HIGH'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : incident.level === 'DEFENSE'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {incident.score}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-300 leading-snug">{incident.reason}</p>

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-800/60">
                    <span className="text-cyan-300 font-semibold">{incident.action}</span>
                    <span>{incident.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Wallet Integrity & Defensive Posture */}
          <div className="lg:col-span-4 p-6 sm:p-8 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-emerald-500/30 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono">
              <span className="text-white font-bold">WALLET INTEGRITY</span>
              <span className="text-emerald-400 font-bold">100% SECURE</span>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-300">Custodial Surface</span>
                <span className="text-emerald-400 font-bold">0% (Zero Custody)</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-300">Multisig Quorum</span>
                <span className="text-cyan-300 font-bold">2 of 3 Keys Ready</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-300">Dust Isolation</span>
                <span className="text-amber-300 font-bold">Quarantine Active</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-300">Mempool Monitor</span>
                <span className="text-emerald-400 font-bold">12 sat/vB (Low)</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400 leading-snug">
              🛡️ <strong className="text-white font-mono">Defense in Depth:</strong> All cryptographic signatures happen locally on user-controlled hardware. No telemetry ever reveals private keys or recovery seeds.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
