"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

const MIN_PCT = 8;
const MAX_PCT = 92;

export default function HeroSplit() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(50);
  const dragging = useRef(false);

  function updateFromClientX(clientX: number) {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const raw = ((clientX - rect.left) / rect.width) * 100;
    setPct(Math.min(MAX_PCT, Math.max(MIN_PCT, raw)));
  }

  return (
    <div
      ref={stageRef}
      className="relative min-h-[680px] w-full cursor-ew-resize select-none overflow-hidden lg:min-h-[calc(92svh-3.5rem)]"
      onPointerDown={(e) => {
        dragging.current = true;
        updateFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging.current) updateFromClientX(e.clientX);
      }}
      onPointerUp={() => (dragging.current = false)}
      onPointerLeave={() => (dragging.current = false)}
    >
      {/* structured base layer */}
      <div
        className="absolute inset-0 flex items-center bg-structured-bg px-5 text-structured-text sm:px-[8vw] lg:px-[5vw]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        <div className="max-w-xl">
          <p className="mb-5 font-mono text-xs lowercase tracking-widest text-structured-muted">
            software engineer / data science &amp; ai
          </p>
          <h1 className="font-display text-5xl font-medium leading-[1.05] tracking-normal md:text-6xl">
            I build the
            <br />
            system underneath.
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-structured-muted max-w-sm">
            Full-stack projects, ML pipelines, and the occasional bug bounty.
            Precision as a default setting.
          </p>
          <div className="flex gap-2 mt-8 flex-wrap">
            {["python", "fastapi", "react", "postgres"].map((tag) => (
              <span
                key={tag}
              className="border border-structured-border px-3 py-1.5 font-mono text-[11px] text-structured-text/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* unstructured overlay, clipped to reveal on drag */}
      <motion.div
        className="absolute inset-0 flex items-center bg-unstructured-bg px-5 text-unstructured-text sm:px-[8vw] lg:px-[5vw]"
        animate={{ clipPath: `inset(0 0 0 ${pct}%)` }}
        transition={{ type: "spring", stiffness: 300, damping: 32 }}
      >
        <div className="max-w-xl">
          <p className="mb-5 font-body text-sm italic text-unstructured-muted">
            writer, and the reason it looks this good
          </p>
          <h1 className="font-serif text-5xl font-normal italic leading-[1.05] md:text-[3.75rem]">
            I write the
            <br />
            feeling on top.
          </h1>
          <p className="font-body mt-6 text-sm leading-relaxed text-unstructured-text/70 max-w-sm">
            Poetry, fragrance, an eye for what belongs together. The same
            instinct, pointed somewhere else.
          </p>
          <div className="flex gap-2 mt-8 flex-wrap">
            {["poetry", "design", "fragrance", "detail"].map((tag) => (
              <span
                key={tag}
              className="rounded-full border border-unstructured-border px-3 py-1.5 font-body text-[11px] italic text-unstructured-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* seam */}
      <motion.div
        className="absolute top-0 bottom-0 w-0.5 bg-seam"
        animate={{
          left: `${pct}%`,
          boxShadow: "0 0 0 1px rgba(142,27,57,0.25)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 32 }}
      >
        <div className="absolute left-0 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-seam">
          <div className="h-2 w-2 rotate-45 bg-unstructured-bg" />
        </div>
      </motion.div>

      <p className="pointer-events-none absolute bottom-9 left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-wider text-structured-muted">
        drag the seam
      </p>
    </div>
  );
}
