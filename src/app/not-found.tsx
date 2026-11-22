import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-3">
        404 — Not Found
      </div>
      <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--foreground)] mb-4">
        Page Not Found
      </h1>
      <p className="text-sm sm:text-base text-[var(--muted-foreground)] max-w-md mb-8">
        The page or project case study you requested could not be located.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent)] text-white text-xs font-semibold hover:opacity-95 transition-all shadow-md"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return Home</span>
      </Link>
    </div>
  );
}

