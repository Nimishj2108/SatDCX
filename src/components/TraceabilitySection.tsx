import React, { useState } from 'react';
import {
  Shield,
  Search,
  Eye,
  CheckCircle2,
  Lock,
  ArrowRight,
  GitBranch,
  FileText,
  AlertCircle,
} from 'lucide-react';
import { PROVENANCE_GRAPH_DATA } from '../data/mockData';
import { ProvenanceNode } from '../types';

export const TraceabilitySection: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<ProvenanceNode>(PROVENANCE_GRAPH_DATA[0]);

  return (
    <section id="traceability" className="py-20 sm:py-28 bg-[#020617] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-emerald-500/30 text-xs font-mono text-emerald-300 mb-4 font-semibold shadow-sm">
            <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
            <span>07 · PROTECT — ON-CHAIN TRACEABILITY &amp; PROVENANCE GRAPH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Bitcoin is Pseudonymous, Not Anonymous.{' '}
            <span className="text-emerald-400">Provenance Verified.</span>
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            Every satoshi carries a cryptographic history. SAT DCX builds an explainable provenance graph to verify counterparty cleanliness, identify malicious taint, and ensure compliant settlement without compromising user privacy.
          </p>
        </div>

        {/* Interactive Graph Visualizer & Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Explorable Graph Flow Canvas */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono">
              <span className="text-white font-bold">TRANSACTION GRAPH FLOW</span>
              <span className="text-cyan-400">Click any node to inspect</span>
            </div>

            {/* Visual Node Sequence */}
            <div className="space-y-4 py-2">
              {PROVENANCE_GRAPH_DATA.map((node, idx) => {
                const isSelected = selectedNode.id === node.id;
                return (
                  <div key={node.id} className="relative">
                    <button
                      id={`provenance-node-${node.id}`}
                      onClick={() => setSelectedNode(node)}
                      className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-emerald-950/40 border-emerald-400 shadow-lg shadow-emerald-500/10'
                          : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
                            node.type === 'address'
                              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                              : node.type === 'tx'
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          }`}
                        >
                          {node.type.toUpperCase().slice(0, 3)}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white font-mono">{node.label}</div>
                          <div className="text-[11px] text-slate-400 font-mono truncate max-w-xs mt-0.5">
                            {node.hash}
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                          {node.riskLevel.toUpperCase()}
                        </span>
                        <div className="text-[10px] font-mono text-slate-400 mt-1">
                          {node.attributionConfidence}% Confidence
                        </div>
                      </div>
                    </button>

                    {/* Connecting line */}
                    {idx < PROVENANCE_GRAPH_DATA.length - 1 && (
                      <div className="w-0.5 h-4 bg-slate-700 mx-auto my-0.5" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Node Inspector & Cryptographic Forensics */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-emerald-500/40 shadow-2xl space-y-5 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-emerald-400 font-bold">NODE FORENSICS INSPECTOR</span>
              <span className="text-slate-400">{selectedNode.type.toUpperCase()}</span>
            </div>

            <div>
              <div className="text-[10px] text-slate-400 uppercase">IDENTIFIER / HASH</div>
              <div className="text-cyan-300 font-bold break-all mt-0.5 bg-slate-950 p-2 rounded-lg border border-slate-800">
                {selectedNode.hash}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-400">CONFIDENCE SCORE</span>
                <div className="text-emerald-400 font-bold mt-0.5">
                  {selectedNode.attributionConfidence}%
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-400">BLOCK HEIGHT</span>
                <div className="text-white font-bold mt-0.5">
                  {selectedNode.blockHeight || 'Pending (Mempool)'}
                </div>
              </div>
            </div>

            {selectedNode.amountBtc && (
              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-400">OUTPUT VALUE</span>
                <div className="text-amber-400 font-bold mt-0.5">
                  {selectedNode.amountBtc} BTC (₹{selectedNode.amountInr?.toLocaleString('en-IN')})
                </div>
              </div>
            )}

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400">PROBABILISTIC ENTITY ATTRIBUTION</span>
              <div className="text-white font-semibold mt-1 flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>{selectedNode.entityTag}</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-[11px] text-emerald-300/90 font-sans leading-relaxed">
              💡 <strong className="text-white font-mono">Attribution Integrity:</strong> Entity clustering indicates probabilistic heuristics rather than absolute identity claims, ensuring institutional safety while upholding decentralized principles.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
