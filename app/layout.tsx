import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ahmer Khan | Full Stack Engineer & AI Specialist",
  description: "Portfolio of Ahmer Khan, a Full Stack Engineer specializing in scalable web & mobile systems, AI integrations, and production-ready architecture.",
  keywords: ["Ahmer Khan", "Full Stack Engineer", "React Developer", "AI Integrations", "MERN Stack", "Mobile App Development"],
  openGraph: {
    title: "Ahmer Khan | Full Stack Engineer",
    description: "Building Scalable Web & Mobile Systems with a focus on AI integrations.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased dark scroll-smooth`}
      suppressHydrationWarning
    >
      <body 
        className="min-h-full flex flex-col bg-[#0A0A0A] text-[#F0F0F0]"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
