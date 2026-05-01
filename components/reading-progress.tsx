"use client";

import { useEffect, useState } from "react";

export function ReadingProgress({ targetSelector }: { targetSelector: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const target = document.querySelector(targetSelector);
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const totalHeight = rect.height - window.innerHeight;
      if (totalHeight <= 0) return setProgress(100);
      const scrolled = -rect.top;
      const percent = Math.min(Math.max((scrolled / totalHeight) * 100, 0), 100);
      setProgress(percent);
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [targetSelector]);

  return (
    <div className="fixed top-16 left-0 right-0 z-50 h-[2px] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-[var(--primary)] via-[#8b5cf6] to-[#ec4899] transition-[width] duration-150 ease-out"
        style={{
          width: `${progress}%`,
          boxShadow: "0 0 12px color-mix(in srgb, var(--primary) 50%, transparent)",
        }}
      />
    </div>
  );
}
