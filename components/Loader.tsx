"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const marqueeText = "FULL STACK ENGINEER • MOBILE APPS • SCALABLE SYSTEMS • AI INTEGRATIONS • ";

export default function Loader({ onComplete, isReady }: { onComplete: () => void; isReady: boolean }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate to 90% quickly, then hold until Spline is actually ready
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return Math.min(prev + 3, 90);
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    // Spline loaded — animate to 100% then exit
    setProgress(100);
    const t = setTimeout(onComplete, 600);
    return () => clearTimeout(t);
  }, [isReady, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#f3f4f6]"
    >
      {/* Marquee Background */}
      <div className="absolute inset-0 flex flex-col justify-around opacity-10 select-none pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: i % 2 === 0 ? 0 : -1000 }}
            animate={{ x: i % 2 === 0 ? -1000 : 0 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="whitespace-nowrap text-8xl font-black text-black"
          >
            {marqueeText.repeat(10)}
          </motion.div>
        ))}
      </div>

      {/* Central Pill Loader */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 flex items-center justify-between px-8 py-4 bg-black rounded-full shadow-[0_0_30px_rgba(168,85,247,0.4)] border border-purple-500/20 w-64"
      >
        <span className="text-white font-medium tracking-widest text-sm">
          {progress < 100 ? "LOADING" : "READY"}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-white font-bold text-lg min-w-[3ch] text-right">
            {Math.round(progress)}
          </span>
          <span className="text-purple-400 font-bold text-lg">%</span>
        </div>

        <motion.div
          className="absolute inset-0 rounded-full border-2 border-purple-500"
          style={{
            clipPath: `inset(0 ${100 - progress}% 0 0)`,
            filter: "blur(2px)",
          }}
        />
      </motion.div>

      {/* Audio Wave Decorator */}
      <div className="absolute top-8 right-8 flex items-end gap-1 h-8">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ height: [10, 30, 15, 25, 10] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
            className="w-1 bg-black rounded-full"
          />
        ))}
      </div>
    </motion.div>
  );
}
