import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  QrCode, 
  ArrowDown, 
  ArrowUp, 
  Check, 
  Copy, 
  Share2, 
  Shield, 
  Lock, 
  Cloud, 
  Info, 
  ChevronRight, 
  ChevronDown, 
  Sparkles, 
  Smartphone, 
  RefreshCw, 
  Volume2, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  Shuffle, 
  ExternalLink,
  Zap,
  Tag,
  Edit3,
  MoreHorizontal
} from 'lucide-react';
import { UserProfile } from '../types';
import { useLiveRates } from '../services/livePriceService';

interface BitcoinWalletUIModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  initialView?: 'transact' | 'received' | 'deposit' | 'security' | 'cloud_backup' | 'pin_entry';
  onPaymentComplete?: (amountSats: number, amountInr: number, recipient: string) => void;
}

export const BitcoinWalletUIModal: React.FC<BitcoinWalletUIModalProps> = ({
  isOpen,
  onClose,
  user,
  initialView = 'transact',
  onPaymentComplete,
}) => {
  const liveRates = useLiveRates();
  // Navigation within the Bitcoin UI Kit prototype
  const [activeTab, setActiveTab] = useState<'transact' | 'activity' | 'settings'>('transact');
  const [currentScreen, setCurrentScreen] = useState<
    | 'transact_keypad'
    | 'receive_options'
    | 'deposit_qr'
    | 'transaction_success'
    | 'swap_fee_drawer'
    | 'security_backup_checklist'
    | 'cloud_backup_select'
    | 'pin_keypad'
  >('transact_keypad');

  // Keypad & Amount State
  const [enteredSatsStr, setEnteredSatsStr] = useState<string>('0');
  const marketBtcInr = liveRates.btcInr || 7668119.70;
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [depositAddress, setDepositAddress] = useState('bc1q8x9y7z2k4p8m0n2q9w3e5r7t9y1u3i5o7p9a');
  
  // Transaction Receipt State
  const [receiptTx, setReceiptTx] = useState({
    amountSats: 10000000,
    amountInr: 839240,
    sender: 'bc1q gx9g ... sfsy',
    recipientName: 'Third Wave Coffee / BharatPe',
    networkFeeSats: 7,
    swapFeeSats: 2000,
    note: '',
    tags: ['Coffee', 'Travel', 'Lightning'],
    txId: '9f83ac4819d45e02ba981726a19f804c8e7629b31d04481b89ef726a4198be71',
  });

  const [showSwapFeeDrawer, setShowSwapFeeDrawer] = useState(false);
  const [showDetailsAccordion, setShowDetailsAccordion] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('Coffee');

  // Security Toggles State (From Screenshots 1, 2, 4)
  const [cloudBackupEnabled, setCloudBackupEnabled] = useState(false);
  const [pinEnabled, setPinEnabled] = useState(true);
  const [faceIdEnabled, setFaceIdEnabled] = useState(false);

  // "Two Things You Must Understand" Checklist (From Screenshot 4)
  const [understandBankRule, setUnderstandBankRule] = useState(false);
  const [understandRecoveryRule, setUnderstandRecoveryRule] = useState(false);

  // 4-Digit PIN State (From Screenshots 2, 6)
  const [enteredPin, setEnteredPin] = useState<string>('');
  const [isScrambledKeypad, setIsScrambledKeypad] = useState<boolean>(false);
  const [scrambledNumbers, setScrambledNumbers] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
  const [pinSuccessMsg, setPinSuccessMsg] = useState<string>('');

  // Soundbox audio chime
  const [soundboxAudio, setSoundboxAudio] = useState(false);

  useEffect(() => {
    if (initialView === 'received') {
      setCurrentScreen('transaction_success');
    } else if (initialView === 'deposit') {
      setCurrentScreen('deposit_qr');
    } else if (initialView === 'security') {
      setCurrentScreen('security_backup_checklist');
    } else if (initialView === 'cloud_backup') {
      setCurrentScreen('cloud_backup_select');
    } else if (initialView === 'pin_entry') {
      setCurrentScreen('pin_keypad');
    } else {
      setCurrentScreen('transact_keypad');
    }
  }, [initialView, isOpen]);

  // Scramble keypad numbers if enabled
  const shuffleKeypad = () => {
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setScrambledNumbers(arr);
  };

  const toggleScramble = () => {
    if (!isScrambledKeypad) {
      shuffleKeypad();
      setIsScrambledKeypad(true);
    } else {
      setIsScrambledKeypad(false);
      setScrambledNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
    }
  };

  // Handle Keypad Clicks
  const handleKeypadPress = (val: string) => {
    if (val === 'backspace') {
      if (enteredSatsStr.length <= 1) {
        setEnteredSatsStr('0');
      } else {
        setEnteredSatsStr(enteredSatsStr.slice(0, -1));
      }
    } else {
      if (enteredSatsStr === '0') {
        setEnteredSatsStr(val);
      } else {
        if (enteredSatsStr.length < 9) {
          setEnteredSatsStr(enteredSatsStr + val);
        }
      }
    }
  };

  // Handle PIN Keypad Press
  const handlePinPress = (digit: number) => {
    if (enteredPin.length < 4) {
      const newPin = enteredPin + digit.toString();
      setEnteredPin(newPin);
      if (newPin.length === 4) {
        // Auto-verify PIN
        setTimeout(() => {
          setPinSuccessMsg('✓ PIN Verified with Hardware Security Enclave');
          setTimeout(() => {
            setPinSuccessMsg('');
            setCurrentScreen('transact_keypad');
          }, 900);
        }, 300);
      }
    }
  };

  const handlePinBackspace = () => {
    if (enteredPin.length > 0) {
      setEnteredPin(enteredPin.slice(0, -1));
    }
  };

  // Calculations
  const numericSats = parseInt(enteredSatsStr || '0', 10);
  const fiatInr = ((numericSats / 100000000) * marketBtcInr).toFixed(2);
  const fiatEur = ((numericSats / 100000000) * 88500).toFixed(2); // approximate EUR rate

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(depositAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleTriggerPay = () => {
    if (numericSats <= 0) {
      setEnteredSatsStr('5000');
    }
    const finalSats = numericSats > 0 ? numericSats : 5000;
    const finalInr = Math.round((finalSats / 100000000) * marketBtcInr);

    setReceiptTx({
      amountSats: finalSats,
      amountInr: finalInr,
      sender: user.handle,
      recipientName: 'Sharma General Store (UPI QR)',
      networkFeeSats: 7,
      swapFeeSats: 2000,
      note: noteText || 'Merchant settlement via Lightning Network',
      tags: [selectedTag],
      txId: '3b89ef147c20a89467b9319e05f61d289456ab317c093a89012f45904ca9812e',
    });

    // Play Soundbox Chime
    setSoundboxAudio(true);
    setTimeout(() => setSoundboxAudio(false), 3000);

    if (onPaymentComplete) {
      onPaymentComplete(finalSats, finalInr, 'Sharma General Store');
    }

    setCurrentScreen('transaction_success');
  };

  const handleTriggerRequest = () => {
    setCurrentScreen('deposit_qr');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      {/* Soundbox Notification simulation */}
      {soundboxAudio && (
        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-6 z-50 bg-[#0b1e48] border-2 border-orange-500 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 font-mono text-xs"
        >
          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold animate-pulse">
            <Volume2 className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-orange-400">PAYMENT SOUNDBOX CHIME</div>
            <div className="text-slate-200">"Dosra Wallet: ₹{fiatInr} Received via Lightning!"</div>
          </div>
        </motion.div>
      )}

      {/* Main Container - Minimal Clean iPhone / Card Prototype matching Figma Screenshot */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bg-white w-full max-w-[410px] rounded-[36px] shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col relative text-slate-900 min-h-[640px] max-h-[90vh]"
      >
        {/* TOP STATUS BAR & HEADER */}
        <div className="px-6 pt-5 pb-3 flex items-center justify-between border-b border-slate-100/80 bg-white sticky top-0 z-20">
          <div className="flex items-center gap-2.5">
            {/* Minimal User Avatar as in Figma UI */}
            <button 
              onClick={() => setCurrentScreen('security_backup_checklist')}
              title="Security & Backup Settings"
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold transition-all cursor-pointer"
            >
              <Shield className="w-4 h-4 text-slate-600" />
            </button>
            
            {/* Status notification pill as in Figma Screenshot 1 */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-[11px] font-medium text-slate-700">
              <ArrowDown className="w-3 h-3 text-[#F7931A]" />
              <span className="font-mono">Receiving 10,000,000 sats</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Quick QR button */}
            <button 
              onClick={() => setCurrentScreen('deposit_qr')}
              title="Deposit QR"
              className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-all cursor-pointer"
            >
              <QrCode className="w-4 h-4" />
            </button>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* DYNAMIC SCREEN VIEWS MATCHING FIGMA SYSTEM */}
        {/* ======================================================== */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col justify-between">
          <AnimatePresence mode="wait">
            
            {/* ---------------------------------------------------- */}
            {/* 1. TRANSACT KEYPAD SCREEN (Figma Screenshots 1 & 4) */}
            {/* ---------------------------------------------------- */}
            {currentScreen === 'transact_keypad' && (
              <motion.div 
                key="transact_keypad"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex-1 flex flex-col justify-between space-y-4"
              >
                {/* Center Amount Display */}
                <div className="text-center py-6 space-y-1">
                  <div className="text-4xl font-extrabold tracking-tight font-mono text-slate-900 flex items-center justify-center gap-1">
                    <span>{numericSats.toLocaleString()}</span>
                    <span className="text-2xl font-semibold text-slate-400">sats</span>
                  </div>
                  <div className="text-sm font-mono text-slate-500 font-medium flex items-center justify-center gap-2">
                    <span>₹{Number(fiatInr).toLocaleString('en-IN')} INR</span>
                    <span className="text-slate-300">•</span>
                    <span>€{fiatEur}</span>
                  </div>
                </div>

                {/* Clean Numeric Keypad (Figma UI Kit Style) */}
                <div className="grid grid-cols-3 gap-y-3 gap-x-6 px-4 py-2 font-mono text-2xl text-slate-800">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleKeypadPress(num)}
                      className="h-12 rounded-2xl flex items-center justify-center hover:bg-slate-100 active:bg-slate-200 transition-colors font-medium cursor-pointer select-none"
                    >
                      {num}
                    </button>
                  ))}
                  <div className="h-12 flex items-center justify-center"></div>
                  <button
                    onClick={() => handleKeypadPress('0')}
                    className="h-12 rounded-2xl flex items-center justify-center hover:bg-slate-100 active:bg-slate-200 transition-colors font-medium cursor-pointer select-none"
                  >
                    0
                  </button>
                  <button
                    onClick={() => handleKeypadPress('backspace')}
                    className="h-12 rounded-2xl flex items-center justify-center hover:bg-slate-100 active:bg-slate-200 text-slate-500 transition-colors cursor-pointer select-none"
                  >
                    ⌫
                  </button>
                </div>

                {/* Primary Action Buttons (Request / QR / Pay) */}
                <div className="grid grid-cols-12 gap-2 pt-2">
                  <button
                    id="figma-btn-request"
                    onClick={handleTriggerRequest}
                    className="col-span-5 py-3.5 px-4 rounded-2xl bg-[#F7931A] hover:bg-[#e08213] active:bg-[#c9730d] text-white font-bold text-sm tracking-wide transition-all shadow-md shadow-orange-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Request</span>
                  </button>

                  <button
                    id="figma-btn-qr"
                    onClick={() => setCurrentScreen('deposit_qr')}
                    className="col-span-2 py-3.5 rounded-2xl bg-[#F7931A] hover:bg-[#e08213] active:bg-[#c9730d] text-white flex items-center justify-center transition-all shadow-md shadow-orange-500/20 cursor-pointer"
                    title="Scan or Show QR"
                  >
                    <QrCode className="w-5 h-5" />
                  </button>

                  <button
                    id="figma-btn-pay"
                    onClick={handleTriggerPay}
                    className="col-span-5 py-3.5 px-4 rounded-2xl bg-slate-200 hover:bg-slate-300 active:bg-slate-400 text-slate-800 font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Pay</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* ---------------------------------------------------- */}
            {/* 2. TRANSACTION SUCCESS / RECEIPT (Figma Screenshot 1) */}
            {/* ---------------------------------------------------- */}
            {currentScreen === 'transaction_success' && (
              <motion.div 
                key="transaction_success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-4 py-2"
              >
                {/* Green Circular Icon with Download Glyph as in Figma */}
                <div className="flex flex-col items-center text-center pt-2">
                  <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-3">
                    <ArrowDown className="w-7 h-7 stroke-[2.5]" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">
                    You received {receiptTx.amountSats.toLocaleString()} sats.
                  </h2>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    ≈ ₹{receiptTx.amountInr.toLocaleString('en-IN')} INR
                  </p>
                </div>

                {/* Details Card */}
                <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">From</span>
                    <div className="flex items-center gap-1.5 font-mono font-semibold text-slate-900">
                      <span>{receiptTx.sender}</span>
                      <span className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[10px]">👤</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-1">
                      <span>Network fee</span>
                    </span>
                    <span className="font-mono text-slate-700">~{receiptTx.networkFeeSats} sats</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <button 
                      onClick={() => setShowSwapFeeDrawer(true)}
                      className="text-slate-500 flex items-center gap-1 hover:text-orange-600 cursor-pointer"
                    >
                      <span>Swap fee</span>
                      <Info className="w-3 h-3 text-slate-400" />
                    </button>
                    <span className="font-mono text-slate-700">~{receiptTx.swapFeeSats.toLocaleString()} sats</span>
                  </div>

                  {/* Collapsible Details */}
                  <div className="pt-2 border-t border-slate-200/60">
                    <button
                      onClick={() => setShowDetailsAccordion(!showDetailsAccordion)}
                      className="w-full flex items-center justify-between text-slate-700 font-semibold cursor-pointer"
                    >
                      <span>Details</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showDetailsAccordion ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {showDetailsAccordion && (
                      <div className="mt-2.5 pt-2 space-y-1.5 font-mono text-[11px] text-slate-600">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Rail:</span>
                          <span className="text-orange-600 font-bold">Lightning Instant</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Preimage Hash:</span>
                          <span className="truncate max-w-[170px]">{receiptTx.txId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Settlement Speed:</span>
                          <span className="text-emerald-600 font-bold">380ms (Sub-second)</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Add Note & Tags */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-white">
                    <Edit3 className="w-3.5 h-3.5 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Add note..."
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      className="w-full bg-transparent outline-none text-slate-800 placeholder:text-slate-400 text-xs"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Tag className="w-3.5 h-3.5 text-slate-400 ml-1" />
                    {['Coffee', 'Travel', 'Merchant Settle', 'Freelance'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors cursor-pointer ${
                          selectedTag === tag 
                            ? 'bg-orange-100 text-orange-700 border border-orange-200' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons: Share Receipt & Done */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`Dosra Wallet Receipt: Received ${receiptTx.amountSats} sats (₹${receiptTx.amountInr}) from ${receiptTx.sender}`);
                      alert('Receipt copied to clipboard for sharing!');
                    }}
                    className="w-full py-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share receipt</span>
                  </button>

                  <button
                    onClick={() => setCurrentScreen('transact_keypad')}
                    className="w-full py-3.5 rounded-2xl bg-[#F7931A] hover:bg-[#e08213] text-white font-bold text-sm tracking-wide transition-all shadow-md shadow-orange-500/20 cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            )}

            {/* ---------------------------------------------------- */}
            {/* 3. DEPOSIT BITCOIN / FUND WALLET (Figma Screenshot 2 & 3) */}
            {/* ---------------------------------------------------- */}
            {currentScreen === 'deposit_qr' && (
              <motion.div 
                key="deposit_qr"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4 py-2"
              >
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => setCurrentScreen('transact_keypad')}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>‹ Back</span>
                  </button>
                  <button 
                    onClick={() => setCurrentScreen('transact_keypad')}
                    className="text-xs font-semibold text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    Skip
                  </button>
                </div>

                <div className="text-center space-y-0.5">
                  <h2 className="text-lg font-bold text-slate-900">
                    Deposit bitcoin to this address
                  </h2>
                  <p className="text-xs text-slate-500">
                    Fees may apply. <span className="text-[#F7931A] font-semibold underline cursor-pointer">Learn more</span>
                  </p>
                </div>

                {/* Crisp High-Contrast QR Code Card */}
                <div className="p-5 rounded-3xl bg-white border-2 border-slate-200/90 shadow-sm flex flex-col items-center justify-center space-y-3">
                  <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-inner">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=bitcoin:${depositAddress}?amount=0.001`}
                      alt="Deposit Bitcoin QR Code"
                      className="w-40 h-40 object-contain rounded-xl"
                    />
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-mono text-slate-400 block">Address Hash</span>
                    <span className="font-mono text-xs font-bold text-slate-800 block truncate max-w-[260px]">
                      {depositAddress}
                    </span>
                  </div>
                </div>

                {/* 3 Action Buttons (Share / Copy / More) */}
                <div className="grid grid-cols-12 gap-2">
                  <button 
                    onClick={() => alert(`Share address: ${depositAddress}`)}
                    className="col-span-5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </button>
                  <button 
                    onClick={handleCopyAddress}
                    className="col-span-5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedAddress ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedAddress ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button 
                    onClick={() => alert('Options: Lightning invoice, Liquid asset, or On-chain SegWit')}
                    className="col-span-2 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>

                {/* Primary Confirmation Button */}
                <button
                  onClick={() => {
                    alert('Deposit detected in mempool! Incoming 10,000,000 sats.');
                    setCurrentScreen('transaction_success');
                  }}
                  className="w-full py-3.5 rounded-2xl bg-[#F7931A] hover:bg-[#e08213] text-white font-bold text-sm tracking-wide transition-all shadow-md shadow-orange-500/20 cursor-pointer"
                >
                  I made the deposit
                </button>
              </motion.div>
            )}

            {/* ---------------------------------------------------- */}
            {/* 4. SECURITY BACKUP & TWO THINGS CHECKLIST (Screenshot 2, 4) */}
            {/* ---------------------------------------------------- */}
            {currentScreen === 'security_backup_checklist' && (
              <motion.div 
                key="security_backup_checklist"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4 py-2"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 mb-3">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 leading-tight">
                    To better protect your funds, review your backup and security settings.
                  </h2>
                </div>

                {/* Settings Toggles List */}
                <div className="rounded-2xl bg-slate-50 border border-slate-200 divide-y divide-slate-200 text-xs">
                  {/* Cloud Backup Toggle */}
                  <div className="p-3.5 flex items-center justify-between gap-3">
                    <div>
                      <span className="font-bold text-slate-900 block">Cloud backup</span>
                      <span className="text-[11px] text-slate-500 block leading-tight">
                        To recover your wallet in case you lose access to this application.
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setCloudBackupEnabled(!cloudBackupEnabled);
                        if (!cloudBackupEnabled) setCurrentScreen('cloud_backup_select');
                      }}
                      className={`w-11 h-6 rounded-full transition-colors p-0.5 cursor-pointer shrink-0 ${
                        cloudBackupEnabled ? 'bg-[#F7931A]' : 'bg-slate-300'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${cloudBackupEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  {/* PIN Toggle */}
                  <div className="p-3.5 flex items-center justify-between gap-3">
                    <div>
                      <span className="font-bold text-slate-900 block">PIN</span>
                      <span className="text-[11px] text-slate-500 block leading-tight">
                        Set a 4-digit code to protect from unwanted access.
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setPinEnabled(!pinEnabled);
                        if (!pinEnabled) setCurrentScreen('pin_keypad');
                      }}
                      className={`w-11 h-6 rounded-full transition-colors p-0.5 cursor-pointer shrink-0 ${
                        pinEnabled ? 'bg-[#F7931A]' : 'bg-slate-300'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${pinEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  {/* Face ID Toggle */}
                  <div className="p-3.5 flex items-center justify-between gap-3">
                    <div>
                      <span className="font-bold text-slate-900 block">Face ID / Biometrics</span>
                      <span className="text-[11px] text-slate-500 block leading-tight">
                        Require detection of your biometric sensor for wallet access.
                      </span>
                    </div>
                    <button
                      onClick={() => setFaceIdEnabled(!faceIdEnabled)}
                      className={`w-11 h-6 rounded-full transition-colors p-0.5 cursor-pointer shrink-0 ${
                        faceIdEnabled ? 'bg-[#F7931A]' : 'bg-slate-300'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${faceIdEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>
                </div>

                {/* Two Things You Must Understand Accordion */}
                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs space-y-2.5">
                  <span className="font-bold text-amber-900 block flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Two things you must understand:</span>
                  </span>
                  
                  <label className="flex items-start gap-2 text-[11px] text-amber-950 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={understandBankRule}
                      onChange={(e) => setUnderstandBankRule(e.target.checked)}
                      className="mt-0.5 rounded text-orange-600 focus:ring-orange-500"
                    />
                    <span>With bitcoin, you are your own bank. No one else has access to your private keys.</span>
                  </label>

                  <label className="flex items-start gap-2 text-[11px] text-amber-950 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={understandRecoveryRule}
                      onChange={(e) => setUnderstandRecoveryRule(e.target.checked)}
                      className="mt-0.5 rounded text-orange-600 focus:ring-orange-500"
                    />
                    <span>If you lose access to this app, and your backup, your bitcoin cannot be recovered.</span>
                  </label>
                </div>

                {/* Done Button */}
                <button
                  onClick={() => setCurrentScreen('transact_keypad')}
                  className="w-full py-3.5 rounded-2xl bg-[#F7931A] hover:bg-[#e08213] text-white font-bold text-sm tracking-wide transition-all shadow-md shadow-orange-500/20 cursor-pointer"
                >
                  Done
                </button>
              </motion.div>
            )}

            {/* ---------------------------------------------------- */}
            {/* 5. CLOUD BACKUP SELECTOR (Figma Screenshot 4) */}
            {/* ---------------------------------------------------- */}
            {currentScreen === 'cloud_backup_select' && (
              <motion.div 
                key="cloud_backup_select"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4 py-2"
              >
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => setCurrentScreen('security_backup_checklist')}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                  >
                    ‹ Back
                  </button>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-500/20 mb-3">
                    <Cloud className="w-6 h-6" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 leading-tight">
                    Back up your wallet to cloud storage
                  </h2>
                  <p className="text-xs text-slate-500 mt-1 max-w-[280px]">
                    Regularly saves an encrypted copy of your wallet to your cloud account. Allows for easy recovery in case you lose access to this device.
                  </p>
                </div>

                {/* Cloud Providers List */}
                <div className="rounded-2xl bg-slate-50 border border-slate-200 divide-y divide-slate-200 text-xs font-semibold text-slate-800">
                  <button
                    onClick={() => {
                      alert('Encrypted backup synced to Apple iCloud with Client-Side Argon2 Encryption.');
                      setCloudBackupEnabled(true);
                      setCurrentScreen('security_backup_checklist');
                    }}
                    className="w-full p-4 flex items-center justify-between hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <span>Apple iCloud</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>

                  <button
                    onClick={() => {
                      alert('Encrypted backup synced to Google Drive with Client-Side Argon2 Encryption.');
                      setCloudBackupEnabled(true);
                      setCurrentScreen('security_backup_checklist');
                    }}
                    className="w-full p-4 flex items-center justify-between hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <span>Google Drive</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                </div>

                <div className="text-center">
                  <span className="text-xs font-semibold text-[#F7931A] hover:underline cursor-pointer">
                    Learn more about zero-knowledge cloud backups
                  </span>
                </div>

                <button
                  onClick={() => setCurrentScreen('security_backup_checklist')}
                  className="w-full py-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  Do this later
                </button>
              </motion.div>
            )}

            {/* ---------------------------------------------------- */}
            {/* 6. 4-DIGIT PIN KEYPAD (Figma Screenshots 2 & 6) */}
            {/* ---------------------------------------------------- */}
            {currentScreen === 'pin_keypad' && (
              <motion.div 
                key="pin_keypad"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4 py-2"
              >
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => setCurrentScreen('transact_keypad')}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                  >
                    ‹ Back
                  </button>
                  
                  {/* Anti-Shoulder Surfing Scramble Toggle */}
                  <button 
                    onClick={toggleScramble}
                    className="text-xs font-mono font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-full flex items-center gap-1 cursor-pointer"
                    title="Scramble keypad layout to prevent shoulder surfing"
                  >
                    <Shuffle className="w-3 h-3 text-orange-600" />
                    <span>{isScrambledKeypad ? 'Scrambled' : 'Standard'}</span>
                  </button>
                </div>

                <div className="text-center space-y-1">
                  <h2 className="text-lg font-bold text-slate-900">
                    Enter your PIN to authenticate
                  </h2>
                  <p className="text-xs text-slate-500 max-w-[280px] mx-auto leading-tight">
                    PIN entry will be required for wallet access and high-value transactions.
                  </p>
                </div>

                {/* 4-Dot Indicator as in Figma Screenshots 2 & 6 */}
                <div className="flex items-center justify-center gap-3 py-3">
                  {[0, 1, 2, 3].map((idx) => (
                    <div 
                      key={idx}
                      className={`w-3.5 h-3.5 rounded-full transition-all duration-150 ${
                        enteredPin.length > idx 
                          ? 'bg-slate-900 scale-110' 
                          : 'border-2 border-slate-300 bg-white'
                      }`}
                    />
                  ))}
                </div>

                {pinSuccessMsg && (
                  <div className="text-center text-xs font-semibold text-emerald-600 animate-in fade-in">
                    {pinSuccessMsg}
                  </div>
                )}

                {/* 3x4 Numeric Keypad */}
                <div className="grid grid-cols-3 gap-y-3 gap-x-6 px-4 py-2 font-mono text-2xl text-slate-800">
                  {scrambledNumbers.slice(0, 9).map((num) => (
                    <button
                      key={num}
                      onClick={() => handlePinPress(num)}
                      className="h-12 rounded-2xl flex items-center justify-center hover:bg-slate-100 active:bg-slate-200 transition-colors font-medium cursor-pointer select-none"
                    >
                      {num}
                    </button>
                  ))}
                  <div className="h-12 flex items-center justify-center"></div>
                  <button
                    onClick={() => handlePinPress(scrambledNumbers[9])}
                    className="h-12 rounded-2xl flex items-center justify-center hover:bg-slate-100 active:bg-slate-200 transition-colors font-medium cursor-pointer select-none"
                  >
                    {scrambledNumbers[9]}
                  </button>
                  <button
                    onClick={handlePinBackspace}
                    className="h-12 rounded-2xl flex items-center justify-center hover:bg-slate-100 active:bg-slate-200 text-slate-500 transition-colors cursor-pointer select-none"
                  >
                    ⌫
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* ======================================================== */}
        {/* BOTTOM NAVIGATION (Transact / Activity / Settings) */}
        {/* ======================================================== */}
        <div className="px-6 py-3 border-t border-slate-100 bg-white flex items-center justify-around text-[11px] font-semibold text-slate-500">
          <button
            onClick={() => {
              setActiveTab('transact');
              setCurrentScreen('transact_keypad');
            }}
            className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
              activeTab === 'transact' ? 'text-[#F7931A]' : 'hover:text-slate-800'
            }`}
          >
            <span className="text-base">⇄</span>
            <span>Transact</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('activity');
              setCurrentScreen('transaction_success');
            }}
            className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
              activeTab === 'activity' ? 'text-[#F7931A]' : 'hover:text-slate-800'
            }`}
          >
            <span className="text-base">📋</span>
            <span>Activity</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('settings');
              setCurrentScreen('security_backup_checklist');
            }}
            className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
              activeTab === 'settings' ? 'text-[#F7931A]' : 'hover:text-slate-800'
            }`}
          >
            <span className="text-base">⚙️</span>
            <span>Settings</span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* SWAP FEE EXPLANATION DRAWER MODAL (Figma Screenshot 1) */}
        {/* ======================================================== */}
        {showSwapFeeDrawer && (
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm z-30 flex items-end animate-in fade-in">
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="bg-white w-full rounded-t-3xl p-6 space-y-3 shadow-2xl border-t border-slate-100 text-center"
            >
              <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-2" />
              <h3 className="text-base font-bold text-slate-900">
                Swap fee
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-[300px] mx-auto">
                This fee is for swapping funds between networks. This automated service simplifies payments from and to many different wallets.
              </p>
              <button 
                onClick={() => setShowSwapFeeDrawer(false)}
                className="text-xs font-semibold text-[#F7931A] block mx-auto pt-1 hover:underline cursor-pointer"
              >
                More about fees
              </button>
              <button
                onClick={() => setShowSwapFeeDrawer(false)}
                className="w-full py-3 rounded-2xl bg-[#F7931A] text-white font-bold text-xs mt-2 cursor-pointer"
              >
                Got it
              </button>
            </motion.div>
          </div>
        )}

      </motion.div>
    </div>
  );
};
