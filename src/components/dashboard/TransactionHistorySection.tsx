import React, { useState, useMemo, useEffect } from 'react';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  RefreshCw, 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  ChevronRight, 
  ExternalLink, 
  Copy, 
  Check, 
  Info, 
  Zap, 
  Layers, 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  SlidersHorizontal,
  X,
  FileText
} from 'lucide-react';
import { FullTransactionActivity, TxActivityType, TxActivityStatus, TxRiskLevel } from '../../types';
import { ShimmerBlock, SkeletonTransactionRow, SkeletonMetricCard } from '../common/ShimmerSkeleton';

// Rich, realistic transaction activity database with comprehensive risk metadata
export const INITIAL_TRANSACTIONS: FullTransactionActivity[] = [
  {
    id: 'tx-act-01',
    type: 'Pay',
    subType: 'UPI Merchant Settle',
    status: 'Confirmed',
    recipientOrSender: 'Third Wave Coffee Roasters',
    handleOrAddress: 'thirdwave@hdfcbank',
    amountInr: 420.00,
    amountSats: 5005,
    feeInr: 0.17,
    feeSats: 2,
    timestamp: 'Today, 2:45 PM',
    dateGroup: 'Today',
    rail: 'UPI Bridge',
    txHashOrPreimage: '9f83ac4819d45e02ba981726a19f804c8e7629b31d04481b89ef726a4198be71',
    memo: 'Instant INR settlement via non-custodial Lightning off-ramp bridge',
    risk: {
      riskScore: 6,
      riskLevel: 'Low',
      riskLabel: 'Clean & Trusted Merchant',
      firewallVerdict: 'PASS',
      preflightChecks: [
        { name: 'Invoice Signature Verification', passed: true, detail: 'Valid cryptographic ECDSA signature from registered merchant' },
        { name: 'VPA Entity Reputation Score', passed: true, detail: 'Merchant VPA active >24 months with 99.8% positive telemetry' },
        { name: 'Preimage Expiry Guarantee', passed: true, detail: 'HTLC timelock set to 144 blocks (safe settlement buffer)' },
        { name: 'Zero Address Reuse Verification', passed: true, detail: 'Unique atomic payment invoice generated' },
      ],
      threatIndicators: [],
      routeReliabilityPercent: 99.9,
      mempoolFeeRateSatVb: 12,
      nodeAttribution: 'SATDCX-HYD-ROUTING-NODE-01',
    },
  },
  {
    id: 'tx-act-02',
    type: 'Receive',
    subType: 'Inbound Handle Receive',
    status: 'Confirmed',
    recipientOrSender: 'Rohit Dev (Freelance Milestone)',
    handleOrAddress: '@rohit_dev.sat',
    amountInr: 45000.00,
    amountSats: 536225,
    feeInr: 0.00,
    feeSats: 0,
    timestamp: 'Today, 11:15 AM',
    dateGroup: 'Today',
    rail: 'Lightning BOLT11',
    txHashOrPreimage: '3b89ef147c20a89467b9319e05f61d289456ab317c093a89012f45904ca9812e',
    memo: 'Received freelance payout to universal handle @nimish.sat',
    risk: {
      riskScore: 4,
      riskLevel: 'Low',
      riskLabel: 'Verified Peer Channel',
      firewallVerdict: 'PASS',
      preflightChecks: [
        { name: 'Inbound Channel Liquidity Audit', passed: true, detail: 'Local node capacity optimal (8.4M sats available)' },
        { name: 'Blinded Onion Routing Integrity', passed: true, detail: 'Sender node identity protected via blinded path' },
        { name: 'Zero Double-Spend Risk', passed: true, detail: 'Payment locked by cryptographic hash preimage' },
      ],
      threatIndicators: [],
      routeReliabilityPercent: 100.0,
      nodeAttribution: 'PEER-ROHIT-PHOENIX-DIRECT',
    },
  },
  {
    id: 'tx-act-03',
    type: 'Pay',
    subType: 'Lightning Send',
    status: 'High Risk',
    recipientOrSender: 'Unknown AirDrop Bot (Spoofed QR)',
    handleOrAddress: 'claim-free-btc@random-node.xyz',
    amountInr: 12500.00,
    amountSats: 148950,
    feeInr: 0.00,
    feeSats: 0,
    timestamp: 'Yesterday, 8:20 PM',
    dateGroup: 'Yesterday',
    rail: 'Lightning BOLT11',
    txHashOrPreimage: '7a659f018e24c009ab8234ef0182746bc8239014672901458923401928340192',
    memo: 'AI Firewall intercepted: Malicious invoice with zero reputation score and spoofed preimage',
    risk: {
      riskScore: 94,
      riskLevel: 'High',
      riskLabel: 'Spoofed Invoice Intercepted',
      firewallVerdict: 'INTERCEPTED',
      preflightChecks: [
        { name: 'Invoice Signature Verification', passed: false, detail: 'Node signature lacks cryptographic web-of-trust' },
        { name: 'Sanction / Blacklist Telemetry', passed: false, detail: 'Destination node ID matches known phishing honeypot' },
        { name: 'Preimage Pre-Disclosure Risk', passed: false, detail: 'Malformed HTLC timeout vulnerability detected' },
        { name: 'Amount Multiplier Anomaly', passed: false, detail: 'Invoice requested 10x the advertised payment claim' },
      ],
      threatIndicators: [
        'Destination node flagged on 4 global cyber intelligence feeds',
        'Preimage hash matches known replay attack dictionary',
        'Zero inbound capacity on receiving hop'
      ],
      routeReliabilityPercent: 0.0,
      quarantineAction: 'Payment quarantined before broadcast. 0 sats deducted.',
      nodeAttribution: 'MALICIOUS-HONEYPOT-INTERCEPT-09',
    },
  },
  {
    id: 'tx-act-04',
    type: 'Swap',
    subType: 'Batch UTXO Consolidation',
    status: 'Confirmed',
    recipientOrSender: 'UTXO DustGuard Optimizer',
    handleOrAddress: 'bc1q9f...consolidation-pool',
    amountInr: 2850.00,
    amountSats: 33960,
    feeInr: 7.39,
    feeSats: 88,
    timestamp: 'Yesterday, 3:10 AM',
    dateGroup: 'Yesterday',
    rail: 'On-Chain SegWit',
    txHashOrPreimage: '6c19a4e29b470129bc8921473648102948756102938475610293847561029384',
    memo: 'Consolidated 6 micro-UTXOs into 1 Native SegWit output at 9 sat/vB fee window',
    risk: {
      riskScore: 12,
      riskLevel: 'Low',
      riskLabel: 'Mempool Gas Optimized',
      firewallVerdict: 'PASS',
      preflightChecks: [
        { name: 'Mempool Gas Rate Threshold', passed: true, detail: 'Broadcasted at 9 sat/vB during overnight low-congestion window' },
        { name: 'UTXO Provenance Purity', passed: true, detail: 'All 6 input UTXOs scored 100% clean non-toxic provenance' },
        { name: 'Change Address Privacy', passed: true, detail: 'Single output SegWit with zero toxic address linkability' },
      ],
      threatIndicators: [],
      routeReliabilityPercent: 99.8,
      mempoolFeeRateSatVb: 9,
      nodeAttribution: 'BITCOIN-CORE-MEMPOOL-POOL-PRIMARY',
    },
  },
  {
    id: 'tx-act-05',
    type: 'Swap',
    subType: 'DCA Stacking Pool',
    status: 'Confirmed',
    recipientOrSender: 'Automated Daily Bitcoin Vault',
    handleOrAddress: 'vault-savings@satdcx.me',
    amountInr: 1000.00,
    amountSats: 11915,
    feeInr: 0.34,
    feeSats: 4,
    timestamp: '22 Aug 2026, 9:00 AM',
    dateGroup: '22 Aug',
    rail: 'Blinded Route',
    txHashOrPreimage: '8a719d0238471029bc4857102938475610293847561029384756102938475610',
    memo: 'Daily ₹1,000 INR recurring auto-stack into non-custodial savings vault',
    risk: {
      riskScore: 3,
      riskLevel: 'Low',
      riskLabel: 'Automated Sovereign Stack',
      firewallVerdict: 'PASS',
      preflightChecks: [
        { name: 'Self-Custody Ownership Check', passed: true, detail: 'Destination xPub derived from user client keys' },
        { name: 'Zero Auto-Sell Verification', passed: true, detail: 'Non-custodial pool with zero margin lending exposure' },
        { name: 'Blinded Path Routing', passed: true, detail: 'Privacy-preserving multi-hop Lightning execution' },
      ],
      threatIndicators: [],
      routeReliabilityPercent: 100.0,
      nodeAttribution: 'VAULT-DCA-SWAP-ROUTER',
    },
  },
  {
    id: 'tx-act-06',
    type: 'Pay',
    subType: 'UPI Merchant Settle',
    status: 'Pending',
    recipientOrSender: 'Croma Electronics Store',
    handleOrAddress: 'croma.retail@icici',
    amountInr: 18999.00,
    amountSats: 226400,
    feeInr: 1.25,
    feeSats: 15,
    timestamp: '21 Aug 2026, 7:30 PM',
    dateGroup: '21 Aug',
    rail: 'UPI Bridge',
    txHashOrPreimage: '1a90bc4829104829bc7829104829bc7829104829bc7829104829bc7829104829',
    memo: 'Pending settlement verification on merchant terminal webhook',
    risk: {
      riskScore: 38,
      riskLevel: 'Moderate',
      riskLabel: 'High Value Threshold Check',
      firewallVerdict: 'FLAGGED',
      preflightChecks: [
        { name: 'Biometric 2FA PIN Authorization', passed: true, detail: 'Hardware enclave approved transaction >₹10,000' },
        { name: 'Merchant Webhook Acknowledgment', passed: false, detail: 'Awaiting final bank clearing callback (estimated 12s)' },
        { name: 'Reversal Protection HTLC', passed: true, detail: 'Sats safely held in escrow channel until terminal confirms' },
      ],
      threatIndicators: [
        'Transaction value exceeds daily retail median (₹5,000)',
      ],
      routeReliabilityPercent: 96.5,
      nodeAttribution: 'SATDCX-MUM-GATEWAY',
    },
  },
  {
    id: 'tx-act-07',
    type: 'Swap',
    subType: 'Submarine LN Swap',
    status: 'Confirmed',
    recipientOrSender: '2-of-3 Multisig Cold Vault',
    handleOrAddress: 'bc1qmultisig...threshold-cold',
    amountInr: 75000.00,
    amountSats: 893700,
    feeInr: 12.50,
    feeSats: 148,
    timestamp: '20 Aug 2026, 4:15 PM',
    dateGroup: '20 Aug',
    rail: 'Submarine Swap',
    txHashOrPreimage: '5e4129bc7829104829bc7829104829bc7829104829bc7829104829bc78291048',
    memo: 'Submarine swap from active Lightning hot channel to cold 2-of-3 multisig quorum',
    risk: {
      riskScore: 2,
      riskLevel: 'Low',
      riskLabel: 'Cold Vault Quorum Confirmed',
      firewallVerdict: 'PASS',
      preflightChecks: [
        { name: 'Threshold Signature Quorum', passed: true, detail: '2-of-3 signatures collected (Mobile Enclave + Hardware Key)' },
        { name: 'Atomic Submarine Timelock', passed: true, detail: 'Zero custodial intermediary in swap sequence' },
        { name: 'SegWit Script Verification', passed: true, detail: 'P2WSH script hash validated on-chain' },
      ],
      threatIndicators: [],
      routeReliabilityPercent: 100.0,
      mempoolFeeRateSatVb: 14,
      nodeAttribution: 'COLD-MULTISIG-SWAP-GATEWAY',
    },
  },
];

