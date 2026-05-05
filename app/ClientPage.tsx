"use client";

import { useState } from "react";
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

  return (
    <main className="relative min-h-screen bg-[#0A0A0A]">
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <Navbar />
            <Hero />
            <Work />
            <Experience />
            <TechStack />
            <Connect />
            
            {/* Social Sidebar (Fixed) */}
            <div className="fixed left-8 bottom-12 z-20 hidden md:flex flex-col gap-6">
              <SocialLink href="https://github.com/Ahmerkhan12" label="GH" />
              <SocialLink href="https://linkedin.com/in/ahmer-khan-8b895a230" label="LI" />
              <SocialLink href="mailto:khanahmer526@gmail.com" label="EM" />
              <div className="w-[1px] h-20 bg-zinc-800 mx-auto" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-zinc-500 hover:text-purple-neon transition-colors font-mono text-xs tracking-tighter"
    >
      {label}
    </a>
  );
}
