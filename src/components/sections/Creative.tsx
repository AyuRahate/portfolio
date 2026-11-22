"use client";

import React from "react";
import { motion } from "framer-motion";
import { Film, Sliders, Clapperboard, Sparkles } from "lucide-react";
import { creativeInterests } from "@/data/achievements";

const iconMap: Record<string, React.ReactNode> = {
  Film: <Film className="w-5 h-5 text-indigo-400" />,
  Sliders: <Sliders className="w-5 h-5 text-purple-400" />,
  Clapperboard: <Clapperboard className="w-5 h-5 text-amber-400" />,
};

export function Creative() {
  return (
    <section id="creative" className="py-24 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              <span className="font-mono text-xs uppercase tracking-wider text-purple-400 font-semibold">
                Creative Sensibility
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)] mb-3">
              Beyond the Code
            </h2>
            <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
              Beyond engineering, I&apos;m drawn to the creative side of technology — editing, visual composition, and crafting engaging digital experiences. I enjoy exploring how technical execution and creative thinking can complement each other.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--surface-border)] bg-[var(--surface)] text-xs font-mono text-[var(--muted-foreground)] shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Visual Craft & Storytelling</span>
          </div>
        </div>

        {/* Editorial Creative Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {creativeInterests.map((interest, idx) => (
            <motion.div
              key={interest.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group p-6 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] hover:border-purple-500/30 hover:bg-[var(--surface-elevated)] transition-all flex flex-col justify-between shadow-card"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[var(--surface-elevated)] border border-[var(--surface-border)] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  {iconMap[interest.iconName] || <Film className="w-5 h-5 text-purple-400" />}
                </div>

                <h3 className="text-lg font-bold text-[var(--foreground)] mb-2.5">
                  {interest.title}
                </h3>

                <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed mb-6">
                  {interest.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--surface-border)]">
                {interest.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-[var(--surface-elevated)] text-[var(--muted-foreground)] border border-[var(--surface-border)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

