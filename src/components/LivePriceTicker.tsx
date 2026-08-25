import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  Activity, 
  Layers, 
  Cpu, 
  Flame, 
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { subscribeToLiveMarketData, LiveMarketData } from '../services/livePriceService';

export const LivePriceTicker: React.FC = () => {
  const [market, setMarket] = useState<LiveMarketData | null>(null);
  const [priceFlash, setPriceFlash] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    let lastPrice = 0;
    const unsubscribe = subscribeToLiveMarketData((data) => {
      if (lastPrice > 0 && data.btcInr !== lastPrice) {
        setPriceFlash(data.btcInr > lastPrice ? 'up' : 'down');
        setTimeout(() => setPriceFlash(null), 800);
      }
      lastPrice = data.btcInr;
      setMarket(data);
    });

    return () => unsubscribe();
  }, []);

  if (!market) return null;

  return (
    <div className="bg-[#0b1e48] text-slate-200 text-xs py-1.5 px-4 border-b border-blue-950 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center justify-between shadow-inner">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-6 font-mono text-[11px]">
        {/* Left Side: Real-time Live Tickers */}
        <div className="flex items-center gap-5 sm:gap-7">
          {/* BTC / INR Live Price with Flash Animation */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-semibold">BTC/INR:</span>
            <span
              className={`font-extrabold text-white px-1.5 py-0.5 rounded transition-all duration-300 ${
                priceFlash === 'up'
                  ? 'bg-emerald-500/30 text-emerald-300'
                  : priceFlash === 'down'
                  ? 'bg-rose-500/30 text-rose-300'
                  : ''
              }`}
            >
              ₹{market.btcInr.toLocaleString('en-IN')}
            </span>
            <span
              className={`font-bold flex items-center gap-0.5 ${
                market.change24hPercent >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {market.change24hPercent >= 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {market.change24hPercent >= 0 ? `+${market.change24hPercent}%` : `${market.change24hPercent}%`}
            </span>
          </div>

          {/* Volatility Index */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">VOLATILITY:</span>
            <span className="font-bold text-amber-300">{market.volatilityIndex}%</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-medium">
              {market.volatilityLabel}
            </span>
          </div>

          {/* Mempool Gas Rate */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">MEMPOOL GAS:</span>
            <span className="font-bold text-orange-400 flex items-center gap-1">
              <Flame className="w-3 h-3 text-orange-400" />
              {market.mempoolGasSatVb} sat/vB
            </span>
            <span className="text-slate-400 text-[10px]">
              (~{market.mempoolBlockWaitMinutes}m block)
            </span>
          </div>

          {/* Block Height & Active TPS */}
          <div className="hidden md:flex items-center gap-1.5">
            <span className="text-slate-400">BLOCK:</span>
            <span className="font-bold text-cyan-300">#{market.blockHeight}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">SPEED:</span>
            <span className="font-bold text-white">{market.activeTxPerSecond} tx/s</span>
          </div>
        </div>

        {/* Right Side: Status Tag */}
        <div className="hidden lg:flex items-center gap-4 text-[11px] font-mono text-slate-300">
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live Mainnet &amp; Lightning Mesh
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-cyan-300 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            100% Non-Custodial
          </span>
        </div>
      </div>
    </div>
  );
};
