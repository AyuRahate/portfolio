import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Github, ExternalLink, CheckCircle2, AlertCircle, Layers } from "lucide-react";
import { projects } from "@/data/projects";
import type { Metadata } from "next";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return projects
    .filter((project) => project.published)
    .map((project) => ({
      slug: project.slug,
    }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug && p.published);

  if (!project) {
    return {
      title: "Project Not Found — Ayush Rahate",
    };
  }

  return {
    title: `${project.title} — Case Study | Ayush Rahate`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const publishedProjects = projects.filter((p) => p.published);
  const projectIndex = publishedProjects.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = publishedProjects[projectIndex];
  const nextProject = publishedProjects[(projectIndex + 1) % publishedProjects.length];

  return (
    <article className="pt-28 pb-20 px-4 sm:px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors px-3 py-1.5 rounded-lg border border-[var(--surface-border)] bg-[var(--surface)]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Projects</span>
          </Link>
        </div>

        {/* Hero Header */}
        <header className="mb-12">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-mono font-medium bg-[var(--surface-elevated)] border border-[var(--surface-border)] text-[var(--accent)] mb-4">
            {project.category}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--foreground)] mb-5">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-[var(--muted-foreground)] leading-relaxed mb-8">
            {project.description}
          </p>

          {/* Action Links & Tech Stack */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)]">
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-[var(--surface-elevated)] text-[var(--muted-foreground)] border border-[var(--surface-border)]"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {project.repositoryUrl && (
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[var(--surface-border)] bg-[var(--surface-elevated)] text-xs font-semibold text-[var(--foreground)] hover:border-[var(--surface-border-hover)] transition-all font-mono"
                >
                  <Github className="w-4 h-4" />
                  <span>Repository</span>
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[var(--accent)] text-white text-xs font-semibold hover:opacity-90 transition-all font-mono"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Project Visual / Abstract Preview */}
        {project.image && (
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[var(--surface-border)] mb-14 bg-[var(--surface-elevated)] shadow-card">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>
        )}

        {/* Structured Case Study Sections */}
        <div className="space-y-12 text-[var(--foreground)]">
          {/* Problem Statement */}
          {project.problem && (
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>Problem Statement</span>
              </h2>
              <div className="p-6 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
                {project.problem}
              </div>
            </section>
          )}

          {/* Technical Solution */}
          {project.solution && (
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Proposed Technical Solution</span>
              </h2>
              <div className="p-6 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
                {project.solution}
              </div>
            </section>
          )}

          {/* Architecture */}
          {project.architecture && (
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                <span>System & Model Architecture</span>
              </h2>
              <div className="p-6 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
                {project.architecture}
              </div>
            </section>
          )}

          {/* Personal Contributions */}
          {project.contributions && project.contributions.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                <span>Key Engineering Contributions</span>
              </h2>
              <div className="p-6 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] space-y-3">
                {project.contributions.map((contribution, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm sm:text-base text-[var(--muted-foreground)]">
                    <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                    <span>{contribution}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Challenges & Decisions */}
          {project.challenges && project.challenges.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Technical Challenges & Solutions</span>
              </h2>
              <div className="p-6 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] space-y-3">
                {project.challenges.map((challenge, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm sm:text-base text-[var(--muted-foreground)]">
                    <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{challenge}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Verified Results */}
          {project.results && project.results.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Verified Outcomes & Results</span>
              </h2>
              <div className="p-6 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] space-y-3">
                {project.results.map((result, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm sm:text-base text-[var(--muted-foreground)]">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="font-medium text-[var(--foreground)]">{result}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Footer Navigation: Next Project */}
        <nav className="mt-16 pt-8 border-t border-[var(--surface-border)] flex items-center justify-between">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Projects</span>
          </Link>

          {nextProject && (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="inline-flex items-center gap-2 text-xs font-mono text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
            >
              <span>Next: {nextProject.title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}

