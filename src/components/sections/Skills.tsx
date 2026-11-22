"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FileCode2,
  Coffee,
  Code,
  Layout,
  Palette,
  Code2,
  Smartphone,
  Server,
  Cpu,
  GitBranch,
  Github,
} from "lucide-react";
import { skillCategories } from "@/data/skills";

const iconMap: Record<string, React.ReactNode> = {
  FileCode2: <FileCode2 className="w-4 h-4 text-amber-400" />,
  Coffee: <Coffee className="w-4 h-4 text-orange-400" />,
  Code: <Code className="w-4 h-4 text-yellow-400" />,
  Layout: <Layout className="w-4 h-4 text-red-400" />,
  Palette: <Palette className="w-4 h-4 text-sky-400" />,
  Code2: <Code2 className="w-4 h-4 text-yellow-300" />,
  Smartphone: <Smartphone className="w-4 h-4 text-cyan-400" />,
  Server: <Server className="w-4 h-4 text-teal-400" />,
  Cpu: <Cpu className="w-4 h-4 text-purple-400" />,
  GitBranch: <GitBranch className="w-4 h-4 text-rose-400" />,
  Github: <Github className="w-4 h-4 text-slate-300" />,
};

export function Skills() {
  return (
    <section id="skills" className="py-24 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold">
                Core Stack
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)]">
              Technical Capabilities
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[var(--muted-foreground)] max-w-md">
            Verified technologies and tools actively used in project architecture, systems development, and data workflows.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-6 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] hover:border-[var(--surface-border-hover)] transition-all flex flex-col justify-between group shadow-sm"
            >
              <div>
                <h3 className="text-sm font-mono uppercase tracking-wider text-[var(--muted-foreground)] mb-4 font-semibold">
                  {category.category}
                </h3>

                <div className="flex flex-col gap-2.5">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--surface-border)] hover:border-[var(--surface-border-hover)] transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[var(--surface)] border border-[var(--surface-border)] flex items-center justify-center shrink-0">
                        {skill.iconName && iconMap[skill.iconName] ? (
                          iconMap[skill.iconName]
                        ) : (
                          <Code2 className="w-4 h-4 text-[var(--accent)]" />
                        )}
                      </div>
                      <span className="text-sm font-medium text-[var(--foreground)]">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

