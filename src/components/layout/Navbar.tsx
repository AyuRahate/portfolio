"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { personalData } from "@/data/personal";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = useMemo(
    () => [
      { label: "Home", href: "/#home", id: "home" },
      { label: "Projects", href: "/#projects", id: "projects" },
      { label: "Skills", href: "/#skills", id: "skills" },
      { label: "Education", href: "/#education", id: "education" },
      { label: "Contact", href: "/#contact", id: "contact" },
    ],
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5 sm:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="/#home"
          className="group flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase text-[var(--foreground)]"
        >
          <span className="w-7 h-7 rounded-full border border-[var(--surface-border)] bg-[var(--surface)] group-hover:border-[var(--accent)] flex items-center justify-center font-mono text-[10px] font-bold text-[var(--accent)] transition-colors">
            AR
          </span>
          <span className="hidden sm:inline font-mono tracking-[0.14em] text-[11px] text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
            Ayush Rahate
          </span>
        </Link>

        {/* Floating Centered Pill Navigation */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full border border-[var(--surface-border)] bg-[var(--surface)]/80 backdrop-blur-md shadow-sm transition-all"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`relative px-3.5 py-1 text-xs tracking-[0.06em] font-medium rounded-full transition-all ${
                  isActive
                    ? "text-[var(--foreground)] font-semibold"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 bg-[var(--surface-elevated)] border border-[var(--surface-border)] rounded-full -z-10 shadow-sm" />
                )}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions: Theme Toggle & "Let's talk" */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          <Link
            href="/#contact"
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-[var(--accent)] text-[var(--accent-foreground)] text-xs font-semibold tracking-wide hover:opacity-95 active:scale-95 transition-all shadow-sm shadow-[var(--accent)]/15"
          >
            <span>Let&apos;s talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden inline-flex items-center justify-center w-8 h-8 rounded-full border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground)]"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-4 top-20 bg-[var(--surface)]/95 backdrop-blur-xl border border-[var(--surface-border)] rounded-2xl p-5 shadow-2xl animate-in fade-in slide-in-from-top-3 z-50">
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center justify-between ${
                    isActive
                      ? "bg-[var(--surface-elevated)] text-[var(--accent)] font-semibold"
                      : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--surface-elevated)]"
                  }`}
                >
                  <span className="tracking-wide">{item.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  )}
                </Link>
              );
            })}
            <div className="pt-3 mt-1 border-t border-[var(--surface-border)]">
              <Link
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 w-full py-2.5 text-xs font-semibold rounded-xl bg-[var(--accent)] text-[var(--accent-foreground)]"
              >
                <span>Let&apos;s talk</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
