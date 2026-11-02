"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { projects, projectHref } from "@/lib/projects";

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const pinnedMoveRef = useRef<((direction: number) => void) | null>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const updateEdges = () => {
      const start = rail.scrollLeft <= 2;
      const end = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2;
      setEdges((previous) => previous.start === start && previous.end === end ? previous : { start, end });
    };
    updateEdges();
    rail.addEventListener("scroll", updateEdges, { passive: true });
    const observer = new ResizeObserver(updateEdges);
    observer.observe(rail);
    return () => {
      rail.removeEventListener("scroll", updateEdges);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const rail = railRef.current;
    if (!section || !rail) return;
    let cancelled = false;
    let refreshFrame = 0;
    let revert: (() => void) | undefined;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        section.classList.add("is-scroll-driven");
        const headerOffset = () => Math.ceil((document.querySelector(".site-header")?.getBoundingClientRect().height ?? 88) + 12);
        const updateLayout = () => section.style.setProperty("--work-header-offset", `${headerOffset()}px`);
        const distance = () => Math.max(0, rail.scrollWidth - rail.clientWidth);
        updateLayout();
        ScrollTrigger.addEventListener("refreshInit", updateLayout);

        const tween = gsap.fromTo(rail, { scrollLeft: 0 }, {
          scrollLeft: distance,
          ease: "none",
          scrollTrigger: {
            id: "project-scroll",
            trigger: section,
            start: () => `top ${headerOffset()}px`,
            end: () => `+=${Math.max(1, distance())}`,
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 1,
          },
        });

        const goToOffset = (offset: number, immediate = false) => {
          const trigger = tween.scrollTrigger;
          const travel = distance();
          if (!trigger || !travel) return;
          const progress = Math.max(0, Math.min(travel, offset)) / travel;
          window.scrollTo({ top: trigger.start + progress * (trigger.end - trigger.start), behavior: immediate ? "instant" : "smooth" });
        };
        pinnedMoveRef.current = (direction) => {
          const card = rail.firstElementChild;
          if (!card) return;
          const gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
          goToOffset(rail.scrollLeft + direction * (card.getBoundingClientRect().width + gap));
        };
        const keyboard = (event: KeyboardEvent) => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            pinnedMoveRef.current?.(event.key === "ArrowRight" ? 1 : -1);
          } else if (event.key === "Home" || event.key === "End") {
            event.preventDefault();
            goToOffset(event.key === "Home" ? 0 : distance(), true);
          }
        };
        rail.addEventListener("keydown", keyboard);
        return () => {
          pinnedMoveRef.current = null;
          rail.removeEventListener("keydown", keyboard);
          ScrollTrigger.removeEventListener("refreshInit", updateLayout);
          section.classList.remove("is-scroll-driven");
          section.style.removeProperty("--work-header-offset");
        };
      });
      refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
      revert = () => media.revert();
    }).catch(() => { /* Native horizontal browsing remains available if animation fails. */ });

    return () => { cancelled = true; cancelAnimationFrame(refreshFrame); revert?.(); };
  }, []);

  const move = (direction: number) => {
    if (pinnedMoveRef.current) {
      pinnedMoveRef.current(direction);
      return;
    }
    const rail = railRef.current;
    const card = rail?.firstElementChild;
    if (!rail || !card) return;
    const gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
    rail.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  return (
    <div id="work">
    <section ref={sectionRef} className="work-section" aria-labelledby="work-title">
      <div className="work-heading">
        <div>
          <h2 id="work-title">My <em>Work</em></h2>
        </div>
        <div className="work-controls" aria-label="Project navigation">
          <button type="button" onClick={() => move(-1)} disabled={edges.start} aria-label="Previous project" aria-controls="project-rail"><ArrowLeft size={18} aria-hidden="true" /></button>
          <button type="button" onClick={() => move(1)} disabled={edges.end} aria-label="Next project" aria-controls="project-rail"><ArrowRight size={18} aria-hidden="true" /></button>
        </div>
      </div>
      <div ref={railRef} id="project-rail" className="work-rail" tabIndex={0} role="region" aria-label="Projects. Swipe, scroll horizontally, or use the arrow buttons.">
        {projects.map((project) => (
          <article key={project.id} className="work-card work-editorial-card">
            <Link href={projectHref(project.id)} className="work-project-link" aria-label={`View ${project.title} project`}>
              <div className="project-card-heading">
                <span className="project-card-number" aria-hidden="true">{project.id}</span>
                <div><h3>{project.title}</h3><p>{project.category}</p></div>
              </div>
              <div className="project-card-tools"><h4>Tools and features</h4><p>{project.tools}</p></div>
              <div className="project-card-image">
                {/* Original project imagery; the fallback keeps failed images usable. */}
                <span className="project-image-fallback" aria-hidden="true">{project.title}</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={project.image} alt={`${project.title} preview`} width={600} height={400} loading="lazy" decoding="async" ref={(image) => { if (image?.complete && !image.naturalWidth) image.style.visibility = "hidden"; }} onError={(event) => { event.currentTarget.style.visibility = "hidden"; }} />
                <span className="project-image-action">View project <ArrowUpRight size={16} aria-hidden="true" /></span>
              </div>
            </Link>
          </article>
        ))}
      </div>
      <div className="work-bottom"><span className="work-native-hint">Swipe or use the arrows to explore.</span><span className="work-scroll-hint">Scroll down to explore projects.</span><Link href="/portfolio">View full portfolio <ArrowUpRight size={15} aria-hidden="true" /></Link></div>
    </section>
    </div>
  );
}
