"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Code2, Layers3, Rocket, Smartphone, Database, Cloud, BrainCircuit } from "lucide-react";

const PortraitAtmosphere = dynamic(() => import("./PortraitAtmosphere"), { ssr: false });
const qualities = [
  { icon: Code2, label: "MERN & Next.js" },
  { icon: Smartphone, label: "React Native" },
  { icon: BrainCircuit, label: "AI & automation" },
  { icon: Database, label: "API architecture" },
  { icon: Cloud, label: "Cloud deployment" },
];
const capabilities = [
  { icon: Code2, title: "Web engineering", detail: "React, Next.js, TypeScript" },
  { icon: Smartphone, title: "Mobile experiences", detail: "React Native, Expo" },
  { icon: BrainCircuit, title: "Applied AI", detail: "RAG, DINOv2, OpenAI" },
  { icon: Database, title: "Backend architecture", detail: "Node.js, PostgreSQL, Redis" },
  { icon: Cloud, title: "Cloud & delivery", detail: "AWS, Docker, VPS" },
];

export default function Hero({ portraitSrc }: { portraitSrc?: string }) {
  return (
    <section id="home" className="reference-hero" aria-label="Ahmer Khan, full-stack developer">
      <div className="hero-stage">
        <div className="hero-name-scroll" aria-hidden="true"><div className="hero-name">AHMER</div></div>
        <div className="hero-portrait-enter">
          <PortraitAtmosphere />
          <div className="hero-portrait-parallax">
            {portraitSrc ? <Image src={portraitSrc} alt="Ahmer Khan, full-stack developer" fill preload sizes="(max-width: 767px) 100vw, 58vw" className="hero-cutout" /> : <span className="hero-monogram">AK</span>}
          </div>
        </div>
        <div className="hero-left">
          <p className="hero-role">AHMER KHAN / FULL-STACK ENGINEER</p>
          <h1><span>Web apps<i>.</i></span><span>Mobile<i>.</i></span><span>Applied AI<i>.</i></span></h1>
          <p className="hero-summary">I’m Ahmer. I turn complex requirements into web platforms, mobile apps, and useful AI tools—from the interface to the infrastructure.</p>
          <div className="hero-reference-actions">
            <Link href="/portfolio" className="hero-button hero-button-primary">My projects <ArrowUpRight size={16} aria-hidden="true" /></Link>
            <a href="#connect" className="hero-button hero-button-secondary">Get in touch <ArrowRight size={16} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="hero-card-entry experience-card"><div className="hero-floating-card" data-float="0"><span className="hero-card-icon"><Rocket size={23} strokeWidth={1.6} aria-hidden="true" /></span><div><strong>3+</strong><span>Years<br />building</span></div></div></div>
        <div className="hero-card-entry systems-card"><div className="hero-floating-card" data-float="1"><span className="hero-card-icon"><Layers3 size={23} strokeWidth={1.6} aria-hidden="true" /></span><div><strong>15+</strong><span>Systems<br />delivered</span></div></div></div>
        <div className="hero-card-entry qualities-card"><ul className="hero-floating-card" data-float="2">{qualities.map(({ icon: Icon, label }) => <li key={label}><span><Icon size={14} aria-hidden="true" /></span>{label}</li>)}</ul></div>
        <div className="hero-statement"><p>From the first <strong>screen</strong> to the systems <strong>behind it.</strong></p><span aria-hidden="true" /></div>
        <div className="hero-capabilities" aria-label="What I build">{capabilities.map(({ icon: Icon, title, detail }) => <div className="hero-capability" key={title}><span className="capability-icon"><Icon size={22} strokeWidth={1.6} aria-hidden="true" /></span><div><h2>{title}</h2><p>{detail}</p></div></div>)}</div>
      </div>
    </section>
  );
}
