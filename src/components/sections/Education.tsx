"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import {
  School,
  BookOpen,
  GraduationCap,
  Calendar,
  MapPin,
  Award,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export interface EducationTimelineItem {
  id: string;
  level: string;
  institution: string;
  institutionShort: string;
  year: string;
  periodText: string;
  score: string;
  scoreContext: string;
  mhtCet?: string;
  isCurrent?: boolean;
  iconName: "School" | "BookOpen" | "GraduationCap";
  location: string;
  description: string;
  highlights: string[];
}

export const EDUCATION_DATA: EducationTimelineItem[] = [
  {
    id: "edu-ssc",
    level: "SSC (Class X)",
    institution: "St Francis De Sales School",
    institutionShort: "St. Francis De Sales",
    year: "2022",
    periodText: "Completed 2022",
    score: "81%",
    scoreContext: "Board Examination",
    iconName: "School",
    location: "Nagpur, India",
    description:
      "Completed secondary education with distinction, establishing strong analytical foundations in Mathematics, Science, and Information Technology.",
    highlights: [
      "Secured 81% in State Secondary Certificate examination",
      "Built early passion for computer systems and problem solving",
    ],
  },
  {
    id: "edu-hsc",
    level: "HSC (Class XII)",
    institution: "St Peters Junior College",
    institutionShort: "St. Peter's Jr. College",
    year: "2024",
    periodText: "Completed 2024",
    score: "88.83%",
    scoreContext: "HSC Board Score",
    mhtCet: "98.807 percentile",
    iconName: "BookOpen",
    location: "Maharashtra, India",
    description:
      "Higher Secondary Certificate in the Science stream with intensive study in Mathematics, Physics, and Computer Science.",
    highlights: [
      "Achieved 88.83% aggregate in Class XII Board examination",
      "Qualified competitive MHT-CET entrance with 98.807 percentile",
    ],
  },
  {
    id: "edu-btech",
    level: "B.Tech in Computer Engineering",
    institution: "DJ Sanghvi College of Engineering, Mumbai",
    institutionShort: "DJSCE Mumbai",
    year: "2024 — 2028",
    periodText: "Expected Graduation 2028",
    score: "8.99 CGPA",
    scoreContext: "till Sem 4",
    isCurrent: true,
    iconName: "GraduationCap",
    location: "Mumbai, India",
    description:
      "Pursuing undergraduate degree in Computer Engineering. Focusing on algorithms, intelligent systems, software development, and modern cloud architecture.",
    highlights: [
      "Maintained 8.99 CGPA across first 4 semesters",
      "Core areas: Data Structures & Algorithms, Database Systems, Machine Learning, Operating Systems",
      "Active participant in technical projects and student engineering communities",
    ],
  },
];

function getEducationIcon(name: "School" | "BookOpen" | "GraduationCap") {
  switch (name) {
    case "School":
      return <School className="w-5 h-5" />;
    case "BookOpen":
      return <BookOpen className="w-5 h-5" />;
    case "GraduationCap":
      return <GraduationCap className="w-5 h-5" />;
  }
}

