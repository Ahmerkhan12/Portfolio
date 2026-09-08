"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const marqueeText = "FULL STACK ENGINEER • MOBILE APPS • SCALABLE SYSTEMS • AI INTEGRATIONS • ";

export default function Loader({ onComplete, isReady }: { onComplete: () => void; isReady: boolean }) {
  const [progress, setProgress] = useState(0);
  const completedRef = useRef(false);

  const finishLoading = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setProgress(100);
    setTimeout(onComplete, 400);
  };

  useEffect(() => {
    // Smooth progress animation up to 90%
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return Math.min(prev + 5, 90);
      });
    }, 35);

    // Hard fallback safety timer: never block user longer than 2.5 seconds
    const fallbackTimer = setTimeout(() => {
      finishLoading();
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(fallbackTimer);
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;
    finishLoading();
  }, [isReady]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#0A0A0A]"
    >
      {/* Subtle Marquee Background in Dark Tones */}
      <div className="absolute inset-0 flex flex-col justify-around opacity-5 select-none pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: i % 2 === 0 ? 0 : -1000 }}
            animate={{ x: i % 2 === 0 ? -1000 : 0 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="whitespace-nowrap text-8xl font-black text-white"
          >
            {marqueeText.repeat(10)}
          </motion.div>
        ))}
      </div>

      {/* Ambient Cyberpunk Glow */}
      <div className="absolute w-[400px] h-[400px] bg-purple-neon/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Central Pill Loader */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 flex items-center justify-between px-8 py-4 bg-zinc-950/80 backdrop-blur-md rounded-full shadow-[0_0_40px_rgba(168,85,247,0.3)] border border-purple-500/30 w-72"
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-purple-neon animate-pulse" />
          <span className="text-zinc-300 font-mono tracking-widest text-xs uppercase">
            {progress < 100 ? "INITIALIZING" : "SYSTEM READY"}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-white font-mono font-bold text-base min-w-[3ch] text-right">
            {Math.round(progress)}
          </span>
          <span className="text-purple-400 font-mono text-sm">%</span>
        </div>

        <motion.div
          className="absolute inset-0 rounded-full border border-purple-500/60 pointer-events-none"
          style={{
            clipPath: `inset(0 ${100 - progress}% 0 0)`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}
