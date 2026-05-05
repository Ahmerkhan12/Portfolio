"use client";

import { motion } from "framer-motion";

const skills = [
  {
    category: "Languages",
    items: ["Python", "JavaScript", "TypeScript", "PHP", "SQL"]
  },
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "React Native", "Tailwind CSS", "Expo", "Framer Motion", "Redux"]
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "PHP (ERP)", "Nginx", "Reverse Proxy", "MongoDB", "PostgreSQL", "mysql"]
  },
  {
    category: "AI / ML",
    items: ["RAG", "LangChain", "DINOv2", "CLIP", "OpenAI", "Gemini"]
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS S3", "Cloudflare Stream", "Hostinger VPS", "Vercel", "Git"]
  }
];

export default function TechStack() {
  return (
    <section id="tech" className="py-32 px-8 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-5xl font-black mb-4">
            Technical <span className="text-zinc-600">Stack</span>
          </h2>
          <div className="h-1 w-20 bg-purple-neon" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-8 rounded-3xl border border-white/5 hover:border-purple-neon/30 transition-all duration-500"
            >
              <h3 className="text-purple-neon font-mono text-xs tracking-widest uppercase mb-6">
                {skill.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <div
                    key={item}
                    className="text-white font-medium text-sm px-4 py-2 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
