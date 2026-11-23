"use client";

import React, { useEffect, useRef } from "react";

const CHARS = "{}[]()<>/\\%$#&*+-=;:";

function getMatrixChar(): string {
  // ~60% chance for 0 or 1, ~40% for code symbols
  if (Math.random() < 0.6) {
    return Math.random() < 0.5 ? "0" : "1";
  }
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

interface Column {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  headChar: string;
  length: number;
}

export default function MatrixRain() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const FONT_SIZE = 14;
    const COLUMN_SPACING = 16;
    const TARGET_FPS = 30;
    const FRAME_INTERVAL = 1000 / TARGET_FPS;

    let width = 0;
    let height = 0;
    let columns: Column[] = [];
    let animationFrameId = 0;
    let lastFrameTime = 0;
    let isVisible = true;

    // Theme color resolver: pulls current --accent and background
    let accentRgb = "212, 163, 89";
    let isDark = true;

    const updateColors = () => {
      const rootStyle = getComputedStyle(document.documentElement);
      const theme = document.documentElement.getAttribute("data-theme") || "dark";
      isDark = theme !== "light";

      const matrixRgb = rootStyle.getPropertyValue("--matrix-rgb").trim();
      if (matrixRgb) {
        accentRgb = matrixRgb;
      } else {
        accentRgb = isDark ? "212, 163, 89" : "181, 130, 50";
      }
    };

    const initColumns = () => {
      const colCount = Math.floor(width / COLUMN_SPACING);
      columns = [];

      for (let i = 0; i < colCount; i++) {
        const len = Math.floor(12 + Math.random() * 20); // 12-32 characters long trail
        const chars: string[] = [];
        for (let j = 0; j < len; j++) {
          chars.push(getMatrixChar());
        }

        columns.push({
          x: i * COLUMN_SPACING + (COLUMN_SPACING - FONT_SIZE) / 2,
          y: Math.random() * -height * 1.2, // staggered start above view
          speed: 2.2 + Math.random() * 3.2, // varied speeds
          chars,
          headChar: getMatrixChar(),
          length: len,
        });
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.clientWidth;
      height = container.clientHeight;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${FONT_SIZE}px "JetBrains Mono", ui-monospace, SFMono-Regular, monospace`;
      ctx.textBaseline = "top";

      initColumns();
      drawFrame();
    };

    const drawFrame = () => {
      // Semi-transparent background clear for smooth rain trail fading
      ctx.fillStyle = isDark ? "rgba(18, 17, 16, 0.14)" : "rgba(241, 233, 223, 0.16)";
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < columns.length; i++) {
        const col = columns[i];

        // Randomly flicker/change 1-2 characters in the column for live digital activity
        if (Math.random() < 0.28) {
          const randIdx = Math.floor(Math.random() * col.chars.length);
          col.chars[randIdx] = getMatrixChar();
        }

        const headY = col.y;

        // Draw trail characters fading from head to tail
        for (let j = 0; j < col.length; j++) {
          const charY = headY - j * FONT_SIZE;
          if (charY < -FONT_SIZE || charY > height) continue;

          if (j === 0) {
            // Head character: bright glowing accent
            ctx.fillStyle = isDark ? "#fff6e0" : "#ffffff";
            ctx.shadowColor = `rgba(${accentRgb}, 0.8)`;
            ctx.shadowBlur = 6;
            ctx.fillText(col.headChar, col.x, charY);
            ctx.shadowBlur = 0; // reset
          } else {
            // Trail character: gold accent fading down
            const fade = Math.pow(1 - j / col.length, 1.4);
            ctx.fillStyle = `rgba(${accentRgb}, ${(fade * 0.85).toFixed(3)})`;
            ctx.fillText(col.chars[j % col.chars.length], col.x, charY);
          }
        }

        // Advance column
        col.y += col.speed;
        col.headChar = getMatrixChar();

        // Reset column when it passes the bottom
        if (col.y - col.length * FONT_SIZE > height) {
          col.y = -FONT_SIZE * (2 + Math.random() * 8);
          col.speed = 2.2 + Math.random() * 3.2;
          col.headChar = getMatrixChar();
        }
      }
    };

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible || document.hidden) return;

      const elapsed = currentTime - lastFrameTime;
      if (elapsed < FRAME_INTERVAL) return;

      lastFrameTime = currentTime - (elapsed % FRAME_INTERVAL);
      drawFrame();
    };

    updateColors();
    resize();

    // Respect prefers-reduced-motion: draw single static frame and don't animate
    if (!prefersReducedMotion) {
      lastFrameTime = performance.now();
      animationFrameId = requestAnimationFrame(animate);
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    intersectionObserver.observe(container);

    const handleVisibilityChange = () => {
      if (!document.hidden && !prefersReducedMotion) {
        lastFrameTime = performance.now();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Watch for light/dark theme switch to immediately refresh colors
    const mutationObserver = new MutationObserver(() => {
      updateColors();
      if (prefersReducedMotion) drawFrame();
    });
    mutationObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="matrix-rain-container pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <canvas ref={canvasRef} className="matrix-rain-canvas block w-full h-full" />
      {/* Radial vignette mask preserving contrast over headline, text, and portrait */}
      <div className="matrix-rain-vignette pointer-events-none absolute inset-0" />
    </div>
  );
}
