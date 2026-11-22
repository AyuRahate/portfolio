"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "01{}[]()<>/\\=+-*;:#&%$";

interface MatrixBackgroundProps {
  fontSize?: number;
  speed?: number;
  density?: number;
  trail?: number;
  fps?: number;
}

interface Drop {
  active: boolean;
  head: number;
  v: number;
  chars: string[];
}

export default function MatrixBackground({
  fontSize = 15,
  speed = 0.28,
  density = 0.38,
  trail = 14,
  fps = 30,
}: MatrixBackgroundProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const n = trail + 1;
    const gap = fontSize * 1.25;
    const rand = (m: number) => Math.floor(Math.random() * m);
    const glyph = () => GLYPHS[rand(GLYPHS.length)];
    const idx = (r: number) => ((r % n) + n) % n;

    let w = 0,
      h = 0,
      rows = 0;
    let drops: Drop[] = [];
    let rgb = "212, 163, 89";
    let raf = 0,
      last = 0,
      inView = true;

    const readColor = () => {
      const v = getComputedStyle(wrap)
        .getPropertyValue("--matrix-rgb")
        .trim();
      if (v) rgb = v;
    };

    const makeDrop = (scatter: boolean): Drop => ({
      active: Math.random() < density,
      head: scatter ? rand(rows + trail) : -rand(Math.max(rows, 1)),
      v: speed * (0.6 + Math.random() * 0.8),
      chars: Array.from({ length: n }, glyph),
    });

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = `rgb(${rgb})`;
      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        if (!d.active) continue;
        const head = Math.floor(d.head);
        for (let k = 0; k < trail; k++) {
          const r = head - k;
          if (r < 0 || r >= rows) continue;
          const t = 1 - k / trail;
          ctx.globalAlpha = k === 0 ? 0.9 : t * t * 0.5;
          ctx.fillText(d.chars[idx(r)], i * gap, r * fontSize);
        }
      }
      ctx.globalAlpha = 1;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${fontSize}px "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textBaseline = "top";
      rows = Math.ceil(h / fontSize);
      drops = Array.from({ length: Math.ceil(w / gap) }, () =>
        makeDrop(true)
      );
      draw();
    };

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      const dt = t - last;
      if (dt < 1000 / fps) return;
      const step = Math.min(dt, 100) / 16.67;
      last = t;
      for (const d of drops) {
        const prev = Math.floor(d.head);
        d.head += d.v * step;
        const cur = Math.floor(d.head);
        if (cur !== prev) d.chars[idx(cur)] = glyph();
        if (d.head - trail > rows) Object.assign(d, makeDrop(false));
      }
      draw();
    };

    const start = () => {
      if (raf || reduceMotion || !inView || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    readColor();
    resize();
    start();

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      inView ? start() : stop();
    });
    io.observe(wrap);

    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    // Reacts to data-theme changes so the gold RGB updates live
    const mo = new MutationObserver(() => {
      readColor();
      if (reduceMotion) draw();
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [fontSize, speed, density, trail, fps]);

  return (
    <div ref={wrapRef} className="matrix-bg" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
