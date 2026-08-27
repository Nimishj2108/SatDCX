import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini SDK lazily
  let aiClient: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI | null {
    if (!aiClient && process.env.GEMINI_API_KEY) {
      aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    }
    return aiClient;
  }

  // API Route: Health Check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
      timestamp: new Date().toISOString(),
    });
  });

  // =========================================================================
  // REAL-TIME CURRENCY & BITCOIN RATES ENGINE (/api/rates)
  // Fetches live CoinGecko BTC (USD, INR) + mempool.space Gas + Frankfurter FX
  // Caches server-side for 30-60s with fallback on upstream failure
  // =========================================================================
  interface LiveRatesResponse {
    btcUsd: number;
    btcInr: number;
    usdInr: number;
    btc24hChangeInr: number;
    gasSatVb: number;
    lastUpdated: string;
    bitcoin: {
      usd: number;
      inr: number;
      usd_24h_change: number;
      inr_24h_change: number;
    };
    fiat: {
      base: string;
      rates: Record<string, number>;
    };
    fiatToInr: Record<string, number>;
    satsPerInr: number;
    inrPerSat: number;
    source: string;
    cached: boolean;
  }

  let cachedRatesData: LiveRatesResponse = {
    btcUsd: 87466.46,
    btcInr: 7631448.61,
    usdInr: 87.25,
    btc24hChangeInr: 2.18,
    gasSatVb: 12,
    lastUpdated: new Date().toISOString(),
    bitcoin: {
      usd: 87466.46,
      inr: 7631448.61,
      usd_24h_change: 2.15,
      inr_24h_change: 2.18,
    },
    fiat: {
      base: 'USD',
      rates: {
        INR: 87.25,
        EUR: 0.925,
        GBP: 0.782,
        JPY: 152.4,
        CAD: 1.378,
        AUD: 1.534,
        SGD: 1.341,
        AED: 3.673,
      },
    },
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
    satsPerInr: 13.10,
    inrPerSat: 0.07631,
    source: 'initial-state',
    cached: false,
  };

  let lastRatesFetchTimestamp = 0;
  const RATES_CACHE_TTL_MS = 30000; // 30 seconds server-side in-memory cache

  async function getLiveRates(): Promise<LiveRatesResponse> {
    const now = Date.now();
    // Return cached rates if within TTL
    if (now - lastRatesFetchTimestamp < RATES_CACHE_TTL_MS && lastRatesFetchTimestamp > 0) {
      return {
        ...cachedRatesData,
        cached: true,
      };
    }

    let btcUpdated = false;
    let mempoolUpdated = false;
    let fiatUpdated = false;

    // 1. Fetch Bitcoin prices from CoinGecko API
    try {
      const cgResponse = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,inr&include_24hr_change=true',
        {
          headers: { Accept: 'application/json' },
          signal: AbortSignal.timeout(5000),
        }
      );

      if (cgResponse.ok) {
        const cgData = (await cgResponse.json()) as any;
        if (cgData && cgData.bitcoin) {
          const usd = Number(cgData.bitcoin.usd) || cachedRatesData.btcUsd;
          const inr = Number(cgData.bitcoin.inr) || cachedRatesData.btcInr;
          const usdChange = typeof cgData.bitcoin.usd_24h_change === 'number'
            ? Number(cgData.bitcoin.usd_24h_change.toFixed(2))
            : cachedRatesData.bitcoin.usd_24h_change;
          const inrChange = typeof cgData.bitcoin.inr_24h_change === 'number'
            ? Number(cgData.bitcoin.inr_24h_change.toFixed(2))
            : cachedRatesData.btc24hChangeInr;

          const derivedUsdInr = usd > 0 ? Number((inr / usd).toFixed(2)) : cachedRatesData.usdInr;

          cachedRatesData.btcUsd = usd;
          cachedRatesData.btcInr = inr;
          cachedRatesData.usdInr = derivedUsdInr;
          cachedRatesData.btc24hChangeInr = inrChange;

          cachedRatesData.bitcoin = {
            usd,
            inr,
            usd_24h_change: usdChange,
            inr_24h_change: inrChange,
          };
          cachedRatesData.satsPerInr = Number((100000000 / inr).toFixed(2));
          cachedRatesData.inrPerSat = Number((inr / 100000000).toFixed(4));
          btcUpdated = true;
        }
      }
    } catch (cgError) {
      console.warn('CoinGecko price fetch warning (using cached):', cgError);
    }

    // 2. Fetch Recommended Network Fees from mempool.space
    try {
      const mempoolResponse = await fetch(
        'https://mempool.space/api/v1/fees/recommended',
        {
          headers: { Accept: 'application/json' },
          signal: AbortSignal.timeout(5000),
        }
      );

      if (mempoolResponse.ok) {
        const mempoolData = (await mempoolResponse.json()) as any;
        if (mempoolData) {
          const gasSatVb = Number(mempoolData.halfHourFee || mempoolData.fastestFee || mempoolData.hourFee) || cachedRatesData.gasSatVb;
          cachedRatesData.gasSatVb = gasSatVb;
          mempoolUpdated = true;
        }
      }
    } catch (mempoolError) {
      console.warn('mempool.space fees fetch warning (using cached):', mempoolError);
    }

    // 3. Fetch fiat currency rates from Frankfurter API
    try {
      const frankResponse = await fetch(
        'https://api.frankfurter.app/latest?from=USD&to=INR,EUR,GBP,JPY,CAD,AUD,SGD,AED',
        {
          headers: { Accept: 'application/json' },
          signal: AbortSignal.timeout(5000),
        }
      );

      if (frankResponse.ok) {
        const frankData = (await frankResponse.json()) as any;
        if (frankData && frankData.rates && frankData.rates.INR) {
          const inrRate = Number(frankData.rates.INR);
          const rawRates: Record<string, number> = {
            INR: inrRate,
            EUR: Number(frankData.rates.EUR) || 0.925,
            GBP: Number(frankData.rates.GBP) || 0.782,
            JPY: Number(frankData.rates.JPY) || 152.4,
            CAD: Number(frankData.rates.CAD) || 1.378,
            AUD: Number(frankData.rates.AUD) || 1.534,
            SGD: Number(frankData.rates.SGD) || 1.341,
            AED: Number(frankData.rates.AED) || 3.673,
          };

          const calculatedFiatToInr: Record<string, number> = {
            USD: Number(inrRate.toFixed(2)),
            INR: 1.0,
            EUR: Number((inrRate / rawRates.EUR).toFixed(2)),
            GBP: Number((inrRate / rawRates.GBP).toFixed(2)),
            JPY: Number((inrRate / rawRates.JPY).toFixed(3)),
            CAD: Number((inrRate / rawRates.CAD).toFixed(2)),
            AUD: Number((inrRate / rawRates.AUD).toFixed(2)),
            SGD: Number((inrRate / rawRates.SGD).toFixed(2)),
            AED: Number((inrRate / rawRates.AED).toFixed(2)),
          };

          cachedRatesData.fiat = {
            base: 'USD',
            rates: rawRates,
          };
          cachedRatesData.fiatToInr = calculatedFiatToInr;
          fiatUpdated = true;
        }
      }
    } catch (frankError) {
      console.warn('Frankfurter fiat fetch warning (using cached):', frankError);
    }

    if (btcUpdated || mempoolUpdated || fiatUpdated || lastRatesFetchTimestamp === 0) {
      cachedRatesData.lastUpdated = new Date().toISOString();
      cachedRatesData.source = `${btcUpdated ? 'coingecko' : 'cached-btc'}+${mempoolUpdated ? 'mempool' : 'cached-gas'}+${fiatUpdated ? 'frankfurter' : 'cached-fx'}`;
      lastRatesFetchTimestamp = now;
    }

    return {
      ...cachedRatesData,
      cached: false,
    };
  }

  // API Route: Live Rates Endpoint
  app.get('/api/rates', async (req, res) => {
    try {
      const data = await getLiveRates();
      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=30, public');
      return res.json(data);
    } catch (error: any) {
      console.error('Error in /api/rates handler:', error);
      // Return cached fallback on any upstream failure without erroring
      return res.json({
        ...cachedRatesData,
        source: 'error-fallback',
        error: error?.message,
      });
    }
  });

  // API Route: Gemini Chatbot for SAT DCX FinTech & Sovereign Education
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, topic } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message is required' });
      }

      const client = getGeminiClient();

      if (!client) {
        // Fallback response with structured presentation when API key is not present
        return res.json({
          text: getSmartFallbackResponse(message),
          source: 'knowledge-base',
        });
      }

      const systemInstruction = `You are SAT DCX AI Copilot, a helpful, precise, and expert Bitcoin & Lightning FinTech advisor.
SAT DCX is India's first sovereign Bitcoin & Lightning superlayer with 6 pillars:
1. Universal Handles (@name) for LNURL, on-chain, and instant Indian UPI merchant QR settlement (zero forced liquidations, zero auto-sell).
2. AI Payment Firewall: Pre-flight scam detection, invoice tampering prevention, and threat telemetry.
3. UTXO DustGuard: Mempool gas forecasting, quarantining un-economical UTXOs, and batch consolidation during low-fee windows.
4. Smart Savings & DCA Vault: Non-custodial goal-based Bitcoin stacking with drawdown stress tests.
5. Traceability & 2-of-3 Multisig: Forensic provenance attribution and cold threshold signature custody.
6. Sovereign Academy & Progressive UX.

Respond clearly, concisely, and accurately. Explain technical concepts simply using analogies. Keep tone professional, objective, and supportive.`;

      const response = await client.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: [
          {
            role: 'user',
            parts: [{ text: `${systemInstruction}\n\nUser Question: ${message}` }],
          },
        ],
      });

      const responseText = response.text || getSmartFallbackResponse(message);

      return res.json({
        text: responseText,
        source: 'gemini-3.7-flash',
      });
    } catch (error: any) {
      console.error('Gemini chat error:', error);
      // Graceful fallback to rich educational response
      const fallbackText = getSmartFallbackResponse(req.body?.message || '');
      return res.json({
        text: fallbackText,
        source: 'knowledge-base-fallback',
        error: error.message,
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: '0.0.0.0', port: PORT },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SAT DCX Server running on http://0.0.0.0:${PORT}`);
  });
}

function getSmartFallbackResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('firewall') || q.includes('scam') || q.includes('threat')) {
    return `### 🛡️ AI Payment Firewall
The **AI Payment Firewall** acts as a pre-flight cryptographic shield before any Satoshi or Rupee leaves your non-custodial wallet:

1. **Pre-flight Static Analysis**: Inspects invoice signatures, expiry timestamps, node reputation scores, and preimage collision risks.
2. **Real-time Threat Interception**: Blocks spoofed QR codes, address replacement malware, and unverified merchant VPAs.
3. **Zero Broadcast Liability**: Flagged transactions are quarantined locally without ever broadcasting to the mempool, guaranteeing zero loss of funds.`;
  }

  if (q.includes('upi') || q.includes('bridge') || q.includes('merchant') || q.includes('pay')) {
    return `### ⚡ Instant UPI ↔ Lightning Bridge
SAT DCX seamlessly bridges Lightning channels directly to Indian merchant UPI QRs:

1. **Instant QR Scanning**: Scan any standard BharatPe, Paytm, PhonePe, or GooglePay QR code.
2. **Sub-second Atomic Swap**: Your Lightning sats are converted via non-custodial liquidity routing in ~1.4 seconds.
3. **Merchant Receives INR**: The merchant instantly gets INR in their local bank account without knowing crypto was used, and without any forced KYC liquidation or custodial risk.`;
  }

  if (q.includes('dust') || q.includes('utxo') || q.includes('gas') || q.includes('mempool')) {
    return `### 🧹 UTXO DustGuard & Gas Optimization
UTXOs that cost more in network fees to spend than their face value are known as "un-economical dust".

1. **Intelligent Quarantine**: Isolates micro-outputs so they aren't accidentally bundled into high-fee transactions.
2. **Mempool Gas Forecaster**: Continuously monitors Bitcoin mempool congestion to detect optimal low-fee windows (<15 sat/vB).
3. **1-Click Batch Consolidation**: Combines multiple fragmented UTXOs into a single clean SegWit/Taproot output when fees are lowest, saving up to 85% on lifetime network fees.`;
  }

  if (q.includes('dca') || q.includes('save') || q.includes('vault') || q.includes('goal')) {
    return `### 🏦 Smart Savings Vault & DCA Engine
The Smart Savings Vault lets you accumulate Bitcoin systematically without custody risk:

1. **Rule-Based Stacking**: Schedule daily or weekly purchases (e.g. ₹500/day) directly into non-custodial SegWit addresses.
2. **Drawdown Risk Modeling**: Live Monte Carlo simulations project portfolio health under 20% to 50% market pullbacks.
3. **Zero Margin / Zero Liquidation**: Because you own 100% of your private keys, your stash can never be margin-called or liquidated by third-party lending desks.`;
  }

  if (q.includes('handle') || q.includes('universal') || q.includes('@')) {
    return `### 🏷️ Universal Sovereign Handles (@handle)
Universal Handles replace 64-character hexadecimal public keys and complex LNURL strings with clean human handles:

1. **Unified Identity**: One handle (e.g., \`@nimish.sat\`) routes Lightning invoices, LNURL-pay, on-chain Taproot addresses, and UPI VPAs.
2. **Decentralized Resolution**: Resolves routing paths securely via client-side cryptography.
3. **Interoperable**: Works with Phoenix, Zeus, Blink, Alby, and any standard Lightning Network client.`;
  }

  if (q.includes('multisig') || q.includes('custody') || q.includes('key')) {
    return `### 🔐 2-of-3 Multisig Threshold Vault
For high-value sovereign reserves, SAT DCX provides an intuitive 2-of-3 threshold signature architecture:

1. **Key 1 (Mobile Enclave)**: Stored securely in your device's biometric secure enclave.
2. **Key 2 (Cold Hardware)**: Stored offline on your Ledger, Trezor, Coldcard, or SeedSigner.
3. **Key 3 (Encrypted Backup / Social Quorum)**: Time-locked encrypted shard for recovery.
Any spending requires 2 out of 3 signatures, eliminating any single point of failure or physical coercion.`;
  }

  return `### ⚡ Welcome to SAT DCX
SAT DCX is India's sovereign Bitcoin & Lightning financial infrastructure superlayer.

- **Universal Identity**: Transact via clean \`@handle\` addressing.
- **AI Payment Firewall**: Real-time scam and invoice tampering interception.
- **UTXO DustGuard**: Mempool gas optimization and batch consolidation.
- **Instant UPI Settle**: Scan any Indian merchant QR with instant non-custodial Lightning settlement.
- **Smart Savings**: Goal-based stacking with zero liquidation risk.

Click **View presentation for this response** below to explore an interactive visual presentation!`;
}

startServer();
