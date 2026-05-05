"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Connect from "@/components/Connect";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-[#0A0A0A] text-white overflow-hidden">
      <Navbar />
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-purple-neon/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] bg-blue-neon/10 blur-[100px] rounded-full" />
      </div>

      <section className="relative z-10 pt-40 pb-20 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8">
              ABOUT <span className="text-zinc-800 italic">ME</span>
            </h1>
            <div className="h-1 w-32 bg-purple-neon" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
            {/* Story Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-bold text-purple-neon">My Technical Philosophy</h2>
              <p className="text-xl text-zinc-400 leading-relaxed">
                I believe in bridging the gap between cutting-edge AI research and real-world production environments. 
                My approach combines the robustness of enterprise-grade full-stack systems with the intelligence of modern machine learning models.
              </p>
              <p className="text-xl text-zinc-400 leading-relaxed">
                From developing complex <span className="text-white font-medium">ERP & CRM systems</span> on PHP and MERN to architecting specialized AI solutions and 
                <span className="text-white font-medium"> high-performance React Native mobile apps</span>, 
                I thrive on solving high-impact problems across the entire digital spectrum.
              </p>
            </motion.div>

            {/* Core Competencies */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              <Competency 
                title="AI & Machine Learning" 
                desc="Expertise in RAG, LangChain, CLIP, and DINOv2 for intelligent automation and visual search." 
              />
              <Competency 
                title="Full Stack Engineering" 
                desc="Mastery of MERN, PHP, and Python for scalable enterprise applications and data scraping." 
              />
              <Competency 
                title="Mobile Engineering" 
                desc="Building high-performance cross-platform apps using React Native and Expo with real-time sync." 
              />
              <Competency 
                title="Cloud & DevOps" 
                desc="Hands-on experience with AWS S3, Cloudflare Stream, Nginx reverse proxies, and VPS deployments." 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values / Milestones */}
      <section className="relative z-10 py-20 px-8 border-t border-white/5 bg-black/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <ValueCard 
            title="Scalability First" 
            desc="Every system is architected to handle growth, from Nginx load balancing to optimized cloud storage." 
          />
          <ValueCard 
            title="Data Driven" 
            desc="Leveraging Python-based scrapers and automated checking systems to turn data into insights." 
          />
          <ValueCard 
            title="User Centric" 
            desc="Bridging complex backend logic with seamless, high-performance frontend experiences." 
          />
        </div>
      </section>

      <Connect />
    </main>
  );
}

function Competency({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="glass p-8 rounded-3xl border border-white/5 hover:border-purple-neon/20 transition-all">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function ValueCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-8 border-l border-zinc-800">
      <h3 className="text-purple-neon font-mono text-xs tracking-widest uppercase mb-4">{title}</h3>
      <p className="text-lg text-zinc-400">{desc}</p>
    </div>
  );
}
