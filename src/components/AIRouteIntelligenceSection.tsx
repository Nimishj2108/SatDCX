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
    <section id="pay-routing" className="py-20 sm:py-28 bg-[#020617] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-4 font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>02 · PAY — AI LIGHTNING ROUTE INTELLIGENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Intelligent Route Selection. <span className="text-cyan-400">Zero Payment Stalls.</span>
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            Payment failures on the Lightning Network happen when intermediary hops lack channel liquidity. SATCONNECT AI continuously evaluates global gossip topology, historical latency, and capacity buffers to route payments with highest probability of success.
          </p>
        </div>

        {/* AI Routing Formula Banner */}
        <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0 shadow-inner">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-cyan-300 font-semibold uppercase tracking-wider">
                Optimization Objective
              </div>
              <div className="text-sm font-bold text-white">
                Score = Maximize( Payment Success Probability × Speed ) ÷ Routing Cost
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
            <span className="text-emerald-400">● Real-time Mesh Telemetry Active</span>
          </div>
        </div>

        {/* Strategy Selector Tabs */}
        <div className="flex items-center gap-2 mb-6 text-xs font-mono">
          <span className="text-slate-400">Routing Policy:</span>
          <button
            onClick={() => handleStrategyChange('reliability')}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              strategy === 'reliability'
                ? 'bg-amber-400 text-slate-950 font-bold border-amber-400 shadow-md shadow-amber-500/20'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            ★ AI Recommended (Reliability First)
          </button>
          <button
            onClick={() => handleStrategyChange('fee')}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              strategy === 'fee'
                ? 'bg-amber-400 text-slate-950 font-bold border-amber-400 shadow-md shadow-amber-500/20'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            Lowest Fee
          </button>
          <button
            onClick={() => handleStrategyChange('speed')}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              strategy === 'speed'
                ? 'bg-amber-400 text-slate-950 font-bold border-amber-400 shadow-md shadow-amber-500/20'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            Direct Latency
          </button>
        </div>

        {/* Route Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {ROUTE_OPTIONS_DEMO.map((route) => {
            const isSelected = selectedRoute.id === route.id;
            return (
              <div
                key={route.id}
                onClick={() => setSelectedRoute(route)}
                className={`p-6 rounded-2xl cursor-pointer border transition-all relative flex flex-col justify-between ${
                  route.isAiRecommended
                    ? 'bg-slate-900/70 backdrop-blur-md border-cyan-400/80 shadow-xl shadow-cyan-500/10'
                    : isSelected
                    ? 'bg-slate-900/90 border-amber-400/80 shadow-md shadow-amber-500/10'
                    : 'bg-slate-950/60 backdrop-blur-sm border-slate-800 hover:border-slate-700'
                }`}
              >
                {route.isAiRecommended && (
                  <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-cyan-400 text-slate-950 text-[10px] font-mono font-extrabold flex items-center gap-1 shadow-md">
                    <Sparkles className="w-3 h-3" />
                    <span>AI RECOMMENDED ROUTE</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-white">{route.name}</h3>
                    <span
                      className={`text-xs font-mono px-2 py-0.5 rounded ${
                        route.successProbability >= 98
                          ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-900/40'
                          : route.successProbability >= 90
                          ? 'text-amber-300 bg-amber-950/60 border border-amber-900/40'
                          : 'text-red-400 bg-red-950/60 border border-red-900/40'
                      }`}
                    >
                      {route.successProbability}% Success
                    </span>
                  </div>

                  {/* Metrics Table */}
                  <div className="space-y-2.5 py-3 border-y border-slate-800/80 text-xs font-mono">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Coins className="w-3.5 h-3.5 text-amber-400" />
                        Routing Fee
                      </span>
                      <span className="text-white font-bold">
                        ₹{route.feeInr.toFixed(2)} ({route.feeSats} sats)
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" />
                        Network Latency
                      </span>
                      <span className="text-cyan-300 font-semibold">{route.latencyMs} ms</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Intermediary Hops</span>
                      <span className="text-slate-300">{route.hops} Hops</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Channel Liquidity</span>
                      <span
                        className={`font-semibold ${
                          route.channelLiquidity === 'Optimal'
                            ? 'text-emerald-400'
                            : route.channelLiquidity === 'Medium'
                            ? 'text-amber-300'
                            : 'text-red-400'
                        }`}
                      >
                        {route.channelLiquidity}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-300 mt-4 leading-relaxed bg-slate-950/80 p-3 rounded-xl border border-slate-800/60">
                    {route.aiReason}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">
                    {isSelected ? '✓ Selected Path' : 'Click to inspect'}
                  </span>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      isSelected ? 'bg-amber-400 text-slate-950' : 'border border-slate-700'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Explainability Note */}
        <div className="p-5 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800 flex items-start gap-3.5 text-xs text-slate-300">
          <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-white font-semibold">Explainable AI Promise:</strong> SATCONNECT AI is strictly an infrastructure routing engine. It evaluates public gossip channels, rebalancing latency, and liquidity buffers to ensure your payment settles instantly. It never conducts speculative trading or automated custody.
          </div>
        </div>
      </div>
    </section>
  );
};
