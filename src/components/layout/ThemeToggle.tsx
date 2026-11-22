"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [flicker, setFlicker] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`min-w-[44px] min-h-[44px] w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-[var(--surface-border)] bg-[var(--surface)] ${className}`}
      />
    );
  }

  const isLight = theme === "light";

  const handleClick = () => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!prefersReduced) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 260);

      // If switching ON (to light mode), trigger a quick 2-pulse flicker
      if (!isLight) {
        setFlicker(true);
        setTimeout(() => setFlicker(false), 240);
      }
    }

    toggleTheme();
  };

  return (
    <button
      onClick={handleClick}
      role="button"
      aria-label="Toggle light and dark mode"
      aria-pressed={isLight}
      title={isLight ? "Light on" : "Light off"}
      className={`group relative inline-flex items-center justify-center min-w-[44px] min-h-[44px] w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-[var(--surface-border)] bg-[var(--surface)] hover:border-[var(--surface-border-hover)] text-[var(--foreground)] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none select-none ${className}`}
    >
      {/* Soft ambient glow when lamp is ON (visible in both light & dark navs) */}
      <span
        aria-hidden="true"
        className={`absolute inset-1 rounded-full bg-[var(--accent)]/30 blur-sm pointer-events-none transition-opacity duration-300 ${isLight
            ? flicker
              ? "opacity-30"
              : "opacity-100"
            : "opacity-0"
          }`}
      />

      {/* SVG Desk Lamp */}
      <span
        className={`relative z-10 inline-flex items-center justify-center transition-transform duration-200 motion-reduce:transform-none ${isAnimating ? "scale-90" : "scale-100"
          }`}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className={`transition-all duration-250 ${isLight
              ? flicker
                ? "opacity-60 drop-shadow-[0_0_2px_var(--accent)]"
                : "opacity-100 drop-shadow-[0_0_6px_var(--accent)]"
              : "opacity-65 text-[var(--muted-foreground)] group-hover:opacity-90"
            }`}
        >
          {/* Base */}
          <path
            d="M 5 21 H 19"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />

          {/* Stem */}
          <path
            d="M 12 13.5 V 21"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />

          {/* Lampshade (filled with accent when ON, transparent when OFF) */}
          <path
            d="M 7.5 13.5 L 9.5 4.5 H 14.5 L 16.5 13.5 Z"
            stroke={isLight ? "var(--accent)" : "currentColor"}
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={isLight ? "var(--accent)" : "transparent"}
            className="transition-colors duration-200"
          />

          {/* Pull chain with bead that swings 3px on click */}
          <g
            className={`transition-transform duration-200 motion-reduce:transform-none ${isAnimating ? "rotate-[14deg]" : "rotate-0"
              }`}
            style={{ transformOrigin: "15px 13.5px" }}
          >
            <path
              d="M 15 13.5 V 17"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <circle
              cx="15"
              cy="18"
              r="1.1"
              fill="currentColor"
            />
          </g>
        </svg>
      </span>
    </button>
  );
}
