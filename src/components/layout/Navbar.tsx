"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { achievements } from "@/data/achievements";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = useMemo(() => [
    { label: "Home", href: "/#home", id: "home" },
    { label: "About", href: "/#about", id: "about" },
    { label: "Projects", href: "/#projects", id: "projects" },
    { label: "Skills", href: "/#skills", id: "skills" },
    { label: "Education", href: "/#education", id: "education" },
    ...(achievements.length > 0 ? [{ label: "Achievements", href: "/#achievements", id: "achievements" }] : []),
    { label: "Creative", href: "/#creative", id: "creative" },
    { label: "Contact", href: "/#contact", id: "contact" },
  ], []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section intersection detection
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
        scrolled
          ? "bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--surface-border)] shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/#home"
          className="group flex items-center gap-2.5 text-base font-semibold tracking-tight text-[var(--foreground)]"
        >
          <span className="w-8 h-8 rounded-lg bg-[var(--surface)] border border-[var(--surface-border)] group-hover:border-[var(--accent)] flex items-center justify-center font-mono text-xs font-bold text-[var(--accent)] transition-colors">
            AR
          </span>
          <span className="group-hover:text-[var(--accent)] transition-colors">
            ayush<span className="text-[var(--accent)]">.</span>
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 bg-[var(--surface)]/70 border border-[var(--surface-border)] px-3 py-1.5 rounded-full backdrop-blur-sm">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`relative px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                  isActive
                    ? "text-[var(--foreground)] font-semibold"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 bg-[var(--surface-elevated)] border border-[var(--surface-border)] rounded-full -z-10" />
                )}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <Link
            href="/#contact"
            className="hidden sm:inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[var(--accent)] text-white hover:opacity-95 transition-all shadow-sm shadow-[var(--accent)]/20"
          >
            <span>Contact</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground)]"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] bg-[var(--background)]/95 backdrop-blur-xl border-b border-[var(--surface-border)] px-6 py-6 shadow-xl animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center justify-between ${
                    isActive
                      ? "bg-[var(--surface)] text-[var(--accent)] font-semibold"
                      : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--surface)]"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />}
                </Link>
              );
            })}
            <div className="pt-4 mt-2 border-t border-[var(--surface-border)]">
              <Link
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 w-full py-2.5 text-xs font-semibold rounded-lg bg-[var(--accent)] text-white"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

