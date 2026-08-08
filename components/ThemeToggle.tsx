"use client";

import { useEffect, useState } from "react";

type Mode = "day" | "night";
const THEME_STORAGE_KEY = "ruby-theme-v2";

export default function ThemeToggle() {
  const [mode, setMode] = useState<Mode>("day");

  useEffect(() => {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY) as Mode | null;
    const initial = saved === "night" ? "night" : "day";
    setMode(initial);
    if (initial === "night") {
      document.documentElement.dataset.theme = "night";
    } else {
      delete document.documentElement.dataset.theme;
    }
  }, []);

  function toggleMode() {
    const next = mode === "day" ? "night" : "day";
    setMode(next);
    if (next === "night") {
      document.documentElement.dataset.theme = "night";
    } else {
      delete document.documentElement.dataset.theme;
    }
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
  }

  return (
    <button
      type="button"
      onClick={toggleMode}
      className="theme-toggle border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] transition"
      aria-label={`Switch to ${mode === "day" ? "night" : "day"} mode`}
    >
      {mode === "day" ? "night" : "paper"}
    </button>
  );
}
