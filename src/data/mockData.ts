import {
  WalletNode,
  RouteOption,
  RiskAnalysis,
  SavingsGoal,
  UtxoItem,
  ProvenanceNode,
  TelegramAlert,
  LearningModule,
  ApiDocEndpoint,
} from '../types';

export const COMPATIBLE_WALLETS: WalletNode[] = [
  {
    id: 'phoenix',
    name: 'Phoenix Wallet',
    type: 'lightning',
    icon: 'Flame',
    status: 'connected',
    pingMs: 42,
    channels: 4,
    capacityBtc: 0.15,
  },
  {
    id: 'breez',
    name: 'Breez Mobile',
    type: 'lightning',
    icon: 'Zap',
    status: 'compatible',
    pingMs: 65,
    channels: 2,
    capacityBtc: 0.08,
  },
  {
    id: 'lnd',
    name: 'LND Custom Node',
    type: 'node',
    icon: 'Server',
    status: 'connected',
    pingMs: 24,
    channels: 18,
    capacityBtc: 1.25,
  },
  {
    id: 'core_lightning',
    name: 'Core Lightning (CLN)',
    type: 'node',
    icon: 'Cpu',
    status: 'compatible',
    pingMs: 31,
    channels: 12,
    capacityBtc: 0.85,
  },
  {
    id: 'sparrow',
    name: 'Sparrow Vault (Multisig)',
    type: 'onchain',
    icon: 'Shield',
    status: 'connected',
    pingMs: 18,
    capacityBtc: 2.4,
  },
  {
    id: 'exchange',
    name: 'Exchange LNURL Endpoint',
    type: 'exchange',
    icon: 'ArrowLeftRight',
    status: 'compatible',
    pingMs: 88,
    channels: 6,
    capacityBtc: 0.5,
  },
];

export const SAMPLE_IDENTITIES = [
  {
    handle: '@etant',
    name: 'Etant Sharma',
    avatar: 'ES',
    lightningAddress: 'etant@satconnect.net',
    nodePubkey: '038c14...99a4e1',
    supportedProtocols: ['BOLT 11', 'BOLT 12 (Offers)', 'LNURL-Pay', 'Silent Payments'],
    preferredCurrency: 'INR (₹)',
    connectedWallet: 'Phoenix Wallet (Direct Channel)',
    trustScore: 99,
    status: 'Active & Resolvable',
  },
  {
    handle: '@aarav',
    name: 'Aarav Mehta',
    avatar: 'AM',
    lightningAddress: 'aarav@satconnect.net',
    nodePubkey: '02df45...71bb09',
    supportedProtocols: ['BOLT 11', 'LNURL-Pay', 'On-Chain Fallback'],
    preferredCurrency: 'INR (₹)',
    connectedWallet: 'LND Home Node',
    trustScore: 96,
    status: 'Active & Resolvable',
  },
  {
    handle: '@maya',
    name: 'Maya Rao',
    avatar: 'MR',
    lightningAddress: 'maya@satconnect.net',
    nodePubkey: '0310fa...44ac22',
    supportedProtocols: ['BOLT 12', 'LNURL-Pay'],
    preferredCurrency: 'USD ($)',
    connectedWallet: 'Breez Mobile',
    trustScore: 98,
    status: 'Active & Resolvable',
  },
];

export const ROUTE_OPTIONS_DEMO: RouteOption[] = [
  {
    id: 'route_a',
    name: 'Direct Channel A (High Speed)',
    feeInr: 2.0,
    feeSats: 24,
    latencyMs: 140,
    successProbability: 92,
    hops: 2,
    channelLiquidity: 'Medium',
    isAiRecommended: false,
    aiReason: 'Route has sufficient outbound liquidity but past 1-hour hops show intermittent rebalancing latency.',
  },
  {
    id: 'route_b',
    name: 'AI Recommended Mesh Route B',
    feeInr: 3.0,
    feeSats: 36,
    latencyMs: 85,
    successProbability: 99.2,
    hops: 3,
    channelLiquidity: 'Optimal',
    isAiRecommended: true,
    aiReason: '₹1 higher fee, 7.2% higher estimated success probability. Optimal multi-hop liquidity buffer prevents payment stalls.',
  },
  {
    id: 'route_c',
    name: 'Low-Fee Legacy Path C',
    feeInr: 0.8,
    feeSats: 10,
    latencyMs: 420,
    successProbability: 74,
    hops: 4,
    channelLiquidity: 'Constrained',
    isAiRecommended: false,
    aiReason: 'Low fee, but bottleneck at hop 3 creates a 26% risk of HTLC timeout and multi-minute lockup.',
  },
];

