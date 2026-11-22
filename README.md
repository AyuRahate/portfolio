# Ayush Rahate — Developer Portfolio V2

A modern, high-performance developer portfolio built with **Next.js (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS**, and **Motion**. Designed to showcase engineering precision, machine learning workflows, and creative sensibility for Software Development Engineer (SDE), Full-Stack, and AI/ML roles.

---

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router, Static Site Generation / SSG)
- **Library**: React 19
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS, CSS Custom Properties (Dark-first design)
- **Animation**: Motion for React (`framer-motion`) with `prefers-reduced-motion` compliance
- **Icons**: Lucide React
- **Typography**: `next/font` with Inter & JetBrains Mono
- **Deployment Target**: Vercel

---

## 📂 Project Structure

```
├── legacy/                  # Archived legacy portfolio (index.html, styles.css, script.js)
├── public/
│   ├── images/              # Profile images and avatars (ayush.jpg)
│   ├── projects/            # Designed SVG project previews
│   └── resume/              # Resume PDF files (Ayush_Rahate_Resume.pdf)
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout, fonts, theme provider, JSON-LD structured data
│   │   ├── page.tsx         # Homepage aggregating all portfolio sections
│   │   ├── globals.css      # Design system variables, Tailwind, responsive utilities
│   │   ├── not-found.tsx    # Custom 404 page
│   │   ├── robots.ts        # Dynamic robots.txt
│   │   ├── sitemap.ts       # Dynamic sitemap generator
│   │   └── projects/
│   │       └── [slug]/
│   │           └── page.tsx # In-depth project case-study dynamic route
│   ├── components/
│   │   ├── layout/          # Navbar, Footer, ThemeProvider, ThemeToggle
│   │   └── sections/        # Hero, About, Projects, Skills, Education, Creative, Contact
│   ├── data/
│   │   ├── personal.ts      # Profile, contact, bio, bento highlights
│   │   ├── projects.ts      # Structured project case study models
│   │   ├── skills.ts        # Categorized technical capabilities
│   │   ├── education.ts     # Academic timeline data
│   │   └── achievements.ts  # Achievements & creative interests config
│   ├── lib/
│   │   └── utils.ts         # Class merging and styling utilities
│   └── types/
│       └── index.ts         # TypeScript definitions
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `18.x` or higher (tested on Node.js v25)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/AyuRahate/portfolio.git
cd portfolio

# Switch to the portfolio-v2 branch
git checkout portfolio-v2

# Install dependencies
npm install
```

### Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Typecheck & Linting

```bash
# Run TypeScript compilation check
npx tsc --noEmit

# Run ESLint verification
npm run lint
```

### Production Build

```bash
npm run build
npm run start
```

---

## 🌐 Vercel Deployment Guide

1. Push the `portfolio-v2` branch to GitHub:
   ```bash
   git push origin portfolio-v2
   ```
2. Navigate to [Vercel](https://vercel.com/) and click **Add New > Project**.
3. Import the `AyuRahate/portfolio` repository.
4. Select the `portfolio-v2` branch (or set it as production branch after review).
5. Vercel automatically detects Next.js. Leave the default build settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `next build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
6. Click **Deploy**.

### Transitioning from GitHub Pages to Vercel

Until the new deployment is approved, the legacy website remains accessible on GitHub Pages via the `main` branch. Once ready:
- You can point a custom domain (e.g. `ayushrahate.com` or `ayurahate.dev`) directly to Vercel via DNS.
- Alternatively, you can add an `index.html` on the legacy branch with a `<meta http-equiv="refresh" content="0; url=https://your-vercel-domain.vercel.app/" />` redirect tag to seamlessly send visitors from the old GitHub Pages URL to your new Next.js site.

---

## 📝 Centralized Content & Updates

- **Resume**: Replace `public/resume/Ayush_Rahate_Resume.pdf` with any new version. The download button on the site will automatically serve the updated file without code changes.
- **New Projects**: Add new project objects to `src/data/projects.ts`. Set `published: true` when detailed case-study information is ready.
- **Skills**: Update `src/data/skills.ts` to add newly verified languages, libraries, or developer tools.
- **Achievements**: When certificates or hackathon milestones are achieved, add them to `src/data/achievements.ts` to automatically display the achievements section.

---

## 📄 License

MIT © Ayush Rahate

