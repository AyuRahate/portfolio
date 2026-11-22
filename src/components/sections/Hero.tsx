"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { personalData } from "@/data/personal";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-12 sm:pb-16 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-indigo-500/15 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Left Column: Editorial Headline & Actions */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-start z-10"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--surface-border)] bg-[var(--surface)] text-xs text-[var(--muted-foreground)] mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium text-[var(--foreground)]">Computer Engineering Student</span>
            <span className="text-[var(--surface-border)]">|</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Mumbai, India
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--foreground)] leading-[1.1] mb-5">
            Engineering software with{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              logic & design
            </span>
            .
          </h1>

          {/* Professional Headline */}
          <p className="text-base sm:text-lg font-medium text-[var(--accent)] font-mono mb-4">
            {personalData.headline}
          </p>

          {/* Intro Paragraph */}
          <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed max-w-xl mb-8">
            {personalData.bioIntro}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto mb-8">
            <Link
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent)] text-white text-sm font-semibold hover:opacity-95 transition-all shadow-md shadow-[var(--accent)]/20 active:scale-[0.98]"
            >
              <span>View My Work</span>
              <ArrowDown className="w-4 h-4" />
            </Link>

            <a
              href={personalData.resumePath}
              download="Ayush_Rahate_Resume.pdf"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground)] text-sm font-semibold hover:border-[var(--surface-border-hover)] hover:bg-[var(--surface-elevated)] transition-all active:scale-[0.98]"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3 pt-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--muted-foreground)] mr-1">
              Connect:
            </span>
            <a
              href={personalData.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="w-9 h-9 rounded-lg border border-[var(--surface-border)] bg-[var(--surface)] hover:border-[var(--accent)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] flex items-center justify-center transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            {personalData.linkedin && (
              <a
                href={personalData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="w-9 h-9 rounded-lg border border-[var(--surface-border)] bg-[var(--surface)] hover:border-[var(--accent)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            <a
              href={`mailto:${personalData.email}`}
              aria-label="Email Ayush Rahate"
              className="w-9 h-9 rounded-lg border border-[var(--surface-border)] bg-[var(--surface)] hover:border-[var(--accent)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] flex items-center justify-center transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* Right Column: Transparent Portrait Integration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative flex justify-center items-end"
        >
          {/* Broad, soft ambient backdrop glow matched to theme */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[440px] lg:w-[520px] h-[340px] sm:h-[440px] lg:h-[520px] portrait-glow-layer rounded-full pointer-events-none -z-10" />

          {/* Portrait Container with CSS mask on the portrait layer alone */}
          <div className="relative w-full max-w-[290px] sm:max-w-[340px] lg:max-w-[380px] flex justify-center items-end portrait-mask">
            <Image
              src={personalData.portraitImage || "/images/ayush-portrait.webp"}
              alt="Ayush Rahate — Portrait"
              width={442}
              height={826}
              priority
              className="w-auto h-auto max-h-[410px] sm:max-h-[460px] lg:max-h-[490px] object-contain portrait-image-styled select-none pointer-events-none"
              sizes="(max-width: 640px) 260px, (max-width: 1024px) 320px, 380px"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
