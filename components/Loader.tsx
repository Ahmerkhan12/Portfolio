"use client";

import { useEffect, useState } from "react";

let introShown = false;
const marquee = "FULL STACK ENGINEER · MOBILE APPS · SCALABLE SYSTEMS · AI INTEGRATIONS · ";

export default function Loader({ onComplete, onReveal }: { onComplete: () => void; onReveal: () => void }) {
  const [phase, setPhase] = useState<"visible" | "leaving" | "hidden">(() => introShown ? "hidden" : "visible");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (introShown) { onReveal(); onComplete(); return; }
    let cancelled = false;
    let frame = 0;
    let ready = false;
    let finishStarted: number | undefined;
    let holdTimer: ReturnType<typeof setTimeout> | undefined;
    let exitTimer: ReturnType<typeof setTimeout> | undefined;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const started = performance.now();
    const introDuration = reduced ? 200 : 950;
    const completeDuration = reduced ? 100 : 220;
    const markReady = () => { if (!cancelled) ready = true; };
    void document.fonts.ready.then(markReady, markReady);

    const tick = (now: number) => {
      if (cancelled) return;
      const elapsed = now - started;
      let next = Math.min(90, (elapsed / introDuration) * 90);
      if (elapsed >= introDuration && (ready || elapsed >= 2200)) {
        finishStarted ??= now;
        next = Math.min(100, 90 + ((now - finishStarted) / completeDuration) * 10);
      }
      const rounded = Math.floor(next);
      setProgress((previous) => previous === rounded ? previous : rounded);
      if (next >= 100) {
        introShown = true;
        holdTimer = setTimeout(() => {
          if (cancelled) return;
          onReveal();
          setPhase("leaving");
          exitTimer = setTimeout(onComplete, reduced ? 100 : 300);
        }, reduced ? 0 : 120);
      } else frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => { cancelled = true; cancelAnimationFrame(frame); clearTimeout(holdTimer); clearTimeout(exitTimer); };
  }, [onComplete, onReveal]);

  if (phase === "hidden") return null;
  return (
    <div className={`brand-intro original-intro ${phase === "leaving" ? "is-leaving" : ""}`} role="status" aria-label="Preparing Ahmer’s portfolio">
      <div className="loader-marquee" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => <div className={`loader-marquee-row ${index % 2 ? "reverse" : ""}`} key={index}><div className="loader-marquee-track"><span>{marquee}</span><span>{marquee}</span></div></div>)}
      </div>
      <div className="loader-halo" aria-hidden="true" />
      <div className="loader-pill">
        <span className="loader-state"><span className="loader-dot" />{progress === 100 ? "READY" : "LOADING"}</span>
        <span className="loader-value">{progress}<span>%</span></span>
        <span className="loader-pill-progress" aria-hidden="true" style={{ clipPath: `inset(0 ${100 - progress}% 0 0 round 999px)` }} />
      </div>
    </div>
  );
}
