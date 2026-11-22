import { SkillCategory } from "@/types";

/**
 * Technical skills confirmed initially.
 * Only verified skills per Section 9 of specification.
 */
export const skillCategories: SkillCategory[] = [
  {
    category: "Programming Languages",
    skills: [
      { name: "Python", iconName: "FileCode2" },
      { name: "Java", iconName: "Coffee" },
      { name: "JavaScript", iconName: "Code" },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "HTML", iconName: "Layout" },
      { name: "CSS", iconName: "Palette" },
      { name: "JavaScript", iconName: "Code2" },
    ],
  },
  {
    category: "Mobile & Backend",
    skills: [
      { name: "Flutter", iconName: "Smartphone" },
      { name: "FastAPI", iconName: "Server" },
    ],
  },
  {
    category: "AI / Machine Learning",
    skills: [
      { name: "Machine Learning", iconName: "Cpu" },
    ],
  },
  {
    category: "Developer Tools",
    skills: [
      { name: "Git", iconName: "GitBranch" },
      { name: "GitHub", iconName: "Github" },
    ],
  },
];

