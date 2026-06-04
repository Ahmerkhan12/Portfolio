"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import Connect from "@/components/Connect";

export default function ClientPage() {
  const [loading, setLoading] = useState(true);
  const [splineReady, setSplineReady] = useState(false);

  const handleSplineLoad = useCallback(() => setSplineReady(true), []);

  return (
    <main className="relative min-h-screen bg-[#0A0A0A]">
      <AnimatePresence mode="wait">
        {loading && (
          <Loader key="loader" isReady={splineReady} onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* Render Hero (and Spline) behind the loader so it loads in parallel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <Navbar />
        <Hero onSplineLoad={handleSplineLoad} />
        <Work />
        <Experience />
        <TechStack />
        <Connect />
      </motion.div>
    </main>
  );
}
