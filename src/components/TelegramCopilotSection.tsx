import React, { useState } from 'react';
import {
  Send,
  ShieldAlert,
  Sparkles,
  Layers,
  Coins,
  Shield,
  Zap,
  HelpCircle,
  TrendingUp,
} from 'lucide-react';
import { TELEGRAM_ALERTS_SAMPLE } from '../data/mockData';

export const TelegramCopilotSection: React.FC = () => {
  const [activeCommand, setActiveCommand] = useState<string>('/risk');
  const [messages, setMessages] = useState<
    { sender: 'user' | 'bot'; text: string; actionBtn?: string; isHtml?: boolean }[]
  >([
    {
      sender: 'bot',
      text: '👋 SATCONNECT Sovereign FinTech Copilot online. Your keys remain 100% on your device. I provide real-time risk, UTXO hygiene, and volatility intelligence.',
    },
    {
      sender: 'user',
      text: '/risk',
    },
    {
      sender: 'bot',
      text: '🚨 Payment Firewall Alert: ₹18,400 Lightning payment requested to unfamiliar recipient (@crypto_vendor_99). Risk score: 87/100 (HIGH). Adaptive biometric verification required.',
      actionBtn: 'Review Payment in SATCONNECT App',
    },
  ]);

  const botResponses: { [key: string]: { text: string; actionBtn?: string } } = {
    '/balance': {
      text: '💼 Portfolio Health: ₹1,42,800 INR (1,701,860 sats). Spendable: ₹1,41,920 · Tiny UTXOs: ₹880 · Suspicious Dust: ₹0.83 (Quarantined).',
      actionBtn: 'View Breakdown',
    },
    '/risk': {
      text: '🛡️ AI Risk Engine: 1 Active Alert. Payment of ₹18,400 to @crypto_vendor_99 flagged as 6.4× median volume spike. Biometric re-authentication triggered.',
      actionBtn: 'Open Security Center',
    },
    '/dust': {
      text: '🧹 DustGuard Status: Mempool fee rate dropped to 12 sat/vB. 8 small UTXOs eligible for low-fee batch consolidation. Estimated fee saving: ₹146.',
      actionBtn: 'Consolidate UTXOs (₹31 fee)',
    },
    '/payments': {
      text: '⚡ Recent Payments: 3 payments settled in last 24h. Total routing fees paid: ₹4.80 INR. 100% sub-second Lightning finality.',
      actionBtn: 'View Ledger',
    },
    '/security': {
      text: '🔐 Vault Status: 2-of-3 Multisig healthy. Key 1 (Mobile) and Key 2 (Hardware Backup) responding normally. Zero custodial exposure.',
      actionBtn: 'Multisig Health Check',
    },
    '/learn': {
      text: '📖 Daily Sovereign Micro-Lesson: "Why do UTXOs matter?" UTXOs are like change bills in your wallet. Small change costs more percentage in fees to spend.',
      actionBtn: 'Take 2-Min Lesson',
    },
  };

  const handleRunCommand = (cmd: string) => {
    setActiveCommand(cmd);
    const resp = botResponses[cmd] || { text: 'Command acknowledged.' };
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: cmd },
      { sender: 'bot', text: resp.text, actionBtn: resp.actionBtn },
    ]);
  };

  return (
    <section id="telegram-copilot" className="py-20 sm:py-28 bg-[#020617] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-4 font-semibold shadow-sm">
            <Send className="w-3.5 h-3.5 text-cyan-400" />
            <span>08 · LEARN — TELEGRAM FINTECH INTELLIGENCE COPILOT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Your Bitcoin Financial Copilot.{' '}
            <span className="text-cyan-400">Intelligence, Never Custody.</span>
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            Stay on top of sudden volatility shifts, mempool low-fee consolidation windows, and payment firewall alerts directly through Telegram. We never ask for seed phrases or store keys.
          </p>
        </div>

        {/* Telegram Architecture Flow */}
        <div className="mb-10 p-4 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-slate-800 text-xs font-mono shadow-md">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-2">
            Non-Custodial Copilot Architecture
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 text-slate-300">
            <span className="text-amber-400 font-bold">SATCONNECT Backend</span>
            <span className="text-slate-600">→</span>
            <span className="text-cyan-400 font-bold">AI Risk &amp; UTXO Engine</span>
            <span className="text-slate-600">→</span>
            <span className="text-indigo-400 font-bold">Telegram Bot API</span>
            <span className="text-slate-600">→</span>
            <span className="text-emerald-400 font-bold">User Instant Alert</span>
          </div>
        </div>

        {/* Interactive Telegram Chat Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Command Buttons and Feature Explanations */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono">
                <span className="text-white font-bold">AVAILABLE BOT COMMANDS</span>
                <span className="text-cyan-400">Click to execute</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { cmd: '/balance', desc: 'Sats & INR Breakdown' },
                  { cmd: '/risk', desc: 'Firewall Alert Status' },
                  { cmd: '/dust', desc: 'Mempool Fee Windows' },
                  { cmd: '/payments', desc: 'Settlement History' },
                  { cmd: '/security', desc: 'Multisig Integrity' },
                  { cmd: '/learn', desc: 'Daily Sovereign Lesson' },
                ].map((item) => (
                  <button
                    key={item.cmd}
                    id={`telegram-cmd-${item.cmd.replace('/', '')}`}
                    onClick={() => handleRunCommand(item.cmd)}
                    className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-400/60 text-left transition-colors group"
                  >
                    <div className="text-xs font-mono font-bold text-cyan-300 group-hover:text-amber-400">
                      {item.cmd}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Zero Custody Guarantee */}
            <div className="p-4 rounded-xl bg-slate-900/40 backdrop-blur-md border border-slate-800 text-[11px] text-slate-400 space-y-1.5 leading-relaxed shadow-sm">
              <div className="flex items-center gap-2 text-white font-bold font-mono">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Custody Privacy Guarantee</span>
              </div>
              <p>
                SATCONNECT Telegram Copilot is an advisory notification feed. It never has access to your private keys, seed phrases, or wallet signing credentials.
              </p>
            </div>
          </div>

          {/* Right Column: Telegram Chat Interface Mock */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-800 shadow-2xl space-y-4">
            {/* Telegram App Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>SATCONNECT Copilot</span>
                    <span className="text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-800 px-1.5 py-0.2 rounded font-mono">
                      bot
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-emerald-400">● Real-time Telemetry Active</div>
                </div>
              </div>
              <span className="text-xs font-mono text-slate-400">Telegram v10.4</span>
            </div>

            {/* Chat Bubble Stream */}
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-amber-400 text-slate-950 font-mono font-bold rounded-tr-none'
                        : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                    }`}
                  >
                    {msg.text}

                    {msg.actionBtn && (
                      <div className="mt-2.5 pt-2 border-t border-slate-800">
                        <button className="w-full py-1.5 px-3 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-800 text-cyan-300 text-[11px] font-mono font-bold transition-colors">
                          {msg.actionBtn} →
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat input box */}
            <div className="pt-2 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type /risk, /dust, /balance..."
                value={activeCommand}
                onChange={(e) => setActiveCommand(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleRunCommand(activeCommand)}
                className="flex-1 bg-slate-950 border border-slate-700 text-xs font-mono text-white px-4 py-2.5 rounded-xl focus:outline-none focus:border-cyan-400"
              />
              <button
                id="telegram-send-btn"
                onClick={() => handleRunCommand(activeCommand)}
                className="px-4 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1 font-mono transition-colors shrink-0"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
