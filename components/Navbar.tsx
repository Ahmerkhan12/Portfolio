"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Journey", href: "/#experience" },
  { name: "Stack", href: "/#tech" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY;

      // Only react to scrolls larger than 10px to avoid jitter
      if (Math.abs(diff) > 10) {
        setHidden(diff > 0 && currentScrollY > 80); // hide when scrolling down
        lastScrollY = currentScrollY;
      }

      setScrolled(currentScrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-40 transition-[padding] duration-300 ${
        scrolled ? "py-4" : "py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <div className="flex items-center gap-12">
          <a href="/" className="text-2xl font-black tracking-tighter">
            AK<span className="text-purple-neon">.</span>
          </a>

        </div>

        <div className="glass px-6 py-2 rounded-full border border-white/10 hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-mono tracking-widest uppercase text-zinc-400 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        <a
          href="#connect"
          className="px-6 py-2 bg-white text-black text-xs font-bold rounded-full hover:bg-zinc-200 transition-all active:scale-95"
        >
          HIRE ME
        </a>
      </div>
    </motion.nav>
  );
}
