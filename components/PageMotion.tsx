"use client";

import { useEffect } from "react";

export default function PageMotion({ enabled = true }: { enabled?: boolean }) {
  useEffect(() => {
    if (!enabled) {
      void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).catch(() => {});
      return;
    }
    let cancelled = false;
    let revert: (() => void) | undefined;
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const hero = document.querySelector<HTMLElement>("#home");
        if (!hero) return;
        const entrance = gsap.timeline({ defaults: { ease: "power3.out" } });
        entrance
          .from(".hero-name", { yPercent: 25, opacity: 0, duration: 1.15 })
          .from(".hero-portrait-enter", { y: 85, opacity: 0, duration: 1.2 }, 0.12)
          .from(".hero-left > *", { x: -24, opacity: 0, duration: 0.75, stagger: 0.11 }, 0.35)
          .from(".hero-card-entry", { y: 25, scale: 0.92, opacity: 0, duration: 0.8, stagger: 0.12 }, 0.65)
          .from(".hero-statement", { x: 24, opacity: 0, duration: 0.85 }, 0.8)
          .from(".hero-capabilities", { y: 30, opacity: 0, duration: 0.9 }, 0.9);

        gsap.utils.toArray<HTMLElement>("[data-float]").forEach((card, index) => {
          gsap.to(card, { y: index % 2 ? 7 : -7, duration: 2.7 + index * 0.4, delay: 1.6 + index * 0.15, repeat: -1, yoyo: true, ease: "sine.inOut" });
        });
        gsap.to(".hero-name-scroll", { yPercent: -12, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
        gsap.to(".hero-portrait-parallax", { y: 55, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });

        const xTo = gsap.quickTo(".hero-portrait-parallax", "x", { duration: 0.85, ease: "power3.out" });
        const rotateTo = gsap.quickTo(".hero-portrait-parallax", "rotation", { duration: 0.9, ease: "power3.out" });
        const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
        const pointer = (event: PointerEvent) => {
          if (!finePointer.matches) return;
          const bounds = hero.getBoundingClientRect();
          const amount = (event.clientX - bounds.left) / bounds.width - 0.5;
          xTo(amount * 16);
          rotateTo(amount * 0.7);
        };
        const leave = () => { xTo(0); rotateTo(0); };
        hero.addEventListener("pointermove", pointer, { passive: true });
        hero.addEventListener("pointerleave", leave);

        gsap.utils.toArray<HTMLElement>("#work h2, #experience h2, #tech h2, #connect h2").forEach((heading) => {
          gsap.from(heading, { y: 22, duration: 0.8, ease: "power3.out", clearProps: "transform", scrollTrigger: { trigger: heading, start: "top 90%", once: true } });
        });
        return () => { hero.removeEventListener("pointermove", pointer); hero.removeEventListener("pointerleave", leave); };
      });
      revert = () => media.revert();
    }).catch(() => { /* Content remains visible without animation. */ });
    return () => { cancelled = true; revert?.(); };
  }, [enabled]);
  return null;
}
