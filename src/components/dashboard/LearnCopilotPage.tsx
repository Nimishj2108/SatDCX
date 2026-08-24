import React, { useState } from 'react';
import { TelegramCopilotSection } from '../TelegramCopilotSection';
import { EducateSection } from '../EducateSection';
import { FirstTimeUXSection } from '../FirstTimeUXSection';
import { BookOpen, Send, Sparkles, Award } from 'lucide-react';

export const LearnCopilotPage: React.FC = () => {
  const [tab, setTab] = useState<'copilot' | 'modules' | 'ux'>('copilot');

  return (
    <div className="space-y-6">
      {/* Header Banner - Angel One Style */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-xs font-mono font-bold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>08 &amp; 09 &amp; 12 · LEARN — FINTECH ACADEMY &amp; AI COPILOT</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Learn By Doing: AI Copilot &amp; Sovereign Academy
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Zero-custody Telegram fintech bot commands, contextual payment explainers, and Bitcoin financial literacy curriculum.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold self-start md:self-auto">
          <button
            onClick={() => setTab('copilot')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              tab === 'copilot'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Telegram Copilot
          </button>
          <button
            onClick={() => setTab('modules')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              tab === 'modules'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Literacy Modules
          </button>
          <button
            onClick={() => setTab('ux')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              tab === 'ux'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Progressive UX
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {tab === 'copilot' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-2">
            <TelegramCopilotSection />
          </div>
        )}
        {tab === 'modules' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-2">
            <EducateSection />
          </div>
        )}
        {tab === 'ux' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-2">
            <FirstTimeUXSection />
          </div>
        )}
      </div>
    </div>
  );
};