export const RISK_FIREWALL_SAMPLE: RiskAnalysis = {
  paymentAmountInr: 18400,
  recipientHandle: '@crypto_vendor_99',
  recipientStatus: 'new',
  amountMultiplier: 6.4,
  previousInteractions: 0,
  riskScore: 87,
  riskLevel: 'HIGH',
  reasons: [
    'Recipient node is new with 0 prior payment history in your trust graph.',
    'Payment amount of ₹18,400 is 6.4× higher than your 30-day median transaction (₹2,875).',
    'Unusual payment timing outside your normal active behavioral window.',
    'Destination node exhibits high velocity inbound forwarding behavior.',
  ],
  recommendedAction: 'Mandatory 2-Factor Biometric Re-authentication & 60-Second Cooldown Review required before signature.',
};

export const INITIAL_SAVINGS_GOAL: SavingsGoal = {
  id: 'goal_laptop',
  title: 'Workstation Laptop Purchase',
  targetAmountInr: 200000,
  currentAmountInr: 164000,
  targetMonths: 4,
  riskTolerance: 'Moderate',
  bitcoinExposurePercent: 82,
  volatilityTrend: 'Rising',
  drawdownRisk: 'Elevated',
  liquidityScore: '92/100 (Instant Lightning Access)',
  savingsHealthScore: 78,
  aiInsight:
    'Your Bitcoin exposure (82%) is becoming inconsistent with your short-term 4-month goal horizon. An expected ±14% 30-day volatility band could impact target milestone timing.',
  actionRecommendation:
    'Consider re-balancing a portion of your short-term goal into lower-volatility reserves or scheduling incremental DCA exits as milestones approach. All actions remain 100% user-directed.',
};

export const UTXO_DATASET: UtxoItem[] = [
  {
    id: 'utxo_1',
    txid: '3f8e4a91b2c4...',
    vout: 0,
    amountSats: 1250000,
    amountInr: 105000,
    category: 'Spendable',
    feeToSpendSats: 140,
  },
  {
    id: 'utxo_2',
    txid: '8a1b2c3d4e5f...',
    vout: 1,
    amountSats: 439000,
    amountInr: 36920,
    category: 'Spendable',
    feeToSpendSats: 140,
  },
  {
    id: 'utxo_3',
    txid: '1a2b3c4d5e6f...',
    vout: 0,
    amountSats: 10400,
    amountInr: 880,
    category: 'Tiny',
    dustWarning: 'Approaching fee threshold during peak mempool congestion.',
    feeToSpendSats: 125,
  },
  {
    id: 'utxo_4',
    txid: '9f8e7d6c5b4a...',
    vout: 2,
    amountSats: 2850,
    amountInr: 240,
    category: 'Uneconomical',
    dustWarning: 'Fee to spend (140 sat/vB) consumes 45% of output value. Recommend low-fee window consolidation.',
    feeToSpendSats: 110,
  },
  {
    id: 'utxo_5',
    txid: '5c4b3a2f1e0d...',
    vout: 3,
    amountSats: 10,
    amountInr: 0.83,
    category: 'Suspicious',
    isQuarantined: true,
    dustWarning: 'Potential tracking dust attack: Unsolicited 10-sat deposit from clustered unverified source.',
    feeToSpendSats: 140,
  },
];

