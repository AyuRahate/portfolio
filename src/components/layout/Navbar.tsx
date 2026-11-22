"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";

type NavState = "top" | "hidden" | "revealed";

export function Navbar() {
  const [navState, setNavState] = useState<NavState>("top");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const headerRef = useRef<HTMLElement>(null);
  const handleRef = useRef<HTMLButtonElement>(null);
  const lastScrollY = useRef(0);
  const accumulatedUpScroll = useRef(0);
  const rafId = useRef<number | null>(null);

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

  // Active section tracking & scroll direction logic with requestAnimationFrame throttling
  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      if (rafId.current !== null) return;

      rafId.current = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY.current;

        // 1. Top of page (< 80px)
        if (currentScrollY < 80) {
          setNavState("top");
          accumulatedUpScroll.current = 0;
        } else {
          // 2. Scrolling DOWN -> Hide nav
          if (delta > 6) {
            accumulatedUpScroll.current = 0;
            setNavState((prev) => (prev !== "hidden" ? "hidden" : prev));
            setMobileMenuOpen(false);
          }
          // 3. Scrolling UP -> Accumulate distance
          else if (delta < -4) {
            accumulatedUpScroll.current += Math.abs(delta);
            if (accumulatedUpScroll.current > 40) {
              setNavState("revealed");
            }
          }
        }

        lastScrollY.current = currentScrollY;

        // Active section detection
        const sections = navItems.map((item) => document.getElementById(item.id));
        const scrollPos = currentScrollY + 220;

        for (let i = sections.length - 1; i >= 0; i--) {
          const sec = sections[i];
          if (sec && sec.offsetTop <= scrollPos) {
            setActiveSection(navItems[i].id);
            break;
          }
        }

        rafId.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [navItems]);

  // Handle escape key to close revealed nav
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && navState === "revealed" && window.scrollY >= 80) {
        setNavState("hidden");
        handleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navState]);

  const revealNav = useCallback(() => {
    setNavState("revealed");
  }, []);

  const hideNavOnLeave = useCallback(() => {
    if (window.scrollY >= 80) {
      setNavState("hidden");
    }
  }, []);

  // Check if focus left the navbar
  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    if (window.scrollY >= 80) {
      if (!headerRef.current?.contains(e.relatedTarget as Node)) {
        setNavState("hidden");
      }
    }
  };

  const isHidden = navState === "hidden";
  const isTop = navState === "top";

  return (
    <>
      {/* ── TOP 16PX HOVER TRIGGER STRIP (Expands nav when hidden) ── */}
      {isHidden && (
        <div
          aria-hidden="true"
          onMouseEnter={revealNav}
          className="fixed top-0 inset-x-0 h-4 z-40 pointer-events-auto"
        />
      )}

      {/* ── SLIM SLIDING HANDLE BAR (Visible when nav is hidden) ── */}
      <button
        ref={handleRef}
        type="button"
        onClick={revealNav}
        onMouseEnter={revealNav}
        onFocus={revealNav}
        aria-label="Open navigation"
        aria-expanded={!isHidden}
        className={`fixed top-2.5 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center rounded-full shadow-sm transition-all duration-300 group focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none ${isHidden
          ? "w-12 h-1.5 sm:w-14 sm:h-2 bg-[var(--accent)]/60 hover:bg-[var(--accent)] hover:w-20 hover:h-6 opacity-100 pointer-events-auto"
          : "w-0 h-0 opacity-0 pointer-events-none"
          }`}
      >
        <span className="hidden group-hover:inline-flex group-focus:inline-flex items-center gap-1 text-[9px] font-mono tracking-widest text-[var(--accent-foreground)] font-bold uppercase select-none">
          <span>Menu</span>
          <ChevronDown className="w-2.5 h-2.5" />
        </span>
      </button>

      {/* ── MAIN FULL NAVBAR ── */}
      <header
        ref={headerRef}
        aria-hidden={isHidden}
        tabIndex={-1}
        onMouseLeave={hideNavOnLeave}
        onBlur={handleBlur}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out motion-reduce:transform-none motion-reduce:transition-opacity ${isHidden
          ? "-translate-y-[120%] opacity-0 pointer-events-none"
          : "translate-y-0 opacity-100 pointer-events-auto"
          } ${isTop
            ? "py-4 sm:py-5 bg-transparent"
            : "py-3 bg-[var(--background)]/85 backdrop-blur-md border-b border-[var(--surface-border)] shadow-sm"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Brand / Logo */}
          <Link
            href="/#home"
            tabIndex={isHidden ? -1 : 0}
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
                  tabIndex={isHidden ? -1 : 0}
                  className={`relative px-3.5 py-1 text-xs tracking-[0.06em] font-medium rounded-full transition-all ${isActive
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

          {/* Actions: "Let's talk" */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/#contact"
              tabIndex={isHidden ? -1 : 0}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-[var(--accent)] text-[var(--accent-foreground)] text-xs font-semibold tracking-wide hover:opacity-95 active:scale-95 transition-all shadow-sm shadow-[var(--accent)]/15"
            >
              <span>Let&apos;s talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile hamburger button */}
            <button
              type="button"
              tabIndex={isHidden ? -1 : 0}
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
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (window.scrollY >= 80) setNavState("hidden");
                    }}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center justify-between ${isActive
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
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (window.scrollY >= 80) setNavState("hidden");
                  }}
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
    </>
  );
}
