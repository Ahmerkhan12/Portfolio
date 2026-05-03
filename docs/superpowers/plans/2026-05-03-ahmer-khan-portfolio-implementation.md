# Ahmer Khan Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a high-end, 3D-interactive personal portfolio for Ahmer Khan that mirrors the aesthetic of red1-for-hek.vercel.app, focusing on his expertise as a Full Stack Engineer.

**Architecture:** Next.js 15 (App Router) for performance and SEO, Framer Motion for premium animations, and Spline for the interactive 3D hero.

**Tech Stack:** Next.js, Tailwind CSS, Framer Motion, Spline, Lucide-React.

---

### Task 1: Scaffolding & Dependencies
**Files:**
- Create: Project root
- [x] **Step 1: Initialize Next.js project**
Run: `npx -y create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm --no-git`
- [x] **Step 2: Install dependencies**
Run: `npm install framer-motion @splinetool/react-spline @splinetool/runtime lucide-react clsx tailwind-merge`
- [x] **Step 3: Clean up boilerplate**
Remove default `app/page.module.css` and reset `app/page.tsx` to a simple "Hello World".
- [x] **Step 4: Commit**
```bash
git add .
git commit -m "chore: initial scaffold with next.js and dependencies"
```

### Task 2: Global Design System
**Files:**
- Modify: `app/globals.css`, `tailwind.config.ts`
- [x] **Step 1: Configure Tailwind colors**
Add `purple-neon: '#A855F7'` and `blue-neon: '#3B82F6'` to `tailwind.config.ts`.
- [x] **Step 2: Define global styles and utilities**
```css
/* app/globals.css */
@layer base {
  body {
    @apply bg-[#0A0A0A] text-[#F0F0F0] overflow-x-hidden;
  }
}
@layer utilities {
  .glass {
    @apply bg-white/5 backdrop-blur-md border border-white/10;
  }
  .neon-glow-purple {
    filter: drop-shadow(0 0 10px rgba(168, 85, 247, 0.5));
  }
}
```
- [x] **Step 3: Commit**
```bash
git add .
git commit -m "style: define global design tokens and glassmorphism utilities"
```

### Task 3: Interactive Marquee Loader
**Files:**
- Create: `components/Loader.tsx`
- Modify: `app/page.tsx`
- [x] **Step 1: Build the Loader component**
Use `framer-motion` for a marquee background ("FULL STACK ENGINEER • AI INTEGRATIONS •") and a central black pill with a purple glow and a 0-100% counter.
- [x] **Step 2: Implement visibility state in page.tsx**
Use `useState` and `useEffect` to show the loader for 4 seconds then fade it out.
- [x] **Step 3: Commit**
```bash
git add components/Loader.tsx app/page.tsx
git commit -m "feat: implement 4-second interactive marquee loading screen"
```

### Task 4: Hero Section with 3D Avatar
**Files:**
- Create: `components/Hero.tsx`
- [x] **Step 1: Integrate Spline scene**
Embed the Spline component. Use a placeholder URL or a basic scene for initial dev, then refine with the custom character.
- [x] **Step 2: Headline Layout**
"Hi, I'm Ahmer Khan" in large text + "Building Scalable Web & Mobile Systems" with a purple/blue gradient.
- [x] **Step 3: Commit**
```bash
git add components/Hero.tsx
git commit -m "feat: add hero section with spline 3D integration"
```

### Task 5: Featured Projects Grid
**Files:**
- Create: `components/Work.tsx`
- [x] **Step 1: Define Project Data**
Include "AI Fashion Recommendation", "AI Cold Calling", and "Google Maps Lead Scraper".
- [x] **Step 2: Build Project Cards**
Numbered cards (01, 02, 03) with glassmorphism hover effects and tech badges.
- [x] **Step 3: Commit**
```bash
git add components/Work.tsx
git commit -m "feat: implement featured projects grid with numbered cards"
```

### Task 6: Experience & Tech Stack Sections
**Files:**
- Create: `components/Experience.tsx`, `components/TechStack.tsx`
- [x] **Step 1: Solvevare Timeline**
Create a minimalist vertical timeline.
- [x] **Step 2: Categorized Tech Grid**
Group skills: Frontend, Backend, Mobile, AI/ML, Cloud.
- [x] **Step 3: Commit**
```bash
git add components/Experience.tsx components/TechStack.tsx
git commit -m "feat: add experience timeline and categorized tech stack grid"
```

### Task 7: Connect Section & Final Polish
**Files:**
- Create: `components/Connect.tsx`
- Modify: `app/layout.tsx` (SEO)
- [x] **Step 1: Build Footer/Connect**
Large CTA "Let's Build Something Great" + Social Links.
- [x] **Step 2: SEO Meta Tags**
Add proper Title, Description, and OpenGraph images for Ahmer Khan's portfolio.
- [x] **Step 3: Commit**
```bash
git add .
git commit -m "feat: add connect section and final SEO polish"
```
