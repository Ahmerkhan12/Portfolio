# Design Specification: Ahmer Khan Portfolio

## Overview
A high-end, interactive personal portfolio for Ahmer Khan, a Full Stack Engineer specializing in scalable systems, mobile apps, and AI integrations. The design is inspired by the minimalist, 3D-heavy aesthetic of the reference site [red1-for-hek.vercel.app](https://red1-for-hek.vercel.app/).

## Tech Stack
- **Framework:** Next.js 14/15 (App Router)
- **Styling:** Vanilla CSS + Tailwind CSS (for utilities)
- **Animations:** Framer Motion
- **3D Interactive:** Spline (for the 3D Avatar)
- **Icons:** Lucide-React
- **Deployment:** Vercel

## Core Sections

### 1. The Loading Screen
- **Background:** Light gray (`#F3F4F6`) with a horizontal marquee looping text: `FULL STACK ENGINEER • MOBILE APPS • SCALABLE SYSTEMS • AI INTEGRATIONS •`.
- **Loader:** A central black pill (`rounded-full`) with a **vibrant purple neon glow** (`drop-shadow`).
- **Interaction:** A percentage counter from 0% to 100% over 4 seconds.
- **Transition:** A smooth fade-out using Framer Motion to reveal the Hero section.

### 2. Hero Section
- **Background:** Dark Mode (`#0A0A0A`).
- **Main Visual:** An interactive 3D character (via Spline) centered in the viewport. The character's head and eyes follow the mouse.
- **Copy:**
    - Title: "Hi, I'm Ahmer Khan"
    - Subtitle: "Building Scalable Web & Mobile Systems." (Gradient text: Purple to Blue).
- **Navigation:** Subtle links for "About", "Work", and "Contact" in the header.
- **Sidebar:** Fixed social links (GitHub, LinkedIn, Instagram) on the left.

### 3. About & Roles
- Clean typography explaining Ahmer's focus on building production-ready applications across web, mobile, and AI systems.
- Highlighted roles: Full Stack Engineer (MERN), Mobile Developer (React Native), AI System Integrator.

### 4. Featured Work (The Grid)
- Numbered cards (01, 02, 03) with high-quality thumbnails and hover transitions.
- **Project 01: AI Fashion Recommendation System**
    - Tech: Python, Flask, CLIP, DINOv2, MySQL.
- **Project 02: AI Cold Calling System**
    - Tech: Node.js, Twilio, OpenAI, NVIDIA Riva, MongoDB.
- **Project 03: Google Maps Lead Scraper**
    - Tech: Node.js, Puppeteer, Lead Generation Automation.

### 5. Experience (Solvevare)
- Vertical timeline entry for **solvevare**.
- Key achievements: Scaling MERN apps, integrating payment gateways (Stripe/Authorize.net), and managing cloud infrastructure (AWS S3).

### 6. Tech Stack & Integration Grid
- Categorized badges for Languages (Python, JS, TS, PHP), Frontend (React, Next.js, Tailwind), Mobile (React Native), and Cloud/Integrations (AWS, Firebase, Twilio, Stripe).

### 7. Footer / Connect
- Large "Let's Build Something Great" call to action.
- Direct links to LinkedIn and Email.

## Design tokens
- **Primary Color:** `#FFFFFF` (Text)
- **Background:** `#0A0A0A` (Hero/Content), `#F3F4F6` (Loader)
- **Accent:** Purple (`#A855F7`), Blue (`#3B82F6`)
- **Typography:** Inter (Sans-serif) or Outfit.

## Implementation Details
- Use `framer-motion` for all transitions (Section reveals, card hovers, and the loading bar).
- Ensure high performance by optimizing the Spline 3D model loading.
- Implement responsive design for mobile (Avatar may need to be scaled or hidden on small screens).
