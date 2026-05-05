"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Connect from "@/components/Connect";

const allProjects = [
  {
    id: "01",
    title: "AI Cloth Search Platform",
    subtitle: "Computer Vision & DINOv2",
    description: "A specialized search platform for Pakistani women's clothing using Meta's DINOv2 and CLIP models for high-precision visual similarity.",
    tech: ["Python", "PyTorch", "DINOv2", "CLIP", "React"],
    link: "https://github.com/Ahmerkhan12",
    image: "https://images.unsplash.com/photo-1539109132314-3477524c859c?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "02",
    title: "Quiz & Assignment AI",
    subtitle: "RAG & LangChain",
    description: "Automated generator and checker using Retrieval Augmented Generation (RAG) to process academic materials and verify student submissions.",
    tech: ["LangChain", "OpenAI", "RAG", "Node.js", "Vector DB"],
    link: "https://github.com/Ahmerkhan12",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "03",
    title: "AI Voice Agent",
    subtitle: "Twilio & Deepgram",
    description: "Real-time AI calling agent with high-fidelity voice transcription and intelligent response generation using Twilio Streams and Deepgram.",
    tech: ["Twilio", "Deepgram", "Node.js", "WebSockets", "OpenAI"],
    link: "https://github.com/Ahmerkhan12",
    image: "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "04",
    title: "Secure ERP & Payments",
    subtitle: "Full Stack Fintech",
    description: "Enterprise ERP & CRM systems with integrated payment gateways (Stripe, Authorize.Net, JazzCash) and AWS/Cloudflare infrastructure.",
    tech: ["Stripe", "PHP", "MERN", "AWS S3", "JazzCash"],
    link: "https://github.com/Ahmerkhan12",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "05",
    title: "Native Mobile Ecosystem",
    subtitle: "React Native & Firebase",
    description: "High-performance cross-platform mobile application delivering seamless user experiences with real-time data sync and push notifications.",
    tech: ["React Native", "Expo", "Firebase", "Redux", "Native Modules"],
    link: "https://github.com/Ahmerkhan12",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "06",
    title: "Google Maps Scraper",
    subtitle: "Python Automation",
    description: "Robust lead generation tool built in Python to extract and verify business data from Google Maps with anti-detection measures.",
    tech: ["Python", "Selenium", "Nginx", "Automation", "VPS"],
    link: "https://github.com/Ahmerkhan12",
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function PortfolioPage() {
  return (
    <main className="relative min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />
      
      <section className="pt-40 pb-20 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8">
              FULL <span className="text-zinc-800 italic">PORTFOLIO</span>
            </h1>
            <div className="h-1 w-32 bg-purple-neon" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {allProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Connect />
    </main>
  );
}

function ProjectCard({ project, index }: { project: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative glass rounded-3xl overflow-hidden border border-white/5 hover:border-purple-neon/20 transition-all"
    >
      <div className="h-80 overflow-hidden relative">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />
      </div>

      <div className="p-10 -mt-20 relative z-10">
        <h4 className="text-purple-neon font-mono text-xs tracking-widest uppercase mb-2">
          {project.subtitle}
        </h4>
        <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
        <p className="text-zinc-400 leading-relaxed mb-8 max-w-md">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((t: string) => (
            <span key={t} className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-medium text-zinc-500 border border-white/10">
              {t}
            </span>
          ))}
        </div>

        <a 
          href={project.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-white font-bold text-sm group/link"
        >
          VIEW SOURCE 
          <svg className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </a>
      </div>
    </motion.div>
  );
}
