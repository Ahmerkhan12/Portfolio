"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    company: "solvevare",
    role: "Full Stack Developer",
    period: "2024 - Present",
    description: "Leading the development of scalable MERN applications and AI-powered systems. Specialized in high-performance backend architecture and production-ready deployments.",
    highlights: [
      "Integrated secure payment systems (Stripe & Authorize.Net)",
      "Built real-time calling systems using Twilio VoIP APIs",
      "Managed cloud infrastructure and storage using AWS S3",
      "Deployed and managed production environments on Hostinger VPS"
    ]
  },
  {
    company: "Education",
    role: "Software Engineering Student",
    period: "2021 - 2025",
    description: "Pursuing a degree in Software Engineering with a focus on AI, Web Technologies, and Cloud Computing.",
    highlights: [
      "Leader in local tech communities (GDG Cloud Islamabad)",
      "Focused on MERN Stack and Mobile App Development"
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-32 px-8 bg-[#0A0A0A] border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-5xl font-black mb-4">
            Professional <span className="text-zinc-600">Journey</span>
          </h2>
          <div className="h-1 w-20 bg-purple-neon mx-auto" />
        </motion.div>

        <div className="space-y-12 max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-8 md:pl-0"
            >
              <div className="md:grid md:grid-cols-5 md:gap-12">
                {/* Period */}
                <div className="md:col-span-1 text-zinc-500 font-mono text-sm pt-2 mb-2 md:mb-0">
                  {exp.period}
                </div>

                {/* Content */}
                <div className="md:col-span-4 glass p-8 rounded-3xl relative">
                  {/* Glowing Dot Indicator */}
                  <div className="absolute -left-10 top-10 md:-left-6 w-4 h-4 rounded-full bg-purple-neon shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                  
                  <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                  <h4 className="text-purple-neon font-medium mb-4">{exp.company}</h4>
                  
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    {exp.description}
                  </p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {exp.highlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-zinc-500">
                        <span className="text-purple-neon mt-1">▹</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
