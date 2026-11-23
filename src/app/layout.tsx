import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Preloader from "@/components/Preloader";
import { personalData } from "@/data/personal";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F1E9DF" },
    { media: "(prefers-color-scheme: dark)", color: "#121110" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Ayush Rahate — Computer Engineering Student & Software Developer",
  description:
    "Portfolio of Ayush Rahate, Computer Engineering student at DJ Sanghvi College of Engineering. Building robust software, exploring AI/ML, and crafting thoughtful digital experiences.",
  authors: [{ name: "Ayush Rahate", url: personalData.github }],
  keywords: [
    "Ayush Rahate",
    "Computer Engineering",
    "Software Developer",
    "AI/ML",
    "Full-Stack Developer",
    "DJ Sanghvi College of Engineering",
    "Mumbai Developer",
  ],
  metadataBase: new URL("https://portfolio-ayurahate.vercel.app"),
  openGraph: {
    title: "Ayush Rahate — Computer Engineering Student & Software Developer",
    description:
      "Computer Engineering student at DJ Sanghvi College of Engineering exploring intelligent systems, software development, and digital craft.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/ayush.jpg",
        width: 1200,
        height: 630,
        alt: "Ayush Rahate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayush Rahate — Developer Portfolio",
    description: "Computer Engineering Student | Software Developer | AI/ML Enthusiast",
    images: ["/images/ayush.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personalData.name,
    jobTitle: "Computer Engineering Student & Software Developer",
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "Dwarkadas J. Sanghvi College of Engineering",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mumbai",
      addressCountry: "India",
    },
    sameAs: [
      personalData.github,
      personalData.linkedin,
    ],
    email: `mailto:${personalData.email}`,
  };

  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem('preloader-seen')){document.documentElement.dataset.loaded='true';}}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased transition-colors">
        <ThemeProvider>
          <Preloader />
          <div className="relative flex min-h-screen flex-col bg-grid-pattern">
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