export const TransactionHistorySection: React.FC = () => {
  const [transactions, setTransactions] = useState<FullTransactionActivity[]>(INITIAL_TRANSACTIONS);
  const [selectedTx, setSelectedTx] = useState<FullTransactionActivity | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'All' | TxActivityType>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | TxActivityStatus>('All');
  const [riskFilter, setRiskFilter] = useState<'All' | TxRiskLevel>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Perceived performance simulation on initial mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      // Type filter
      if (typeFilter !== 'All' && tx.type !== typeFilter) return false;
      // Status filter
      if (statusFilter !== 'All' && tx.status !== statusFilter) return false;
      // Risk filter
      if (riskFilter !== 'All' && tx.risk.riskLevel !== riskFilter) return false;
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = tx.recipientOrSender.toLowerCase().includes(q);
        const matchesHandle = tx.handleOrAddress.toLowerCase().includes(q);
        const matchesHash = tx.txHashOrPreimage.toLowerCase().includes(q);
        const matchesMemo = tx.memo.toLowerCase().includes(q);
        const matchesSubtype = tx.subType.toLowerCase().includes(q);
        return matchesName || matchesHandle || matchesHash || matchesMemo || matchesSubtype;
      }
      return true;
    });
  }, [transactions, typeFilter, statusFilter, riskFilter, searchQuery]);

  // Aggregate stats
  const stats = useMemo(() => {
    let inflowInr = 0;
    let inflowSats = 0;
    let outflowInr = 0;
    let outflowSats = 0;
    let totalRiskScore = 0;
    let highRiskCount = 0;

    transactions.forEach((tx) => {
      if (tx.type === 'Receive') {
        inflowInr += tx.amountInr;
        inflowSats += tx.amountSats;
      } else {
        outflowInr += tx.amountInr;
        outflowSats += tx.amountSats;
      }
      totalRiskScore += tx.risk.riskScore;
      if (tx.status === 'High Risk' || tx.risk.riskLevel === 'High') {
        highRiskCount++;
      }
    });

    const avgRisk = Math.round(totalRiskScore / (transactions.length || 1));
    return { inflowInr, inflowSats, outflowInr, outflowSats, avgRisk, highRiskCount };
  }, [transactions]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Summary KPI Strip (Angel One Style) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                LIVE TELEMETRY LEDGER
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {transactions.length} Total Records Logged
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Full Transaction History &amp; Risk Intelligence
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Cryptographic receipts, pre-flight AI Firewall threat scores, and multi-rail settlement proofs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              id="refresh-transactions-btn"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-bold transition-all cursor-pointer disabled:opacity-50"
              title="Refresh ledger telemetry"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
              <span>{isRefreshing ? 'Syncing...' : 'Sync Feed'}</span>
            </button>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>AI FIREWALL: 100% ACTIVE</span>
            </div>
          </div>
        </div>

        {/* 4 KPI Summary Cards */}
        {isLoading || isRefreshing ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <SkeletonMetricCard />
            <SkeletonMetricCard />
            <SkeletonMetricCard />
            <SkeletonMetricCard />
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* KPI 1: Inflow */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1">
                <span>Total Received</span>
                <ArrowDownLeft className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-lg font-bold font-mono text-emerald-600">
                +₹{stats.inflowInr.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                {stats.inflowSats.toLocaleString()} Sats
              </div>
            </div>

            {/* KPI 2: Outflow */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1">
                <span>Total Settled / Sent</span>
                <ArrowUpRight className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-lg font-bold font-mono text-slate-900">
                -₹{stats.outflowInr.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                {stats.outflowSats.toLocaleString()} Sats
              </div>
            </div>

            {/* KPI 3: Avg Risk Score */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1">
                <span>Ledger Health Score</span>
                <ShieldCheck className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-lg font-bold font-mono text-slate-900">
                {100 - stats.avgRisk}/100
              </div>
              <div className="text-[11px] font-mono text-emerald-600 font-semibold">
                Low Cumulative Threat Profile
              </div>
            </div>

            {/* KPI 4: Interceptions */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1">
                <span>Threats Intercepted</span>
                <ShieldAlert className="w-4 h-4 text-rose-600" />
              </div>
              <div className="text-lg font-bold font-mono text-rose-600">
                {stats.highRiskCount} Blocked
              </div>
              <div className="text-[11px] font-mono text-slate-500">
                100% Funds Protected
              </div>
            </div>
          </div>
        )}

        {/* 2. Interactive Filter & Search Controls */}
        <div className="pt-2 border-t border-slate-100 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="tx-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search merchant, @handle, hash, memo..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Type Filter */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
              <span className="text-[10px] text-slate-400 px-2 font-mono">TYPE:</span>
              {(['All', 'Pay', 'Receive', 'Swap'] as const).map((t) => (
                <button
                  key={t}
                  id={`filter-type-${t.toLowerCase()}`}
                  onClick={() => setTypeFilter(t)}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    typeFilter === t
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
              <span className="text-[10px] text-slate-400 px-2 font-mono">STATUS:</span>
              {(['All', 'Confirmed', 'Pending', 'High Risk'] as const).map((s) => (
                <button
                  key={s}
                  id={`filter-status-${s.toLowerCase().replace(' ', '-')}`}
                  onClick={() => setStatusFilter(s)}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    statusFilter === s
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Risk Level Filter */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
              <span className="text-[10px] text-slate-400 px-2 font-mono">RISK:</span>
              {(['All', 'Low', 'Moderate', 'High'] as const).map((r) => (
                <button
                  key={r}
                  id={`filter-risk-${r.toLowerCase()}`}
                  onClick={() => setRiskFilter(r)}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    riskFilter === r
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Transaction Table (Angel One FinTech Table Style) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-slate-900 uppercase">
              Activity Stream ({filteredTransactions.length} items shown)
            </span>
          </div>
          {(typeFilter !== 'All' || statusFilter !== 'All' || riskFilter !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setTypeFilter('All');
                setStatusFilter('All');
                setRiskFilter('All');
                setSearchQuery('');
              }}
              className="text-xs text-blue-600 font-bold hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {isLoading || isRefreshing ? (
          <div className="divide-y divide-slate-100">
            <SkeletonTransactionRow />
            <SkeletonTransactionRow />
            <SkeletonTransactionRow />
            <SkeletonTransactionRow />
            <SkeletonTransactionRow />
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-800">No matching transactions found</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search keywords or clearing the active type, status, or risk filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Type &amp; Counterparty</th>
                  <th className="py-3.5 px-4">Settlement Rail</th>
                  <th className="py-3.5 px-4">Amount (INR / Sats)</th>
                  <th className="py-3.5 px-4">Status &amp; Risk Score</th>
                  <th className="py-3.5 px-4">Timestamp</th>
                  <th className="py-3.5 px-4 text-right">Risk &amp; Proof</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTransactions.map((tx) => {
                  const isPay = tx.type === 'Pay';
                  const isReceive = tx.type === 'Receive';
                  const isSwap = tx.type === 'Swap';
                  const isHighRisk = tx.status === 'High Risk' || tx.risk.riskLevel === 'High';
                  const isPending = tx.status === 'Pending';

                  return (
                    <tr 
                      key={tx.id} 
                      className={`hover:bg-slate-50/80 transition-colors ${
                        isHighRisk ? 'bg-rose-50/40' : ''
                      }`}
                    >
                      {/* 1. Type & Counterparty */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                            isReceive 
                              ? 'bg-emerald-100 text-emerald-700' 
                              : isHighRisk
                              ? 'bg-rose-100 text-rose-700'
                              : isSwap
                              ? 'bg-indigo-100 text-indigo-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {isReceive ? (
                              <ArrowDownLeft className="w-4 h-4" />
                            ) : isHighRisk ? (
                              <ShieldAlert className="w-4 h-4" />
                            ) : isSwap ? (
                              <RefreshCw className="w-4 h-4" />
                            ) : (
                              <ArrowUpRight className="w-4 h-4" />
                            )}
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900">{tx.recipientOrSender}</span>
                              <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
                                isReceive
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : isHighRisk
                                  ? 'bg-rose-100 text-rose-800 border border-rose-300'
                                  : isSwap
                                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                                  : 'bg-blue-50 text-blue-700 border border-blue-200'
                              }`}>
                                {tx.type.toUpperCase()} • {tx.subType}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5 mt-0.5">
                              <span>{tx.handleOrAddress}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* 2. Settlement Rail */}
                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-mono text-[11px] font-semibold border border-slate-200">
                          {tx.rail}
                        </span>
                      </td>

                      {/* 3. Amount */}
                      <td className="py-4 px-4 font-mono font-bold">
                        <div className={`text-sm ${
                          isReceive 
                            ? 'text-emerald-600' 
                            : isHighRisk
                            ? 'text-rose-600 line-through'
                            : 'text-slate-900'
                        }`}>
                          {isReceive ? '+' : '-'}₹{tx.amountInr.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </div>
                        <div className="text-[11px] text-slate-400 font-normal">
                          {tx.amountSats.toLocaleString()} sats
                        </div>
                      </td>

                      {/* 4. Status & Risk Score */}
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            {isHighRisk ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold text-[10px] border border-rose-300">
                                <ShieldAlert className="w-3 h-3 text-rose-600" />
                                HIGH RISK ({tx.risk.firewallVerdict})
                              </span>
                            ) : isPending ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px] border border-amber-300">
                                <Clock className="w-3 h-3 text-amber-600 animate-spin" />
                                PENDING
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                CONFIRMED
                              </span>
                            )}
                          </div>

                          {/* Risk Score Pill */}
                          <div className="flex items-center gap-1.5 text-[10px] font-mono">
                            <span className="text-slate-400">Risk Score:</span>
                            <span className={`font-bold ${
                              tx.risk.riskScore > 50 
                                ? 'text-rose-600' 
                                : tx.risk.riskScore > 20 
                                ? 'text-amber-600' 
                                : 'text-emerald-600'
                            }`}>
                              {tx.risk.riskScore}/100 ({tx.risk.riskLevel})
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* 5. Timestamp */}
                      <td className="py-4 px-4 text-slate-500 font-mono">
                        <div>{tx.timestamp}</div>
                        <div className="text-[10px] text-slate-400">Fee: {tx.feeSats} sats</div>
                      </td>

                      {/* 6. Action: Inspect Risk & Receipt */}
                      <td className="py-4 px-4 text-right">
                        <button
                          id={`inspect-tx-${tx.id}`}
                          onClick={() => setSelectedTx(tx)}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 font-bold text-xs transition-all shadow-xs inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>Inspect Risk</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 4. Deep Cryptographic Risk & Pre-Flight Inspector Modal */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white ${
                  selectedTx.risk.riskLevel === 'High' ? 'bg-rose-600' : 'bg-blue-600'
                }`}>
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Pre-Flight Risk &amp; Cryptographic Proof
                  </h3>
                  <div className="text-[11px] font-mono text-slate-500">
                    ID: {selectedTx.id} • {selectedTx.timestamp}
                  </div>
                </div>
              </div>

              <button
                id="close-tx-inspector-btn"
                onClick={() => setSelectedTx(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Amount & Status Banner */}
            <div className={`p-4 rounded-2xl border flex items-center justify-between ${
              selectedTx.risk.riskLevel === 'High' 
                ? 'bg-rose-50 border-rose-200 text-rose-900' 
                : 'bg-blue-50 border-blue-200 text-blue-900'
            }`}>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {selectedTx.type} • {selectedTx.subType}
                </div>
                <div className="text-2xl font-extrabold font-mono text-slate-900 mt-0.5">
                  ₹{selectedTx.amountInr.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-xs font-mono text-orange-600 font-bold">
                  {selectedTx.amountSats.toLocaleString()} Satoshis
                </div>
              </div>

              <div className="text-right">
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-bold bg-white shadow-xs">
                  <span>Score: {selectedTx.risk.riskScore}/100</span>
                </div>
                <div className="text-[11px] font-semibold mt-1">
                  Verdict: <strong className={selectedTx.risk.riskLevel === 'High' ? 'text-rose-600' : 'text-emerald-600'}>
                    {selectedTx.risk.firewallVerdict}
                  </strong>
                </div>
              </div>
            </div>

            {/* Quarantine or High Risk Alert */}
            {selectedTx.risk.quarantineAction && (
              <div className="p-4 bg-rose-50 border-2 border-rose-300 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-rose-900 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>AI Firewall Enforcement Action</span>
                </div>
                <p className="text-xs text-rose-800">
                  {selectedTx.risk.quarantineAction}
                </p>
                {selectedTx.risk.threatIndicators.length > 0 && (
                  <ul className="list-disc list-inside text-[11px] text-rose-700 space-y-0.5 font-mono pt-1">
                    {selectedTx.risk.threatIndicators.map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Pre-Flight Checklist Details */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider flex items-center justify-between">
                <span>Pre-Flight Firewall Checks</span>
                <span className="text-emerald-600">Reliability: {selectedTx.risk.routeReliabilityPercent}%</span>
              </div>

              <div className="space-y-2">
                {selectedTx.risk.preflightChecks.map((check, idx) => (
                  <div 
                    key={idx} 
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="space-y-0.5">
                      <div className="font-bold text-slate-800 flex items-center gap-1.5">
                        {check.passed ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        ) : (
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        )}
                        <span>{check.name}</span>
                      </div>
                      <p className="text-[11px] text-slate-500">{check.detail}</p>
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      check.passed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {check.passed ? 'PASSED' : 'FAILED'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cryptographic Proof & Preimage Card */}
            <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl space-y-3 text-xs font-mono">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[11px]">
                <span className="text-slate-400">CRYPTOGRAPHIC PREIMAGE / HASH</span>
                <button
                  onClick={() => handleCopy(selectedTx.txHashOrPreimage, 'hash')}
                  className="text-orange-400 hover:text-orange-300 flex items-center gap-1"
                >
                  {copiedId === 'hash' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedId === 'hash' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="p-2.5 bg-slate-950 rounded-xl border border-white/10 break-all text-[11px] text-emerald-400">
                {selectedTx.txHashOrPreimage}
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                <div>
                  <span className="text-slate-400 block">Routing Node</span>
                  <span className="text-white font-bold">{selectedTx.risk.nodeAttribution || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Routing Fee</span>
                  <span className="text-orange-400 font-bold">{selectedTx.feeSats} sats (₹{selectedTx.feeInr})</span>
                </div>
              </div>
            </div>

            {/* Footer Done Button */}
            <button
              id="tx-inspector-done-btn"
              onClick={() => setSelectedTx(null)}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-md shadow-blue-500/20 cursor-pointer"
            >
              Done &amp; Close Inspector
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
