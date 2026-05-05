/* ============================================
   AYUSH RAHATE — Portfolio Interactivity
   ============================================ */

// ---- Project Data for Modal ----
const projectsData = [
  {
    title: "Baby Monitoring System",
    tags: ["Python", "CNN", "MFCC", "AI", "TensorFlow"],
    desc: "An AI-powered system that detects infant cries using MFCC (Mel Frequency Cepstral Coefficients) feature extraction and a trained Convolutional Neural Network. The system also monitors baby posture using computer vision to ensure safety during sleep.",
    icon: "monitor_heart",
    features: [
      "Real-time infant cry detection with 94%+ accuracy",
      "MFCC-based audio feature extraction pipeline",
      "CNN model trained on labeled cry/no-cry datasets",
      "Posture monitoring using computer vision",
      "Alert system for parents via notifications"
    ],
    links: [
      { label: "View Code", url: "https://github.com/AyuRahate", icon: "code" }
    ]
  },
  {
    title: "Portfolio Website",
    tags: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    desc: "A modern, interactive personal portfolio website built from scratch with zero frameworks. Features smooth scroll-triggered animations, dark/light mode, project modals, and a fully responsive layout that works beautifully on all devices.",
    icon: "web",
    features: [
      "Scroll-based reveal animations with Intersection Observer",
      "Dark / Light mode toggle with localStorage persistence",
      "Interactive project detail modals",
      "Responsive design for mobile, tablet, and desktop",
      "Premium glassmorphism and micro-interactions"
    ],
    links: [
      { label: "Live Site", url: "#", icon: "open_in_new" },
      { label: "Source Code", url: "https://github.com/AyuRahate", icon: "code" }
    ]
  },
  {
    title: "Data Science Pipeline",
    tags: ["Python", "Pandas", "Scikit-learn", "ML", "NumPy"],
    desc: "An end-to-end data processing and machine learning pipeline that automates data cleaning, feature engineering, model training, and evaluation. Built for flexibility — plug in any dataset and get predictions running.",
    icon: "database",
    features: [
      "Automated data cleaning and missing value imputation",
      "Feature engineering with statistical analysis",
      "Multiple ML model training and comparison",
      "Cross-validation and hyperparameter tuning",
      "Exportable model artifacts and reports"
    ],
    links: [
      { label: "View Code", url: "https://github.com/AyuRahate", icon: "code" }
    ]
  },
  {
    title: "Algorithm Visualizer",
    tags: ["Java", "OOP", "Algorithms", "Data Structures"],
    desc: "Interactive desktop tool to visualize classic algorithms step-by-step. Supports sorting (Bubble, Merge, Quick), searching (Binary, Linear), and graph algorithms (BFS, DFS, Dijkstra) with real-time visualization and complexity analysis.",
    icon: "smart_toy",
    features: [
      "Step-by-step visualization of sorting algorithms",
      "Graph traversal animation (BFS, DFS)",
      "Time & space complexity comparison panel",
      "Adjustable speed and array size controls",
      "Clean OOP architecture with strategy pattern"
    ],
    links: [
      { label: "View Code", url: "https://github.com/AyuRahate", icon: "code" }
    ]
  }
];

// ---- DOM Ready ----
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavbar();
  initMobileNav();
  initScrollReveal();
  initSkillBars();
  initCountUp();
  initProjectModals();
  initContactForm();
  initActiveNav();
});

// ===========================
//  THEME TOGGLE
// ===========================
function initTheme() {
  const saved = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", saved);
  updateThemeIcon(saved);

  document.getElementById("themeToggle").addEventListener("click", toggleTheme);
  const mobileToggle = document.getElementById("themeToggleMobile");
  if (mobileToggle) mobileToggle.addEventListener("click", toggleTheme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  const icon = theme === "dark" ? "light_mode" : "dark_mode";
  const el = document.getElementById("themeIcon");
  const elM = document.getElementById("themeIconMobile");
  if (el) el.textContent = icon;
  if (elM) elM.textContent = icon;
}

// ===========================
//  NAVBAR SCROLL EFFECT
// ===========================
function initNavbar() {
  const navbar = document.getElementById("navbar");
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
        ticking = false;
      });
      ticking = true;
    }
  });
}

