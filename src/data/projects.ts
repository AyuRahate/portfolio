import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "infant-monitoring-system",
    slug: "infant-monitoring-system",
    title: "Infant Monitoring System",
    category: "AI / Machine Learning / Application Development",
    description:
      "A mobile-based infant monitoring application that analyzes baby cry audio using MFCC acoustic extraction and a lightweight CNN classifier, paired with posture detection.",
    techStack: ["Python", "CNN", "MFCC", "Machine Learning", "Flutter"],
    featured: true,
    published: true,
    image: "/projects/infant-monitoring.svg",
    repositoryUrl: "https://github.com/AyuRahate",
    problem:
      "Distinguishing infant cry states and monitoring sleep posture is critical for parental peace of mind, yet traditional baby monitors only stream audio without intelligent contextual analysis.",
    solution:
      "Engineered an automated acoustic classification pipeline combining noise-reduction preprocessing, Mel-Frequency Cepstral Coefficients (MFCC), and a lightweight CNN model tailored for edge deployment.",
    contributions: [
      "Engineered the audio preprocessing pipeline including noise reduction and MFCC feature extraction.",
      "Trained and tuned a Lightweight Convolutional Neural Network (CNN) for multi-class cry acoustic classification (~90% verified accuracy).",
      "Designed the end-to-end system architecture bridging machine learning inference with mobile client monitoring.",
      "Integrated posture safety detection logic for sleep monitoring.",
    ],
    architecture:
      "Raw microphone audio is captured in short windows, filtered for background ambient noise, transformed into MFCC spectrogram representations, and passed through a quantized lightweight CNN inference engine.",
    results: [
      "Achieved ~90% classification accuracy on multi-class cry audio datasets.",
      "Optimized model parameters for low-latency inference on mobile hardware.",
    ],
    challenges: [
      "Mitigating varied environmental background noises without degrading distinctive cry frequency signatures.",
      "Balancing CNN layer depth and receptive fields against edge execution memory constraints.",
    ],
  },
  {
    id: "edna-biodiversity",
    slug: "edna-biodiversity",
    title: "eDNA Biodiversity Classification",
    category: "AI / Data Science / Biodiversity",
    description:
      "An exploratory machine learning platform designed for taxonomy identification and biodiversity assessment using environmental DNA (eDNA) genomic sequences.",
    techStack: ["Python", "Machine Learning", "Data Processing", "FastAPI"],
    featured: true,
    published: true,
    image: "/projects/edna-biodiversity.svg",
    repositoryUrl: "https://github.com/AyuRahate",
    problem:
      "Traditional biodiversity surveying requires invasive field sampling and manual specimen identification, making ecosystem health monitoring slow, costly, and resource-intensive.",
    solution:
      "Built a data-driven classification workflow that processes sequenced environmental DNA markers, maps taxonomic profiles, and computes relative biodiversity metrics through an accessible interface.",
    contributions: [
      "Developed sequence parsing and normalization scripts for complex genomic marker datasets.",
      "Implemented taxonomic classification models mapping sequence alignments to biological hierarchies.",
      "Created an analytical workflow to calculate diversity indices and taxonomic distributions.",
      "Designed clean API endpoints using FastAPI for model querying and data visualization.",
    ],
    architecture:
      "Genomic sequence inputs are cleaned and normalized through data pipelines, mapped via feature representation vectors into a classification hierarchy, and served via FastAPI for visualization.",
    results: [
      "Built a repeatable classification pipeline capable of parsing large multi-sample eDNA datasets.",
      "Structured taxonomic outputs into clear hierarchical profiles for ecological assessment.",
    ],
    challenges: [
      "Navigating sparse and imbalanced reference database entries across distinct taxonomic ranks.",
      "Translating complex biological output structures into intuitive representations for technical review.",
    ],
  },
  {
    id: "smart-attendance-tracker",
    slug: "smart-attendance-tracker",
    title: "Smart Attendance Tracker",
    category: "Application Development",
    description:
      "An automated attendance tracking system designed to streamline check-in workflows and record management.",
    techStack: ["Application Development", "Python"],
    featured: false,
    published: false, // Marked unpublished until verified technical specs are supplied
    problem: "Manual attendance logging leads to proxy errors and administrative delays.",
    solution: "Automated digital verification and structured tracking system.",
  },
];
