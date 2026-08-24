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
  RefreshCw
} from 'lucide-react';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [step, setStep] = useState<'details' | 'otp' | 'pin'>('details');

  // Form State
  const [fullName, setFullName] = useState('Nimish Jain');
  const [mobileNumber, setMobileNumber] = useState('9876543210');
  const [email, setEmail] = useState('nimish@satconnect.io');
  const [handle, setHandle] = useState('nimish.sat');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [pin, setPin] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [errorMsg, setErrorMsg] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Demo hardcoded OTP
  const DEMO_OTP = '5829';

  useEffect(() => {
    setMode(initialMode);
    setStep('details');
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
    }, 600);
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
    }, 500);
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
        name: fullName || 'Sovereign Bitcoiner',
        handle: cleanHandle,
        mobile: mobileNumber.startsWith('+91') ? mobileNumber : `+91 ${mobileNumber}`,
        email: email || 'user@satconnect.io',
        kycStatus: 'Verified',
        balanceBtc: 1.70186,
        balanceInr: 142800,
        unconfirmedSats: 0,
        channelsCount: 8,
        securityScore: 98,
        pin: pin,
        lightningAddress: `${cleanHandle.replace('@', '')}@satconnect.me`,
        memberSince: 'August 2026',
      };

      onLoginSuccess(user);
      onClose();
    }, 600);
  };

  const handleFillDemoOtp = () => {
    setEnteredOtp(DEMO_OTP);
    setErrorMsg('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900"
        >
          {/* Header Banner - Angel One Royal Blue */}
          <div className="bg-[#0b1e48] p-6 text-white relative">
            <button
              id="auth-modal-close-btn"
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center shadow-md shadow-orange-500/30">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-mono tracking-tight">
                SAT<span className="text-orange-400">CONNECT</span>
              </span>
            </div>

            <p className="text-xs text-slate-300 font-medium">
              {mode === 'signup'
                ? 'Open Your Sovereign Non-Custodial Bitcoin & Lightning Account'
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
                  setStep('details');
                  setErrorMsg('');
                }}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  mode === 'signup'
                    ? 'bg-orange-500 text-white shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Open Free Account
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6">
            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* STEP 1: Details Entry */}
            {step === 'details' && (
              <form onSubmit={handleSendOtp} className="space-y-4">
                {mode === 'signup' && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name (as per KYC/Govt ID)
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
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50/50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Desired SATCONNECT Handle
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
                          placeholder="nimish.sat"
                          required
                          className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50/50"
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Resolves automatically across Lightning, LNURL, and On-chain.
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
                          placeholder="name@domain.com"
                          required
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50/50"
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
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50/50"
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
                        <span>Get OTP via SMS</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% Non-Custodial · Zero Private Key Exposure · Instant Settlement</span>
                </div>
              </form>
            )}

            {/* STEP 2: OTP Verification */}
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
                    className="text-blue-600 underline font-semibold text-[11px] hover:text-blue-800"
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
                    onClick={handleFillDemoOtp}
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
                      className="w-full pl-9 pr-3 py-3 rounded-xl border border-slate-300 text-center font-mono text-xl font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50/50"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Didn&apos;t receive OTP?</span>
                  {resendTimer > 0 ? (
                    <span className="font-mono text-slate-400">Resend in {resendTimer}s</span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setResendTimer(30)}
                      className="text-blue-600 hover:underline font-semibold"
                    >
                      Resend OTP
                    </button>
                  )}
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

            {/* STEP 3: Security PIN Setup / Entry */}
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
                    Used to authorize high-value transactions &amp; multisig vaults.
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
                    className="w-full py-3 rounded-xl border border-slate-300 text-center font-mono text-2xl font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50/50"
                  />
                </div>

                {/* Demo PIN quick hint */}
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
                        <span>Enter SATCONNECT Dashboard</span>
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
