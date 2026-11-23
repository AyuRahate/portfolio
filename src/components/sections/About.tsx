"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, BrainCircuit, Sparkles, Compass } from "lucide-react";
import { personalData } from "@/data/personal";

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-5 h-5 text-[var(--accent)] stroke-[1.8]" />,
  BrainCircuit: <BrainCircuit className="w-5 h-5 text-[var(--accent)] stroke-[1.8]" />,
  Sparkles: <Sparkles className="w-5 h-5 text-[var(--accent)] stroke-[1.8]" />,
  Compass: <Compass className="w-5 h-5 text-[var(--accent)] stroke-[1.8]" />,
};

export function About() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* ── SUBTLE RADIAL MASK FADING GRID LINES BEHIND TEXT COLUMN ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none -z-10 bg-[var(--background)] [mask-image:radial-gradient(ellipse_65%_75%_at_22%_45%,rgba(0,0,0,0.85),transparent)]"
      />

      <div className="max-w-7xl mx-auto">
        {/* ── SECTION LABEL: PLACED ABOVE TWO-COLUMN GRID ── */}
        <div className="flex items-center gap-2 mb-8 sm:mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)] font-semibold">
            About Me
          </span>
        </div>

        {/* ── TWO-COLUMN BALANCED GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-stretch">
          {/* Left Column: Heading + Tightened Paragraphs */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-[var(--text-strong)] leading-[1.1] mb-6 sm:mb-8"
                style={{ textWrap: "balance" }}
              >
                Bridging engineering precision with thoughtful digital craft.
              </h2>

              <div className="space-y-5 text-base sm:text-[18px] text-[var(--text-body)] leading-[1.65] max-w-[60ch]">
                <p>
                  I&apos;m a B.Tech Computer Engineering student at DJSCE (expected 2028), interested in software development, AI and machine learning, and building useful applications.
                </p>
                <p>
                  Alongside programming I enjoy editing and creative digital work. I value both the engineering behind a product and the experience it delivers to people.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 2x2 Bento Cards with equal row height */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 auto-rows-fr">
            {personalData.bentoHighlights.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="about-card p-5 sm:p-6 flex flex-col justify-between group"
              >
                <div>
                  {/* Uniform Accent Icon Tile */}
                  <div className="w-11 h-11 rounded-xl bg-[var(--accent)]/12 border border-[var(--accent)]/20 flex items-center justify-center shrink-0 mb-4 transition-transform duration-200 group-hover:scale-105">
                    {iconMap[item.icon] || <Code2 className="w-5 h-5 text-[var(--accent)] stroke-[1.8]" />}
                  </div>

                  {/* Card Title */}
                  <h3 className="text-base sm:text-lg font-semibold text-[var(--text-strong)] mb-2 leading-snug">
                    {item.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-[15px] text-[var(--text-muted)] leading-[1.55]">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
