export interface Project {
  id: string;
  title: string;
  category: string;
  tools: string;
  image: string;
  description: string;
  tech: string[];
  link: string;
}

export const projects: Project[] = [
  {
    "id": "01",
    "title": "AI Cloth Search",
    "category": "Computer Vision / DINOv2",
    "tools": "Python, PyTorch, Meta DINOv2, CLIP, React, VPS",
    "image": "https://images.unsplash.com/photo-1539109132314-3477524c859c?q=80&w=1000&auto=format&fit=crop",
    "description": "A specialized search platform for Pakistani women's clothing using Meta's DINOv2 and CLIP models for high-precision visual similarity.",
    "tech": [
      "Python",
      "PyTorch",
      "Meta DINOv2",
      "CLIP",
      "React",
      "VPS"
    ],
    "link": "https://github.com/Ahmerkhan12"
  },
  {
    "id": "02",
    "title": "Quiz & Assignment AI",
    "category": "RAG / LangChain",
    "tools": "LangChain, OpenAI API, RAG, Node.js, Vector DB, MongoDB",
    "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
    "description": "Automated generator and checker using Retrieval Augmented Generation (RAG) to process academic materials and verify student submissions.",
    "tech": [
      "LangChain",
      "OpenAI API",
      "RAG",
      "Node.js",
      "Vector DB",
      "MongoDB"
    ],
    "link": "https://github.com/Ahmerkhan12"
  },
  {
    "id": "03",
    "title": "AI Voice Agent",
    "category": "Real-time AI / Voice",
    "tools": "Twilio Streams, Deepgram AI, Node.js, WebSockets, OpenAI",
    "image": "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=1000&auto=format&fit=crop",
    "description": "Real-time AI calling agent with high-fidelity voice transcription and intelligent response generation using Twilio Streams and Deepgram.",
    "tech": [
      "Twilio Streams",
      "Deepgram AI",
      "Node.js",
      "WebSockets",
      "OpenAI"
    ],
    "link": "https://github.com/Ahmerkhan12"
  },
  {
    "id": "04",
    "title": "Enterprise ERP & CRM",
    "category": "Full Stack / Fintech",
    "tools": "PHP, MERN, Stripe, Authorize.Net, JazzCash, AWS S3",
    "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
    "description": "Enterprise ERP & CRM systems with integrated payment gateways (Stripe, Authorize.Net, JazzCash) and AWS/Cloudflare infrastructure.",
    "tech": [
      "PHP",
      "MERN",
      "Stripe",
      "Authorize.Net",
      "JazzCash",
      "AWS S3"
    ],
    "link": "https://github.com/Ahmerkhan12"
  },
  {
    "id": "05",
    "title": "Native Mobile App",
    "category": "React Native / Firebase",
    "tools": "React Native, Expo, Redux, Firebase, Native Modules",
    "image": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop",
    "description": "High-performance cross-platform mobile application delivering seamless user experiences with real-time data sync and push notifications.",
    "tech": [
      "React Native",
      "Expo",
      "Redux",
      "Firebase",
      "Native Modules"
    ],
    "link": "https://github.com/Ahmerkhan12"
  },
  {
    "id": "06",
    "title": "Google Maps Scraper",
    "category": "Automation / Python",
    "tools": "Python, Selenium, Nginx, Anti-Detection, Automation",
    "image": "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1000&auto=format&fit=crop",
    "description": "Robust lead generation tool built in Python to extract and verify business data from Google Maps with anti-detection measures.",
    "tech": [
      "Python",
      "Selenium",
      "Nginx",
      "Anti-Detection",
      "Automation"
    ],
    "link": "https://github.com/Ahmerkhan12"
  },
  {
    "id": "07",
    "title": "AI Document OCR",
    "category": "OCR / NLP Pipeline",
    "tools": "Python, Tesseract, OpenCV, FastAPI, AWS Textract, PostgreSQL",
    "image": "https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=1000&auto=format&fit=crop",
    "description": "An OCR pipeline for extracting and processing text from documents with Python, OpenCV, and FastAPI.",
    "tech": [
      "Python",
      "Tesseract",
      "OpenCV",
      "FastAPI",
      "AWS Textract",
      "PostgreSQL"
    ],
    "link": "https://github.com/Ahmerkhan12"
  },
  {
    "id": "08",
    "title": "Real-time Chat App",
    "category": "WebSocket / Node.js",
    "tools": "Socket.io, Node.js, Redis, React, MongoDB, JWT Auth",
    "image": "https://images.unsplash.com/photo-1611746872915-64382b5c76da?q=80&w=1000&auto=format&fit=crop",
    "description": "A real-time messaging application built with Socket.io, Redis, and React.",
    "tech": [
      "Socket.io",
      "Node.js",
      "Redis",
      "React",
      "MongoDB",
      "JWT Auth"
    ],
    "link": "https://github.com/Ahmerkhan12"
  },
  {
    "id": "09",
    "title": "SaaS Analytics Dashboard",
    "category": "Data Viz / Full Stack",
    "tools": "Next.js, D3.js, Prisma, PostgreSQL, Stripe, Tailwind",
    "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    "description": "An analytics dashboard built with Next.js, D3.js, and PostgreSQL.",
    "tech": [
      "Next.js",
      "D3.js",
      "Prisma",
      "PostgreSQL",
      "Stripe",
      "Tailwind"
    ],
    "link": "https://github.com/Ahmerkhan12"
  },
  {
    "id": "10",
    "title": "AI Lead Scoring Engine",
    "category": "ML / CRM Integration",
    "tools": "Python, scikit-learn, FastAPI, Node.js, OpenAI, MongoDB",
    "image": "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1000&auto=format&fit=crop",
    "description": "A lead-scoring system combining machine learning with CRM integrations.",
    "tech": [
      "Python",
      "scikit-learn",
      "FastAPI",
      "Node.js",
      "OpenAI",
      "MongoDB"
    ],
    "link": "https://github.com/Ahmerkhan12"
  }
];

export const projectHref = (id: string) => `/portfolio#project-${id}`;
