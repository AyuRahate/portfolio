import React from "react";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { personalData } from "@/data/personal";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--surface-border)] bg-[var(--surface)]/30 py-12 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-semibold text-sm tracking-tight text-[var(--foreground)]">
              {personalData.name}
            </span>
            <p className="text-xs text-[var(--muted-foreground)]">
              Computer Engineering Student · Mumbai, India
            </p>
          </div>

          <div className="flex items-center gap-4">
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
              aria-label="Send email"
              className="w-9 h-9 rounded-full border border-[var(--surface-border)] bg-[var(--surface)] hover:border-[var(--accent)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] flex items-center justify-center transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <div className="text-xs text-[var(--muted-foreground)] text-center md:text-right">
            <p>© {currentYear} Ayush Rahate. Built with Next.js & TypeScript.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

