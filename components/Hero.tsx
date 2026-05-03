"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Suspense, useEffect, useState } from "react";

const SplineScene = dynamic(() => import("./SplineScene"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#0A0A0A]" />,
});

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-[800px] opacity-10">
          <div className="w-full h-full bg-gradient-to-tr from-purple-neon via-blue-neon to-purple-neon blur-[120px] rounded-full" />
        </div>
      </div>

      {/* 3D Scene Container */}
      <div className="absolute inset-0 z-10">
        <Suspense fallback={<div className="w-full h-full bg-[#0A0A0A]" />}>
          <SplineScene />
        </Suspense>
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 w-full max-w-7xl px-8 pointer-events-none">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-purple-neon font-mono tracking-widest mb-4">
              HELLO! I'M
            </h2>
            <h1 className="text-7xl md:text-8xl font-black mb-6 leading-tight">
              AHMER <br />
              <span className="text-zinc-500 font-light">KHAN</span>
            </h1>
            
            <div className="h-1 w-20 bg-purple-neon mb-8" />
            
            <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-lg leading-relaxed">
              Building <span className="text-white font-medium">Scalable Web & Mobile Systems</span> with a focus on AI integrations and production-ready architecture.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 flex gap-6 pointer-events-auto"
          >
            <a 
              href="#work"
              className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-all active:scale-95"
            >
              VIEW WORK
            </a>
            <a 
              href="#connect"
              className="px-8 py-4 glass text-white font-bold rounded-full hover:bg-white/10 transition-all active:scale-95"
            >
              CONNECT
            </a>
          </motion.div>
        </div>
      </div>

      {/* Floating Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-[0.3em] text-zinc-500 uppercase">Scroll</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-[1px] h-12 bg-gradient-to-b from-purple-neon to-transparent"
        />
      </div>
    </section>
  );
}
