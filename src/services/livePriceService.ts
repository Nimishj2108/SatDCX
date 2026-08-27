// Real-time live Bitcoin & multi-currency rates service
// Connects to /api/rates (CoinGecko + Frankfurter with server-side caching & fallback)
// Provides clean state management, polling every 30s, and React hooks

import { useEffect, useState } from 'react';

export interface FiatRatesMap {
  [currencyCode: string]: number;
}

export interface LiveMarketData {
  btcInr: number;
  btcUsd: number;
  usdInr: number;
  change24hPercent: number;
  change24hUsdPercent: number;
  volatilityIndex: number; // 0-100%
  volatilityLabel: 'Low' | 'Moderate' | 'Elevated' | 'High';
  mempoolGasSatVb: number;
  mempoolBlockWaitMinutes: number;
  blockHeight: number;
  activeTxPerSecond: number;
  fiatToInr: Record<string, number>;
  fiatRates: Record<string, number>;
  satsPerInr: number;
  inrPerSat: number;
  lastUpdated: Date;
  secondsAgo: number;
  status: 'live' | 'cached' | 'fallback';
  isLoading: boolean;
  error?: string | null;
}

const DEFAULT_MARKET_DATA: LiveMarketData = {
  btcInr: 7631448.61,
  btcUsd: 87466.46,
  usdInr: 87.25,
  change24hPercent: +2.18,
  change24hUsdPercent: +2.15,
  volatilityIndex: 3.42,
  volatilityLabel: 'Moderate',
  mempoolGasSatVb: 12,
  mempoolBlockWaitMinutes: 9.8,
  blockHeight: 896420,
  activeTxPerSecond: 7.8,
  fiatToInr: {
    USD: 87.25,
    EUR: 94.32,
    GBP: 111.57,
    JPY: 0.572,
    CAD: 63.31,
    AUD: 56.87,
    SGD: 65.06,
    AED: 23.75,
    INR: 1.0,
  },
  fiatRates: {
    INR: 87.25,
    EUR: 0.925,
    GBP: 0.782,
    JPY: 152.4,
    CAD: 1.378,
    AUD: 1.534,
    SGD: 1.341,
    AED: 3.673,
  },
  satsPerInr: 13.10,
  inrPerSat: 0.07631,
  lastUpdated: new Date(),
  secondsAgo: 0,
  status: 'live',
  isLoading: false,
};

// Global state and subscribers
type Listener = (data: LiveMarketData) => void;
const listeners: Set<Listener> = new Set();
let currentData: LiveMarketData = { ...DEFAULT_MARKET_DATA };
let isFirstFetch = true;
let fetchInterval: NodeJS.Timeout | null = null;
let secondsCounterInterval: NodeJS.Timeout | null = null;
let isFetchingInProgress = false;

// Fetch live rates from our serverless /api/rates route
export async function fetchLiveRatesFromApi(): Promise<void> {
  if (isFetchingInProgress) return;
  isFetchingInProgress = true;

  try {
    const res = await fetch('/api/rates', {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(6000),
    });

    if (res.ok) {
      const data = await res.json();
      
      if (data) {
        const inr = Number(data.btcInr || data.bitcoin?.inr) || currentData.btcInr;
        const usd = Number(data.btcUsd || data.bitcoin?.usd) || currentData.btcUsd;
        const usdInr = Number(data.usdInr || (usd > 0 ? (inr / usd).toFixed(2) : 87.40)) || currentData.usdInr;
        
        const inrChange = typeof data.btc24hChangeInr === 'number'
          ? Number(data.btc24hChangeInr.toFixed(2))
          : (typeof data.bitcoin?.inr_24h_change === 'number'
            ? Number(data.bitcoin.inr_24h_change.toFixed(2))
            : currentData.change24hPercent);
            
        const usdChange = typeof data.bitcoin?.usd_24h_change === 'number'
          ? Number(data.bitcoin.usd_24h_change.toFixed(2))
          : currentData.change24hUsdPercent;

        const gasSatVb = Number(data.gasSatVb) || currentData.mempoolGasSatVb;

        const fiatToInr = data.fiatToInr || {
          ...currentData.fiatToInr,
          USD: usdInr,
        };
        const fiatRates = data.fiat?.rates || currentData.fiatRates;
        const satsPerInr = data.satsPerInr || Number((100000000 / inr).toFixed(2));
        const inrPerSat = data.inrPerSat || Number((inr / 100000000).toFixed(4));
        const lastUpdatedDate = data.lastUpdated ? new Date(data.lastUpdated) : new Date();

        currentData = {
          ...currentData,
          btcInr: inr,
          btcUsd: usd,
          usdInr,
          change24hPercent: inrChange,
          change24hUsdPercent: usdChange,
          mempoolGasSatVb: gasSatVb,
          fiatToInr,
          fiatRates,
          satsPerInr,
          inrPerSat,
          lastUpdated: lastUpdatedDate,
          secondsAgo: Math.max(0, Math.round((Date.now() - lastUpdatedDate.getTime()) / 1000)),
          status: data.cached ? 'cached' : 'live',
          isLoading: false,
          error: null,
        };

        isFirstFetch = false;
        notifyListeners();
        return;
      }
    }
  } catch (err: any) {
    console.warn('Frontend rate fetch warning (using last known good rates):', err);
    // Keep last known good rates, update timestamp
    currentData = {
      ...currentData,
      status: 'fallback',
      isLoading: false,
    };
    notifyListeners();
  } finally {
    isFetchingInProgress = false;
  }
}

