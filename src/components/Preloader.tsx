"use client";

import { useEffect, useState } from "react";

const GLYPHS = "01{}[]<>/=+*#$%&;";
const KEY = "preloader-seen";

interface PreloaderProps {
  onDone?: () => void;
}

export default function Preloader({ onDone }: PreloaderProps) {
  const [show, setShow] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      try {
        return !sessionStorage.getItem(KEY);
      } catch {
        return true;
      }
    }
    return true;
  });
  const [phase, setPhase] = useState<"load" | "morph" | "exit">("load");
  const [pct, setPct] = useState(0);
  const [first, setFirst] = useState("L");

  useEffect(() => {
    const root = document.documentElement;
    const finish = () => {
      root.style.overflow = "";
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
      root.dataset.loaded = "true";
      window.dispatchEvent(new Event("preloader:done"));
      setShow(false);
      onDone?.();
    };

    let seen = false;
    try {
      seen = !!sessionStorage.getItem(KEY);
    } catch {}
    if (seen) {
      finish();
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const LOAD = reduce ? 500 : 1900;
    const timers: NodeJS.Timeout[] = [];
    let raf = 0;
    let iv: NodeJS.Timeout | undefined;
    const t0 = performance.now();

    root.style.overflow = "hidden";

    const tick = (now: number) => {
      const t = Math.min((now - t0) / LOAD, 1);
      setPct(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);

    timers.push(
      setTimeout(() => {
        setPhase("morph");
        let i = 0;
        iv = setInterval(() => {
          i += 1;
          if (i >= 9) {
            if (iv) clearInterval(iv);
            setFirst("C");
          } else {
            setFirst(GLYPHS[Math.floor(Math.random() * GLYPHS.length)]);
          }
        }, 55);
      }, LOAD + 150)
    );

    timers.push(
      setTimeout(() => {
        setPhase("exit");
      }, LOAD + 150 + 1500)
    );

    timers.push(
      setTimeout(finish, LOAD + 150 + 1500 + 950)
    );

    return () => {
      timers.forEach(clearTimeout);
      if (iv) clearInterval(iv);
      cancelAnimationFrame(raf);
      root.style.overflow = "";
    };
  }, [onDone]);

  if (!show) return null;

  const letters = [
    { c: first, cls: "pl-first" },
    { c: "o" },
    { c: "a", cls: "pl-a" },
    { c: "d" },
    { c: "i" },
    { c: "n" },
    { c: "g" },
  ];

  return (
    <div
      className={`preloader is-${phase}`}
      role="status"
      aria-live="polite"
      aria-label="Loading"
      style={{ "--pct": pct } as React.CSSProperties}
    >
      <div className="pre-glow" />
      <div className="pre-word" aria-hidden="true">
        {letters.map((l, i) => (
          <span
            key={i}
            className={`pl ${l.cls || ""}`}
            style={{ "--i": i } as React.CSSProperties}
          >
            {l.c}
          </span>
        ))}
        <span className="pre-dots">
          <i>.</i>
          <i>.</i>
          <i>.</i>
        </span>
        <span className="pre-cursor" />
      </div>
      <div className="pre-meta" aria-hidden="true">
        <span>Ayush Rahate · Portfolio</span>
        <span>{String(pct).padStart(3, "0")}%</span>
      </div>
      <div className="pre-bar" />
    </div>
  );
}
