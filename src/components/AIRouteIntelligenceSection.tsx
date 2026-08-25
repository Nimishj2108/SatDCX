import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  CheckCircle2,
  TrendingUp,
  Clock,
  Coins,
  ArrowRight,
  Info,
  ShieldCheck,
  Flame
} from 'lucide-react';
import { ROUTE_OPTIONS_DEMO } from '../data/mockData';
import { RouteOption } from '../types';

export const AIRouteIntelligenceSection: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState<RouteOption>(ROUTE_OPTIONS_DEMO[1]); // Default AI recommended Route B
  const [strategy, setStrategy] = useState<'reliability' | 'fee' | 'speed'>('reliability');

  const handleStrategyChange = (newStrategy: 'reliability' | 'fee' | 'speed') => {
    setStrategy(newStrategy);
    if (newStrategy === 'reliability') {
      setSelectedRoute(ROUTE_OPTIONS_DEMO[1]);
    } else if (newStrategy === 'fee') {
      setSelectedRoute(ROUTE_OPTIONS_DEMO[2]);
    } else {
      setSelectedRoute(ROUTE_OPTIONS_DEMO[0]);
    }
  };

  return (
    <section id="pay-routing" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-mono font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>02 · PAY — AI LIGHTNING ROUTE INTELLIGENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Intelligent Route Selection. <span className="text-blue-600">Zero Payment Stalls.</span>
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Payment failures on the Lightning Network happen when intermediary hops lack channel liquidity. SATCONNECT AI continuously evaluates global gossip topology, latency, and channel buffers to route payments with the highest probability of success.
          </p>
        </div>

        {/* AI Routing Formula Banner */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-blue-600 font-bold uppercase tracking-wider">
                Optimization Objective
              </div>
              <div className="text-sm font-bold text-slate-900">
                Score = Maximize( Payment Success Probability × Speed ) ÷ Routing Cost
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 text-xs font-mono text-emerald-800 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Real-time Mesh Telemetry Active</span>
          </div>
        </div>

        {/* Strategy Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6 text-xs font-mono">
          <span className="text-slate-500 font-bold">Routing Policy:</span>
          <button
            onClick={() => handleStrategyChange('reliability')}
            className={`px-3 py-1.5 rounded-xl border font-bold transition-all cursor-pointer ${
              strategy === 'reliability'
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            ★ AI Recommended (Reliability First)
          </button>
          <button
            onClick={() => handleStrategyChange('fee')}
            className={`px-3 py-1.5 rounded-xl border font-bold transition-all cursor-pointer ${
              strategy === 'fee'
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            Lowest Fee
          </button>
          <button
            onClick={() => handleStrategyChange('speed')}
            className={`px-3 py-1.5 rounded-xl border font-bold transition-all cursor-pointer ${
              strategy === 'speed'
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            Direct Latency
          </button>
        </div>

        {/* Route Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ROUTE_OPTIONS_DEMO.map((route) => {
            const isSelected = selectedRoute.id === route.id;
            return (
              <div
                key={route.id}
                onClick={() => setSelectedRoute(route)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-blue-500 shadow-lg ring-2 ring-blue-500/20'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {route.id.toUpperCase()}
                    </span>
                    {route.isAiRecommended && (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        AI OPTIMAL
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-slate-900">{route.name}</h4>
                    <p className="text-xs text-slate-500 mt-1">{route.aiReason || 'Multi-peer Lightning network route'}</p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Success Rate:</span>
                      <span className="font-bold text-emerald-600">{route.successProbability}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Estimated Time:</span>
                      <span className="font-bold text-slate-900">{route.latencyMs}ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Routing Fee:</span>
                      <span className="font-bold text-orange-600">{route.feeSats} sats</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Hop Count:</span>
                      <span className="font-bold text-slate-700">{route.hops} hops</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                  <span className={isSelected ? 'text-blue-600' : 'text-slate-500'}>
                    {isSelected ? '● Active Selection' : 'Click to Benchmark'}
                  </span>
                  <ArrowRight className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