// ===========================
//  MOBILE NAV / HAMBURGER
// ===========================
function initMobileNav() {
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    mobileNav.classList.toggle("open");
    document.body.style.overflow = mobileNav.classList.contains("open") ? "hidden" : "";
  });

  mobileNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      mobileNav.classList.remove("open");
      document.body.style.overflow = "";
    });
  });
}

// ===========================
//  SCROLL REVEAL (Intersection Observer)
// ===========================
function initScrollReveal() {
  const elements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );
  elements.forEach(el => observer.observe(el));
}

// ===========================
//  SKILL BAR ANIMATION
// ===========================
function initSkillBars() {
  const bars = document.querySelectorAll(".skill-item__fill");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const width = entry.target.getAttribute("data-width");
          entry.target.style.width = width + "%";
        }
      });
    },
    { threshold: 0.3 }
  );
  bars.forEach(bar => observer.observe(bar));
}

// ===========================
//  COUNT-UP ANIMATION
// ===========================
function initCountUp() {
  const counters = document.querySelectorAll("[data-count]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute("data-count"), 10);
          animateCount(el, 0, target, 1500);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach(c => observer.observe(c));
}

function animateCount(el, start, end, duration) {
  const range = end - start;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // ease out quad
    const eased = 1 - (1 - progress) * (1 - progress);
    const current = Math.floor(start + range * eased);
    el.textContent = current >= 100 ? current + "+" : current + "+";
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ===========================
//  PROJECT MODALS
// ===========================
function initProjectModals() {
  const overlay = document.getElementById("projectModal");
  const closeBtn = document.getElementById("modalClose");

  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
      const idx = parseInt(card.getAttribute("data-project"), 10);
      openModal(idx);
    });
  });

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

function openModal(idx) {
  const data = projectsData[idx];
  if (!data) return;

  document.getElementById("modalTitle").textContent = data.title;
  document.getElementById("modalDesc").textContent = data.desc;
  document.getElementById("modalIcon").textContent = data.icon;

  // Tags
  const tagsContainer = document.getElementById("modalTags");
  tagsContainer.innerHTML = data.tags.map(t => `<span class="modal__tag">${t}</span>`).join("");

  // Features
  const featuresList = document.getElementById("modalFeatures");
  featuresList.innerHTML = data.features.map(f => `<li>${f}</li>`).join("");

  // Actions
  const actionsContainer = document.getElementById("modalActions");
  actionsContainer.innerHTML = data.links.map(l =>
    `<a href="${l.url}" target="_blank" class="btn-primary" style="font-size:0.85rem">
      <span class="material-symbols-outlined" style="font-size:1rem">${l.icon}</span>
      ${l.label}
    </a>`
  ).join("");

  const overlay = document.getElementById("projectModal");
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("projectModal").classList.remove("open");
  document.body.style.overflow = "";
}

// ===========================
//  CONTACT FORM
// ===========================
function initContactForm() {
  const form = document.getElementById("contactForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("contactName").value;
    const email = document.getElementById("contactEmail").value;
    const message = document.getElementById("contactMessage").value;

    // Construct mailto link
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:ayushrahate32@gmail.com?subject=${subject}&body=${body}`;

    // Visual feedback
    const btn = form.querySelector("button[type=submit]");
    const originalHTML = btn.innerHTML;
    btn.innerHTML = `<span class="material-symbols-outlined" style="font-size:1.1rem">check_circle</span> Sent!`;
    btn.style.background = "#28C840";
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = "";
      form.reset();
    }, 2500);
  });
}

// ===========================
//  ACTIVE NAV HIGHLIGHT
// ===========================
function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar__links a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.3, rootMargin: "-100px 0px -50% 0px" }
  );
  sections.forEach(s => observer.observe(s));
}