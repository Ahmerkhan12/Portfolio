"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [{ href: "/#home", label: "Home" }, { href: "/about", label: "About" }, { href: "/portfolio", label: "Projects" }];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const goHome = () => {
    setMenuOpen(false);
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    }
  };

  const isCurrent = (href: string) => pathname === href.split("#")[0];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <header className={`site-header ${scrolled || menuOpen ? "is-scrolled" : ""}`}>
      <nav className="site-nav" aria-label="Main navigation">
        <Link href="/#home" className="brand-wordmark" aria-label="Ahmer Khan home" onClick={goHome}>AHMER<span>.</span></Link>
        <div className="desktop-nav">
          {links.map((link) => <Link key={link.href} href={link.href} onClick={link.href === "/#home" ? goHome : undefined} aria-current={isCurrent(link.href) ? "location" : undefined}>{link.label}</Link>)}
        </div>
        <div className="nav-actions">
          <Link href="/#connect" className="nav-contact" onClick={() => setMenuOpen(false)}>Let’s talk <ArrowUpRight size={16} aria-hidden="true" /></Link>
          <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        <div id="mobile-navigation" className="mobile-nav" hidden={!menuOpen}>
          {links.map((link) => <Link key={link.href} href={link.href} aria-current={isCurrent(link.href) ? "location" : undefined} onClick={link.href === "/#home" ? goHome : () => setMenuOpen(false)}>{link.label}</Link>)}
        </div>
      </nav>
    </header>
  );
}
