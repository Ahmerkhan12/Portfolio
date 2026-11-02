"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Connect from "@/components/Connect";

import { projects, type Project } from "@/lib/projects";

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
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Connect />
    </main>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      id={`project-${project.id}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative glass rounded-3xl overflow-hidden border border-white/5 hover:border-purple-neon/20 transition-all gpu-layer"
    >
      <div className="h-80 overflow-hidden relative">
        <img 
          src={project.image} 
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80 pointer-events-none" />
      </div>

      <div className="p-10 -mt-20 relative z-10">
        <h4 className="text-purple-neon font-mono text-xs tracking-widest uppercase mb-2">
          {project.category}
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
