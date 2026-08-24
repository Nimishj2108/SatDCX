export type LayerCategory = 'CONNECT' | 'PAY' | 'PROTECT' | 'SAVE' | 'OPTIMIZE' | 'LEARN';

export type DashboardPageType =
  | 'overview'
  | 'pay-settle'
  | 'firewall'
  | 'dustguard'
  | 'savings'
  | 'traceability'
  | 'security-center'
  | 'copilot-learn'
  | 'developers';

export interface UserProfile {
  name: string;
  handle: string;
  mobile: string;
  email: string;
  kycStatus: 'Verified' | 'Pending' | 'Non-Custodial Tier 1';
  balanceBtc: number;
  balanceInr: number;
  unconfirmedSats: number;
  channelsCount: number;
  securityScore: number;
  pin?: string;
  lightningAddress: string;
  memberSince: string;
}

export interface TransactionRecord {
  id: string;
  type: 'send' | 'receive' | 'settle_upi' | 'dca_vault' | 'consolidate';
  recipientOrSender: string;
  amountSats: number;
  amountInr: number;
  timestamp: string;
  status: 'COMPLETED' | 'PENDING' | 'INTERCEPTED' | 'FAILED';
  rail: 'Lightning BOLT11' | 'Blinded Route' | 'On-Chain SegWit' | 'UPI Bridge';
  txHashOrPreimage: string;
  feeSats: number;
  note?: string;
}

export interface WalletNode {
  id: string;
  name: string;
  type: 'lightning' | 'onchain' | 'node' | 'exchange';
  icon: string;
  status: 'connected' | 'compatible' | 'standby';
  pingMs: number;
  channels?: number;
  capacityBtc?: number;
}

export interface RouteOption {
  id: string;
  name: string;
  feeInr: number;
  feeSats: number;
  latencyMs: number;
  successProbability: number;
  hops: number;
  channelLiquidity: 'Optimal' | 'Medium' | 'Constrained';
  isAiRecommended?: boolean;
  aiReason?: string;
}

export interface RiskAnalysis {
  paymentAmountInr: number;
  recipientHandle: string;
  recipientStatus: 'new' | 'trusted' | 'flagged';
  amountMultiplier: number;
  previousInteractions: number;
  riskScore: number; // 0 - 100
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH';
  reasons: string[];
  recommendedAction: string;
}

export interface SavingsGoal {
  id: string;
  title: string;
  targetAmountInr: number;
  currentAmountInr: number;
  targetMonths: number;
  riskTolerance: 'Conservative' | 'Moderate' | 'Aggressive';
  bitcoinExposurePercent: number;
  volatilityTrend: 'Rising' | 'Stable' | 'Declining';
  drawdownRisk: 'Low' | 'Moderate' | 'Elevated';
  liquidityScore: string;
  savingsHealthScore: number;
  aiInsight: string;
  actionRecommendation: string;
}

export interface UtxoItem {
  id: string;
  txid: string;
  vout: number;
  amountSats: number;
  amountInr: number;
  category: 'Spendable' | 'Tiny' | 'Uneconomical' | 'Suspicious';
  isQuarantined?: boolean;
  dustWarning?: string;
  feeToSpendSats: number;
}

export interface UpiBridgeSimulation {
  merchantName: string;
  upiVpa: string;
  requestedAmountInr: number;
  btcAmountUsd: number;
  btcSats: number;
  lightningFeeInr: number;
  totalInr: number;
  step: 'scan' | 'verify' | 'quote' | 'settle' | 'complete';
  checks: {
    qrValid: boolean;
    inrAmountVerified: boolean;
    merchantMetadataClean: boolean;
    riskIndicatorsClear: boolean;
  };
}

export interface ProvenanceNode {
  id: string;
  type: 'address' | 'tx' | 'utxo' | 'entity';
  label: string;
  hash: string;
  blockHeight?: number;
  timestamp?: string;
  amountBtc?: number;
  amountInr?: number;
  riskLevel: 'clean' | 'low-risk' | 'flagged';
  attributionConfidence?: number; // e.g. 94%
  entityTag?: string;
}

export interface TelegramAlert {
  id: string;
  type: 'volatility' | 'security' | 'dust' | 'payment' | 'multisig';
  icon: string;
  title: string;
  timestamp: string;
  message: string;
  severity: 'info' | 'warning' | 'critical';
  actionButtonText?: string;
}

export interface LearningModule {
  id: string;
  code: 'OWN' | 'PROTECT' | 'SAVE' | 'SPEND' | 'MOVE' | 'OPTIMIZE';
  title: string;
  subtitle: string;
  description: string;
  keyTakeaways: string[];
  estimatedMins: number;
  completed: boolean;
}

export interface ApiDocEndpoint {
  id: string;
  name: string;
  method: 'GET' | 'POST';
  path: string;
  description: string;
  curlExample: string;
  typescriptExample: string;
  responseJson: string;
}

export type TxActivityType = 'Pay' | 'Receive' | 'Swap';
export type TxActivityStatus = 'Confirmed' | 'Pending' | 'High Risk';
export type TxRiskLevel = 'Low' | 'Moderate' | 'High';

export interface TxRiskMetadata {
  riskScore: number; // 0 - 100
  riskLevel: TxRiskLevel;
  riskLabel: string;
  firewallVerdict: 'PASS' | 'FLAGGED' | 'INTERCEPTED' | 'QUARANTINED';
  preflightChecks: {
    name: string;
    passed: boolean;
    detail: string;
  }[];
  threatIndicators: string[];
  routeReliabilityPercent: number;
  quarantineAction?: string;
  mempoolFeeRateSatVb?: number;
  nodeAttribution?: string;
}

export interface FullTransactionActivity {
  id: string;
  type: TxActivityType;
  subType: 'UPI Merchant Settle' | 'Lightning Send' | 'Inbound Handle Receive' | 'DCA Stacking Pool' | 'Batch UTXO Consolidation' | 'Submarine LN Swap';
  status: TxActivityStatus;
  recipientOrSender: string;
  handleOrAddress: string;
  amountInr: number;
  amountSats: number;
  feeInr: number;
  feeSats: number;
  timestamp: string;
  dateGroup: string;
  rail: 'Lightning BOLT11' | 'UPI Bridge' | 'Blinded Route' | 'On-Chain SegWit' | 'Submarine Swap';
  txHashOrPreimage: string;
  risk: TxRiskMetadata;
  memo: string;
}

export interface SlideData {
  slideNumber: number;
  title: string;
  subtitle: string;
  categoryBadge: string;
  keyPoints: string[];
  diagramSteps?: {
    stepNumber: string;
    title: string;
    description: string;
    highlight?: boolean;
  }[];
  statComparison?: {
    metric: string;
    satconnectValue: string;
    legacyValue: string;
    insight: string;
  };
  takeaway: string;
}

export interface PresentationData {
  id: string;
  topicTitle: string;
  category: string;
  slides: [SlideData, SlideData]; // Exactly 2 structured slides
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  topic?: string;
  hasPresentation?: boolean;
  presentationData?: PresentationData;
}