export function Education() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Scroll progress for the timeline connector line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 75%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <section
      id="education"
      className="py-24 px-4 sm:px-6 relative bg-[var(--surface)]/20 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20 lg:mb-24">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold">
              Academic Background
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--foreground)]">
            Education
          </h2>
        </div>

        {/* ── VERTICAL TIMELINE SECTION ── */}
        <div ref={containerRef} className="relative">
          {/* Background neutral track line */}
          <div
            aria-hidden="true"
            className="absolute top-4 bottom-8 left-6 md:left-1/2 -translate-x-1/2 w-0.5 bg-[var(--surface-border)] rounded-full pointer-events-none"
          />

          {/* Animated Gold Scroll Progress Line */}
          <motion.div
            aria-hidden="true"
            style={{
              scaleY: prefersReduced ? 1 : scaleY,
            }}
            className="absolute top-4 bottom-8 left-6 md:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[var(--accent)] via-[var(--accent)] to-[var(--accent)]/40 rounded-full origin-top pointer-events-none z-0"
          />

          {/* Accessible Semantic Ordered List */}
          <ol className="relative space-y-12 sm:space-y-16 lg:space-y-20">
            {EDUCATION_DATA.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.li
                  key={item.id}
                  id={item.id}
                  initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.6,
                    delay: prefersReduced ? 0 : index * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative flex flex-col md:flex-row items-start scroll-mt-28"
                >
                  {/* Timeline Center Node / Dot */}
                  <div
                    aria-hidden="true"
                    className="absolute left-6 md:left-1/2 -translate-x-1/2 top-1.5 md:top-6 z-10 flex items-center justify-center"
                  >
                    {/* Current item pulsing aura */}
                    {item.isCurrent && (
                      <span className="absolute -inset-2 rounded-full bg-[var(--accent)]/25 animate-ping pointer-events-none" />
                    )}

                    <div
                      className={`w-10 h-10 rounded-full border-2 bg-[var(--surface)] flex items-center justify-center transition-all duration-300 shadow-md ${item.isCurrent
                        ? "border-[var(--accent)] text-[var(--accent)] shadow-[0_0_16px_rgba(212,163,89,0.4)]"
                        : "border-[var(--surface-border)] text-[var(--muted-foreground)] group-hover:border-[var(--accent)]"
                        }`}
                    >
                      {getEducationIcon(item.iconName)}
                    </div>
                  </div>

                  {/* Card Container (Alternates left/right on md+; offset to right on mobile) */}
                  <div
                    className={`w-full pl-12 sm:pl-20 md:pl-0 md:w-[calc(50%-40px)] ${isEven ? "md:mr-auto" : "md:ml-auto"
                      }`}
                  >
                    <div
                      className={`relative rounded-2xl border bg-[var(--surface)] p-6 sm:p-7 shadow-card transition-all duration-300 hover:border-[var(--accent)]/50 group ${item.isCurrent
                        ? "border-[var(--accent)]/40 shadow-[0_4px_24px_rgba(212,163,89,0.08)]"
                        : "border-[var(--surface-border)]"
                        }`}
                    >
                      {/* Ambient corner glow for current item */}
                      {item.isCurrent && (
                        <div
                          aria-hidden="true"
                          className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--accent)]/10 rounded-full blur-3xl pointer-events-none"
                        />
                      )}

                      {/* Header Row: Badges */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        {/* Year Badge */}
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--surface-elevated)] border border-[var(--surface-border)] font-mono text-[11px] text-[var(--muted-foreground)]">
                          <Calendar className="w-3 h-3 text-[var(--accent)]" />
                          <span>{item.periodText}</span>
                        </span>

                        {/* Current Badge for B.Tech */}
                        {item.isCurrent && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)]/40 font-mono text-[11px] font-semibold text-[var(--accent)]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                            Current
                          </span>
                        )}

                        {/* Location Badge */}
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[var(--surface-elevated)] border border-[var(--surface-border)] font-mono text-[11px] text-[var(--muted-foreground)]">
                          <MapPin className="w-3 h-3 text-[var(--muted-foreground)]" />
                          <span>{item.location}</span>
                        </span>
                      </div>

                      {/* Degree / Level */}
                      <h3 className="text-lg sm:text-xl font-bold text-[var(--foreground)] tracking-tight group-hover:text-[var(--accent)] transition-colors mb-1">
                        {item.level}
                      </h3>

                      {/* Institution */}
                      <p className="text-sm sm:text-base font-medium text-[var(--muted-foreground)] mb-4">
                        {item.institution}
                      </p>

                      {/* Score Highlights & Badges */}
                      <div className="flex flex-wrap items-center gap-2.5 mb-4">
                        {/* Main Score Pill (Highlighted in Gold) */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--surface-border)]">
                          <Award className="w-4 h-4 text-[var(--accent)] shrink-0" />
                          <span className="text-xs font-mono uppercase tracking-wider text-[var(--muted-foreground)]">
                            {item.scoreContext}:
                          </span>
                          <span className="font-mono text-sm sm:text-base font-extrabold text-[var(--accent)]">
                            {item.score}
                          </span>
                        </div>

                        {/* Separate MHT-CET Pill for HSC */}
                        {item.mhtCet && (
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/30">
                            <Sparkles className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                            <span className="text-xs font-mono uppercase tracking-wider text-[var(--muted-foreground)]">
                              MHT-CET:
                            </span>
                            <span className="font-mono text-xs sm:text-sm font-extrabold text-[var(--accent)]">
                              {item.mhtCet}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Narrative Description */}
                      <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Academic Highlights */}
                      {item.highlights && item.highlights.length > 0 && (
                        <div className="pt-3.5 border-t border-[var(--surface-border)]/60">
                          <h4 className="text-[11px] font-mono uppercase tracking-wider text-[var(--muted-foreground)] mb-2.5">
                            Key Highlights
                          </h4>
                          <ul className="space-y-2 text-xs sm:text-sm text-[var(--muted-foreground)]">
                            {item.highlights.map((highlight, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)] shrink-0 mt-0.5" />
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
