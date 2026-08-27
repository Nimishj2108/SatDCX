import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Sparkles, 
  Send, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Maximize2, 
  Minimize2, 
  Bot, 
  User, 
  Presentation, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Sparkle, 
  Lock, 
  BookOpen, 
  ArrowRight, 
  CheckCircle2, 
  ThumbsUp, 
  RotateCcw, 
  Cpu,
  Flame,
  Check
} from 'lucide-react';
import { ChatMessage, PresentationData, SlideData } from '../types';

// Pre-defined rich 2-slide presentation databases for the 6 core features
const PRESENTATIONS_DB: Record<string, PresentationData> = {
  firewall: {
    id: 'pres-firewall',
    topicTitle: 'AI Payment Firewall & Scam Interception',
    category: 'PROTECT & DEFENSE',
    slides: [
      {
        slideNumber: 1,
        title: 'Pre-Flight Static & Behavioral Inspection',
        subtitle: 'How SAT DCX blocks malicious Lightning & UPI invoices before mempool broadcast.',
        categoryBadge: '01 · THREAT INTERCEPTION',
        keyPoints: [
          'Pre-flight cryptographic signature audit ensures node reputation is verified.',
          'Address replacement malware & spoofed QR codes are isolated before payment signing.',
          'HTLC timelock buffer check prevents premature pre-disclosure exploits.',
          'Zero satoshis or rupees are broadcast to the network if risk score exceeds 40/100.',
        ],
        diagramSteps: [
          { stepNumber: '1', title: 'Invoice Scanned', description: 'Raw BOLT11 / UPI QR parsed into client enclave' },
          { stepNumber: '2', title: 'Static Node Audit', description: 'Destination node tested against 4 cyber threat feeds', highlight: true },
          { stepNumber: '3', title: 'Pre-Flight Score', description: 'Risk score calculated (0-100 threshold analysis)' },
          { stepNumber: '4', title: 'Clean Execution', description: 'Zero-loss guarantee via local quarantine' },
        ],
        takeaway: 'Your private keys never sign an unverified or poisoned invoice, preventing 100% of phishing losses.',
      },
      {
        slideNumber: 2,
        title: 'Cryptographic Guarantees & Zero-Loss Liability',
        subtitle: 'Comparing traditional web3 wallet risks with SAT DCX Sovereign AI Firewall.',
        categoryBadge: '02 · SOVEREIGN ASSURANCE',
        keyPoints: [
          'Eliminates blind-signing vulnerabilities prevalent in standard custodial and browser extensions.',
          'Automated reversal escrow holds sats in client channel until terminal acknowledgement is cryptographically signed.',
          'Audit trail with full SHA-256 preimages stored locally for zero-knowledge dispute resolution.',
        ],
        statComparison: {
          metric: 'Blind Phishing Exploit Loss',
          satdcxValue: '0.00% (Guaranteed Pre-Flight Quarantine)',
          legacyValue: 'High ($2.4B lost in Web3 blind-signing)',
          insight: 'Pre-flight AI screening catches malicious invoices before cryptographic commitment.',
        },
        takeaway: 'Complete peace of mind when scanning public QRs at retail counters, air-drops, or peer transfers.',
      },
    ],
  },

  upi: {
    id: 'pres-upi',
    topicTitle: 'Non-Custodial Lightning ↔ Indian UPI Merchant Bridge',
    category: 'PAY & SETTLE',
    slides: [
      {
        slideNumber: 1,
        title: 'Sub-Second Atomic Settlement Mechanics',
        subtitle: 'Spend Bitcoin sats at 50M+ Indian UPI Merchant QR codes in 1.4 seconds.',
        categoryBadge: '01 · PAYMENT ROUTING',
        keyPoints: [
          'Scan any standard BharatPe, Paytm, PhonePe, or GooglePay QR code across India.',
          'Atomic Lightning HTLC off-ramp routes through non-custodial liquidity nodes.',
          'The merchant receives exact INR in their Indian bank account with 0 merchant discount fees.',
          'You retain pure self-custody until the exact moment of payment confirmation.',
        ],
        diagramSteps: [
          { stepNumber: '1', title: 'Scan Merchant QR', description: 'Read standard UPI VPA (e.g. merchant@icici)' },
          { stepNumber: '2', title: 'Real-Time FX Quote', description: 'Live sats-to-INR conversion rate with 0 auto-sell spread', highlight: true },
          { stepNumber: '3', title: 'Lightning Preimage', description: 'Sub-second payment routed through private channel' },
          { stepNumber: '4', title: 'Instant INR Settle', description: 'Merchant terminal rings instant payment soundbox' },
        ],
        takeaway: 'Bridges Bitcoin into Indian retail commerce without needing central exchanges or bank lock-ins.',
      },
      {
        slideNumber: 2,
        title: 'Zero Forced Liquidation & Non-Custodial Edge',
        subtitle: 'Why SAT DCX preserves your sovereign Bitcoin stack.',
        categoryBadge: '02 · FINTECH COMPARISON',
        keyPoints: [
          'No KYC custodian holds your reserve balance; sats stay in your own SegWit / Lightning keys.',
          'Zero forced auto-sell fees or 1% TDS exchange friction on self-custodial transactions.',
          'Instant proof-of-payment receipts generated with cryptographic hash preimages.',
        ],
        statComparison: {
          metric: 'Average Retail Settlement Latency',
          satdcxValue: '1.4 seconds (Instant Soundbox Receipt)',
          legacyValue: '10-60 mins (Custodial on-chain or slow withdraw)',
          insight: 'Direct Lightning-to-UPI liquidity bridges provide true cash-like speed for Bitcoin.',
        },
        takeaway: 'Live sovereign Bitcoin in your daily routine: buy coffee, groceries, and electronics with sats.',
      },
    ],
  },

  dustguard: {
    id: 'pres-dustguard',
    topicTitle: 'UTXO DustGuard & Mempool Gas Optimizer',
    category: 'OPTIMIZE & SAVE',
    slides: [
      {
        slideNumber: 1,
        title: 'Solving The Un-Economical Dust Dilemma',
        subtitle: 'How fragmented Bitcoin micro-outputs drain your wealth in high-fee environments.',
        categoryBadge: '01 · UTXO MANAGEMENT',
        keyPoints: [
          'Small UTXOs (<10,000 sats) cost more in mining fees to spend than their value when gas spikes.',
          'SAT DCX DustGuard automatically detects and quarantines toxic micro-dust outputs.',
          'Prevents accidental wallet poisoning attacks where attackers link your addresses.',
          'Continuously calculates break-even spendability based on live Bitcoin Core mempool depth.',
        ],
        diagramSteps: [
          { stepNumber: '1', title: 'Mempool Telemetry', description: 'Live tracking of next-block priority fee rates' },
          { stepNumber: '2', title: 'Dust Classification', description: 'UTXOs classified: Spendable, Tiny, Un-economical', highlight: true },
          { stepNumber: '3', title: 'Low-Fee Alert', description: 'Notification triggered when gas drops <15 sat/vB' },
          { stepNumber: '4', title: 'Batch Output', description: '1-click consolidation merges fragments into 1 Taproot UTXO' },
        ],
        takeaway: 'Never waste hard-earned satoshis on excessive miners fees during network congestion peaks.',
      },
      {
        slideNumber: 2,
        title: 'Batch Consolidation Savings: Up to 85% Fee Reduction',
        subtitle: 'Strategic execution during overnight low-gas windows.',
        categoryBadge: '02 · FEE OPTIMIZATION',
        keyPoints: [
          'Consolidating 10 UTXOs at 9 sat/vB costs ~₹180 vs ~₹2,400 during daytime 80 sat/vB spikes.',
          'Reduces future transaction virtual byte (vB) weight forever.',
          'Maintains zero address linkability via coin-control privacy rules.',
        ],
        statComparison: {
          metric: 'Lifetime Transaction Fee Savings',
          satdcxValue: 'Up to 85% saved via automated batching',
          legacyValue: 'Standard wallets blindly spend high-fee UTXOs',
          insight: 'Batching 8 fragmented UTXOs into 1 output saves thousands of satoshis in lifetime fees.',
        },
        takeaway: 'Turn unspendable micro-dust into clean, high-velocity sovereign purchasing power.',
      },
    ],
  },

  dca: {
    id: 'pres-dca',
    topicTitle: 'Smart Savings Vault & DCA Volatility Engine',
    category: 'SAVE & WEALTH',
    slides: [
      {
        slideNumber: 1,
        title: 'Goal-Based Dollar Cost Averaging (DCA)',
        subtitle: 'Build long-term generational Bitcoin reserves without market timing stress.',
        categoryBadge: '01 · WEALTH ACCUMULATION',
        keyPoints: [
          'Set automated recurring stacking goals (e.g. ₹500/day for Retirement or House Downpayment).',
          'Sats are routed directly into your cold 2-of-3 multisig vault or Native SegWit keys.',
          'Eliminates the psychological anxiety of buying tops or waiting for dips.',
          'Zero custodial counterparty risk—your stack cannot be frozen or lent out.',
        ],
        diagramSteps: [
          { stepNumber: '1', title: 'Define Goal', description: 'Set INR target, timeframe, and risk profile' },
          { stepNumber: '2', title: 'Auto-Allocation', description: 'Automated daily/weekly non-custodial swaps', highlight: true },
          { stepNumber: '3', title: 'Stress Testing', description: 'Live Monte Carlo simulations on market drawdowns' },
          { stepNumber: '4', title: 'Cold Settlement', description: 'Direct key delivery with 0 margin exposure' },
        ],
        takeaway: 'Disciplined, automated accumulation is statistically proven to outperform active trading.',
      },
      {
        slideNumber: 2,
        title: 'Drawdown Resilience: Zero Margin Liquidations',
        subtitle: 'Protecting your wealth during 30% to 50% crypto market pullbacks.',
        categoryBadge: '02 · RISK MODELING',
        keyPoints: [
          'Centralized yield platforms lend out your coins and get liquidated in crashes.',
          'SAT DCX Smart Vault holds 100% unleveraged spot Bitcoin in self-custody.',
          'Live drawdown stress tester shows your recovery timeline across historical 4-year halving cycles.',
        ],
        statComparison: {
          metric: 'Forced Liquidation Risk',
          satdcxValue: '0.00% (Pure Spot Non-Custodial Ownership)',
          legacyValue: 'High on centralized yield / margin lending apps',
          insight: 'You own 100% of the private keys, making forced liquidation mathematically impossible.',
        },
        takeaway: 'Stack sats with confidence knowing your wealth is mathematically protected forever.',
      },
    ],
  },

  handle: {
    id: 'pres-handle',
    topicTitle: 'Universal Sovereign Handles (@handle)',
    category: 'CONNECT & IDENTITY',
    slides: [
      {
        slideNumber: 1,
        title: 'One Human Name for All Rails',
        subtitle: 'Replacing confusing 64-character public keys and ephemeral payment invoices.',
        categoryBadge: '01 · UNIVERSAL IDENTITY',
        keyPoints: [
          'Claim your sovereign handle like @yourname.sat once for lifetime non-custodial use.',
          'Automatically routes to Lightning BOLT11, LNURL-pay, On-chain Taproot, and UPI VPAs.',
          'Compatible with international senders and domestic Indian merchants alike.',
          'Private keys remain exclusively on your device; handles resolve via decentralized cryptography.',
        ],
        diagramSteps: [
          { stepNumber: '1', title: 'Share @handle', description: 'Simple handle shared with counterparty' },
          { stepNumber: '2', title: 'Smart Resolution', description: 'Client detects sender protocol (LN / UPI / Onchain)', highlight: true },
          { stepNumber: '3', title: 'Dynamic Routing', description: 'Directs funds to optimal low-fee channel' },
          { stepNumber: '4', title: 'Instant Receipt', description: 'Wallet updates in real-time with proof of receipt' },
        ],
        takeaway: 'Makes paying with Bitcoin as natural and simple as sending an email or UPI ping.',
      },
      {
        slideNumber: 2,
        title: 'Interoperable Everywhere across Global Lightning',
        subtitle: 'Works seamlessly with standard open-source Lightning Network wallets.',
        categoryBadge: '02 · INTEROPERABILITY',
        keyPoints: [
          'Fully compliant with LNURL-pay (LUD-06), Lightning Address (LUD-16), and BIP-353 DNS resolution.',
          'Send from Phoenix, Zeus, CashApp, Strike, or Blink directly to your SAT DCX handle.',
          'Zero platform lock-in; handles can be exported and migrated anytime.',
        ],
        statComparison: {
          metric: 'Invoice Input Complexity',
          satdcxValue: '12 characters (@nimish.sat)',
          legacyValue: '150+ chars (lnbc10u1p3... string mess)',
          insight: 'Human-readable handles eliminate fat-finger transfer errors and invoice expirations.',
        },
        takeaway: 'The universal identity layer that bridges India to global borderless Bitcoin commerce.',
      },
    ],
  },

  multisig: {
    id: 'pres-multisig',
    topicTitle: '2-of-3 Non-Custodial Multisig Threshold Vault',
    category: 'PROTECT & RECOVERY',
    slides: [
      {
        slideNumber: 1,
        title: 'Eliminating Single Points of Failure',
        subtitle: 'Enterprise-grade threshold cryptography made accessible for personal sovereign wealth.',
        categoryBadge: '01 · THRESHOLD SECURITY',
        keyPoints: [
          'Requires 2 out of 3 distinct cryptographic signatures to authorize any vault withdrawal.',
          'Key 1: Mobile Secure Enclave (biometrically locked on your phone).',
          'Key 2: Hardware Cold Storage (Ledger, Trezor, Coldcard, or SeedSigner).',
          'Key 3: Encrypted Social / Timelocked Shard (for disaster emergency recovery).',
        ],
        diagramSteps: [
          { stepNumber: '1', title: 'Spend Request', description: 'User initiates vault transfer in SAT DCX app' },
          { stepNumber: '2', title: 'Key 1 Signed', description: 'Biometric FaceID signs first shard', highlight: true },
          { stepNumber: '3', title: 'Key 2 Signed', description: 'Air-gapped hardware wallet signs second shard' },
          { stepNumber: '4', title: 'Broadcast', description: '2-of-3 quorum met and SegWit transaction broadcasts' },
        ],
        takeaway: 'Losing your phone or having a single key compromised does NOT risk your Bitcoin.',
      },
      {
        slideNumber: 2,
        title: 'Inheritance Planning & Physical Coercion Defense',
        subtitle: 'How timelocked threshold vaults safeguard generational wealth.',
        categoryBadge: '02 · GENERATIONAL SOVEREIGNTY',
        keyPoints: [
          'Physical $5 wrench attacks are nullified because high-value spends require the offline key.',
          'Optional timelock delay gives you 24 hours to cancel any unauthorized withdrawal request.',
          'Inheritance key recovery paths ensure family members can access funds without exchange probate.',
        ],
        statComparison: {
          metric: 'Single Key Compromise Vulnerability',
          satdcxValue: '0% Risk (Requires 2 independent signers)',
          legacyValue: '100% Loss on single seed phrase leak',
          insight: 'Threshold signatures distribute risk across independent cryptographic hardware.',
        },
        takeaway: 'The gold standard of long-term Bitcoin custody, now in an intuitive mobile interface.',
      },
    ],
  },
};