export const PROVENANCE_GRAPH_DATA: ProvenanceNode[] = [
  {
    id: 'node_addr_a',
    type: 'address',
    label: 'Source Address (bc1q9x...7m2)',
    hash: 'bc1q9x8w7v6u5t4s3r2q1p0m9l8k7j6h5g4f3e2d1',
    blockHeight: 894210,
    timestamp: '2026-08-24 10:14 IST',
    amountBtc: 0.45,
    amountInr: 378000,
    riskLevel: 'clean',
    attributionConfidence: 98,
    entityTag: 'Verified Self-Custody Cold Vault',
  },
  {
    id: 'node_tx_1',
    type: 'tx',
    label: 'Settlement TXID (e84c...b91)',
    hash: 'e84c91a02f34e8b917c5d3a1f9e2b8c4d7a0e3f1a2',
    blockHeight: 894211,
    timestamp: '2026-08-24 10:28 IST',
    amountBtc: 0.4498,
    amountInr: 377832,
    riskLevel: 'clean',
    attributionConfidence: 99,
    entityTag: 'Standard 2-Input 2-Output Transaction',
  },
  {
    id: 'node_utxo_active',
    type: 'utxo',
    label: 'Active UTXO (Output #0)',
    hash: 'e84c...b91:0',
    amountBtc: 0.35,
    amountInr: 294000,
    riskLevel: 'clean',
    attributionConfidence: 96,
    entityTag: 'User Channel Funding Reserve',
  },
  {
    id: 'node_addr_b',
    type: 'address',
    label: 'Destination Lightning Bridge',
    hash: 'bc1q55k8p9z4...w3',
    blockHeight: 894212,
    timestamp: '2026-08-24 10:45 IST',
    amountBtc: 0.0998,
    amountInr: 83832,
    riskLevel: 'clean',
    attributionConfidence: 94,
    entityTag: 'SATCONNECT Liquidity Orchestrator',
  },
  {
    id: 'node_addr_c',
    type: 'address',
    label: 'Counterparty Endpoint',
    hash: 'bc1q99xaa22bb...cc',
    riskLevel: 'low-risk',
    attributionConfidence: 89,
    entityTag: 'Probabilistic Entity: Regulated Merchant Hub',
  },
];

export const TELEGRAM_ALERTS_SAMPLE: TelegramAlert[] = [
  {
    id: 'alert_1',
    type: 'volatility',
    icon: 'TrendingUp',
    title: '⚠️ Volatility Intelligence Update',
    timestamp: '12 mins ago',
    message:
      'Bitcoin Savings Goal "Workstation Laptop" (₹2,00,000): Short-term 30-day volatility index shifted to 14.8%. Risk health adjusted 78 → 72. Goal timeline remains on track.',
    severity: 'warning',
    actionButtonText: 'View Savings Health',
  },
  {
    id: 'alert_2',
    type: 'security',
    icon: 'ShieldAlert',
    title: '🚨 AI Payment Firewall Interception',
    timestamp: '1 hour ago',
    message:
      '₹18,400 Lightning payment requested to new recipient (@crypto_vendor_99). Risk score: 87/100 (HIGH). Adaptive verification triggered. Review required in app.',
    severity: 'critical',
    actionButtonText: 'Review Payment',
  },
  {
    id: 'alert_3',
    type: 'dust',
    icon: 'Sparkles',
    title: '🧹 DustGuard Low-Fee Optimization Window',
    timestamp: '3 hours ago',
    message:
      'Mempool fee rates dropped to 11 sat/vB. You have 8 small UTXOs eligible for batch consolidation. Current cost: ₹31 (vs ₹74 standard). Estimated savings: ₹146.',
    severity: 'info',
    actionButtonText: 'Consolidate UTXOs',
  },
  {
    id: 'alert_4',
    type: 'multisig',
    icon: 'Key',
    title: '🔐 2-of-3 Multisig Key Verification',
    timestamp: 'Yesterday',
    message:
      'Routine integrity check: Key 1 (Mobile) and Key 2 (Hardware Backup) responded within 42ms. Vault integrity is 100% healthy.',
    severity: 'info',
    actionButtonText: 'View Key Status',
  },
];

