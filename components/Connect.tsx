"use client";

import { motion } from "framer-motion";

export default function Connect() {
  return (
    <section id="connect" className="py-32 px-8 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-neon/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass p-16 md:p-24 rounded-[4rem] border border-white/10"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            Ready to build <br />
            <span className="text-gradient">the next big thing?</span>
          </h2>
          
          <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto font-light">
            I'm currently available for freelance projects and full-time opportunities. Let's create something extraordinary together.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a 
              href="mailto:khanahmer526@gmail.com"
              className="px-12 py-5 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-all active:scale-95 text-lg"
            >
              SAY HELLO
            </a>
            <a 
              href="https://linkedin.com/in/ahmer-khan-8b895a230"
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 py-5 glass text-white font-bold rounded-full hover:bg-white/10 transition-all active:scale-95 text-lg"
            >
              LINKEDIN
            </a>
          </div>
        </motion.div>

        <footer className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-600 text-sm font-mono tracking-tighter">
            © 2026 AHMER KHAN • ALL RIGHTS RESERVED
          </p>
          <div className="flex gap-8 text-zinc-600 text-xs font-mono tracking-widest uppercase">
            <a href="#work" className="hover:text-purple-neon transition-colors">Work</a>
            <a href="#experience" className="hover:text-purple-neon transition-colors">Experience</a>
            <a href="#tech" className="hover:text-purple-neon transition-colors">Stack</a>
          </div>
        </footer>
      </div>
    </section>
  );
}
