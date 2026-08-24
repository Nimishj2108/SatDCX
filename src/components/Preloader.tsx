import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, ShieldCheck } from 'lucide-react';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [phase, setPhase] = useState<'converging' | 'revealing' | 'ready'>('converging');

  const finish = () => {
    sessionStorage.setItem('satconnect_preloaded_seen', 'true');
    setIsVisible(false);
    if (typeof onComplete === 'function') {
      onComplete();
    }
  };

  useEffect(() => {
    // Check if user has already seen preloader in this session
    const hasSeen = sessionStorage.getItem('satconnect_preloaded_seen');
    if (hasSeen) {
      setIsVisible(false);
      if (typeof onComplete === 'function') {
        onComplete();
      }
      return;
    }

    const t1 = setTimeout(() => {
      setPhase('revealing');
    }, 900);

    const t2 = setTimeout(() => {
      setPhase('ready');
    }, 1800);

    const t3 = setTimeout(() => {
      finish();
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  const handleSkip = () => {
    finish();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="preloader-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020617] text-white px-6 overflow-hidden"
        >
          {/* Subtle background ambient glow */}
          <div className="absolute w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl -translate-y-20 pointer-events-none" />

          {/* Skip button */}
          <button
            id="preloader-skip-btn"
            onClick={handleSkip}
            className="absolute top-6 right-6 text-xs text-slate-400 hover:text-amber-400 transition-colors px-3 py-1.5 rounded-full border border-slate-800 bg-slate-900/60 backdrop-blur cursor-pointer"
          >
            Skip Intro ↗
          </button>

          <div className="relative flex flex-col items-center max-w-md w-full">
            {/* Namaste / Geometric converging gesture visual */}
            <div className="relative w-36 h-36 flex items-center justify-center mb-8">
              {/* Left converging curve (Orange) */}
              <motion.div
                initial={{ x: -45, opacity: 0.2, rotate: -25 }}
                animate={{
                  x: phase === 'converging' ? -12 : 0,
                  opacity: 1,
                  rotate: 0,
                }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="absolute w-16 h-28 rounded-full border-t-2 border-l-2 border-b border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                style={{
                  borderRadius: '60% 40% 50% 50% / 60% 50% 50% 40%',
                }}
              />

              {/* Right converging curve (Cyan/Blue) */}
              <motion.div
                initial={{ x: 45, opacity: 0.2, rotate: 25 }}
                animate={{
                  x: phase === 'converging' ? 12 : 0,
                  opacity: 1,
                  rotate: 0,
                }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="absolute w-16 h-28 rounded-full border-t-2 border-r-2 border-b border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                style={{
                  borderRadius: '40% 60% 50% 50% / 50% 60% 40% 50%',
                }}
              />

              {/* Center unification node */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: phase === 'revealing' || phase === 'ready' ? 1 : 0.4,
                  opacity: phase === 'revealing' || phase === 'ready' ? 1 : 0.3,
                }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative z-10 w-6 h-6 rounded-full bg-gradient-to-tr from-amber-400 to-cyan-400 flex items-center justify-center shadow-[0_0_25px_rgba(245,158,11,0.6)]"
              >
                <Zap className="w-3.5 h-3.5 text-slate-950 fill-slate-950" />
              </motion.div>
            </div>

            {/* Brand Name Typography */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{
                opacity: phase === 'revealing' || phase === 'ready' ? 1 : 0,
                y: phase === 'revealing' || phase === 'ready' ? 0 : 12,
              }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-mono">
                  SAT<span className="text-amber-400">CONNECT</span>
                </span>
              </div>
              <p className="text-sm font-medium text-slate-400 tracking-wide">
                Bitcoin. Lightning. Seamless.
              </p>
            </motion.div>

            {/* Subtitle / Philosophy Tag */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: phase === 'ready' ? 1 : 0,
              }}
              transition={{ duration: 0.5 }}
              className="mt-6 flex items-center gap-2 text-xs font-mono text-cyan-300/80 bg-cyan-950/40 border border-cyan-800/40 px-3.5 py-1.5 rounded-full"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>One Identity. Any Wallet.</span>
            </motion.div>

            {/* Minimalist progress bar */}
            <div className="w-48 h-1 bg-slate-800/80 rounded-full mt-8 overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.2, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-amber-400 via-amber-300 to-cyan-400 rounded-full"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