// 6 Short 2-Word Suggestion Chips as explicitly requested
const SUGGESTION_CHIPS = [
  {
    chipLabel: 'AI Firewall',
    icon: ShieldCheck,
    color: 'emerald',
    topicKey: 'firewall',
    fullPrompt: 'How does the AI Payment Firewall intercept spoofed invoices and pre-flight scam risks?',
  },
  {
    chipLabel: 'UPI Bridge',
    icon: Zap,
    color: 'orange',
    topicKey: 'upi',
    fullPrompt: 'How does the instant non-custodial Lightning to Indian UPI Merchant QR settlement work?',
  },
  {
    chipLabel: 'UTXO DustGuard',
    icon: Layers,
    color: 'blue',
    topicKey: 'dustguard',
    fullPrompt: 'How does UTXO DustGuard optimize mempool gas and batch consolidate micro-utxos?',
  },
  {
    chipLabel: 'DCA Vault',
    icon: Sparkles,
    color: 'indigo',
    topicKey: 'dca',
    fullPrompt: 'How do automated Bitcoin savings goals work without forced liquidations?',
  },
  {
    chipLabel: 'Universal Handle',
    icon: BookOpen,
    color: 'rose',
    topicKey: 'handle',
    fullPrompt: 'What is a Universal Handle (@handle) and how does it route between Lightning and UPI?',
  },
  {
    chipLabel: 'Multisig Security',
    icon: Lock,
    color: 'cyan',
    topicKey: 'multisig',
    fullPrompt: 'How does the 2-of-3 non-custodial multisig threshold vault protect my Bitcoin?',
  },
];

