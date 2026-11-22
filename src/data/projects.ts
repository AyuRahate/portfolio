import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "smart-attendance-tracker",
    slug: "smart-attendance-tracker",
    title: "Smart Attendance Tracker (AttendAI)",
    subtitle: "Full-stack attendance and timetable manager for students",
    category: "Full-Stack Web Development / OCR",
    description:
      "A web app that tracks daily attendance (attended / missed / cancelled), calculates how many classes can be skipped while staying above the target percentage, and scans timetables with OCR. The dashboard shows a 12-week heatmap, weekly breakdown, streaks and risk alerts, with dark and light mode.",
    techStack: [
      "React",
      "Vite",
      "Node.js",
      "Express",
      "Prisma",
      "SQLite",
      "JWT",
      "Tesseract.js",
      "Gemini Vision",
    ],
    featured: true,
    published: true,
    image: "/projects/smart-attendance-tracker.svg",
    repositoryUrl: "https://github.com/AyuRahate/Attendance_Tracker",
    problem:
      "College students frequently struggle to monitor minimum attendance criteria (such as 75%), assess how many lectures they can safely skip, and manually transcribe complex weekly timetable schedules.",
    solution:
      "Built AttendAI, a full-stack platform featuring offline Tesseract.js timetable OCR scanning, interactive calendar date selection, a 12-week GitHub-style attendance heatmap, and automated bunk-room safety calculations.",
    contributions: [
      "Implemented automated timetable screenshot extraction using Tesseract.js with optional Gemini Vision API integration.",
      "Engineered per-subject and overall safe bunk calculators alerting students when nearing threshold limits.",
      "Built an interactive 12-week attendance heatmap and Mon–Sat weekly breakdown visual charts.",
      "Designed a responsive React 18 frontend with theme switching and a robust Express/Prisma/SQLite backend.",
    ],
    architecture:
      "React frontend communicates with an Express REST API authenticated via JWT. Timetable images are processed with Tesseract.js client/server OCR, and records are persisted in SQLite via Prisma ORM.",
    results: [
      "Eliminated manual timetable entry with 1-click OCR slot extraction and subject matching.",
      "Provided real-time safe bunk status alerts, preventing unintended attendance shortfalls.",
    ],
    challenges: [
      "Normalizing noisy, varied timetable screenshot formats across multiple college layouts.",
      "Preventing duplicate subject creation through automated name sanitization and deduplication.",
    ],
  },
  {
    id: "infant-monitoring-system",
    slug: "infant-monitoring-system",
    title: "AI-Based Smart Infant Monitoring System",
    subtitle: "Infant cry classification app with a Flutter client and FastAPI backend",
    category: "AI / Machine Learning / Mobile Development",
    description:
      "A mobile app that listens to audio and classifies infant cries into 8 categories (burping, discomfort, belly pain, hungry, lonely, scared, tired, cold/hot). Features real-time analysis over WebSockets, history and charts, and a UI themed for baby boy or girl. The model is a log-mel ResNet + BiLSTM pipeline trained on merged infant cry datasets, with roughly 85% accuracy.",
    techStack: [
      "Flutter",
      "Riverpod",
      "FastAPI",
      "TensorFlow",
      "Librosa",
      "SQLite",
      "WebSockets",
    ],
    featured: true,
    published: true,
    image: "/projects/infant-monitoring.svg",
    repositoryUrl: "https://github.com/AyuRahate/Infant_apk",
    problem:
      "Interpreting infant cry causes is difficult for new parents and caregivers, leading to elevated stress and delayed response to crucial infant needs.",
    solution:
      "Developed a mobile monitoring system that captures ambient cry audio, extracts acoustic log-mel spectrogram features, and classifies cries across 8 distinct physiological categories with real-time feedback over WebSockets.",
    contributions: [
      "Engineered the audio processing pipeline with Librosa for noise filtering and log-mel spectrogram representation.",
      "Trained a hybrid ResNet + BiLSTM deep learning model on merged infant cry datasets, achieving ~85% multi-class accuracy.",
      "Implemented a high-throughput FastAPI inference server streaming classifications via WebSockets.",
      "Developed a Flutter mobile application with Riverpod state management, cry history tracking, and customizable UI themes.",
    ],
    architecture:
      "Audio captured by the Flutter mobile client is streamed over WebSockets to a FastAPI backend. The audio is preprocessed with Librosa, fed through a ResNet + BiLSTM model, and the predicted cry category is streamed back with confidence metrics.",
    results: [
      "Achieved ~85% classification accuracy across 8 critical infant cry categories.",
      "Delivered real-time low-latency acoustic feedback directly to mobile devices.",
    ],
    challenges: [
      "Disentangling overlapping ambient household noise from subtle acoustic cry variations.",
      "Balancing temporal BiLSTM sequence modeling with real-time inference latency requirements.",
    ],
  },
];
