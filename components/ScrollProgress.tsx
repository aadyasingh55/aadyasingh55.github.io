"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="fixed right-4 top-1/2 z-40 hidden h-40 w-px -translate-y-1/2 bg-ink/10 md:block">
      <div
        className="w-px bg-ruby transition-[height] duration-150"
        style={{ height: `${Math.max(7, progress * 100)}%` }}
      />
    </div>
  );
}
