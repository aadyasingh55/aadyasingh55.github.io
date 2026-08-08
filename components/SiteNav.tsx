"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  ["Projects", "/#featured"],
  ["PRs", "/contributions"],
  ["Build", "/#build"],
  ["Experience", "/#experience"],
  ["Contact", "/#contact"],
];

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`site-nav fixed left-0 right-0 top-0 z-50 transition duration-300 ${
        scrolled ? "site-nav-scrolled" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8">
        <a
          href="/#top"
          className="signature-mark nav-signature text-3xl transition"
        >
          Ruby
        </a>
        <div
          className="nav-links hidden items-center gap-6 font-mono text-[11px] uppercase tracking-[0.18em] sm:flex"
        >
          {navItems.map(([label, href]) => (
            <a
              key={label}
              className="transition"
              href={href}
            >
              {label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="/AadyaSingh_resume_one_page.pdf"
            className="nav-resume border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition"
          >
            Resume
          </a>
        </div>
      </nav>
    </header>
  );
}
