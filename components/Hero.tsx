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

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!robotRef.current || !nameRef.current || !aboutRef.current || !containerRef.current) return;

    // Initial load animation for name
    gsap.fromTo(
      nameRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power4.out", delay: 0.5 }
    );

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
    .to(nameRef.current, {
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
      {/* Sticky Robot Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none z-10">
        <div 
          ref={robotRef} 
          className="absolute inset-0 flex items-center justify-center pointer-events-auto"
        >
          <div className="w-full h-full max-w-7xl">
            <Suspense fallback={<div className="w-full h-full bg-[#0A0A0A]" />}>
              <SplineScene />
            </Suspense>
          </div>
        </div>

        {/* Background Glow (Sticky) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-[800px] opacity-10">
            <div className="w-full h-full bg-gradient-to-tr from-purple-neon via-blue-neon to-purple-neon blur-[120px] rounded-full" />
          </div>
        </div>
      </div>

      {/* Section 1: Hero Name */}
      <section className="relative h-screen w-full flex items-center justify-center z-0 pointer-events-none">
        <div ref={nameRef} className="text-center">
          <h1 className="text-9xl md:text-[14rem] font-black leading-[0.8] tracking-tighter uppercase">
            AHMER<br />
            <span className="text-transparent stroke-text">KHAN</span>
          </h1>
        </div>
      </section>

      {/* Section 2: About Content */}
      <section className="relative h-screen w-full flex items-center justify-center z-20 px-8">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-20">
          {/* Left side reserved for robot (sticky) */}
          <div className="hidden md:block" />

          {/* Right side content */}
          <div ref={aboutRef} className="flex flex-col justify-center space-y-8">
            <div>
              <h2 className="text-purple-neon font-mono tracking-widest mb-4 uppercase text-sm">Background</h2>
              <h3 className="text-4xl md:text-5xl font-bold mb-6">Pioneering AI & Scalable Architectures</h3>
              <p className="text-xl text-zinc-400 leading-relaxed max-w-lg">
                As a Full Stack Engineer, I specialize in bridging the gap between complex AI models and production-ready applications. My focus is on building systems that are not just functional, but highly performant and user-centric.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <Stat label="Experience" value="3+ Years" />
              <Stat label="Projects" value="15+" />
              <Stat label="AI Models" value="10+" />
              <Stat label="Stack" value="MERN" />
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
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
