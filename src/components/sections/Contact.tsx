"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Copy, Check, Github, Linkedin, Download, ArrowUpRight } from "lucide-react";
import { personalData } from "@/data/personal";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalData.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback if clipboard API is unavailable
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 relative bg-[var(--surface)]/20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-[var(--surface-border)] bg-[var(--surface)] p-8 sm:p-14 text-center relative overflow-hidden shadow-card"
        >
          {/* Ambient lighting inside card — gold accent glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-gradient-to-b from-[var(--accent)]/15 via-[var(--accent)]/5 to-transparent rounded-full blur-3xl -z-10" />

          {/* Section Label */}
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold">
              Get in Touch
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[var(--foreground)] mb-4">
            Let&apos;s Build Something Meaningful.
          </h2>

          {/* Supporting Copy */}
          <p className="text-sm sm:text-base text-[var(--muted-foreground)] max-w-xl mx-auto mb-10 leading-relaxed">
            Interested in connecting about software engineering, AI/ML, or a collaborative project? Feel free to reach out.
          </p>

          {/* Email Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <a
              href={`mailto:${personalData.email}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--accent)] text-white text-sm font-semibold hover:opacity-95 transition-all shadow-md shadow-[var(--accent)]/20 active:scale-[0.98]"
            >
              <Mail className="w-4 h-4" />
              <span>Email Me ({personalData.email})</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <button
              onClick={handleCopyEmail}
              aria-label="Copy email address to clipboard"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-elevated)] hover:border-[var(--surface-border-hover)] text-sm font-medium text-[var(--foreground)] transition-all active:scale-[0.98]"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[var(--muted-foreground)]" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>

          {/* Additional Direct Links */}
          <div className="pt-8 border-t border-[var(--surface-border)] flex flex-wrap items-center justify-center gap-4">
            <a
              href={personalData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--surface-border)] bg-[var(--surface)] hover:border-[var(--surface-border-hover)] text-xs font-mono text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>github.com/AyuRahate</span>
            </a>

            {personalData.linkedin && (
              <a
                href={personalData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--surface-border)] bg-[var(--surface)] hover:border-[var(--surface-border-hover)] text-xs font-mono text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn Profile</span>
              </a>
            )}

            <a
              href={personalData.resumePath}
              download="Ayush_Rahate_Resume.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--surface-border)] bg-[var(--surface)] hover:border-[var(--surface-border-hover)] text-xs font-mono text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Resume</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

