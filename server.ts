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

  // API Route: Gemini Chatbot for SATCONNECT FinTech & Sovereign Education
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

      const systemInstruction = `You are SATCONNECT AI Copilot, a helpful, precise, and expert Bitcoin & Lightning FinTech advisor.
SATCONNECT is India's first sovereign Bitcoin & Lightning superlayer with 6 pillars:
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
    console.log(`SATCONNECT Server running on http://0.0.0.0:${PORT}`);
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
SATCONNECT seamlessly bridges Lightning channels directly to Indian merchant UPI QRs:

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
For high-value sovereign reserves, SATCONNECT provides an intuitive 2-of-3 threshold signature architecture:

1. **Key 1 (Mobile Enclave)**: Stored securely in your device's biometric secure enclave.
2. **Key 2 (Cold Hardware)**: Stored offline on your Ledger, Trezor, Coldcard, or SeedSigner.
3. **Key 3 (Encrypted Backup / Social Quorum)**: Time-locked encrypted shard for recovery.
Any spending requires 2 out of 3 signatures, eliminating any single point of failure or physical coercion.`;
  }

  return `### ⚡ Welcome to SATCONNECT
SATCONNECT is India's sovereign Bitcoin & Lightning financial infrastructure superlayer.

- **Universal Identity**: Transact via clean \`@handle\` addressing.
- **AI Payment Firewall**: Real-time scam and invoice tampering interception.
- **UTXO DustGuard**: Mempool gas optimization and batch consolidation.
- **Instant UPI Settle**: Scan any Indian merchant QR with instant non-custodial Lightning settlement.
- **Smart Savings**: Goal-based stacking with zero liquidation risk.

Click **View presentation for this response** below to explore an interactive visual presentation!`;
}

startServer();
