"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  FileCode2,
  Coffee,
  Binary,
  Layout,
  Palette,
  Code,
  Smartphone,
  Server,
  Cpu,
  GitBranch,
  Github,
  Sparkles,
  ArrowDown,
} from "lucide-react";

/* ── TYPED CONTENT DEFINITIONS ────────────────────────────────────────── */

export interface SkillItem {
  name: string;
  description: string;
  icon: React.ReactNode;
  chips?: string[];
}

export interface CategoryPanel {
  id: string;
  title: string;
  index: string;
  intro: string;
  icon: React.ReactNode;
  items: SkillItem[];
}

export const SKILLS_CATEGORIES: CategoryPanel[] = [
  {
    id: "programming-languages",
    title: "Programming Languages",
    index: "01 / 05",
    intro: "The languages I build and learn with.",
    icon: <FileCode2 className="w-6 h-6 text-amber-400" />,
    items: [
      {
        name: "Python",
        description:
          "Primary language for machine learning, data analysis and scripting. Used across academic and personal projects for model pipelines, automation scripts and server-side logic.",
        icon: <FileCode2 className="w-5 h-5 text-amber-400" />,
        chips: ["ML", "Data Science", "Automation", "Backend"],
      },
      {
        name: "Java",
        description:
          "Object-oriented programming, data structures and core concepts from coursework.",
        icon: <Coffee className="w-5 h-5 text-orange-400" />,
      },
      {
        name: "C",
        description:
          "Foundations of low-level programming, memory and problem solving from coursework.",
        icon: <Binary className="w-5 h-5 text-cyan-400" />,
      },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    index: "02 / 05",
    intro: "Building responsive, interactive interfaces.",
    icon: <Layout className="w-6 h-6 text-sky-400" />,
    items: [
      {
        name: "HTML",
        description: "Semantic structure and accessible page markup.",
        icon: <Layout className="w-5 h-5 text-red-400" />,
      },
      {
        name: "CSS",
        description: "Responsive layouts, animation and design systems.",
        icon: <Palette className="w-5 h-5 text-sky-400" />,
      },
      {
        name: "JavaScript",
        description: "Interactivity and application logic for the web.",
        icon: <Code className="w-5 h-5 text-yellow-400" />,
      },
    ],
  },
  {
    id: "mobile-backend",
    title: "Mobile & Backend",
    index: "03 / 05",
    intro: "Apps and the APIs behind them.",
    icon: <Server className="w-6 h-6 text-teal-400" />,
    items: [
      {
        name: "Flutter",
        description: "Cross-platform mobile apps from a single codebase.",
        icon: <Smartphone className="w-5 h-5 text-cyan-400" />,
      },
      {
        name: "FastAPI",
        description: "Fast, typed Python APIs for serving ML models and app backends.",
        icon: <Server className="w-5 h-5 text-teal-400" />,
      },
    ],
  },
  {
    id: "ai-ml",
    title: "AI / Machine Learning",
    index: "04 / 05",
    intro: "Turning data into working intelligent systems.",
    icon: <Cpu className="w-6 h-6 text-purple-400" />,
    items: [
      {
        name: "Machine Learning",
        description:
          "Building and evaluating models, recommendation systems and data pipelines.",
        icon: <Cpu className="w-6 h-6 text-purple-400" />,
        chips: ["Model Training", "Data Pipelines", "Evaluation"],
      },
    ],
  },
  {
    id: "developer-tools",
    title: "Developer Tools",
    index: "05 / 05",
    intro: "Workflow and collaboration tools.",
    icon: <GitBranch className="w-6 h-6 text-rose-400" />,
    items: [
      {
        name: "Git",
        description: "Version control, branching and clean commit history.",
        icon: <GitBranch className="w-5 h-5 text-rose-400" />,
      },
      {
        name: "GitHub",
        description: "Collaboration, code hosting, pull requests and project tracking.",
        icon: <Github className="w-5 h-5 text-slate-300" />,
      },
    ],
  },
];

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const prefersReduced = useReducedMotion();

  // Manage visibility of the side indicator and track active category panel
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.04 }
    );
    sectionObserver.observe(section);

    const panelObservers: IntersectionObserver[] = [];
    panelRefs.current.forEach((el, idx) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveCategoryIndex(idx);
          }
        },
        { threshold: 0.45 }
      );
      obs.observe(el);
      panelObservers.push(obs);
    });

    return () => {
      sectionObserver.disconnect();
      panelObservers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative bg-[var(--background)] overflow-x-clip"
      aria-label="Technical Capabilities and Skills"
    >
      {/* ── INTRO HEADER ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-10">
        <div className="pb-8">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_12px_var(--accent)]" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)] font-bold">
              Core Stack
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.035em] text-[var(--foreground)] leading-[0.95]">
            Technical Capabilities
          </h2>
        </div>

        {/* ── 5 SPECIALIZED SUBTYPES VISUAL DIRECTORY ── */}
        <div className="pt-6 border-t border-[var(--surface-border)] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/30 text-[var(--accent)]">
              <ArrowDown className="w-3.5 h-3.5" />
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--foreground)] font-semibold">
              5 Specialized Subtypes
            </span>
            <span className="hidden sm:inline font-mono text-xs text-[var(--muted-foreground)]">
              (Scroll to explore)
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {SKILLS_CATEGORIES.map((cat, idx) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--surface-border)] bg-[var(--surface)] hover:border-[var(--accent)]/60 hover:bg-[var(--surface-elevated)] transition-all group"
              >
                <span className="font-mono text-[11px] font-bold text-[var(--accent)]">
                  0{idx + 1}
                </span>
                <span className="text-xs font-medium text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors">
                  {cat.title}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── FLOATING SIDE PROGRESS INDICATOR (Desktop only, 01-05 dots) ── */}
      <aside
        aria-label="Skills category navigation indicator"
        className={`hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3.5 pointer-events-none transition-opacity duration-300 ${isSectionVisible ? "opacity-100" : "opacity-0"
          }`}
      >
        {SKILLS_CATEGORIES.map((cat, idx) => (
          <div key={cat.id} className="flex items-center gap-2.5">
            <span
              className={`w-2 h-2 rounded-full transition-all duration-300 ${activeCategoryIndex === idx
                ? "bg-[var(--accent)] scale-125 shadow-[0_0_10px_var(--accent)]"
                : "bg-[var(--surface-border)]"
                }`}
            />
            <span
              className={`font-mono text-[10px] tracking-wider transition-colors duration-300 ${activeCategoryIndex === idx
                ? "text-[var(--accent)] font-bold"
                : "text-[var(--muted-foreground)]/40"
                }`}
            >
              0{idx + 1}
            </span>
          </div>
        ))}
      </aside>

      {/* ── STACKED FULL-SCREEN CATEGORY PANELS ── */}
      <div className="relative">
        {SKILLS_CATEGORIES.map((category, idx) => (
          <div
            key={category.id}
            id={category.id}
            ref={(el) => {
              panelRefs.current[idx] = el;
            }}
            className="sticky top-0 min-h-screen w-full flex items-center justify-center bg-[var(--background)] bg-grid-pattern border-t border-[var(--surface-border)]/40 px-4 sm:px-8 lg:px-16 py-12 scroll-mt-20"
            style={{ zIndex: idx + 10 }}
          >
            <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {/* ── LEFT SIDE: THE CATEGORY AS THE HERO ── */}
              <motion.div
                initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6 flex flex-col items-start"
              >
                {/* Meta Badge: Category Icon + Index */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--surface-border)] flex items-center justify-center shrink-0 shadow-sm">
                    {category.icon}
                  </div>
                  <span className="font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--accent)] font-semibold">
                    Subtype {category.index}
                  </span>
                </div>

                {/* Big Category Title (allows 2-line wrap with gradient fade on both lines) */}
                <h3 className="text-[clamp(2.75rem,6.2vw,5.75rem)] font-extrabold tracking-[-0.04em] text-[var(--foreground)] leading-[1.05] mb-5">
                  <span className="bg-gradient-to-r from-[var(--foreground)] via-[var(--foreground)] to-[var(--accent)]/80 bg-clip-text text-transparent inline-block">
                    {category.title}
                  </span>
                </h3>

                {/* Category Intro */}
                <p className="text-base sm:text-lg text-[var(--muted-foreground)] leading-relaxed max-w-lg mb-6 font-normal">
                  {category.intro}
                </p>

                {/* List of Technologies as Small Chips Underneath */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[var(--surface-border)]/60 w-full max-w-lg">
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--muted-foreground)] mr-1">
                    Technologies:
                  </span>
                  {category.items.map((tech) => (
                    <span
                      key={tech.name}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--surface-border)] bg-[var(--surface)] text-xs font-mono font-medium text-[var(--foreground)] hover:border-[var(--accent)]/50 transition-colors"
                    >
                      <Sparkles className="w-3 h-3 text-[var(--accent)]" />
                      <span>{tech.name}</span>
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* ── RIGHT SIDE: STACK OF TECHNOLOGY CARDS ── */}
              <div className="lg:col-span-6 w-full flex flex-col justify-center">
                <div className="flex flex-col justify-center gap-4 sm:gap-5 w-full">
                  {category.items.map((tech, itemIdx) => {
                    const isSingleCard = category.items.length === 1;

                    return (
                      <motion.div
                        key={tech.name}
                        initial={prefersReduced ? { opacity: 1 } : { opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{
                          duration: 0.5,
                          delay: prefersReduced ? 0 : itemIdx * 0.08,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className={`rounded-2xl border bg-[var(--surface)]/90 backdrop-blur-md transition-all duration-300 group hover:border-[var(--accent)]/50 hover:shadow-lg ${isSingleCard
                          ? "p-7 sm:p-9 border-[var(--accent)]/40 shadow-[0_4px_30px_rgba(212,163,89,0.08)]"
                          : "p-5 sm:p-6 border-[var(--surface-border)]"
                          }`}
                      >
                        {/* Card Header: Icon & Name */}
                        <div className="flex items-center gap-3.5 mb-2.5">
                          <div
                            className={`rounded-xl bg-[var(--surface-elevated)] border border-[var(--surface-border)] group-hover:border-[var(--accent)]/40 flex items-center justify-center shrink-0 transition-colors shadow-sm ${isSingleCard ? "w-12 h-12" : "w-10 h-10"
                              }`}
                          >
                            {tech.icon}
                          </div>
                          <div>
                            <h4
                              className={`font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors ${isSingleCard ? "text-xl sm:text-2xl" : "text-base sm:text-lg"
                                }`}
                            >
                              {tech.name}
                            </h4>
                          </div>
                        </div>

                        {/* Description */}
                        <p
                          className={`text-[var(--muted-foreground)] leading-relaxed ${isSingleCard ? "text-sm sm:text-base mb-4" : "text-xs sm:text-sm"
                            }`}
                        >
                          {tech.description}
                        </p>

                        {/* Optional "Used For" Chips */}
                        {tech.chips && tech.chips.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-3 pt-3 border-t border-[var(--surface-border)]/60">
                            {tech.chips.map((chip) => (
                              <span
                                key={chip}
                                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/30 text-[11px] font-mono text-[var(--foreground)]"
                              >
                                <span className="w-1 h-1 rounded-full bg-[var(--accent)]" />
                                <span>{chip}</span>
                              </span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
