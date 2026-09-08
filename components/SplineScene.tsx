"use client";

import Spline from "@splinetool/react-spline";
import { useState, useCallback } from "react";

interface SplineSceneProps {
  onLoad?: () => void;
  isVisible?: boolean;
}

export default function SplineScene({ onLoad, isVisible = true }: SplineSceneProps) {
  const [error, setError] = useState(false);

  const handleLoad = useCallback(() => {
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback((e: unknown) => {
    console.warn("Spline 3D load error:", e);
    setError(true);
    // Ensure parent loader is unblocked on error
    onLoad?.();
  }, [onLoad]);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#0A0A0A] contain-render">
        <div className="relative w-72 h-72 flex items-center justify-center">
          <div className="absolute inset-0 bg-purple-neon/20 blur-2xl rounded-full animate-pulse" />
          <div className="w-48 h-48 rounded-full border border-purple-neon/40 flex items-center justify-center relative">
            <div className="w-32 h-32 rounded-full border border-blue-neon/40 animate-spin" style={{ animationDuration: "12s" }} />
            <div className="w-4 h-4 rounded-full bg-purple-neon shadow-[0_0_20px_#a855f7]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`w-full h-full relative contain-render transition-opacity duration-500 ${
        isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      style={{
        visibility: isVisible ? "visible" : "hidden",
      }}
    >
      <Spline
        scene="/scene.splinecode"
        onLoad={handleLoad}
        onError={handleError}
        className="w-full h-full"
      />
    </div>
  );
}