function updateSecondsAgo() {
  if (currentData.lastUpdated) {
    const elapsed = Math.max(0, Math.round((Date.now() - currentData.lastUpdated.getTime()) / 1000));
    if (elapsed !== currentData.secondsAgo) {
      currentData = {
        ...currentData,
        secondsAgo: elapsed,
      };
      notifyListeners();
    }
  }
}

function notifyListeners() {
  listeners.forEach((l) => l({ ...currentData }));
}

/**
 * Subscribe to live market data updates. Automatically starts polling every 30s.
 */
export function subscribeToLiveMarketData(listener: Listener): () => void {
  listeners.add(listener);
  listener({ ...currentData, isLoading: isFirstFetch });

  if (!fetchInterval) {
    fetchLiveRatesFromApi();
    // Poll /api/rates every 30 seconds
    fetchInterval = setInterval(fetchLiveRatesFromApi, 30000);
    // Update secondsAgo counter every second
    secondsCounterInterval = setInterval(updateSecondsAgo, 1000);
  }

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      if (fetchInterval) clearInterval(fetchInterval);
      if (secondsCounterInterval) clearInterval(secondsCounterInterval);
      fetchInterval = null;
      secondsCounterInterval = null;
    }
  };
}

/**
 * Get current synchronous snapshot of live market data
 */
export function getLatestMarketData(): LiveMarketData {
  return { ...currentData };
}

/**
 * React Hook for consuming live rates in components
 */
export function useLiveRates(): LiveMarketData {
  const [rates, setRates] = useState<LiveMarketData>(() => getLatestMarketData());

  useEffect(() => {
    const unsubscribe = subscribeToLiveMarketData((data) => {
      setRates(data);
    });
    return () => unsubscribe();
  }, []);

  return rates;
}

/**
 * Helper to convert foreign currency (USD, EUR, GBP, etc.) to INR using live rate
 */
export function convertForeignToInr(amount: number, currencyCode: string, rates?: Record<string, number>): number {
  const map = rates || currentData.fiatToInr;
  const rate = map[currencyCode.toUpperCase()] || map.USD || 87.25;
  return amount * rate;
}

/**
 * Helper to convert INR to Satoshis using live Bitcoin price
 */
export function inrToSatoshis(inrAmount: number, btcInrRate?: number): number {
  const rate = btcInrRate || currentData.btcInr || 7631448.61;
  return Math.round((inrAmount / rate) * 100000000);
}

/**
 * Helper to convert Satoshis to INR using live Bitcoin price
 */
export function satoshisToInr(satsAmount: number, btcInrRate?: number): number {
  const rate = btcInrRate || currentData.btcInr || 7631448.61;
  return (satsAmount / 100000000) * rate;
}

/**
 * Format relative time (e.g. "5s ago", "Just now")
 */
export function formatTimeAgo(seconds: number): string {
  if (seconds <= 2) return 'Just now';
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m ago`;
}