// 5 Understood Emojis (Scale 1 to 5) as explicitly requested
const FEEDBACK_EMOJIS = [
  { score: 1, emoji: '😞', label: 'Disappointed / Hard to grasp', short: 'Confused' },
  { score: 2, emoji: '😐', label: 'Fair enough', short: 'Fair' },
  { score: 3, emoji: '👌', label: 'Okay / Understood', short: 'Okay' },
  { score: 4, emoji: '😊', label: 'Happy & Clear', short: 'Clear' },
  { score: 5, emoji: '🤩', label: 'Excellent / Mastered', short: 'Excellent' },
];

export const GeminiChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-01',
      sender: 'assistant',
      text: 'How can I help you today? Ask me anything about Bitcoin, Lightning payments, instant Indian UPI settlement, UTXO DustGuard, or multisig vault defense.',
      timestamp: 'Just now',
      topic: 'welcome',
      hasPresentation: false,
    },
  ]);

  // Full Screen Presentation Modal State
  const [activePresentation, setActivePresentation] = useState<PresentationData | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [selectedEmojiFeedback, setSelectedEmojiFeedback] = useState<number | null>(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Keyboard navigation for presentation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activePresentation) return;
      if (e.key === 'Escape') {
        closePresentation();
      } else if (e.key === 'ArrowRight' || e.key === ' ') {
        if (currentSlideIndex < activePresentation.slides.length - 1) {
          setCurrentSlideIndex((prev) => prev + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentSlideIndex > 0) {
          setCurrentSlideIndex((prev) => prev - 1);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePresentation, currentSlideIndex]);

  const handleSendMessage = async (userText: string, topicKey?: string) => {
    if (!userText.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    // Determine topic & presentation metadata
    const lower = userText.toLowerCase();
    let matchedTopic = topicKey;
    if (!matchedTopic) {
      if (lower.includes('firewall') || lower.includes('scam') || lower.includes('threat')) matchedTopic = 'firewall';
      else if (lower.includes('upi') || lower.includes('bridge') || lower.includes('merchant')) matchedTopic = 'upi';
      else if (lower.includes('dust') || lower.includes('utxo') || lower.includes('gas')) matchedTopic = 'dustguard';
      else if (lower.includes('dca') || lower.includes('save') || lower.includes('vault') || lower.includes('goal')) matchedTopic = 'dca';
      else if (lower.includes('handle') || lower.includes('universal') || lower.includes('@')) matchedTopic = 'handle';
      else if (lower.includes('multisig') || lower.includes('custody') || lower.includes('key')) matchedTopic = 'multisig';
    }

    const presentationData = matchedTopic && PRESENTATIONS_DB[matchedTopic] ? PRESENTATIONS_DB[matchedTopic] : PRESENTATIONS_DB['upi'];

    try {
      // Call server endpoint with Gemini 3.7 Flash
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, topic: matchedTopic }),
      });

      const data = await res.json();
      const botText = data.text || 'Here is the detailed analysis from SAT DCX AI Copilot.';

      const botMsg: ChatMessage = {
        id: `msg-${Date.now()}-bot`,
        sender: 'assistant',
        text: botText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        topic: matchedTopic,
        hasPresentation: true,
        presentationData: presentationData,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      // Fallback
      const botMsg: ChatMessage = {
        id: `msg-${Date.now()}-bot`,
        sender: 'assistant',
        text: `### ⚡ SAT DCX AI Intelligence\nHere is a comprehensive breakdown of ${userText}.\n\nSAT DCX powers self-custodial Bitcoin and Lightning finance with zero forced liquidations and sub-second settlement. Click the interactive presentation button below to explore visual slides!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        topic: matchedTopic,
        hasPresentation: true,
        presentationData: presentationData,
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChipClick = (chip: typeof SUGGESTION_CHIPS[0]) => {
    handleSendMessage(chip.fullPrompt, chip.topicKey);
  };

  const openPresentation = (pres: PresentationData) => {
    setActivePresentation(pres);
    setCurrentSlideIndex(0);
    setSelectedEmojiFeedback(null);
    setFeedbackSubmitted(false);
  };

  const closePresentation = () => {
    setActivePresentation(null);
    setCurrentSlideIndex(0);
    setSelectedEmojiFeedback(null);
    setFeedbackSubmitted(false);
  };

  const handleEmojiSelect = (score: number) => {
    setSelectedEmojiFeedback(score);
    setFeedbackSubmitted(true);
  };

  return (
    <>
      {/* 1. FLOATING CHAT TRIGGER BUTTON (Right Bottom of Screen) */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        {!isOpen && (
          <div 
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/95 text-slate-800 border border-slate-200 shadow-xl text-xs font-semibold backdrop-blur-md cursor-pointer hover:border-blue-400 hover:shadow-2xl transition-all animate-in fade-in slide-in-from-bottom-2 group"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Ask SAT DCX AI</span>
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              Gemini
            </span>
          </div>
        )}

        <button
          id="floating-gemini-chat-btn"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-2xl transition-all duration-200 cursor-pointer ${
            isOpen 
              ? 'bg-slate-900 hover:bg-slate-800 rotate-90 scale-95' 
              : 'bg-gradient-to-tr from-blue-600 via-indigo-600 to-orange-500 hover:scale-105 hover:shadow-blue-500/30'
          }`}
          title={isOpen ? 'Close Chat' : 'Open Gemini FinTech Copilot'}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <div className="relative">
              <Sparkles className="w-6 h-6 text-white" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-orange-400 ring-2 ring-white animate-pulse" />
            </div>
          )}
        </button>
      </div>

      {/* 2. CHATBOT SLIDE-OUT DRAWER / PANEL (Right Side of Screen) */}
      {isOpen && (
        <div
          id="gemini-chatbot-drawer"
          className={`fixed bottom-24 right-4 sm:right-6 z-40 bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden transition-all duration-200 animate-in fade-in slide-in-from-bottom-4 ${
            isExpanded
              ? 'w-[95vw] sm:w-[600px] h-[85vh] max-h-[800px]'
              : 'w-[95vw] sm:w-[420px] h-[640px] max-h-[85vh]'
          }`}
        >
          {/* Header */}
          <div className="bg-[#0b1e48] text-white p-4 flex items-center justify-between border-b border-blue-900 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-orange-500 flex items-center justify-center shadow-xs">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold font-mono flex items-center gap-1.5">
                  <span>SAT DCX AI COPILOT</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Gemini 3.7 Flash
                  </span>
                </div>
                <div className="text-[10px] text-slate-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Sovereign FinTech &amp; Lightning Specialist</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                title={isExpanded ? 'Minimize width' : 'Expand width'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div className={`space-y-2 max-w-[85%] ${isUser ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                        isUser
                          ? 'bg-blue-600 text-white font-medium rounded-tr-xs shadow-md shadow-blue-500/10'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs shadow-xs'
                      }`}
                    >
                      {/* Formatted Content */}
                      <div className="space-y-2">
                        {msg.text.split('\n\n').map((paragraph, idx) => {
                          if (paragraph.startsWith('### ')) {
                            return (
                              <h4 key={idx} className="font-bold text-slate-900 text-xs mt-1">
                                {paragraph.replace('### ', '')}
                              </h4>
                            );
                          }
                          return (
                            <p key={idx} className="text-xs">
                              {paragraph}
                            </p>
                          );
                        })}
                      </div>

                      <div
                        className={`text-[9px] font-mono mt-2 flex items-center justify-end gap-1 ${
                          isUser ? 'text-blue-200' : 'text-slate-400'
                        }`}
                      >
                        <span>{msg.timestamp}</span>
                      </div>
                    </div>

                    {/* Interactive 2-Slide Presentation Trigger Button for AI Responses */}
                    {!isUser && msg.hasPresentation && msg.presentationData && (
                      <div className="pt-1">
                        <button
                          id={`view-presentation-btn-${msg.id}`}
                          onClick={() => openPresentation(msg.presentationData!)}
                          className="px-3 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md shadow-orange-500/20 hover:scale-[1.02] transition-all cursor-pointer"
                        >
                          <Presentation className="w-4 h-4 text-slate-950" />
                          <span>View presentation for this response</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {isUser && (
                    <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex gap-2.5 items-center text-xs text-slate-500 italic">
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 animate-pulse">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3 bg-white rounded-2xl border border-slate-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] font-mono text-slate-600 font-medium ml-1">
                    Gemini AI analyzing cryptographic routes...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* 3. Small 2-Word Suggestion Chips / FAQ Shortcuts */}
          <div className="p-3 bg-white border-t border-slate-200 shrink-0 space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 px-1">
              <span className="flex items-center gap-1 font-bold text-slate-600 uppercase">
                <Flame className="w-3 h-3 text-orange-500" />
                QUICK 2-WORD FEATURE TOPICS:
              </span>
              <span>Click to ask AI</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {SUGGESTION_CHIPS.map((chip, idx) => {
                const Icon = chip.icon;
                return (
                  <button
                    key={idx}
                    id={`chat-chip-${chip.topicKey}`}
                    onClick={() => handleChipClick(chip)}
                    className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 border border-slate-200 text-[11px] font-bold text-slate-700 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                  >
                    <Icon className="w-3.5 h-3.5 text-blue-600" />
                    <span>{chip.chipLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Message Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputMessage);
            }}
            className="p-3 bg-white border-t border-slate-100 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              id="gemini-chat-input"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask anything about SAT DCX..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
            <button
              type="submit"
              id="gemini-chat-send-btn"
              disabled={!inputMessage.trim() || isLoading}
              className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-bold transition-all shadow-md shadow-blue-500/20 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* 4. FULL-SCREEN INTERACTIVE 2-SLIDE PRESENTATION MODAL */}
      {activePresentation && (
        <div className="fixed inset-0 z-50 bg-slate-950/98 text-white flex flex-col justify-between p-4 sm:p-8 md:p-12 overflow-y-auto animate-in fade-in duration-200">
          {/* Top Control Bar with Close 'X' button to eliminate presentation */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-orange-500 flex items-center justify-center text-white shadow-lg">
                <Presentation className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    {activePresentation.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Slide {currentSlideIndex + 1} of {activePresentation.slides.length}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold font-mono text-white mt-0.5">
                  {activePresentation.topicTitle}
                </h2>
              </div>
            </div>

            {/* Close 'X' Button at Top */}
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-block text-xs font-mono text-slate-400">
                Press [ESC] or click
              </span>
              <button
                id="close-fullscreen-presentation-btn"
                onClick={closePresentation}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-rose-600 text-white font-bold text-xs flex items-center gap-1.5 transition-all border border-white/10 cursor-pointer"
                title="Eliminate / Close Presentation"
              >
                <X className="w-4 h-4" />
                <span>Close Fullscreen</span>
              </button>
            </div>
          </div>

          {/* Slide Content Body (Active Slide 1 or 2) */}
          <div className="my-auto py-8 max-w-5xl mx-auto w-full space-y-8">
            {(() => {
              const slide = activePresentation.slides[currentSlideIndex];
              return (
                <div key={slide.slideNumber} className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                  {/* Slide Title & Subtitle */}
                  <div className="space-y-2 text-center sm:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-bold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{slide.categoryBadge}</span>
                    </div>
                    <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                      {slide.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
                      {slide.subtitle}
                    </p>
                  </div>

                  {/* Visual Diagram Steps / Comparison Grid */}
                  {slide.diagramSteps && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {slide.diagramSteps.map((step, idx) => (
                        <div
                          key={idx}
                          className={`p-5 rounded-2xl border transition-all ${
                            step.highlight
                              ? 'bg-gradient-to-b from-blue-900/60 to-slate-900/80 border-blue-500 text-white shadow-xl shadow-blue-500/10'
                              : 'bg-slate-900/60 border-white/10 text-slate-300'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center font-mono font-bold text-sm mb-3 text-orange-400">
                            0{step.stepNumber}
                          </div>
                          <h4 className="text-sm font-bold text-white mb-1">{step.title}</h4>
                          <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {slide.statComparison && (
                    <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950/60 to-slate-900 border border-blue-500/30 space-y-4">
                      <div className="text-xs font-mono text-slate-400 uppercase">
                        Comparative Benchmark: {slide.statComparison.metric}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-1">
                          <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase">
                            SAT DCX SUPERLAYER
                          </span>
                          <div className="text-lg font-bold font-mono text-emerald-300">
                            {slide.statComparison.satdcxValue || slide.statComparison.satconnectValue}
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/30 space-y-1">
                          <span className="text-[11px] font-mono text-rose-400 font-bold uppercase">
                            LEGACY CUSTODIAL EXCHANGES
                          </span>
                          <div className="text-lg font-bold font-mono text-rose-300">
                            {slide.statComparison.legacyValue}
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-slate-300 italic">
                        💡 {slide.statComparison.insight}
                      </p>
                    </div>
                  )}

                  {/* Key Takeaways Bullet List */}
                  <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3">
                    <div className="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                      KEY ARCHITECTURAL HIGHLIGHTS:
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {slide.keyPoints.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Slide Takeaway Summary */}
                  <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 flex items-center gap-3">
                    <Sparkle className="w-4 h-4 text-blue-400 shrink-0" />
                    <span><strong>Core Takeaway:</strong> {slide.takeaway}</span>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Bottom Bar: Slide Controls & 5-Emoji Understood Feedback Scale */}
          <div className="pt-6 border-t border-white/10 space-y-6 shrink-0">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Slide Navigation Buttons */}
              <div className="flex items-center gap-2">
                <button
                  id="pres-prev-slide-btn"
                  disabled={currentSlideIndex === 0}
                  onClick={() => setCurrentSlideIndex((prev) => prev - 1)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Slide</span>
                </button>

                <div className="flex gap-1.5 px-3">
                  {activePresentation.slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlideIndex(idx)}
                      className={`h-2.5 rounded-full transition-all ${
                        currentSlideIndex === idx
                          ? 'w-8 bg-orange-500'
                          : 'w-2.5 bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>

                <button
                  id="pres-next-slide-btn"
                  disabled={currentSlideIndex === activePresentation.slides.length - 1}
                  onClick={() => setCurrentSlideIndex((prev) => prev + 1)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Next Slide</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* 5 EMOJIS UNDERSTOOD FEEDBACK SCALE (Scale from 1 to 5) */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <span className="text-xs font-mono text-slate-300 font-semibold">
                  How well did you understand this?
                </span>

                <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-white/10">
                  {FEEDBACK_EMOJIS.map((item) => (
                    <button
                      key={item.score}
                      id={`feedback-emoji-${item.score}`}
                      onClick={() => handleEmojiSelect(item.score)}
                      className={`p-2 rounded-xl text-lg sm:text-xl transition-all cursor-pointer ${
                        selectedEmojiFeedback === item.score
                          ? 'bg-orange-500 scale-125 shadow-lg shadow-orange-500/30'
                          : 'hover:bg-white/10 hover:scale-110'
                      }`}
                      title={`${item.score}/5: ${item.label}`}
                    >
                      <span>{item.emoji}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Feedback Confirmation Message as requested */}
            {feedbackSubmitted && (
              <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-500 text-center animate-in zoom-in-95 duration-200">
                <p className="text-xs font-mono text-emerald-300 font-bold flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>The AI has been trained further to explain it better next time.</span>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
