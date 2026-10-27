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
  const [phaseText, setPhaseText] = useState("Sinkronisasi platform...");

  const handleDismiss = React.useCallback(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("sigap_welcome_seen", "true");
    }
    setVisible(false);
    if (onFinish) onFinish();
  }, [onFinish]);

  useEffect(() => {
    // Check if the user has already seen the welcome screen in this session
    const hasSeen = typeof window !== "undefined" ? sessionStorage.getItem("sigap_welcome_seen") : null;
    
    if (forceShow || !hasSeen) {
      setVisible(true);
      
      // Animated progress stages over 2.2 seconds
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 35);

      const t1 = setTimeout(() => {
        setPhaseText("Menyiapkan analitik transaksi...");
      }, 700);

      const t2 = setTimeout(() => {
        setPhaseText("Selamat Datang di SIGAP UMKM");
      }, 1500);

      const t3 = setTimeout(() => {
        handleDismiss();
      }, 2400);

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
          key="sigap-welcome-screen"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.02, 
            filter: "blur(6px)",
            transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } 
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#000F22] text-white px-6 select-none overflow-hidden"
        >
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-sigap-primary/20 blur-[120px] pointer-events-none" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-amber-500/10 blur-[90px] pointer-events-none" />

          {/* Minimalist Skip Button */}
          <div className="absolute top-6 right-6 z-20">
            <button
              onClick={handleDismiss}
              className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-sigap-light/70 hover:text-white px-3 py-1.5 rounded-full border border-white/10 hover:border-white/25 bg-white/5 backdrop-blur-md transition-all active:scale-95"
            >
              <span>Lewati</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          {/* Center Brand & Loading Reveal */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-md w-full">
            {/* Logo Icon with Subtle Floating Pulse */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-6"
            >
              <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-gradient-to-br from-sigap-dark via-[#1B3554] to-sigap-darkest p-3 shadow-2xl border border-white/15 flex items-center justify-center">
                <Image
                  src="/LOGO AJA.png"
                  alt="SIGAP Logo"
                  width={64}
                  height={64}
                  priority
                  className="object-contain drop-shadow-md"
                />
              </div>
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-sigap-light/30 to-sigap-yellow/30 blur-md -z-10 opacity-70" />
            </motion.div>

            {/* Typography */}
            <motion.div
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-1 mb-8"
            >
              <div className="flex items-center justify-center gap-2">
                <span className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                  SIGAP
                </span>
                <span className="rounded-md bg-sigap-yellow/20 px-2 py-0.5 font-display text-xs md:text-sm font-bold tracking-widest uppercase text-amber-300 border border-sigap-yellow/40">
                  UMKM
                </span>
              </div>
              <p className="text-xs md:text-sm font-normal text-sigap-light/75 tracking-wide max-w-xs mx-auto">
                Sistem Integrasi Gerbang Akses Pembiayaan
              </p>
            </motion.div>

            {/* Ultra-sleek Minimalist Progress Line */}
            <motion.div 
              initial={{ opacity: 0, scaleX: 0.9 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="w-48 sm:w-56 h-[3px] rounded-full bg-white/10 overflow-hidden relative mb-4"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-sigap-light via-sigap-soft to-sigap-yellow rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </motion.div>

            {/* Dynamic Status Text */}
            <motion.p
              key={phaseText}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-[11px] font-medium tracking-wider text-slate-400"
            >
              {phaseText}
            </motion.p>
          </div>

          {/* Minimalist Bottom Brand Mark */}
          <div className="absolute bottom-6 text-[10px] text-slate-500 tracking-widest uppercase font-semibold">
            Inklusivitas Finansial Indonesia
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
