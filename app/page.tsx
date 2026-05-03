"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "@/components/Loader";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="relative min-h-screen">
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center justify-center min-h-screen p-8"
          >
            <h1 className="text-6xl font-black text-gradient mb-4">
              Ahmer Khan
            </h1>
            <p className="text-zinc-400 text-xl tracking-widest uppercase">
              Full Stack Engineer • Scalable Systems
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
