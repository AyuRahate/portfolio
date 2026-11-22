"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, BrainCircuit, Sparkles, Compass, User } from "lucide-react";
import { personalData } from "@/data/personal";

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-5 h-5 text-indigo-400" />,
  BrainCircuit: <BrainCircuit className="w-5 h-5 text-purple-400" />,
  Sparkles: <Sparkles className="w-5 h-5 text-amber-400" />,
  Compass: <Compass className="w-5 h-5 text-emerald-400" />,
};

export function About() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Label */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold">
            About Me
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Written Introduction */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)]">
              Bridging engineering precision with thoughtful digital craft.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
              {personalData.aboutParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            <div className="pt-2">
              <div className="p-4 rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] text-xs font-mono text-[var(--muted-foreground)] flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--foreground)] font-semibold">Education</span>
                  <span className="text-[var(--accent)]">2024 — 2028</span>
                </div>
                <p>Dwarkadas J Sanghvi College of Engineering, Mumbai</p>
                <p>B.Tech in Computer Engineering</p>
              </div>
            </div>
          </div>

          {/* Right Column: Creative Bento Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {personalData.bentoHighlights.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-5 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] hover:border-[var(--surface-border-hover)] hover:bg-[var(--surface-elevated)] transition-all flex flex-col justify-between group shadow-sm"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[var(--surface-elevated)] border border-[var(--surface-border)] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    {iconMap[item.icon] || <Code2 className="w-5 h-5 text-[var(--accent)]" />}
                  </div>
                  <h3 className="text-base font-semibold text-[var(--foreground)] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
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

