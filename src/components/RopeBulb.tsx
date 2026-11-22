"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/layout/ThemeProvider";

export function RopeBulb() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [pulling, setPulling] = useState(false);
  const rafRef = useRef<number | null>(null);
  const translateRef = useRef(0); // current translateY in px

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show/hide based on scroll: slides up when scrolled past hero
  useEffect(() => {
    const heroEl = document.getElementById("home");

    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        if (!heroEl) return;
        const heroBottom = heroEl.getBoundingClientRect().bottom;
        // Start sliding up when hero bottom approaches viewport top
        setVisible(heroBottom > 80);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handlePull = () => {
    if (pulling) return;
    setPulling(true);
    toggleTheme();
    setTimeout(() => setPulling(false), 700);
  };

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <div
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      role="button"
      tabIndex={0}
      onClick={handlePull}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handlePull()}
      className={[
        "rope-bulb-wrapper",
        visible ? "rope-bulb--visible" : "rope-bulb--hidden",
        pulling ? "rope-bulb--pulling" : "",
        isDark ? "rope-bulb--dark" : "rope-bulb--light",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <svg
        width="44"
        height="190"
        viewBox="0 0 44 190"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="rope-bulb-svg"
        aria-hidden="true"
      >
        <defs>
          <filter id="bulb-glow" x="-80%" y="-60%" width="260%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="b1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="b2" />
            <feMerge><feMergeNode in="b2" /><feMergeNode in="b1" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="bulb-ambient" x="-150%" y="-100%" width="400%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="14" />
          </filter>
          <linearGradient id="rg1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6b4e28" />
            <stop offset="35%" stopColor="#b8864a" />
            <stop offset="65%" stopColor="#8f6235" />
            <stop offset="100%" stopColor="#6b4e28" />
          </linearGradient>
          <linearGradient id="rg2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7a5a30" />
            <stop offset="45%" stopColor="#c8964e" />
            <stop offset="100%" stopColor="#7a5a30" />
          </linearGradient>
          <radialGradient id="bulb-lit" cx="36%" cy="32%" r="60%">
            <stop offset="0%" stopColor="#fffbe8" />
            <stop offset="38%" stopColor="#ffd060" stopOpacity="0.95" />
            <stop offset="78%" stopColor="#df7c18" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#b04c08" stopOpacity="0.72" />
          </radialGradient>
          <radialGradient id="bulb-unlit" cx="36%" cy="32%" r="60%">
            <stop offset="0%" stopColor="#dedad2" stopOpacity="0.65" />
            <stop offset="58%" stopColor="#bab4a8" stopOpacity="0.48" />
            <stop offset="100%" stopColor="#928c82" stopOpacity="0.38" />
          </radialGradient>
          <linearGradient id="mount-g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#252018" />
            <stop offset="100%" stopColor="#38302a" />
          </linearGradient>
          <linearGradient id="socket-g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3e3020" />
            <stop offset="100%" stopColor="#2c2418" />
          </linearGradient>
        </defs>

        {/* Ceiling cap */}
        <rect x="15" y="0" width="14" height="7" rx="2.5" fill="url(#mount-g)" />
        <rect x="19" y="6" width="6" height="4" rx="1" fill="#1a1410" />

        {/* Upper rope — narrow braided bar */}
        <rect x="20" y="10" width="4" height="62" rx="2" fill="url(#rg1)" />
        {/* twist marks */}
        <path d="M20 16 Q24 19 20 24 Q24 29 20 34 Q24 39 20 44 Q24 49 20 54 Q24 59 20 64 Q24 68 20 72" stroke="#6b4e28" strokeWidth="0.9" fill="none" opacity="0.55" />
        <path d="M24 16 Q20 19 24 24 Q20 29 24 34 Q20 39 24 44 Q20 49 24 54 Q20 59 24 64 Q20 68 24 72" stroke="#c8964e" strokeWidth="0.6" fill="none" opacity="0.35" />

        {/* Knot — clean pretzel loop */}
        {/* left loop */}
        <path
          d="M22 73 C15 69 10 72 11 79 C12 85 18 87 22 83"
          stroke="url(#rg1)" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
        />
        {/* right loop */}
        <path
          d="M22 73 C29 69 34 72 33 79 C32 85 26 87 22 83"
          stroke="url(#rg2)" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
        />
        {/* center crossing strand */}
        <path
          d="M15 78 Q22 76 29 78"
          stroke="url(#rg1)" strokeWidth="3" fill="none" strokeLinecap="round"
        />
        {/* center knot body highlight */}
        <path
          d="M18 76 Q22 74.5 26 76"
          stroke="#c8964e" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6"
        />

        {/* Lower rope */}
        <rect x="20" y="88" width="4" height="38" rx="2" fill="url(#rg1)" />
        <path d="M20 93 Q24 97 20 103 Q24 109 20 115 Q24 120 20 126" stroke="#6b4e28" strokeWidth="0.9" fill="none" opacity="0.5" />

        {/* Socket (Edison base) */}
        <rect x="17" y="125" width="10" height="13" rx="1.5" fill="url(#socket-g)" />
        <rect x="17.5" y="127" width="9" height="1.5" rx="0.5" fill="#6a5030" opacity="0.55" />
        <rect x="17.5" y="130.5" width="9" height="1.5" rx="0.5" fill="#6a5030" opacity="0.55" />
        <rect x="17.5" y="134" width="9" height="1.5" rx="0.5" fill="#6a5030" opacity="0.55" />

        {/* Ambient glow behind bulb (dark only) */}
        {isDark && (
          <ellipse cx="22" cy="158" rx="18" ry="20" fill="#ff9820" opacity="0.16" filter="url(#bulb-ambient)" />
        )}

        {/* Bulb soft outer glow (dark only) */}
        {isDark && (
          <ellipse cx="22" cy="156" rx="15" ry="18" fill="#ffbe38" opacity="0.28" filter="url(#bulb-glow)" />
        )}

        {/* Bulb glass — compact teardrop */}
        <path
          d="M12 150 Q8 160 12 170 Q15 179 22 182 Q29 179 32 170 Q36 160 32 150 Q28.5 142 22 133 Q15.5 142 12 150 Z"
          fill={isDark ? "url(#bulb-lit)" : "url(#bulb-unlit)"}
          filter={isDark ? "url(#bulb-glow)" : undefined}
        />
        {/* glass highlight */}
        <ellipse cx="17" cy="146" rx="2.8" ry="5" fill="white" opacity={isDark ? 0.5 : 0.25} transform="rotate(-18 17 146)" />
        <ellipse cx="16" cy="152" rx="1.4" ry="2.5" fill="white" opacity={isDark ? 0.28 : 0.12} transform="rotate(-18 16 152)" />

        {/* Filament */}
        <g opacity={isDark ? 0.92 : 0.3}>
          <path d="M19 169 L19 157 Q19 153.5 22 153.5 Q25 153.5 25 157 L25 169"
            stroke={isDark ? "#fff4a0" : "#a09888"} strokeWidth="1.1" fill="none" strokeLinecap="round" />
          <path d="M19 157 Q21 155 22 157 Q23 159 25 157"
            stroke={isDark ? "#fffbc0" : "#b0a898"} strokeWidth="1" fill="none" />
          <path d="M19 161 Q21 159 22 161 Q23 163 25 161"
            stroke={isDark ? "#ffe890" : "#a09888"} strokeWidth="0.95" fill="none" />
          <path d="M19 165 Q21 163 22 165 Q23 167 25 165"
            stroke={isDark ? "#ffca50" : "#908878"} strokeWidth="0.9" fill="none" />
        </g>

        {/* Bulb bottom nub */}
        <ellipse cx="22" cy="182" rx="3.5" ry="2.8"
          fill={isDark ? "#d88830" : "#b0a898"} opacity="0.78" />
      </svg>

      {/* Pull hint label */}
      <span className="rope-bulb-hint">
        {isDark ? "Light on" : "Light off"}
      </span>
    </div>
  );
}
