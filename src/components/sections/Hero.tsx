"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Sparkles,
} from "lucide-react";
import { personalData } from "@/data/personal";

const ROLES = [
  "Computer Engineer",
  "Software Developer",
  "AI/ML Enthusiast",
];

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [mumbaiTime, setMumbaiTime] = useState<string>("");

  // Scroll animation for transition into grid section below
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const nameScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.65, 1], [1, 0.8, 0.15]);

  // Live clock for Mumbai, IN (GMT +5:30)
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = now.toLocaleTimeString("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });
        setMumbaiTime(formatted);
      } catch {
        setMumbaiTime("");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Smooth role rotation synced with "What I do 01/03" counter
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3400);
    return () => clearInterval(timer);
  }, []);

  const counterText = `What I do 0${currentRoleIndex + 1}/0${ROLES.length}`;

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-[96vh] flex flex-col justify-between pt-24 sm:pt-28 pb-4 sm:pb-6 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[var(--background)] transition-colors"
    >
      {/* ── TOP META STRIP ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto w-full z-10 pt-2 pb-6 border-b border-[var(--surface-border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-[11px] font-mono tracking-[0.12em] uppercase text-[var(--muted-foreground)]"
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          <span>Dwarkadas J. Sanghvi College of Engineering</span>
        </div>

        <div className="flex items-center gap-2">
          <span>Mumbai, IN · GMT +5:30</span>
          {mumbaiTime && (
            <span className="px-2 py-0.5 rounded-full border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground)] font-semibold">
              {mumbaiTime}
            </span>
          )}
        </div>
      </motion.div>

      {/* ── MAIN HERO GRID ── */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto py-8 sm:py-12 z-10">
        {/* Left Column: Typography, Dynamic Role & CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-start"
        >
          {/* Small Category Label & Synced Counter */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--surface-border)] bg-[var(--surface)]/80 text-[11px] font-mono tracking-[0.14em] uppercase text-[var(--muted-foreground)]">
              <Sparkles className="w-3 h-3 text-[var(--accent)]" />
              <span>Computer Engineering · Student</span>
            </span>

            {/* What I do counter */}
            <span className="inline-flex items-center px-2.5 py-1 rounded-full border border-[var(--surface-border)] bg-[var(--surface)]/50 text-[10px] font-mono tracking-[0.12em] uppercase text-[var(--accent)]">
              {counterText}
            </span>
          </div>

          {/* Large Tight-Tracked Display Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-[-0.035em] text-[var(--foreground)] leading-[1.08] mb-6">
            Hi, I&apos;m Ayush.
            <br />
            <span className="text-[var(--muted-foreground)] font-normal text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">
              I am a{" "}
            </span>
            <span className="inline-block relative">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentRoleIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block text-[var(--accent)] font-extrabold tracking-[-0.03em]"
                >
                  {ROLES[currentRoleIndex]}
                </motion.span>
              </AnimatePresence>
              <span className="text-[var(--accent)]">.</span>
            </span>
          </h1>

          {/* Intro Narrative */}
          <p className="text-base sm:text-lg text-[var(--muted-foreground)] leading-relaxed max-w-xl mb-9 font-normal">
            {personalData.bioIntro}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto mb-8 sm:mb-9">
            {/* Primary: Start a project */}
            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[var(--accent)] text-[var(--accent-foreground)] text-xs sm:text-sm font-semibold tracking-wide hover:opacity-95 active:scale-95 transition-all shadow-md shadow-[var(--accent)]/20"
            >
              <span>Start a project</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            {/* Secondary: See my work */}
            <Link
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground)] text-xs sm:text-sm font-semibold tracking-wide hover:border-[var(--surface-border-hover)] hover:bg-[var(--surface-elevated)] active:scale-95 transition-all"
            >
              <span>See my work</span>
              <ArrowDown className="w-4 h-4" />
            </Link>

            {/* Tertiary: Download resume */}
            <a
              href={personalData.resumePath}
              download="Ayush_Rahate_Resume.pdf"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border border-transparent hover:border-[var(--surface-border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] text-xs sm:text-sm font-medium tracking-wide transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download resume</span>
            </a>
          </div>

          {/* Social Row with dedicated spacing */}
          <div className="flex items-center gap-3 pt-1 mb-2">
            <span className="text-[11px] font-mono tracking-[0.12em] uppercase text-[var(--muted-foreground)] mr-1">
              Connect:
            </span>
            <a
              href={personalData.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="w-9 h-9 rounded-full border border-[var(--surface-border)] bg-[var(--surface)] hover:border-[var(--accent)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] flex items-center justify-center transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            {personalData.linkedin && (
              <a
                href={personalData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="w-9 h-9 rounded-full border border-[var(--surface-border)] bg-[var(--surface)] hover:border-[var(--accent)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            <a
              href={`mailto:${personalData.email}`}
              aria-label="Email Ayush Rahate"
              className="w-9 h-9 rounded-full border border-[var(--surface-border)] bg-[var(--surface)] hover:border-[var(--accent)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] flex items-center justify-center transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* Right Column: Editorial Portrait Cutout */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative flex justify-center items-end"
        >
          <div className="hero-photo-wrapper">
            <Image
              src={personalData.portraitImage || "/images/ayush-portrait.webp"}
              alt="Ayush Rahate — Portrait"
              width={442}
              height={826}
              priority
              className="hero-photo-img"
              sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 400px"
            />
          </div>
        </motion.div>
      </div>

      {/* ── DEDICATED META ROW (Cleanly separated above giant display name) ── */}
      <div className="max-w-7xl mx-auto w-full z-10 pt-4 pb-3 flex items-center justify-between text-[11px] font-mono tracking-[0.14em] uppercase text-[var(--muted-foreground)]">
        <span>B.Tech in Computer Engineering · 2028</span>
        <span className="hidden sm:inline-flex items-center gap-1.5 opacity-80">
          <span>Scroll to explore</span>
          <span className="animate-bounce inline-block">↓</span>
        </span>
      </div>

      {/* ── GIANT FLUID SVG DISPLAY NAME WITH SCROLL ANIMATION & SOFT BLEND ── */}
      <motion.div
        style={{ y: nameY, scale: nameScale, opacity: nameOpacity }}
        aria-hidden="true"
        className="w-full select-none pointer-events-none z-0 relative overflow-visible mt-1 sm:mt-2"
      >
        <div
          className="w-full flex justify-center items-center px-4 sm:px-6"
          style={{
            maskImage:
              "linear-gradient(to bottom, #000 68%, transparent 98%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 68%, transparent 98%)",
          }}
        >
          <svg
            viewBox="0 0 1200 135"
            className="w-full h-auto max-w-7xl mx-auto select-none pointer-events-none"
            preserveAspectRatio="xMidYMid meet"
          >
            <text
              x="50%"
              y="58%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="var(--hero-name-color)"
              style={{
                fontSize: "102px",
                fontWeight: 900,
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                letterSpacing: "-0.04em",
                textTransform: "uppercase",
              }}
            >
              AYUSH RAHATE
            </text>
          </svg>
        </div>
      </motion.div>

      {/* ── SMOOTH GRADIENT BLEND INTO GRID SECTION BELOW ── */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-16 sm:h-20 bg-gradient-to-b from-transparent via-[var(--background)]/40 to-[var(--background)] pointer-events-none z-0"
      />
    </section>
  );
}
