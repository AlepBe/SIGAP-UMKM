"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";

interface WelcomeScreenProps {
  forceShow?: boolean;
  onFinish?: () => void;
}

export function WelcomeScreen({ forceShow = false, onFinish }: WelcomeScreenProps) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phaseText, setPhaseText] = useState("Memuat ekosistem...");

  const handleDismiss = React.useCallback(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("sigap_welcome_seen", "true");
    }
    setVisible(false);
    if (onFinish) onFinish();
  }, [onFinish]);

  useEffect(() => {
    const hasSeen = typeof window !== "undefined" ? sessionStorage.getItem("sigap_welcome_seen") : null;
    
    if (forceShow || !hasSeen) {
      setVisible(true);
      
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 3;
        });
      }, 30);

      const t1 = setTimeout(() => {
        setPhaseText("Menyiapkan analitik...");
      }, 600);

      const t2 = setTimeout(() => {
        setPhaseText("Selamat datang");
      }, 1200);

      const t3 = setTimeout(() => {
        handleDismiss();
      }, 1800);

      return () => {
        clearInterval(interval);
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [forceShow, handleDismiss]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sigap-modern-loader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 0.98, 
            filter: "blur(8px)",
            transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-sigap-darkest text-white px-6 select-none overflow-hidden"
        >
          {/* Subtle Ambient Glow matching theme */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-sigap-primary/20 blur-[120px] pointer-events-none" />

          {/* Minimalist Skip Button */}
          <div className="absolute top-6 right-6 z-20">
            <button
              onClick={handleDismiss}
              className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-wider text-slate-400 hover:text-white px-3 py-1.5 rounded-full border border-white/10 hover:border-white/20 bg-white/5 backdrop-blur-md transition-all active:scale-95"
            >
              <span>Lewati</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          {/* Center Brand Minimalist Reveal */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-sm w-full">
            {/* Logo in Sleek Glass Container */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-6"
            >
              <div className="relative h-16 w-16 md:h-18 md:w-18 rounded-2xl bg-white/5 border border-white/15 p-3.5 shadow-2xl backdrop-blur-md flex items-center justify-center">
                <Image
                  src="/LOGO AJA.png"
                  alt="SIGAP Logo"
                  width={56}
                  height={56}
                  priority
                  className="object-contain"
                />
              </div>
            </motion.div>

            {/* Clean Minimalist Typography */}
            <motion.div
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-1 mb-8"
            >
              <h2 className="font-display text-xl md:text-2xl font-bold tracking-tight text-white">
                SIGAP UMKM
              </h2>
              <p className="text-xs text-sigap-light/70 font-normal tracking-wide">
                Digitalisasi &amp; Akselerasi Finansial
              </p>
            </motion.div>

            {/* Ultra-sleek Minimalist Progress Line */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="w-44 sm:w-52 h-[2px] rounded-full bg-white/10 overflow-hidden relative mb-3"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-sigap-light via-sigap-primary to-sigap-yellow rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </motion.div>

            {/* Dynamic Status Text */}
            <motion.p
              key={phaseText}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="text-[11px] font-medium tracking-wide text-slate-400"
            >
              {phaseText}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
