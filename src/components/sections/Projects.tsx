"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Layers, ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";

export function Projects() {
  const publishedProjects = projects.filter((p) => p.published);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 relative bg-[var(--surface)]/20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold">
                Featured Engineering
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)]">
              Highlighted Projects
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[var(--muted-foreground)] max-w-md">
            Production systems, algorithmic pipelines, and machine learning models built with rigorous engineering standards.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {publishedProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="group flex flex-col rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] hover:border-[var(--surface-border-hover)] transition-all overflow-hidden shadow-card"
            >
              {/* Media Container / Designed Abstract Preview */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--surface-elevated)] border-b border-[var(--surface-border)]">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-950/40 to-slate-900/60 p-6">
                    <Layers className="w-12 h-12 text-indigo-400/50" />
                  </div>
                )}

                {/* Category Pill */}
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-[var(--surface)]/90 backdrop-blur-md border border-[var(--surface-border)] text-[var(--foreground)] shadow-sm">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors mb-2.5 flex items-center justify-between">
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-[var(--accent)]" />
                  </h3>

                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-xs font-mono bg-[var(--surface-elevated)] text-[var(--muted-foreground)] border border-[var(--surface-border)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-[var(--surface-border)] flex items-center justify-between">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
                  >
                    <span>Read Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  {project.repositoryUrl && (
                    <a
                      href={project.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} GitHub repository`}
                      className="inline-flex items-center gap-1 text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors font-mono"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

