import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Globe2,
  Upload,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Calendar,
  DollarSign,
  ArrowRight,
  Sparkles,
  Plane,
  FileText,
  CreditCard,
  Coins,
  Cpu,
  Layers,
  Info,
  Check,
  AlertCircle,
  HelpCircle,
  RefreshCw,
  Camera
} from 'lucide-react';
import { FOREIGN_COUNTRIES } from '../data/mockData';
import { ForeignerCountryConfig, PassportVerificationProof, TripPlannerData, UserProfile } from '../types';
import { getLatestMarketData } from '../services/livePriceService';

interface ForeignerTravelerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteTravelerSetup: (user: UserProfile, tripData: TripPlannerData) => void;
}

export const ForeignerTravelerModal: React.FC<ForeignerTravelerModalProps> = ({
  isOpen,
  onClose,
  onCompleteTravelerSetup,
}) => {
  // Step sequence:
  // 1. 'country' -> 2. 'passport' -> 3. 'blockchain_verify' -> 4. 'trip_details' -> 5. 'budget_sats' -> 6. 'lightning_ready'
  const [step, setStep] = useState<
    'country' | 'passport' | 'blockchain_verify' | 'trip_details' | 'budget_sats' | 'lightning_ready'
  >('country');

  // 1. Selected Country
  const [selectedCountry, setSelectedCountry] = useState<ForeignerCountryConfig>(FOREIGN_COUNTRIES[0]);
  
  // 2. Passport & Identity details
  const [travelerName, setTravelerName] = useState('Salika Vance');
  const [passportNumber, setPassportNumber] = useState('N89234101A');
  const [passportImageUploaded, setPassportImageUploaded] = useState<boolean>(false);
  const [passportImagePreview, setPassportImagePreview] = useState<string | null>(null);

  // 3. Blockchain verification state
  const [isVerifyingOnChain, setIsVerifyingOnChain] = useState(false);
  const [verifiedProof, setVerifiedProof] = useState<PassportVerificationProof | null>(null);

  // 4. Trip dates & Visa details
  const [tripStartDate, setTripStartDate] = useState('2026-09-01');
  const [tripEndDate, setTripEndDate] = useState('2026-09-15');
  const [tripDays, setTripDays] = useState(14);
  const [visaCategory, setVisaCategory] = useState<
    'Tourist Visa (e-Visa)' | 'Business Visa (e-Business)' | 'Student Visa (e-Student)' | 'Conference/Medical' | 'Visa-Exempt Entry'
  >('Tourist Visa (e-Visa)');
  const [cashCarriedForeign, setCashCarriedForeign] = useState<number>(500);
  const [btcInWallet, setBtcInWallet] = useState<number>(0.05);

  // 5. Trip Budget & Satoshi Recommendation
  const [travelStyle, setTravelStyle] = useState<'budget' | 'mid' | 'luxury'>('mid');
  const [marketRateBtcInr, setMarketRateBtcInr] = useState(8392400); // 1 BTC = ₹83,92,400
  const [satsPurchased, setSatsPurchased] = useState<number>(0);
  const [isBuyingSats, setIsBuyingSats] = useState(false);

  // Calculation helpers
  const dailySpendMap = {
    budget: 2500, // ₹2,500/day
    mid: 6500,    // ₹6,500/day
    luxury: 18000, // ₹18,000/day
  };

  const currentDailyBudgetInr = dailySpendMap[travelStyle];
  const totalEstimatedTripInr = currentDailyBudgetInr * tripDays;
  const recommendedSats = Math.round((totalEstimatedTripInr / marketRateBtcInr) * 100000000);
  const recommendedBtc = totalEstimatedTripInr / marketRateBtcInr;
  const foreignCurrencyNeeded = totalEstimatedTripInr / selectedCountry.exchangeRateToInr;

  useEffect(() => {
    const market = getLatestMarketData();
    if (market.btcInr) {
      setMarketRateBtcInr(market.btcInr);
    }
  }, []);

  // Calculate days when dates change
  useEffect(() => {
    if (tripStartDate && tripEndDate) {
      const start = new Date(tripStartDate);
      const end = new Date(tripEndDate);
      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 0) {
        setTripDays(diffDays);
      }
    }
  }, [tripStartDate, tripEndDate]);

  // Adjust visa category default based on country rules
  useEffect(() => {
    if (selectedCountry.id === 'nepal') {
      setVisaCategory('Visa-Exempt Entry');
    } else {
      setVisaCategory('Tourist Visa (e-Visa)');
    }
  }, [selectedCountry]);

  if (!isOpen) return null;

  // Handle Mock Passport Upload
  const handleSimulatePassportUpload = (e?: React.ChangeEvent<HTMLInputElement>) => {
    setPassportImageUploaded(true);
    setPassportImagePreview(
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400'
    );
  };

  // Run On-Chain Cryptographic Verification
  const handleStartBlockchainVerification = () => {
    setStep('blockchain_verify');
    setIsVerifyingOnChain(true);

    setTimeout(() => {
      setIsVerifyingOnChain(false);
      const proof: PassportVerificationProof = {
        passportNumber: passportNumber || 'N89234101A',
        country: selectedCountry.name,
        fullName: travelerName || 'Salika Vance',
        gender: 'F',
        dateOfBirth: '1996-04-14',
        expiryDate: '2034-08-20',
        issuingAuthority: `${selectedCountry.name} Department of Foreign Affairs & Consular Services`,
        documentHash: '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
        bitcoinBlockHash: '00000000000000000002a7b8c91d3e5f' + Math.random().toString(16).substring(2, 10),
        merkleRoot: '4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b',
        opReturnTxId: 'tx_btc_anchor_' + Math.random().toString(36).substring(2, 12),
        zkpAttestationId: 'ZKP-ID-PASS-' + Math.floor(100000 + Math.random() * 900000),
        verificationTimestamp: new Date().toISOString(),
        blockchainAnchorHeight: 894120,
        isConfirmed: true,
      };
      setVerifiedProof(proof);
    }, 1800);
  };

  // Buy Satoshis for Trip
  const handleBuySatsForTrip = () => {
    setIsBuyingSats(true);
    setTimeout(() => {
      setIsBuyingSats(false);
      setSatsPurchased(recommendedSats);
      setStep('lightning_ready');
    }, 1200);
  };

  // Complete and Launch into Dashboard
  const handleFinalizeTraveler = () => {
    const tripData: TripPlannerData = {
      country: selectedCountry,
      travelerName: travelerName,
      cashCarriedForeign: cashCarriedForeign,
      btcInWallet: btcInWallet + (satsPurchased / 100000000),
      tripStartDate: tripStartDate,
      tripEndDate: tripEndDate,
      tripDaysCount: tripDays,
      visaCategory: visaCategory,
      travelStyle: travelStyle,
      dailyBudgetInr: currentDailyBudgetInr,
      totalEstimatedInr: totalEstimatedTripInr,
      recommendedSats: recommendedSats,
      recommendedBtc: recommendedBtc,
      satsPurchased: satsPurchased,
      isWalletReady: true,
      passportProof: verifiedProof || undefined,
    };

    const user: UserProfile = {
      name: travelerName,
      handle: `@${travelerName.toLowerCase().replace(/\s+/g, '')}.tourist.sat`,
      mobile: '+1 415 892 0192',
      email: `${travelerName.toLowerCase().replace(/\s+/g, '')}@traveler.satconnect.io`,
      accountType: 'individual',
      nationality: 'foreign',
      isFirstTimeUser: false,
      kycStatus: 'Verified',
      balanceBtc: btcInWallet + (satsPurchased / 100000000),
      balanceInr: Math.round((btcInWallet + (satsPurchased / 100000000)) * marketRateBtcInr),
      unconfirmedSats: 0,
      channelsCount: 6,
      securityScore: 99,
      pin: '4488',
      lightningAddress: `${travelerName.toLowerCase().replace(/\s+/g, '')}@satconnect.me`,
      segwitAddress: 'bc1qtraveler' + Math.random().toString(36).substring(2, 10),
      taprootAddress: 'bc1ptravelervault' + Math.random().toString(36).substring(2, 10),
      memberSince: 'August 2026',
    };

    onCompleteTravelerSetup(user, tripData);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl max-h-[94vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-slate-200 text-slate-900 scrollbar-thin flex flex-col"
        >
          {/* DYNAMIC COUNTRY COLOR BANNER & ANIMATION */}
          <div
            className="p-6 relative overflow-hidden text-white transition-all duration-700"
            style={{
              background: `linear-gradient(135deg, #0b1e48 0%, ${selectedCountry.primaryColor} 60%, ${selectedCountry.accentColor} 100%)`,
              boxShadow: `inset 0 0 60px ${selectedCountry.glowColor}`,
            }}
          >
            {/* Animated country aura pulse particles */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl"
              style={{ backgroundColor: selectedCountry.accentColor }}
            />

            <button
              id="foreign-modal-close-btn"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-2xl shadow-lg">
                {selectedCountry.flag}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold tracking-tight">
                    Foreign Traveler UPI &amp; Bitcoin Portal
                  </h2>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/40">
                    NON-RESIDENT PASSPORT ON-CHAIN
                  </span>
                </div>
                <p className="text-xs text-slate-200">
                  Select country &bull; Verify Passport via Bitcoin OP_RETURN &bull; Live FX &amp; SATS Conversion
                </p>
              </div>
            </div>

            {/* Stepper Dots */}
            <div className="grid grid-cols-6 gap-1.5 mt-4 pt-3 border-t border-white/15 text-[10px] font-mono">
              {[
                { id: 'country', label: '1. Country' },
                { id: 'passport', label: '2. Passport' },
                { id: 'blockchain_verify', label: '3. Verify' },
                { id: 'trip_details', label: '4. Trip Days' },
                { id: 'budget_sats', label: '5. SATS Top-Up' },
                { id: 'lightning_ready', label: '6. Travel Ready' },
              ].map((s, idx) => {
                const stepOrder = ['country', 'passport', 'blockchain_verify', 'trip_details', 'budget_sats', 'lightning_ready'];
                const isCurrent = step === s.id;
                const isPassed = stepOrder.indexOf(step) > idx;

                return (
                  <div
                    key={s.id}
                    className={`py-1 px-1.5 rounded-lg text-center font-bold truncate transition-all ${
                      isCurrent
                        ? 'bg-white text-slate-900 shadow-md scale-105'
                        : isPassed
                        ? 'bg-white/30 text-white'
                        : 'bg-black/20 text-white/50'
                    }`}
                  >
                    {s.label}
                  </div>
                );
              })}
            </div>
          </div>

          {/* MAIN MODAL BODY */}
          <div className="p-6 flex-1 space-y-6">
            {/* STEP 1: COUNTRY SELECTION & COUNTRY ANIMATION */}
            {step === 'country' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5"
              >
                <div className="text-center space-y-1">
                  <h3 className="text-lg font-bold text-slate-900">
                    Step 1: Select Your Home Country &amp; Currency
                  </h3>
                  <p className="text-xs text-slate-500">
                    SATCONNECT customizes live currency conversions (USD/EUR/GBP/JPY ↔ INR) and applies bilateral Indian visa regulations.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[300px] overflow-y-auto p-1 scrollbar-thin">
                  {FOREIGN_COUNTRIES.map((c) => {
                    const isSelected = selectedCountry.id === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        id={`country-select-${c.id}`}
                        onClick={() => setSelectedCountry(c)}
                        className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/80 shadow-md ring-2 ring-blue-500/20'
                            : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl">{c.flag}</span>
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-200/70 text-slate-800">
                            {c.currencyCode}
                          </span>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 truncate">
                            {c.name}
                          </div>
                          <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                            1 {c.currencyCode} = ₹{c.exchangeRateToInr.toFixed(2)}
                          </div>
                        </div>
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Country Insights Box */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <div className="text-3xl p-2 bg-white rounded-xl shadow-sm border border-slate-100">
                    {selectedCountry.flag}
                  </div>
                  <div className="space-y-1 text-xs flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{selectedCountry.name}</span>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">
                        {selectedCountry.visaPolicy}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      {selectedCountry.visaNote}
                    </p>
                    <div className="font-mono text-[11px] text-blue-700 font-bold pt-1">
                      Exchange Rate: 1 {selectedCountry.currencyCode} ({selectedCountry.currencySymbol}) = ₹{selectedCountry.exchangeRateToInr} INR
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    id="btn-proceed-to-passport"
                    onClick={() => setStep('passport')}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0b1e48] hover:bg-[#132c66] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <span>Proceed to Passport &amp; Traveler Profile</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: PASSPORT UPLOAD & TRAVELER DETAILS */}
            {step === 'passport' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="text-center space-y-1">
                  <h3 className="text-lg font-bold text-slate-900">
                    Step 2: Traveler Name &amp; Passport Upload
                  </h3>
                  <p className="text-xs text-slate-500">
                    Upload your passport info page. We anchor an encrypted, zero-knowledge cryptographic hash on the Bitcoin ledger for non-custodial travel KYC.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      What's your name, sir / traveler? (e.g. Salika)
                    </label>
                    <input
                      type="text"
                      id="input-traveler-name"
                      value={travelerName}
                      onChange={(e) => setTravelerName(e.target.value)}
                      placeholder="e.g. Salika Vance"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Passport Document Number
                    </label>
                    <input
                      type="text"
                      id="input-passport-number"
                      value={passportNumber}
                      onChange={(e) => setPassportNumber(e.target.value)}
                      placeholder="e.g. N89234101A"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Passport Upload Dropzone */}
                <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-5 text-center transition-all bg-slate-50/50">
                  {passportImageUploaded ? (
                    <div className="flex items-center gap-4 text-left">
                      <div className="w-20 h-14 rounded-lg bg-slate-200 overflow-hidden shrink-0 border border-slate-300 shadow-sm relative">
                        <img
                          src={passportImagePreview || ''}
                          alt="Passport Preview"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-emerald-950/20 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 drop-shadow" />
                        </div>
                      </div>
                      <div className="space-y-0.5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">
                            {selectedCountry.flag} Passport Document Attached
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                            OCR READY
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-mono">
                          SHA-256 Digest: 0x8a9f3b12...c9d4 (Verified)
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPassportImageUploaded(false)}
                        className="text-xs text-rose-600 hover:underline font-bold"
                      >
                        Change
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">
                          Click to upload or drag &amp; drop Passport photo
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Supports PNG, JPG, PDF (MRZ 2-line machine readable zone auto-scanned)
                        </p>
                      </div>
                      <button
                        type="button"
                        id="btn-upload-passport-sample"
                        onClick={() => handleSimulatePassportUpload()}
                        className="px-4 py-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold hover:bg-blue-100 transition-all inline-flex items-center gap-1.5"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>1-Click Load Sample Passport</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3">
                  <button
                    type="button"
                    onClick={() => setStep('country')}
                    className="text-xs font-bold text-slate-500 hover:text-slate-800"
                  >
                    &larr; Back to Country
                  </button>
                  <button
                    type="button"
                    id="btn-verify-passport-onchain"
                    onClick={handleStartBlockchainVerification}
                    disabled={!passportImageUploaded || !travelerName.trim()}
                    className={`px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg transition-all ${
                      passportImageUploaded && travelerName.trim()
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <Cpu className="w-4 h-4" />
                    <span>Verify Passport on Bitcoin Blockchain</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: BLOCKCHAIN VERIFICATION ANIMATION & DETAILS */}
            {step === 'blockchain_verify' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5"
              >
                {isVerifyingOnChain ? (
                  <div className="py-12 text-center space-y-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                      className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-orange-500 via-blue-600 to-emerald-500 p-1 mx-auto flex items-center justify-center shadow-xl"
                    >
                      <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
                        <Cpu className="w-8 h-8 text-blue-600" />
                      </div>
                    </motion.div>
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-slate-900">
                        Cryptographic Verification in Progress...
                      </h4>
                      <p className="text-xs text-slate-500 font-mono">
                        Hashing MRZ String &bull; Anchoring OP_RETURN Merkle Proof &bull; Issuing Zero-Knowledge Passport Token
                      </p>
                    </div>
                    <div className="max-w-md mx-auto bg-slate-900 text-emerald-400 font-mono text-[11px] p-3 rounded-xl text-left space-y-1 shadow-inner">
                      <div>&gt; HASH_SHA256(passport_mrz) =&gt; 0x9f8e7d...</div>
                      <div>&gt; Mining Bitcoin Block Header #894120...</div>
                      <div>&gt; Zero-Knowledge Proof ZKP-ID Generated.</div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                            Passport Cryptographically Verified &amp; Anchored
                          </h4>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">
                            CONFIRMED
                          </span>
                        </div>
                        <p className="text-xs text-emerald-800">
                          Traveler <strong className="font-bold">{verifiedProof?.fullName}</strong> ({verifiedProof?.country}) is verified. Sovereign non-custodial KYC is valid across all Indian merchant UPI terminals.
                        </p>
                      </div>
                    </div>

                    {/* Cryptographic Proof Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono bg-slate-50 p-4 rounded-2xl border border-slate-200">
                      <div>
                        <span className="text-slate-400 text-[10px] block">BITCOIN BLOCK ANCHOR:</span>
                        <span className="font-bold text-slate-800 truncate block">
                          Block #{verifiedProof?.blockchainAnchorHeight}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">BLOCK HASH:</span>
                        <span className="font-bold text-slate-800 truncate block text-[11px]">
                          {verifiedProof?.bitcoinBlockHash}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">OP_RETURN TXID:</span>
                        <span className="font-bold text-blue-600 truncate block">
                          {verifiedProof?.opReturnTxId}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">ZERO-KNOWLEDGE ID:</span>
                        <span className="font-bold text-emerald-700 truncate block">
                          {verifiedProof?.zkpAttestationId}
                        </span>
                      </div>
                    </div>

                    {/* LIVE CURRENCY CONVERSION & CASH CARRIED STATS */}
                    <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800">Live Exchange Conversion Rate</span>
                        <span className="font-mono font-bold text-blue-700">
                          1 {selectedCountry.currencyCode} = ₹{selectedCountry.exchangeRateToInr} INR
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="p-3 bg-white rounded-xl border border-blue-100 shadow-sm">
                          <span className="text-[10px] text-slate-400 block font-mono">1 BITCOIN IN INR</span>
                          <span className="text-sm font-bold text-slate-900 font-mono">
                            ₹{(marketRateBtcInr / 100000).toFixed(2)} Lakh
                          </span>
                        </div>
                        <div className="p-3 bg-white rounded-xl border border-blue-100 shadow-sm">
                          <span className="text-[10px] text-slate-400 block font-mono">1 BITCOIN IN {selectedCountry.currencyCode}</span>
                          <span className="text-sm font-bold text-blue-600 font-mono">
                            {selectedCountry.currencySymbol}
                            {Math.round(marketRateBtcInr / selectedCountry.exchangeRateToInr).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="button"
                        onClick={() => setStep('passport')}
                        className="text-xs font-bold text-slate-500 hover:text-slate-800"
                      >
                        &larr; Re-scan Passport
                      </button>
                      <button
                        type="button"
                        id="btn-proceed-to-trip-details"
                        onClick={() => setStep('trip_details')}
                        className="px-6 py-3 rounded-xl bg-[#0b1e48] hover:bg-[#132c66] text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
                      >
                        <span>Configure Trip Dates &amp; Visa</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* STEP 4: TRIP DATES, DAYS & VISA DOMAIN RULES */}
            {step === 'trip_details' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="text-center space-y-1">
                  <h3 className="text-lg font-bold text-slate-900">
                    Step 4: Trip Duration &amp; Visa Domain Rules
                  </h3>
                  <p className="text-xs text-slate-500">
                    Tell us your trip schedule in India. We optimize your Bitcoin-to-UPI liquidity pool for the exact number of days.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Trip Start Date (Arrival in India)
                    </label>
                    <input
                      type="date"
                      id="input-trip-start-date"
                      value={tripStartDate}
                      onChange={(e) => setTripStartDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Trip End Date (Departure)
                    </label>
                    <input
                      type="date"
                      id="input-trip-end-date"
                      value={tripEndDate}
                      onChange={(e) => setTripEndDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-bold text-slate-900">
                      Calculated Duration: {tripDays} Days in India
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-600 text-white">
                    {tripDays * 24} Hours Active
                  </span>
                </div>

                {/* VISA CATEGORY SELECTION & REAL DOMAIN RULES */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Which Indian Visa are you holding?
                  </label>
                  <select
                    id="select-visa-category"
                    value={visaCategory}
                    onChange={(e: any) => setVisaCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-medium"
                  >
                    <option value="Tourist Visa (e-Visa)">Tourist Visa (e-Tourist 30-Day / 1-Year / 5-Year)</option>
                    <option value="Business Visa (e-Business)">Business Visa (e-Business for Trade &amp; Meetings)</option>
                    <option value="Student Visa (e-Student)">Student Visa (e-Student for University Study)</option>
                    <option value="Conference/Medical">Conference / Medical Attendant e-Visa</option>
                    {selectedCountry.id === 'nepal' && (
                      <option value="Visa-Exempt Entry">Visa-Exempt Entry (Indo-Nepal Peace &amp; Friendship Treaty)</option>
                    )}
                  </select>
                </div>

                {/* Real-World Visa Note */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
                  <div className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-blue-600" />
                    <span>Immigration &amp; Payment Compliance Note:</span>
                  </div>
                  <p>
                    {selectedCountry.id === 'japan' || selectedCountry.id === 'south_korea' || selectedCountry.id === 'uae'
                      ? `Citizens of ${selectedCountry.name} are eligible for bilateral Visa-on-Arrival at designated Indian international airports. You can connect self-custodial Lightning immediately on arrival.`
                      : selectedCountry.id === 'nepal'
                      ? 'Citizens of Nepal do not require a visa under the 1950 Indo-Nepal Treaty. You enjoy frictionless Bitcoin-to-UPI settlement.'
                      : `e-Visa for ${selectedCountry.name} allows digital non-resident UPI settlement via non-custodial Lightning wallets across all 60M+ merchant QRs.`}
                  </p>
                </div>

                {/* Foreign Cash vs Wallet BTC */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Cash carried in {selectedCountry.currencyCode} (Optional)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold">
                        {selectedCountry.currencySymbol}
                      </span>
                      <input
                        type="number"
                        id="input-cash-carried"
                        value={cashCarriedForeign}
                        onChange={(e) => setCashCarriedForeign(Number(e.target.value))}
                        className="w-full pl-7 pr-3 py-2 rounded-xl border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Bitcoin in your Wallet (BTC)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-xs text-orange-500 font-bold">
                        ₿
                      </span>
                      <input
                        type="number"
                        id="input-btc-wallet"
                        step="0.001"
                        value={btcInWallet}
                        onChange={(e) => setBtcInWallet(Number(e.target.value))}
                        className="w-full pl-7 pr-3 py-2 rounded-xl border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep('blockchain_verify')}
                    className="text-xs font-bold text-slate-500 hover:text-slate-800"
                  >
                    &larr; Back to Verification
                  </button>
                  <button
                    type="button"
                    id="btn-proceed-to-budget"
                    onClick={() => setStep('budget_sats')}
                    className="px-6 py-3 rounded-xl bg-[#0b1e48] hover:bg-[#132c66] text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
                  >
                    <span>Calculate Travel Budget &amp; SATS</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 5: AVERAGE TRIP BUDGET & SATOSHI RECOMMENDATION */}
            {step === 'budget_sats' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="text-center space-y-1">
                  <h3 className="text-lg font-bold text-slate-900">
                    Step 5: Travel Spend Recommendation in India
                  </h3>
                  <p className="text-xs text-slate-500">
                    Average trip duration calculation: Here is how much money you will require in India. Buy this exact amount of Satoshis!
                  </p>
                </div>

                {/* Travel Style Selector */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'budget', label: 'Backpacker / Budget', rate: '₹2,500/day', foreign: `${selectedCountry.currencySymbol}${Math.round(2500 / selectedCountry.exchangeRateToInr)}` },
                    { id: 'mid', label: 'Comfort / Mid-Tier', rate: '₹6,500/day', foreign: `${selectedCountry.currencySymbol}${Math.round(6500 / selectedCountry.exchangeRateToInr)}` },
                    { id: 'luxury', label: '5-Star / Luxury', rate: '₹18,000/day', foreign: `${selectedCountry.currencySymbol}${Math.round(18000 / selectedCountry.exchangeRateToInr)}` },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      id={`btn-style-${s.id}`}
                      onClick={() => setTravelStyle(s.id as any)}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        travelStyle === s.id
                          ? 'border-orange-500 bg-orange-50/80 shadow-md font-bold'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-900">{s.label}</div>
                      <div className="text-[11px] font-mono text-orange-600 font-bold mt-1">{s.rate}</div>
                      <div className="text-[10px] font-mono text-slate-400">{s.foreign}/day</div>
                    </button>
                  ))}
                </div>

                {/* RECOMMENDATION BREAKDOWN CARD */}
                <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-900 to-[#0b1e48] text-white space-y-4 shadow-xl border border-slate-800">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div>
                      <span className="text-[11px] font-mono text-slate-400 block">FOR YOUR {tripDays}-DAY TRIP IN INDIA</span>
                      <h4 className="text-xl font-extrabold font-mono text-white">
                        ₹{totalEstimatedTripInr.toLocaleString('en-IN')} INR
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-mono text-slate-400 block">IN YOUR HOME CURRENCY</span>
                      <span className="text-lg font-bold font-mono text-blue-300">
                        {selectedCountry.currencySymbol}{Math.round(foreignCurrencyNeeded).toLocaleString()} {selectedCountry.currencyCode}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/10 font-mono text-xs">
                    <div>
                      <span className="text-slate-400 text-[10px] block">RECOMMENDED SATOSHIS</span>
                      <span className="text-base font-extrabold text-orange-400">
                        {recommendedSats.toLocaleString()} SATS
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">BITCOIN VALUE</span>
                      <span className="text-base font-extrabold text-emerald-400">
                        {recommendedBtc.toFixed(5)} BTC
                      </span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-orange-400 shrink-0" />
                    <span>
                      <strong>Sovereign Advantage:</strong> You hold 100% Bitcoin. Conversion to INR occurs <em>transaction-by-transaction</em> at the camera scan moment, shielding you from fiat inflation and high foreign card fees!
                    </span>
                  </div>

                  <button
                    type="button"
                    id="btn-buy-convert-sats"
                    onClick={handleBuySatsForTrip}
                    disabled={isBuyingSats}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 transition-all cursor-pointer"
                  >
                    {isBuyingSats ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Acquiring {recommendedSats.toLocaleString()} SATS via Lightning...</span>
                      </>
                    ) : (
                      <>
                        <Coins className="w-4 h-4" />
                        <span>Acquire {recommendedSats.toLocaleString()} Satoshis for India Trip</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => setStep('trip_details')}
                    className="text-xs font-bold text-slate-500 hover:text-slate-800"
                  >
                    &larr; Back to Trip Dates
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSatsPurchased(recommendedSats);
                      setStep('lightning_ready');
                    }}
                    className="text-xs font-bold text-blue-600 hover:underline"
                  >
                    I already have Bitcoin in my wallet &rarr;
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 6: TRAVEL READY & LIGHTNING ARRIVAL IN INDIA */}
            {step === 'lightning_ready' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="text-center space-y-1">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2 shadow-sm">
                    <Plane className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Welcome to India, {travelerName}! You are Ready to Pay Anywhere.
                  </h3>
                  <p className="text-xs text-slate-500">
                    Your sovereign Lightning channel is live with {((satsPurchased || recommendedSats) / 100000000).toFixed(5)} BTC (~₹{totalEstimatedTripInr.toLocaleString('en-IN')} INR).
                  </p>
                </div>

                {/* Lightning Node Routing Preview */}
                <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-slate-400 text-[10px]">
                    <span>REAL-TIME LIGHTNING ROUTE INTELLIGENCE</span>
                    <span className="text-emerald-400 font-bold">LATENCY: 18ms &bull; 0% FX SPREAD</span>
                  </div>

                  <div className="flex items-center justify-between gap-2 text-center">
                    <div className="p-2.5 rounded-xl bg-white/10 flex-1 border border-white/10">
                      <span className="text-[10px] text-slate-400 block">{selectedCountry.currencyCode} SATS</span>
                      <span className="font-bold text-orange-400 text-xs">Origin Node A</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-blue-400 shrink-0" />
                    <div className="p-2.5 rounded-xl bg-white/10 flex-1 border border-white/10">
                      <span className="text-[10px] text-slate-400 block">LN-HTLC HOP</span>
                      <span className="font-bold text-blue-400 text-xs">Router Node B</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div className="p-2.5 rounded-xl bg-emerald-500/20 flex-1 border border-emerald-400/30">
                      <span className="text-[10px] text-emerald-300 block">MERCHANT UPI</span>
                      <span className="font-bold text-emerald-400 text-xs">Instant INR</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-300">
                    <strong>Every transaction converts individually:</strong> Scan any PhonePe, Paytm, BharatPe, or GPay QR code. If a vendor tries to up-sell or charge above MRP (e.g. ₹200 for a ₹10 biscuit), our AI Gouge Firewall alerts you instantly!
                  </p>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    id="btn-launch-foreigner-travel-dashboard"
                    onClick={handleFinalizeTraveler}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 transition-all cursor-pointer"
                  >
                    <Zap className="w-5 h-5 text-amber-300" />
                    <span>Launch SATCONNECT Sovereign Travel Terminal</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
