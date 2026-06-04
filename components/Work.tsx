"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    id: "01",
    title: "AI Cloth Search",
    category: "Computer Vision / DINOv2",
    tools: "Python, PyTorch, Meta DINOv2, CLIP, React, VPS",
    image: "https://images.unsplash.com/photo-1539109132314-3477524c859c?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "02",
    title: "Quiz & Assignment AI",
    category: "RAG / LangChain",
    tools: "LangChain, OpenAI API, RAG, Node.js, Vector DB, MongoDB",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "03",
    title: "AI Voice Agent",
    category: "Real-time AI / Voice",
    tools: "Twilio Streams, Deepgram AI, Node.js, WebSockets, OpenAI",
    image: "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "04",
    title: "Enterprise ERP & CRM",
    category: "Full Stack / Fintech",
    tools: "PHP, MERN, Stripe, Authorize.Net, JazzCash, AWS S3",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "05",
    title: "Native Mobile App",
    category: "React Native / Firebase",
    tools: "React Native, Expo, Redux, Firebase, Native Modules",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "06",
    title: "Google Maps Scraper",
    category: "Automation / Python",
    tools: "Python, Selenium, Nginx, Anti-Detection, Automation",
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "07",
    title: "AI Document OCR",
    category: "OCR / NLP Pipeline",
    tools: "Python, Tesseract, OpenCV, FastAPI, AWS Textract, PostgreSQL",
    image: "https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "08",
    title: "Real-time Chat App",
    category: "WebSocket / Node.js",
    tools: "Socket.io, Node.js, Redis, React, MongoDB, JWT Auth",
    image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "09",
    title: "SaaS Analytics Dashboard",
    category: "Data Viz / Full Stack",
    tools: "Next.js, D3.js, Prisma, PostgreSQL, Stripe, Tailwind",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "10",
    title: "AI Lead Scoring Engine",
    category: "ML / CRM Integration",
    tools: "Python, scikit-learn, FastAPI, Node.js, OpenAI, MongoDB",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !sectionRef.current) return;

    // Use a small timeout to ensure layout is stable
    const timer = setTimeout(() => {
      const scrollWidth = containerRef.current?.scrollWidth || 0;
      const windowWidth = window.innerWidth;
      const totalWidth = scrollWidth - windowWidth;

      // If everything fits on screen, don't do horizontal scroll
      if (totalWidth <= 0) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      tl.to(containerRef.current, {
        x: -totalWidth,
        ease: "none",
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === sectionRef.current) t.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} id="work" className="h-[70vh] bg-[#0A0A0A] overflow-hidden">
      <div className="h-full flex flex-col pt-12">
        <div className="px-12 md:px-24 mb-12">
          <h2 className="text-2xl md:text-4xl font-black text-white">
            My <span className="text-purple-neon italic">Work</span>
          </h2>
          <div className="h-[1px] w-full bg-zinc-800 mt-8" />
        </div>

        <div ref={containerRef} className="flex h-full w-fit">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`w-[70vw] md:w-[30vw] lg:w-[20vw] h-[620px] border-zinc-800 px-6 md:px-8 py-6 flex flex-col shrink-0 ${index !== projects.length - 1 ? "border-r" : ""
                }`}
            >
              <div className="flex justify-between items-start mb-8">
                <span className="text-4xl font-black text-white/5">{project.id}</span>
                <div className="text-right">
                  <h3 className="text-lg font-bold text-white">{project.title}</h3>
                  <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">{project.category}</p>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-zinc-400 font-mono text-xs uppercase tracking-widest mb-4">Tools and features</h4>
                <p className="text-zinc-500 text-[11px] leading-relaxed max-w-xs">
                  {project.tools}
                </p>
              </div>

              <div className="h-[160px] md:h-[180px] rounded-xl overflow-hidden glass border border-white/5 relative group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-60" />
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
