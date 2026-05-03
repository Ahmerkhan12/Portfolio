"use client";

import { motion } from "framer-motion";

const projects = [
  {
    id: "01",
    title: "AI Fashion Recommendation",
    subtitle: "Computer Vision & MERN",
    description: "An intelligent outfit matching system using CLIP and DINOv2 for feature extraction and similarity search.",
    tech: ["Python", "Flask", "React", "OpenCV", "MySQL"],
    link: "https://github.com/Ahmerkhan12/Outfitmatch-Project",
    image: "https://images.unsplash.com/photo-1539109132314-3477524c859c?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "02",
    title: "AI Cold Calling System",
    subtitle: "VoIP & LLM Integration",
    description: "Automated calling agent using Twilio, OpenAI, and NVIDIA Riva for real-time speech-to-text and response generation.",
    tech: ["Node.js", "Twilio", "OpenAI", "RAG", "MongoDB"],
    link: "https://github.com/Ahmerkhan12",
    image: "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "03",
    title: "Google Maps Lead Scraper",
    subtitle: "Automation & Data Engineering",
    description: "High-performance scraper capable of extracting thousands of business leads with automated email verification.",
    tech: ["Node.js", "Puppeteer", "Automation", "LeadGen"],
    link: "https://github.com/Ahmerkhan12",
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function Work() {
  return (
    <section id="work" className="py-32 px-8 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-5xl font-black mb-4">
            Selected <span className="text-zinc-600">Work</span>
          </h2>
          <div className="h-1 w-20 bg-purple-neon" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="group relative"
    >
      <div className="text-8xl font-black text-white/5 absolute -top-10 -left-4 z-0 group-hover:text-purple-neon/10 transition-colors">
        {project.id}
      </div>

      <div className="relative z-10 glass rounded-3xl overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_rgba(168,85,247,0.1)]">
        <div className="h-64 overflow-hidden relative">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-60" />
        </div>

        <div className="p-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="text-purple-neon font-mono text-xs tracking-widest uppercase mb-1">
                {project.subtitle}
              </h4>
              <h3 className="text-2xl font-bold text-white">
                {project.title}
              </h3>
            </div>
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 glass rounded-full hover:bg-white/10 transition-colors text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
            </a>
          </div>

          <p className="text-zinc-400 text-sm leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((t: string) => (
              <span key={t} className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-medium text-zinc-500 border border-white/10">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
