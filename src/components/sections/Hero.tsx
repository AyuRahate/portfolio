"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail, Sparkles, MapPin } from "lucide-react";
import { personalData } from "@/data/personal";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-indigo-500/15 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Editorial Headline & Actions */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-start"
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

        {/* Right Column: Editorial Visual Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative w-full max-w-sm sm:max-w-md">
            {/* Glowing backdrop border */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-indigo-500/30 via-purple-500/10 to-transparent blur-md -z-10" />

            <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] p-3 shadow-card overflow-hidden">
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-[var(--surface-elevated)]">
                <Image
                  src={personalData.profileImage}
                  alt="Ayush Rahate"
                  fill
                  priority
                  className="object-cover object-top filter contrast-[1.03]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between text-xs font-mono text-[var(--foreground)] bg-[var(--surface)]/90 backdrop-blur-md px-3 py-2 rounded-lg border border-[var(--surface-border)]">
                    <span className="font-semibold">{personalData.name}</span>
                    <span className="text-[var(--accent)] font-medium">B.Tech 2028</span>
                  </div>
                </div>
              </div>

              {/* Technical highlight tag */}
              <div className="mt-3 px-2 py-1.5 flex items-center justify-between text-xs text-[var(--muted-foreground)] font-mono">
                <span>DJ Sanghvi College of Engineering</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Active
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