export const LEARNING_MODULES: LearningModule[] = [
  {
    id: 'mod_1',
    code: 'OWN',
    title: 'Self Custody & Private Keys',
    subtitle: 'Your Keys, Your Sovereignty',
    description:
      'Understand why true Bitcoin ownership means holding your cryptographic keys instead of trusting third-party custodians with your financial future.',
    keyTakeaways: [
      'The difference between holding Bitcoin on an exchange vs. self-custody',
      'How private keys mathematically sign transactions without revealing themselves',
      'The 12/24-word recovery phrase: how it generates all your wallet addresses',
    ],
    estimatedMins: 4,
    completed: true,
  },
  {
    id: 'mod_2',
    code: 'PROTECT',
    title: '2-of-3 Multisig Architecture',
    subtitle: 'Zero Single Point of Failure',
    description:
      'How institutional-grade multi-signature setups protect your funds even if your primary phone is lost, stolen, or compromised.',
    keyTakeaways: [
      'Key 1 (Phone) + Key 2 (Backup) + Key 3 (Offline Recovery)',
      'Why an attacker with one compromised key cannot steal your funds',
      'Reassurance: how to seamlessly recover your wallet if a device breaks',
    ],
    estimatedMins: 5,
    completed: true,
  },
  {
    id: 'mod_3',
    code: 'SAVE',
    title: 'Bitcoin Savings & Volatility Risk',
    subtitle: 'Goal-Based Financial Intelligence',
    description:
      'Learn how to measure time horizons, volatility drawdowns, and portfolio concentration without relying on speculative trading advice.',
    keyTakeaways: [
      'Short-term goals vs. long-term generational wealth horizons',
      'Understanding why volatility is the price of an un-inflatable asset',
      'User-controlled rebalancing: no automated liquidations or surprises',
    ],
    estimatedMins: 6,
    completed: true,
  },
  {
    id: 'mod_4',
    code: 'SPEND',
    title: 'Lightning & Instant Micropayments',
    subtitle: 'Sub-Second Global Settlement',
    description:
      'Discover how payment channels enable millions of transactions per second with near-zero fees while settling securely to Bitcoin Layer 1.',
    keyTakeaways: [
      'How Lightning channels work under the hood',
      'Why fees are a fraction of a rupee (often < ₹0.80)',
      'Lightning Addresses and BOLT 11 vs BOLT 12 payment requests',
    ],
    estimatedMins: 5,
    completed: true,
  },
  {
    id: 'mod_5',
    code: 'MOVE',
    title: 'Cross-Rail Payment Orchestration',
    subtitle: 'Connecting Bitcoin to Local Rails',
    description:
      'Explore how compliant settlement orchestration bridges Lightning with local payment rails like UPI without giving up Bitcoin sovereignty.',
    keyTakeaways: [
      'Real-world tourist and cross-border settlement flows',
      'Why SATCONNECT orchestrates compliant conversion without custody',
      'Instant settlement receipts and proof of payment',
    ],
    estimatedMins: 4,
    completed: false,
  },
  {
    id: 'mod_6',
    code: 'OPTIMIZE',
    title: 'UTXO Management & Dust Protection',
    subtitle: 'Every Satoshi Economically Sound',
    description:
      'Master Unspent Transaction Outputs (UTXOs), fee rate timing, and how DustGuard prevents malicious tracking dust and uneconomical transactions.',
    keyTakeaways: [
      'What a UTXO actually is (Bitcoin change bills in your wallet)',
      'How small UTXOs become expensive to spend if mempool fees rise',
      'Dust attack detection: why unverified tiny deposits must be quarantined',
    ],
    estimatedMins: 5,
    completed: false,
  },
];

