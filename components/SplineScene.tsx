"use client";

import Spline from "@splinetool/react-spline";
import { useState } from "react";

export default function SplineScene({ onLoad }: { onLoad?: () => void }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#0A0A0A]">
        <div className="relative w-64 h-64">
          <div className="absolute inset-0 bg-purple-neon/20 blur-3xl rounded-full animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-neon to-blue-neon opacity-20 rounded-full scale-75 animate-bounce" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <Spline
        scene="/scene.splinecode"
        onLoad={() => onLoad?.()}
        onError={(e) => {
          console.error("Spline error:", e);
          setError(true);
        }}
        className="w-full h-full"
      />
    </div>
  );
}
