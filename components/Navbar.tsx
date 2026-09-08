"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0A0A0A]/90 backdrop-blur-md py-3.5 border-b border-white/5 shadow-xl" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-1 group">
          <span className="text-xl md:text-2xl font-black tracking-tight text-white">
            0x<span className="font-extrabold text-white">AHMER</span>
            <span className="text-purple-neon">.</span>
          </span>
        </Link>

        {/* Center / Right Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-[13px] font-mono tracking-widest text-zinc-400">
          <Link href="/" className="hover:text-white transition-colors">
            HOME
          </Link>
          <span className="text-zinc-800">|</span>
          <Link href="/about" className="hover:text-white transition-colors">
            ABOUT ME
          </Link>
          <span className="text-zinc-800">|</span>
          <Link href="/portfolio" className="hover:text-white transition-colors">
            PROJECTS
          </Link>
        </div>

        {/* CTA Button */}
        <Link
          href="#connect"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-neon to-blue-neon text-white text-xs font-bold rounded-full hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all transform hover:scale-[1.03] active:scale-95 shadow-md tracking-widest uppercase"
        >
          LET&apos;S TALK
          <span className="text-sm font-bold">➔</span>
        </Link>
      </div>
    </motion.nav>
  );
}
