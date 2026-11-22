"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { educationData } from "@/data/education";

export function Education() {
  const item = educationData[0];

  return (
    <section id="education" className="py-24 px-4 sm:px-6 relative bg-[var(--surface)]/20">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold">
              Academic Background
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)]">
            Education
          </h2>
        </div>

        {/* Elegant Education Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] p-8 shadow-card relative overflow-hidden"
        >
          {/* Subtle accent glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10" />

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-[var(--surface-border)]">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--surface-elevated)] border border-[var(--surface-border)] flex items-center justify-center shrink-0 text-[var(--accent)]">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-1">
                  {item.institution}
                </h3>
                <p className="text-sm font-medium text-[var(--accent)]">
                  {item.degree}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap md:flex-col items-start md:items-end gap-2 text-xs font-mono text-[var(--muted-foreground)]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--surface-elevated)] border border-[var(--surface-border)] text-[var(--foreground)]">
                <Calendar className="w-3.5 h-3.5 text-[var(--accent)]" />
                Expected Graduation: {item.expectedGraduation}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--surface-elevated)] border border-[var(--surface-border)]">
                <MapPin className="w-3.5 h-3.5" />
                {item.location}
              </span>
            </div>
          </div>

          {/* Academic Highlights */}
          {item.highlights && item.highlights.length > 0 && (
            <div className="pt-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--muted-foreground)] mb-3">
                Focus Areas
              </h4>
              <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
                {item.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