export const API_DOCS: ApiDocEndpoint[] = [
  {
    id: 'api_identity',
    name: 'Identity Resolution API',
    method: 'POST',
    path: '/v1/identity/resolve',
    description: 'Resolves a universal SATCONNECT handle into supported Lightning endpoints, BOLT 12 offers, and wallet capabilities.',
    curlExample: `curl -X POST https://api.satconnect.net/v1/identity/resolve \\
  -H "Authorization: Bearer sc_live_98a3f..." \\
  -H "Content-Type: application/json" \\
  -d '{"handle": "@etant"}'`,
    typescriptExample: `import { SatConnectClient } from '@satconnect/sdk';

const client = new SatConnectClient({ apiKey: process.env.SATCONNECT_API_KEY });
const identity = await client.identity.resolve('@etant');

console.log(identity.lightningAddress); // etant@satconnect.net
console.log(identity.preferredCurrency); // INR`,
    responseJson: `{
  "handle": "@etant",
  "name": "Etant Sharma",
  "lightningAddress": "etant@satconnect.net",
  "nodePubkey": "038c14a99120...99a4e1",
  "supportedProtocols": ["BOLT_11", "BOLT_12", "LNURL_PAY"],
  "preferredCurrency": "INR",
  "trustScore": 99.4,
  "status": "ACTIVE"
}`,
  },
  {
    id: 'api_routing',
    name: 'AI Route Optimizer API',
    method: 'POST',
    path: '/v1/routing/optimize',
    description: 'Evaluates global Lightning channel liquidity, past latency, and failure rates to return the optimal payment route.',
    curlExample: `curl -X POST https://api.satconnect.net/v1/routing/optimize \\
  -H "Authorization: Bearer sc_live_98a3f..." \\
  -H "Content-Type: application/json" \\
  -d '{"destination": "etant@satconnect.net", "amountSats": 25000, "priority": "RELIABILITY"}'`,
    typescriptExample: `const route = await client.routing.optimize({
  destination: 'etant@satconnect.net',
  amountSats: 25000,
  optimizationStrategy: 'RELIABILITY_FIRST'
});

console.log(route.estimatedSuccessProbability); // 0.992
console.log(route.totalFeeSats); // 36`,
    responseJson: `{
  "routeId": "rt_ai_9912bc",
  "estimatedSuccessProbability": 0.992,
  "totalFeeSats": 36,
  "totalFeeInr": 3.0,
  "hops": 3,
  "latencyMs": 85,
  "channelLiquidityStatus": "OPTIMAL",
  "aiRecommendation": "Selected multi-hop buffer avoids congested channel #84912."
}`,
  },
  {
    id: 'api_risk',
    name: 'Payment Firewall Risk Scoring API',
    method: 'POST',
    path: '/v1/risk/evaluate',
    description: 'Calculates behavioral anomaly scores and checks graph provenance before transaction signature.',
    curlExample: `curl -X POST https://api.satconnect.net/v1/risk/evaluate \\
  -H "Authorization: Bearer sc_live_98a3f..." \\
  -H "Content-Type: application/json" \\
  -d '{"senderPubkey": "038c...", "recipient": "@crypto_vendor_99", "amountInr": 18400}'`,
    typescriptExample: `const riskAssessment = await client.risk.evaluate({
  senderId: 'usr_8491',
  recipient: '@crypto_vendor_99',
  amountInr: 18400
});

if (riskAssessment.riskScore > 75) {
  triggerBiometricReauth();
}`,
    responseJson: `{
  "riskScore": 87,
  "riskLevel": "HIGH",
  "anomaliesDetected": [
    "UNFAMILIAR_RECIPIENT",
    "AMOUNT_SPIKE_6.4X",
    "HIGH_VELOCITY_DESTINATION"
  ],
  "adaptiveActionRequired": "BIOMETRIC_REAUTH",
  "quarantineSuggested": false
}`,
  },
  {
    id: 'api_dust',
    name: 'DustGuard & UTXO Optimizer API',
    method: 'GET',
    path: '/v1/utxo/analyze?xpub=xpub6CUGRU...91',
    description: 'Scans wallet UTXO distribution, detects tracking dust attacks, and flags uneconomical outputs.',
    curlExample: `curl -X GET "https://api.satconnect.net/v1/utxo/analyze?xpub=xpub6CU..." \\
  -H "Authorization: Bearer sc_live_98a3f..."`,
    typescriptExample: `const utxoSummary = await client.utxo.analyze({
  xpub: 'xpub6CUGRU...'
});

console.log(utxoSummary.recommendedConsolidationWindow); // 11 sat/vB`,
    responseJson: `{
  "totalUtxoCount": 8,
  "spendableBalanceInr": 141920,
  "uneconomicalCount": 1,
  "suspiciousDustCount": 1,
  "currentConsolidationCostInr": 74,
  "recommendedWindowCostInr": 31,
  "potentialSavingsInr": 146
}`,
  },
];
