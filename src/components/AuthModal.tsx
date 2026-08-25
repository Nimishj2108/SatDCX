import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Zap, 
  ShieldCheck, 
  Lock, 
  Smartphone, 
  Mail, 
  User, 
  Key, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  RefreshCw,
  Building2,
  Globe2,
  FileText,
  Users,
  CreditCard,
  Briefcase,
  Layers,
  ArrowLeftRight
} from 'lucide-react';
import { UserProfile, UserAccountType, UserNationality, CompanyProfile, CompanyDirector } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
  onLoginSuccess: (user: UserProfile) => void;
  onLaunchForeignerPortal?: () => void;
}

// Pre-configured real-world demo company records
const DEMO_COMPANY_RECORD: CompanyProfile = {
  companyName: 'Krypton SATS Technologies Pvt Ltd',
  legalEntityName: 'Krypton SATS Technologies Private Limited',
  cinNumber: 'U72900KA2024PTC189201',
  companyPan: 'AAACK9982M',
  gstNumber: '29AAACK9982M1Z5',
  msmeUdyamNumber: 'UDYAM-KR-03-0029812',
  registeredOffice: '#402, 4th Floor, Indiranagar 100ft Road, Bengaluru, KA 560038',
  treasuryBtc: 4.85000000,
  treasuryInr: 40703140,
  multisigQuorum: '3-of-5 Directors (Non-Custodial Threshold)',
  transactionLimitMultiplier: '4x Corporate Multiplier (₹5,00,000 / tx)',
  crossBorderRemitActive: true,
  exportImportCode: '0512039941',
  corporateHandle: '@krypton.corp.sat',
  directors: [
    {
      id: 'dir-1',
      name: 'Nimish Jain',
      designation: 'Managing Director & CEO',
      panNumber: 'ABCDE1234F',
      dinNumber: 'DIN-09823102',
      shareholdingPercent: 45,
      multisigKeyShard: 'shard_pub_02a88c91...',
      savingsWalletAddress: 'bc1qnimishfounder...77a',
      savingsBalanceBtc: 1.25000000,
      isAuthorizedSignatory: true,
      status: 'Verified',
    },
    {
      id: 'dir-2',
      name: 'Rahul Verma',
      designation: 'Co-Founder & CTO',
      panNumber: 'FGHIJ5678K',
      dinNumber: 'DIN-09823103',
      shareholdingPercent: 35,
      multisigKeyShard: 'shard_pub_03b99d02...',
      savingsWalletAddress: 'bc1qrahulcto...88b',
      savingsBalanceBtc: 0.85000000,
      isAuthorizedSignatory: true,
      status: 'Verified',
    },
    {
      id: 'dir-3',
      name: 'Priya Sharma',
      designation: 'Chief Financial Officer (CFO)',
      panNumber: 'KLMNO9012P',
      dinNumber: 'DIN-09823104',
      shareholdingPercent: 20,
      multisigKeyShard: 'shard_pub_04c11e33...',
      savingsWalletAddress: 'bc1qpriyacfo...99c',
      savingsBalanceBtc: 0.60000000,
      isAuthorizedSignatory: true,
      status: 'Verified',
    },
  ],
};

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signup',
  onLoginSuccess,
  onLaunchForeignerPortal,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  
  // Step sequence: 'nationality' -> 'account_type' -> 'first_time_check' (if individual) or 'company_records' (if business) -> 'details' -> 'otp' -> 'pin'
  const [step, setStep] = useState<
    'nationality' | 'account_type' | 'first_time_check' | 'company_records' | 'details' | 'otp' | 'pin'
  >('nationality');

  // Question 1: Nationality
  const [nationality, setNationality] = useState<UserNationality>('indian');
  
  // Question 2: Account Type
  const [accountType, setAccountType] = useState<UserAccountType>('individual');
  
  // Question 3: First-time check for individuals
  const [isFirstTimeUser, setIsFirstTimeUser] = useState<boolean>(true);

  // Business / Company state
  const [companyName, setCompanyName] = useState('');
  const [cinNumber, setCinNumber] = useState('');
  const [companyPan, setCompanyPan] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [msmeNumber, setMsmeNumber] = useState('');
  const [directorsList, setDirectorsList] = useState<CompanyDirector[]>([]);

  // User form details
  const [fullName, setFullName] = useState('Nimish Jain');
  const [mobileNumber, setMobileNumber] = useState('9876543210');
  const [email, setEmail] = useState('nimish@satconnect.io');
  const [handle, setHandle] = useState('nimish.sat');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [pin, setPin] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [errorMsg, setErrorMsg] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const DEMO_OTP = '5829';

  useEffect(() => {
    setMode(initialMode);
    if (initialMode === 'login') {
      setStep('details');
    } else {
      setStep('nationality');
    }
    setErrorMsg('');
  }, [initialMode, isOpen]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'otp' && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  if (!isOpen) return null;

  // 1-Click Load Demo Company
  const handleLoadDemoCompany = () => {
    setCompanyName(DEMO_COMPANY_RECORD.companyName);
    setCinNumber(DEMO_COMPANY_RECORD.cinNumber);
    setCompanyPan(DEMO_COMPANY_RECORD.companyPan);
    setGstNumber(DEMO_COMPANY_RECORD.gstNumber);
    setMsmeNumber(DEMO_COMPANY_RECORD.msmeUdyamNumber);
    setDirectorsList(DEMO_COMPANY_RECORD.directors);
    setFullName('Nimish Jain (Managing Director)');
    setHandle('krypton.corp.sat');
    setEmail('treasury@krypton.sat');
    setErrorMsg('');
  };

  const handleSelectNationality = (selected: UserNationality) => {
    setNationality(selected);
    if ((selected === 'foreigner' || selected === 'foreign') && onLaunchForeignerPortal) {
      onClose();
      onLaunchForeignerPortal();
      return;
    }
    if (mode === 'login') {
      setStep('details');
    } else {
      setStep('account_type');
    }
  };

  const handleSelectAccountType = (selected: UserAccountType) => {
    setAccountType(selected);
    if (selected === 'business') {
      // Auto load demo company for rapid seamless review
      handleLoadDemoCompany();
      setStep('company_records');
    } else {
      setStep('first_time_check');
    }
  };

  const handleSelectFirstTime = (firstTime: boolean) => {
    setIsFirstTimeUser(firstTime);
    setStep('details');
  };

  const handleProceedFromCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !cinNumber.trim() || !companyPan.trim()) {
      setErrorMsg('Please enter Company Name, CIN, and Company PAN.');
      return;
    }
    setErrorMsg('');
    setStep('details');
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (mode === 'signup') {
      if (!fullName.trim() || !mobileNumber.trim() || !email.trim() || !handle.trim()) {
        setErrorMsg('Please fill in all the required details to proceed.');
        return;
      }
    } else {
      if (!mobileNumber.trim()) {
        setErrorMsg('Please enter your registered mobile number or email.');
        return;
      }
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('otp');
      setResendTimer(30);
      setEnteredOtp('');
    }, 500);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (enteredOtp !== DEMO_OTP && enteredOtp !== '123456' && enteredOtp !== '1234') {
      setErrorMsg(`Invalid OTP. For demo purposes, use OTP: ${DEMO_OTP}`);
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('pin');
    }, 400);
  };

  const handleCompleteAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (pin.length < 4) {
      setErrorMsg('Please enter a 4-digit security PIN.');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      const cleanHandle = handle.startsWith('@') ? handle : `@${handle}`;
      
      const user: UserProfile = {
        name: fullName || (accountType === 'business' ? 'Krypton Technologies' : 'Sovereign Bitcoiner'),
        handle: cleanHandle,
        mobile: mobileNumber.startsWith('+91') ? mobileNumber : `+91 ${mobileNumber}`,
        email: email || 'user@satconnect.io',
        accountType: accountType,
        nationality: nationality,
        isFirstTimeUser: isFirstTimeUser,
        kycStatus: accountType === 'business' ? 'Corporate MSME Verified' : 'Verified',
        balanceBtc: accountType === 'business' ? 4.85000000 : 1.70186000,
        balanceInr: accountType === 'business' ? 40703140 : 142800,
        unconfirmedSats: 0,
        channelsCount: accountType === 'business' ? 18 : 8,
        securityScore: 99,
        pin: pin,
        lightningAddress: `${cleanHandle.replace('@', '')}@satconnect.me`,
        segwitAddress: 'bc1qsatconnectsovereign...882x',
        taprootAddress: 'bc1psatconnectvault...449m',
        memberSince: 'August 2026',
        companyProfile: accountType === 'business' ? {
          ...DEMO_COMPANY_RECORD,
          companyName: companyName || DEMO_COMPANY_RECORD.companyName,
          cinNumber: cinNumber || DEMO_COMPANY_RECORD.cinNumber,
          companyPan: companyPan || DEMO_COMPANY_RECORD.companyPan,
          gstNumber: gstNumber || DEMO_COMPANY_RECORD.gstNumber,
          msmeUdyamNumber: msmeNumber || DEMO_COMPANY_RECORD.msmeUdyamNumber,
          directors: directorsList.length > 0 ? directorsList : DEMO_COMPANY_RECORD.directors,
        } : undefined,
      };

      onLoginSuccess(user);
      onClose();
    }, 500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200 text-slate-900 scrollbar-thin"
        >
          {/* Header Banner - Angel One Royal Navy */}
          <div className="bg-[#0b1e48] p-6 text-white relative">
            <button
              id="auth-modal-close-btn"
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center shadow-md shadow-orange-500/30">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-mono tracking-tight">
                SAT<span className="text-orange-400">CONNECT</span>
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-500/30 text-blue-200 border border-blue-400/30 ml-2">
                100% SELF-CUSTODIAL
              </span>
            </div>

            <p className="text-xs text-slate-300 font-medium">
              {mode === 'signup'
                ? 'Scale Sovereign Handles & Multi-Sig Bitcoin Superlayer'
                : 'Log in to your SATCONNECT Superlayer Financial Dashboard'}
            </p>

            {/* Mode Switcher Tabs */}
            <div className="flex bg-slate-900/60 p-1 rounded-xl mt-4 border border-white/10 text-xs font-semibold">
              <button
                type="button"
                id="auth-switch-login"
                onClick={() => {
                  setMode('login');
                  setStep('details');
                  setErrorMsg('');
                }}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  mode === 'login'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Log In
              </button>
              <button
                type="button"
                id="auth-switch-signup"
                onClick={() => {
                  setMode('signup');
                  setStep('nationality');
                  setErrorMsg('');
                }}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  mode === 'signup'
                    ? 'bg-orange-500 text-white shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Open Free Sovereign Account
              </button>
            </div>
          </div>

          {/* Form Container */}
          <div className="p-6">
            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* STEP: NATIONALITY SELECTION */}
            {step === 'nationality' && mode === 'signup' && (
              <div className="space-y-4">
                <div className="text-center space-y-1 mb-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-2 border border-blue-200">
                    <Globe2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    Are you an Indian National or a Foreign National?
                  </h3>
                  <p className="text-xs text-slate-500">
                    Select your jurisdiction to configure local UPI settlement rails and sovereign threshold vaults.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Indian National Option */}
                  <button
                    type="button"
                    id="select-indian-national-btn"
                    onClick={() => handleSelectNationality('indian')}
                    className="p-5 rounded-2xl border-2 border-blue-500 bg-blue-50/50 hover:bg-blue-50 text-left transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">🇮🇳</span>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-200 text-blue-900">
                          UPI ACTIVE
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600">
                        Indian National
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Instant Lightning ↔ UPI Merchant settlement, PAN/GST compliance, and INR conversion.
                      </p>
                    </div>
                    <div className="mt-4 flex items-center text-xs font-bold text-blue-600 gap-1">
                      <span>Select Indian Citizen</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </button>

                  {/* Foreign National Option */}
                  <button
                    type="button"
                    id="select-foreign-national-btn"
                    onClick={() => handleSelectNationality('foreign')}
                    className="p-5 rounded-2xl border-2 border-slate-200 hover:border-slate-400 bg-white hover:bg-slate-50 text-left transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">🌐</span>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          GLOBAL SATS
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-slate-800">
                        Foreign National
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Pure non-custodial Bitcoin, cross-border remittances &amp; global LNURL. (Passport setup ready).
                      </p>
                    </div>
                    <div className="mt-4 flex items-center text-xs font-bold text-slate-700 gap-1">
                      <span>Select Global</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* STEP: ACCOUNT TYPE SELECTION (Individual vs Small Business) */}
            {step === 'account_type' && (
              <div className="space-y-4">
                <div className="text-center space-y-1 mb-4">
                  <h3 className="text-base font-bold text-slate-900">
                    Join as an Individual or a Small Business / Corporate?
                  </h3>
                  <p className="text-xs text-slate-500">
                    Choose your account tier. Small businesses unlock Corporate Bitcoin Treasury with Multi-Sig 3-of-5.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Individual Option */}
                  <button
                    type="button"
                    id="select-individual-btn"
                    onClick={() => handleSelectAccountType('individual')}
                    className="p-5 rounded-2xl border-2 border-slate-200 hover:border-blue-500 bg-white hover:bg-blue-50/30 text-left transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
                        <User className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600">
                        Individual User
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Single sovereign handle, instant UPI scanning, savings vaults, and zero custodial risk.
                      </p>
                    </div>
                    <div className="mt-4 flex items-center text-xs font-bold text-blue-600 gap-1">
                      <span>Continue as Individual</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </button>

                  {/* Small Business / Corporate Option */}
                  <button
                    type="button"
                    id="select-business-btn"
                    onClick={() => handleSelectAccountType('business')}
                    className="p-5 rounded-2xl border-2 border-orange-300 hover:border-orange-500 bg-orange-50/40 hover:bg-orange-50 text-left transition-all group flex flex-col justify-between shadow-sm"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                          <Building2 className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-orange-200 text-orange-900">
                          ENTERPRISE 4X
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-orange-600">
                        Small Business / Corporate
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        CIN, PAN, GST, MSME verification, Founders Bitcoin Treasury, Multi-Sig 3-of-5, &amp; 4x limits.
                      </p>
                    </div>
                    <div className="mt-4 flex items-center text-xs font-bold text-orange-600 gap-1">
                      <span>Fetch Company Records</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* STEP: FIRST TIME BITCOIN USER CHECK (For Individuals) */}
            {step === 'first_time_check' && (
              <div className="space-y-4">
                <div className="text-center space-y-1 mb-4">
                  <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-2 border border-amber-200">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    Are you a first-time Bitcoin user?
                  </h3>
                  <p className="text-xs text-slate-500">
                    We adapt the interface for zero-jargon simplicity and automated lightning channel management.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    id="first-time-yes-btn"
                    onClick={() => handleSelectFirstTime(true)}
                    className="p-5 rounded-2xl border-2 border-emerald-500 bg-emerald-50/50 hover:bg-emerald-50 text-center transition-all"
                  >
                    <div className="text-2xl mb-1">🌱</div>
                    <div className="text-sm font-bold text-emerald-900">Yes, First Time</div>
                    <p className="text-[11px] text-emerald-700 mt-1">
                      Enable Guided FinTech mode &amp; simplified UPI bridge
                    </p>
                  </button>

                  <button
                    type="button"
                    id="first-time-no-btn"
                    onClick={() => handleSelectFirstTime(false)}
                    className="p-5 rounded-2xl border-2 border-slate-200 hover:border-slate-400 bg-white text-center transition-all"
                  >
                    <div className="text-2xl mb-1">⚡</div>
                    <div className="text-sm font-bold text-slate-900">No, Experienced</div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Full node pubkey, mempool gas controls, &amp; raw scripts
                    </p>
                  </button>
                </div>
              </div>
            )}

            {/* STEP: COMPANY / SMALL BUSINESS RECORDS FETCHER */}
            {step === 'company_records' && (
              <form onSubmit={handleProceedFromCompany} className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-orange-600" />
                      Corporate &amp; MSME Treasury Records
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Verified with MCA21 &amp; GSTIN databases for enterprise 4x limits.
                    </p>
                  </div>
                  <button
                    type="button"
                    id="load-demo-company-btn"
                    onClick={handleLoadDemoCompany}
                    className="px-2.5 py-1.5 rounded-lg bg-orange-100 hover:bg-orange-200 text-orange-800 text-xs font-bold font-mono transition-colors"
                  >
                    ⚡ Load Demo Company
                  </button>
                </div>

                {/* Company Name & Legal Entity */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Company Registered Name
                  </label>
                  <input
                    type="text"
                    id="business-name-input"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Krypton SATS Technologies Pvt Ltd"
                    required
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold bg-slate-50/50 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Grid: CIN, Company PAN, GSTIN */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      CIN Number
                    </label>
                    <input
                      type="text"
                      id="business-cin-input"
                      value={cinNumber}
                      onChange={(e) => setCinNumber(e.target.value)}
                      placeholder="U72900KA2024PTC189201"
                      required
                      className="w-full px-2.5 py-2 rounded-xl border border-slate-300 text-xs font-mono font-bold bg-slate-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Company PAN
                    </label>
                    <input
                      type="text"
                      id="business-pan-input"
                      value={companyPan}
                      onChange={(e) => setCompanyPan(e.target.value)}
                      placeholder="AAACK9982M"
                      required
                      className="w-full px-2.5 py-2 rounded-xl border border-slate-300 text-xs font-mono font-bold bg-slate-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      GSTIN Number
                    </label>
                    <input
                      type="text"
                      id="business-gst-input"
                      value={gstNumber}
                      onChange={(e) => setGstNumber(e.target.value)}
                      placeholder="29AAACK9982M1Z5"
                      className="w-full px-2.5 py-2 rounded-xl border border-slate-300 text-xs font-mono font-bold bg-slate-50/50"
                    />
                  </div>
                </div>

                {/* MSME Udyam Registration & Cross Border Remit */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      MSME Udyam Number
                    </label>
                    <input
                      type="text"
                      id="business-msme-input"
                      value={msmeNumber}
                      onChange={(e) => setMsmeNumber(e.target.value)}
                      placeholder="UDYAM-KR-03-0029812"
                      className="w-full px-2.5 py-2 rounded-xl border border-slate-300 text-xs font-mono bg-slate-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Export-Import Code (IEC)
                    </label>
                    <input
                      type="text"
                      value={DEMO_COMPANY_RECORD.exportImportCode}
                      readOnly
                      className="w-full px-2.5 py-2 rounded-xl border border-slate-300 text-xs font-mono bg-slate-100 text-slate-600 font-bold"
                    />
                  </div>
                </div>

                {/* Founders & Authorities in the Company with Bitcoin Savings Wallets */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-blue-600" />
                      Founders &amp; Authorized Multi-Sig Signatories ({DEMO_COMPANY_RECORD.directors.length})
                    </span>
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-bold">
                      3-of-5 Multisig Quorum
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {DEMO_COMPANY_RECORD.directors.map((dir) => (
                      <div
                        key={dir.id}
                        className="p-2 rounded-lg bg-white border border-slate-200 text-[11px] flex items-center justify-between"
                      >
                        <div>
                          <div className="font-bold text-slate-900 flex items-center gap-1.5">
                            <span>{dir.name}</span>
                            <span className="text-[10px] font-normal text-slate-500">({dir.designation})</span>
                          </div>
                          <div className="font-mono text-[10px] text-slate-500">
                            PAN: <strong className="text-slate-700">{dir.panNumber}</strong> • DIN: {dir.dinNumber}
                          </div>
                        </div>
                        <div className="text-right font-mono">
                          <div className="text-xs font-bold text-orange-600">
                            {dir.savingsBalanceBtc.toFixed(2)} BTC
                          </div>
                          <div className="text-[10px] text-emerald-600 font-semibold">
                            ✓ Key Shard Active
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  id="confirm-company-details-btn"
                  className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all cursor-pointer"
                >
                  <span>Verify Company &amp; Proceed to Sovereign Handle</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* STEP: BASIC DETAILS ENTRY */}
            {step === 'details' && (
              <form onSubmit={handleSendOtp} className="space-y-4">
                {mode === 'signup' && (
                  <>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs flex items-center justify-between text-blue-900">
                      <div>
                        <span className="font-bold">Account: </span>
                        <span className="font-semibold capitalize">
                          {accountType === 'business' ? 'Corporate Business (4x Limits)' : 'Individual Sovereign'}
                        </span>
                        <span className="ml-2 font-mono text-slate-500">({nationality})</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setStep('account_type')}
                        className="text-blue-700 font-bold underline text-[11px]"
                      >
                        Change
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name / Authorized Signatory
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          id="signup-fullname"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Nimish Jain"
                          required
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Desired Sovereign Handle
                      </label>
                      <div className="relative">
                        <span className="text-slate-400 font-mono text-sm absolute left-3 top-1/2 -translate-y-1/2">
                          @
                        </span>
                        <input
                          type="text"
                          id="signup-handle"
                          value={handle}
                          onChange={(e) => setHandle(e.target.value.replace('@', ''))}
                          placeholder={accountType === 'business' ? 'krypton.corp.sat' : 'nimish.sat'}
                          required
                          className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        {accountType === 'business'
                          ? 'Gold Corporate Sovereign Handle badge with Multi-Sig routing.'
                          : '100% Free & Self-Custodial. Routes across Lightning, LNURL, and UPI.'}
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          id="signup-email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@company.com"
                          required
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Number (for instant OTP verification)
                  </label>
                  <div className="flex gap-2">
                    <span className="inline-flex items-center px-3 rounded-xl border border-slate-300 bg-slate-100 text-xs font-mono font-semibold text-slate-700">
                      🇮🇳 +91
                    </span>
                    <div className="relative flex-1">
                      <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        id="auth-mobile-input"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder="98765 43210"
                        required
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    id="auth-submit-details-btn"
                    disabled={isProcessing}
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    {isProcessing ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>Get Instant OTP via SMS</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* STEP: OTP VERIFICATION */}
            {step === 'otp' && (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-800 flex items-center justify-between">
                  <div>
                    <span className="font-semibold">OTP sent to: </span>
                    <span className="font-mono">+91 {mobileNumber}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep('details')}
                    className="text-blue-600 underline font-semibold text-[11px]"
                  >
                    Change
                  </button>
                </div>

                {/* Demo OTP Helper Box */}
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Demo OTP Code: <strong className="font-mono text-amber-900">{DEMO_OTP}</strong></span>
                  </div>
                  <button
                    type="button"
                    id="auto-fill-otp-btn"
                    onClick={() => setEnteredOtp(DEMO_OTP)}
                    className="px-2 py-1 rounded bg-amber-200 hover:bg-amber-300 text-amber-900 font-bold text-[10px] uppercase font-mono transition-colors"
                  >
                    Auto Fill
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 text-center">
                    Enter 4-Digit One Time Password (OTP)
                  </label>
                  <div className="relative">
                    <Key className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      id="auth-otp-input"
                      maxLength={6}
                      value={enteredOtp}
                      onChange={(e) => setEnteredOtp(e.target.value)}
                      placeholder="e.g. 5829"
                      autoFocus
                      required
                      className="w-full pl-9 pr-3 py-3 rounded-xl border border-slate-300 text-center font-mono text-xl font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    id="auth-verify-otp-btn"
                    disabled={isProcessing}
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    {isProcessing ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>Verify &amp; Proceed</span>
                        <CheckCircle2 className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* STEP: SECURITY PIN SETUP */}
            {step === 'pin' && (
              <form onSubmit={handleCompleteAuth} className="space-y-4">
                <div className="text-center space-y-1 mb-2">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 mb-2">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {mode === 'signup' ? 'Set Your 4-Digit Security PIN' : 'Enter Security PIN'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Secures non-custodial key authorization &amp; payment signing.
                  </p>
                </div>

                <div>
                  <input
                    type="password"
                    id="auth-pin-input"
                    maxLength={4}
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="••••"
                    autoFocus
                    required
                    className="w-full py-3 rounded-xl border border-slate-300 text-center font-mono text-2xl font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                  />
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setPin('1234')}
                    className="text-[11px] text-slate-500 hover:text-emerald-700 underline font-mono"
                  >
                    Use Demo PIN: 1234
                  </button>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    id="auth-complete-btn"
                    disabled={isProcessing}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    {isProcessing ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>Launch SATCONNECT Sovereign Dashboard</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
