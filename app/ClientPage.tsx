"use client";

import { useState, useCallback } from "react";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import Connect from "@/components/Connect";
import PageMotion from "@/components/PageMotion";

export default function ClientPage({ portraitSrc }: { portraitSrc?: string }) {
  const [loading, setLoading] = useState(true);
  const [introReady, setIntroReady] = useState(false);
  const handleIntroComplete = useCallback(() => setLoading(false), []);
  const handleIntroReveal = useCallback(() => setIntroReady(true), []);

  return (
    <main className="relative min-h-screen bg-[#0A0A0A]">
      {loading && <Loader onComplete={handleIntroComplete} onReveal={handleIntroReveal} />}
      <PageMotion enabled={introReady} />
      <Navbar />
      <Hero portraitSrc={portraitSrc} />
      <Work />
      <Experience />
      <TechStack />
      <Connect />
    </main>
  );
}
