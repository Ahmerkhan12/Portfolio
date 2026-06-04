"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

const SplineScene = dynamic(() => import("./SplineScene"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#0A0A0A]" />,
});

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function SocialIcon({ icon, href }: { icon: string; href: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-white hover:text-purple-neon transition-colors text-xs font-mono tracking-widest vertical-text"
    >
      {icon}
    </a>
  );
}

export default function Hero({ onSplineLoad }: { onSplineLoad?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!robotRef.current || !nameRef.current || !titleRef.current || !aboutRef.current || !containerRef.current) return;

    // Scroll animation for the robot transition
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    });

    tl.to(robotRef.current, {
      xPercent: -18, // Final position: slightly right of center for perfect balance
      scale: 0.85,
      ease: "power2.inOut",
    })
      .to([nameRef.current, titleRef.current], {
        opacity: 0,
        y: -150,
        scale: 0.9,
        filter: "blur(10px)",
        ease: "power2.in",
      }, 0); // Start at the same time

    // About content animation
    gsap.fromTo(
      aboutRef.current,
      { opacity: 0, x: 100 },
      {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "center center",
          end: "bottom bottom",
          scrub: 1,
        }
      }
    );
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Sticky Hero & Robot Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-10">
        <div 
          ref={robotRef} 
          className="absolute inset-0 flex items-center justify-center pointer-events-auto"
        >
          <div className="w-full h-full max-w-7xl">
            <Suspense fallback={<div className="w-full h-full bg-[#0A0A0A]" />}>
              <SplineScene onLoad={onSplineLoad} />
            </Suspense>
          </div>
        </div>

        {/* Hero Content Overlays (Inside Sticky) */}
        <div className="absolute inset-0 flex items-center justify-between px-12 md:px-24 pointer-events-none z-20">
          {/* Left Side: Name & Socials */}
          <div ref={nameRef} className="flex flex-col justify-center h-full max-w-xl pointer-events-auto">
            <motion.div className="-mt-32 md:-mt-48">
              <p className="text-purple-neon font-mono text-xl mb-2">Hello! I&apos;m</p>
              <h1 className="text-6xl md:text-[5rem] font-black text-white leading-[0.9] uppercase tracking-tighter">
                AHMER<br />KHAN
              </h1>
            </motion.div>
          </div>

          {/* Right Side: Titles & Resume */}
          <div ref={titleRef} className="flex flex-col justify-center h-full text-right max-w-xl pointer-events-auto">
            <motion.div className="mt-48 md:mt-64">
              <p className="text-zinc-500 font-mono text-xl mb-2">An</p>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-4">
                AI ENGINEER
              </h2>
              <h2 className="text-3xl md:text-5xl font-black text-transparent stroke-text-white uppercase tracking-tighter">
                FULL-STACK DEV
              </h2>
            </motion.div>

            {/* Resume Button (Bottom Right) */}
            <motion.a 
              href="#"
              className="absolute bottom-12 right-12 flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group pointer-events-auto"
            >
              <span className="font-mono text-sm tracking-[0.3em] uppercase">RESUME</span>
              <div className="w-8 h-[1px] bg-zinc-800 group-hover:w-12 group-hover:bg-purple-neon transition-all" />
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </motion.a>
          </div>
        </div>

        {/* Background Glow (Sticky) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-[800px] opacity-10">
            <div className="w-full h-full bg-gradient-to-tr from-purple-neon via-blue-neon to-purple-neon blur-[120px] rounded-full" />
          </div>
        </div>
      </div>

      {/* Spacer Section for Scrolling the sticky content */}
      <section className="h-screen w-full pointer-events-none" />

      {/* Section 2: About Content */}
      <section className="relative h-screen w-full flex items-center justify-center z-20 px-8">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-20">
          {/* Left side reserved for robot (sticky) */}
          <div className="hidden md:block" />

          {/* Right side content */}
          <div ref={aboutRef} className="flex flex-col justify-center space-y-10">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-purple-neon" />
                <h2 className="text-purple-neon font-mono tracking-[0.3em] uppercase text-xs">Expertise</h2>
              </div>
              <h3 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight">
                Architecting <span className="text-transparent stroke-text-white">Intelligent</span> <br />
                Digital Ecosystems
              </h3>
              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-xl">
                I specialize in transforming complex AI potential into high-impact, production-grade reality.
                From architecting <span className="text-white font-medium">RAG-based AI checkers</span> to building specialized
                <span className="text-white font-medium"> Computer Vision platforms</span> with DINOv2, I bridge the gap
                between advanced research and scalable full-stack ecosystems.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-12 gap-y-10">
              <Stat label="Industry Experience" value="3+ Years" />
              <Stat label="Successful Deployments" value="15+ Projects" />
              <Stat label="AI Implementations" value="10+ Models" />
              <Stat label="Core Specialization" value="Full Stack" />
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
        }
        .stroke-text-white {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.8);
        }
      `}</style>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l border-zinc-800 pl-6">
      <p className="text-zinc-500 text-sm uppercase tracking-wider mb-1">{label}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
