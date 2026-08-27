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

export type UserAccountType = 'individual' | 'business';
export type UserNationality = 'indian' | 'foreign' | 'foreigner' | 'nri';

export interface CompanyDirector {
  id: string;
  name: string;
  designation: string;
  panNumber: string;
  dinNumber: string;
  shareholdingPercent: number;
  multisigKeyShard: string;
  savingsWalletAddress: string;
  savingsBalanceBtc: number;
  isAuthorizedSignatory: boolean;
  status: 'Verified' | 'Pending';
}

export interface CompanyProfile {
  companyName: string;
  legalEntityName: string;
  cinNumber: string; // Corporate Identification Number e.g. U72900KA2024PTC189201
  companyPan: string; // e.g. AAACK9982M
  gstNumber: string; // e.g. 29AAACK9982M1Z5
  msmeUdyamNumber: string; // e.g. UDYAM-KR-03-0029812
  registeredOffice: string;
  directors: CompanyDirector[];
  treasuryBtc: number;
  treasuryInr: number;
  multisigQuorum: string; // e.g. '3-of-5 Directors'
  transactionLimitMultiplier: string; // '4x Corporate Multiplier (₹5,00,000 / tx)'
  crossBorderRemitActive: boolean;
  exportImportCode: string; // IEC Code e.g. 0512039941
  corporateHandle: string; // e.g. '@krypton.corp.sat'
}

export interface UserProfile {
  name: string;
  handle: string;
  mobile: string;
  email: string;
  accountType: UserAccountType;
  nationality: UserNationality;
  isFirstTimeUser?: boolean;
  kycStatus: 'Verified' | 'Pending' | 'Non-Custodial Tier 1' | 'Corporate MSME Verified';
  balanceBtc: number;
  balanceInr: number;
  unconfirmedSats: number;
  channelsCount: number;
  securityScore: number;
  pin?: string;
  lightningAddress: string;
  segwitAddress?: string;
  taprootAddress?: string;
  memberSince: string;
  companyProfile?: CompanyProfile;
}

export interface BitcoinDustbinState {
  totalDustDepositedSats: number;
  totalDustDepositedInr: number;
  dustSweepsCount: number;
  handlingChargeSavedInr: number;
  pendingDustUtxos: number;
  autoDustbinDepositEnabled: boolean;
  nextConsolidationMempoolTarget: number; // in sat/vB
  lastClubbedTxId?: string;
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
    satdcxValue: string;
    satconnectValue?: string;
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

export interface ForeignerCountryConfig {
  id: string;
  name: string;
  flag: string;
  currencyCode: string;
  currencySymbol: string;
  exchangeRateToInr: number; // 1 unit of foreign currency = X INR
  primaryColor: string;
  accentColor: string;
  gradientClass: string;
  glowColor: string;
  visaPolicy: 'e-Visa 30-Day/1-Yr' | 'Visa on Arrival' | 'Visa-Exempt (Indo-Nepal Treaty)' | 'e-Business / Conference';
  visaNote: string;
  popularTripDays: number;
}

export interface PassportVerificationProof {
  passportNumber: string;
  country: string;
  fullName: string;
  gender: string;
  dateOfBirth: string;
  expiryDate: string;
  issuingAuthority: string;
  documentHash: string;
  bitcoinBlockHash: string;
  merkleRoot: string;
  opReturnTxId: string;
  zkpAttestationId: string;
  verificationTimestamp: string;
  blockchainAnchorHeight: number;
  isConfirmed: boolean;
}

export interface TripPlannerData {
  country: ForeignerCountryConfig;
  travelerName: string;
  cashCarriedForeign: number;
  btcInWallet: number;
  tripStartDate: string;
  tripEndDate: string;
  tripDaysCount: number;
  visaCategory: 'Tourist Visa (e-Visa)' | 'Business Visa (e-Business)' | 'Student Visa (e-Student)' | 'Conference/Medical' | 'Visa-Exempt Entry';
  travelStyle: 'budget' | 'mid' | 'luxury';
  dailyBudgetInr: number;
  totalEstimatedInr: number;
  recommendedSats: number;
  recommendedBtc: number;
  satsPurchased: number;
  isWalletReady: boolean;
  passportProof?: PassportVerificationProof;
}

export interface PriceGougeAssessment {
  itemName: string;
  category: 'Packaged FMCG' | 'Street Food & Snacks' | 'Cafe & Casual Dining' | '5-Star Luxury Dining' | 'Tourist Souvenir & Handicraft' | 'Transportation & Auto Rickshaw';
  quotedPriceInr: number;
  statutoryMrpInr: number;
  locationType: 'Roadside Stall' | 'Tourist Attraction Kiosk' | 'Casual Cafe' | '5-Star Luxury Hotel' | 'Airport Lounge';
  isPackaged: boolean;
  fairnessScore: number; // 0 to 10
  verdict: 'Fair Statutory MRP (10/10)' | 'Reasonable Minor Markup (7-8/10)' | 'Elevated Luxury Ambiance (8-9/10)' | 'Moderate Tourist Premium (5-6/10)' | 'Severe Tourist Gouge Detected (1-3/10)';
  explanation: string;
  aiQuestioning: string[];
  dustRiskSats: number;
  dustWarning?: string;
}

export interface LightningTravelHop {
  nodeId: string;
  nodeName: string;
  location: string;
  ipGeo: string;
  channelCapacitySats: number;
  latencyMs: number;
  feeSats: number;
  status: 'active' | 'routing' | 'settled';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'assistant';
  text: string;
  timestamp: string;
  topic?: string;
  hasPresentation?: boolean;
  presentationData?: PresentationData;
  presentation?: PresentationData;
  feedbackRating?: 'helpful' | 'unhelpful';
}

