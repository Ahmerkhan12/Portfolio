"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Connect() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setStatus(res.ok ? "success" : "error");
    if (res.ok) setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="connect" className="py-32 px-8 bg-[#0A0A0A] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-neon/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass p-12 md:p-20 rounded-[4rem] border border-white/10"
        >
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div>
              <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                Ready to build <br />
                <span className="text-gradient">the next big thing?</span>
              </h2>
              <p className="text-zinc-400 mb-10 font-light">
                I'm available for freelance projects and full-time opportunities. Let's create something extraordinary together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:khanahmer526@gmail.com"
                  className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-all active:scale-95 text-sm text-center"
                >
                  SAY HELLO
                </a>
                <a
                  href="https://linkedin.com/in/ahmer-khan-8b895a230"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 glass text-white font-bold rounded-full hover:bg-white/10 transition-all active:scale-95 text-sm text-center"
                >
                  LINKEDIN
                </a>
              </div>
            </div>

            {/* Right — Contact Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-neon/50 transition-colors"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-neon/50 transition-colors"
              />
              <textarea
                placeholder="Your Message"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-neon/50 transition-colors resize-none"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-all active:scale-95 disabled:opacity-50"
              >
                {status === "loading" ? "Sending..." : "SEND MESSAGE"}
              </button>
              {status === "success" && (
                <p className="text-green-400 text-sm text-center">Message sent successfully!</p>
              )}
              {status === "error" && (
                <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>
              )}
            </form>
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
