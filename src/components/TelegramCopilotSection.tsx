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
  Bot
} from 'lucide-react';
import { TELEGRAM_ALERTS_SAMPLE } from '../data/mockData';

export const TelegramCopilotSection: React.FC = () => {
  const [activeCommand, setActiveCommand] = useState<string>('/risk');
  const [messages, setMessages] = useState<
    { sender: 'user' | 'bot'; text: string; actionBtn?: string }[]
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
      text: '💼 Portfolio Health: ₹1,42,800 INR (1,701,860 sats). Spendable: ₹1,41,920 · Tiny UTXOs: ₹880 · Suspicious Dust: ₹0.83 (Quarantined in Dustbin).',
      actionBtn: 'View Breakdown',
    },
    '/risk': {
      text: '🛡️ AI Risk Engine: 1 Active Alert. Payment of ₹18,400 to @crypto_vendor_99 flagged as 6.4× median volume spike. Biometric re-authentication triggered.',
      actionBtn: 'Open Security Center',
    },
    '/dust': {
      text: '🧹 DustGuard Status: Mempool fee rate dropped to 12 sat/vB. 8 small UTXOs eligible for low-fee batch consolidation. Estimated fee saving: ₹146.',
      actionBtn: 'Sweep to Dustbin',
    },
    '/payments': {
      text: '⚡ Recent Payments: 3 payments settled in last 24h. Total routing fees paid: ₹4.80 INR. 100% sub-second Lightning finality.',
      actionBtn: 'View Ledger',
    },
    '/security': {
      text: '🔐 Vault Status: 3-of-5 Corporate / 2-of-3 Individual Multisig healthy. Key Shards responding normally. Zero custodial exposure.',
      actionBtn: 'Multisig Health Check',
    },
  };

  const handleCommand = (cmd: string) => {
    setActiveCommand(cmd);
    const resp = botResponses[cmd] || {
      text: `Received command ${cmd}. Processing query...`,
    };
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: cmd },
      { sender: 'bot', text: resp.text, actionBtn: resp.actionBtn },
    ]);
  };

  return (
    <section id="telegram-copilot" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-mono font-bold mb-3">
            <Bot className="w-3.5 h-3.5 text-blue-600" />
            <span>07 · TELEGRAM SOVEREIGN COPILOT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Real-Time Notifications. <span className="text-blue-600">Zero Custodial Risk.</span>
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Connect your Telegram for real-time mempool fee drops, dust alerts, payment confirmations, and AI risk warnings without ever exposing your private keys.
          </p>
        </div>

        {/* Telegram Chat Simulation Frame */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
          {/* Telegram Header */}
          <div className="bg-[#229ED9] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm">@SATCONNECT_Bot</h4>
                <p className="text-[11px] text-white/80">Sovereign FinTech Copilot • Online</p>
              </div>
            </div>
            <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full font-mono font-semibold">
              Verified Bot
            </span>
          </div>

          {/* Chat Messages Body */}
          <div className="p-4 sm:p-6 bg-slate-50/80 min-h-[280px] max-h-[360px] overflow-y-auto space-y-3 font-sans text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-xs'
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>
                  {m.actionBtn && (
                    <button className="mt-2 text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                      {m.actionBtn} →
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Command Buttons */}
          <div className="p-4 bg-white border-t border-slate-200 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 font-bold">Quick Commands:</span>
            {['/balance', '/risk', '/dust', '/payments', '/security'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleCommand(cmd)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-xs font-mono font-semibold border border-slate-200 transition-all cursor-pointer"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
