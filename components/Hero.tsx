"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const SplineScene = dynamic(() => import("./SplineScene"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#0A0A0A]" />,
});

const skillCards = [
  {
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: "FULL-STACK DEVELOPMENT",
    subtitle: "MERN / Next.js Stack",
  },
  {
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "AI INTEGRATION",
    subtitle: "RAG, DINOv2, OpenAI",
  },
  {
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 7v10c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3V7c0-2-1.5-3-3.5-3h-9C5.5 4 4 5 4 7z" />
      </svg>
    ),
    title: "MULTI-TENANT BACKENDS",
    subtitle: "REST APIs, Redis, BullMQ",
  },
  {
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    title: "CLOUD & DEVOPS",
    subtitle: "AWS S3, VPS, Docker",
  },
  {
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "REAL-TIME SYSTEMS",
    subtitle: "WebSockets, Voice AI",
  },
];

const attributes = [
  { icon: "💡", label: "Problem Solver" },
  { icon: "🏗️", label: "Clean Architect" },
  { icon: "⚡", label: "AI-Integrated" },
  { icon: "🎯", label: "Detail Oriented" },
  { icon: "📈", label: "Results Driven" },
];

export default function Hero({ onSplineLoad }: { onSplineLoad?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  // Monitor visibility to sleep Spline when scrolling past hero
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative h-screen max-h-screen w-full bg-[#0A0A0A] text-[#F0F0F0] overflow-hidden flex flex-col justify-between pt-16 md:pt-20 pb-3 md:pb-4 px-6 md:px-12 select-none"
    >
      {/* Cyber Neon Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-neon/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[250px] bg-blue-neon/5 blur-[90px] rounded-full pointer-events-none z-0" />

      {/* 1. Giant Background Typography (AHMER) - Scaled to never overflow */}
      <div className="absolute top-[8%] left-0 right-0 z-0 flex justify-center items-center pointer-events-none overflow-hidden">
        <h1
          className="text-[19vw] lg:text-[17vw] font-black leading-none tracking-tighter uppercase select-none opacity-20"
          style={{
            fontFamily: "var(--font-sans), sans-serif",
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(168, 85, 247, 0.45)",
            textShadow: "0 0 50px rgba(168, 85, 247, 0.25)",
          }}
        >
          AHMER
        </h1>
      </div>

      {/* 2. Main Middle Composition (Left Content + Center 3D Spline Robot + Right Quote) */}
      <div className="relative z-10 max-w-[1440px] mx-auto w-full flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 items-center gap-4 my-auto">
        
        {/* Left Side: Headline & Bio (4 cols) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:col-span-4 z-20 text-left pointer-events-auto flex flex-col justify-center"
        >
          <div className="inline-block mb-2">
            <span className="text-[10px] md:text-[11px] font-mono font-bold tracking-widest text-purple-neon uppercase">
              FULL-STACK DEVELOPER (MERN/PERN)
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-[3.2rem] xl:text-[3.6rem] font-black text-white leading-[0.98] tracking-tight mb-3 md:mb-4">
            I Build<span className="inline-block w-2 md:w-2.5 h-2 md:h-2.5 bg-purple-neon shadow-[0_0_10px_#a855f7] ml-1 mb-0.5 align-baseline rounded-[2px]" />
            <br />
            Ship<span className="inline-block w-2 md:w-2.5 h-2 md:h-2.5 bg-purple-neon shadow-[0_0_10px_#a855f7] ml-1 mb-0.5 align-baseline rounded-[2px]" />
            <br />
            Scale<span className="inline-block w-2 md:w-2.5 h-2 md:h-2.5 bg-purple-neon shadow-[0_0_10px_#a855f7] ml-1 mb-0.5 align-baseline rounded-[2px]" />
          </h2>

          <p className="text-xs md:text-sm text-zinc-400 leading-relaxed max-w-xs mb-5 font-normal">
            I build production-grade web systems with clean architecture, powerful APIs, and exceptional user experiences.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#connect"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-neon to-blue-neon text-white font-extrabold text-[11px] rounded-full hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-all transform hover:scale-105 active:scale-95 shadow-md tracking-wider uppercase"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book a Call
            </a>

            <a
              href="#work"
              className="inline-flex items-center gap-2 px-5 py-2.5 glass hover:bg-white/10 text-white font-extrabold text-[11px] rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-sm tracking-wider"
            >
              View My Work
              <span className="text-xs">➔</span>
            </a>
          </div>
        </motion.div>

        {/* Center: Live 3D Spline Robot (5 cols) */}
        <div className="lg:col-span-5 h-[40vh] sm:h-[45vh] lg:h-[50vh] xl:h-[54vh] max-h-[500px] relative flex items-center justify-center z-10 pointer-events-auto">
          <div className="w-full h-full relative flex items-center justify-center">
            <Suspense fallback={<div className="w-full h-full bg-[#0A0A0A]" />}>
              <SplineScene onLoad={onSplineLoad} isVisible={isHeroVisible} />
            </Suspense>
          </div>

          {/* Floating Badge 1: 3+ Years of Experience (Left) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute -left-2 sm:left-0 top-[28%] md:top-[30%] z-30 bg-zinc-950/85 backdrop-blur-xl border border-white/10 p-2.5 md:p-3 rounded-xl shadow-[0_8px_25px_rgba(0,0,0,0.6)] flex items-center gap-2.5 cursor-default hover:border-purple-neon/40 hover:scale-105 transition-all pointer-events-auto"
          >
            <div className="w-8 h-8 rounded-lg bg-purple-neon/20 border border-purple-neon/30 flex items-center justify-center text-sm shadow-sm">
              🚀
            </div>
            <div>
              <p className="text-xs md:text-sm font-black text-white leading-none">3+</p>
              <p className="text-[9px] md:text-[10px] font-semibold text-zinc-400 tracking-tight">Years of Experience</p>
            </div>
          </motion.div>

          {/* Floating Badge 2: 15+ Production Systems (Lower Left) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute -left-2 sm:left-2 bottom-[15%] md:bottom-[18%] z-30 bg-zinc-950/85 backdrop-blur-xl border border-white/10 p-2.5 md:p-3 rounded-xl shadow-[0_8px_25px_rgba(0,0,0,0.6)] flex items-center gap-2.5 cursor-default hover:border-purple-neon/40 hover:scale-105 transition-all pointer-events-auto"
          >
            <div className="w-8 h-8 rounded-lg bg-purple-neon/20 border border-purple-neon/30 flex items-center justify-center text-sm shadow-sm">
              🗄️
            </div>
            <div>
              <p className="text-xs md:text-sm font-black text-white leading-none">15+</p>
              <p className="text-[9px] md:text-[10px] font-semibold text-zinc-400 tracking-tight">Production Systems</p>
            </div>
          </motion.div>

          {/* Floating Badge 3: Qualities / Skill Stack List (Right Side) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="absolute -right-2 sm:right-0 top-[22%] md:top-[25%] z-30 bg-zinc-950/85 backdrop-blur-xl border border-white/10 p-3 rounded-xl shadow-[0_8px_25px_rgba(0,0,0,0.6)] space-y-1.5 cursor-default hover:border-purple-neon/40 hover:scale-[1.02] transition-all hidden sm:block pointer-events-auto"
          >
            {attributes.map((attr) => (
              <div key={attr.label} className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-md bg-purple-neon/20 border border-purple-neon/30 flex items-center justify-center text-[10px]">
                  {attr.icon}
                </span>
                <span className="text-[10px] md:text-[11px] font-bold text-zinc-300">
                  {attr.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Side: Impact Statement (3 cols) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="lg:col-span-3 z-20 text-left pointer-events-auto hidden lg:flex flex-col justify-center pl-4"
        >
          <p className="text-base xl:text-lg text-zinc-300 font-medium leading-relaxed max-w-[240px] xl:max-w-[270px]">
            Turning ideas into powerful{" "}
            <span className="text-white font-black">digital products</span> that create{" "}
            <span className="text-white font-black">real impact</span>.
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-purple-neon to-blue-neon mt-3 rounded-full shadow-[0_0_8px_#a855f7]" />
        </motion.div>
      </div>

      {/* 3. Bottom Floating Skills Ticker / Dock - Compact to fit inside viewport */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="relative z-20 max-w-7xl mx-auto w-full px-2 md:px-6 shrink-0 mb-1"
      >
        <div className="bg-zinc-950/85 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl p-2 md:p-3 shadow-[0_8px_30px_rgba(0,0,0,0.6)] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3 divide-y sm:divide-y-0 sm:divide-x divide-white/5">
          {skillCards.map((skill, index) => (
            <div
              key={skill.title}
              className={`flex items-center gap-2.5 px-2 py-1 ${
                index !== 0 ? "sm:pl-3" : ""
              } group cursor-default`}
            >
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-white/5 border border-white/10 text-purple-neon flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-purple-neon/20 transition-all">
                {skill.icon}
              </div>
              <div className="overflow-hidden">
                <h3 className="text-[9px] md:text-[10px] font-extrabold text-white tracking-tight uppercase truncate">
                  {skill.title}
                </h3>
                <p className="text-[8px] md:text-[9px] text-zinc-400 font-medium truncate">
                  {skill.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Floating Quick Action / Chat Button (Bottom Right) */}
      <a
        href="#connect"
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 w-11 h-11 md:w-12 md:h-12 bg-gradient-to-tr from-purple-neon to-blue-neon text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.5)] border border-white/20 hover:scale-110 active:scale-95 transition-transform"
        aria-label="Contact Ahmer"
      >
        <span className="text-lg md:text-xl">🤖</span>
      </a>
    </section>
  );
}
