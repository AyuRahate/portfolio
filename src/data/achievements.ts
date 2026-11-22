import { AchievementItem, CreativeInterest } from "@/types";

/**
 * Achievements list is kept empty until verified documents are supplied.
 * The achievements component will automatically hide when this array is empty.
 */
export const achievements: AchievementItem[] = [];

export const creativeInterests: CreativeInterest[] = [
  {
    title: "Video Editing & Motion",
    description: "Crafting pacing, rhythm, visual hooks, and cinematic timing across dynamic digital video projects.",
    iconName: "Film",
    tags: ["Pacing", "Visual Timing", "Post-Production"],
  },
  {
    title: "Visual Composition & Design",
    description: "Structuring clean visual balance, typography hierarchies, and intentional contrast in digital layouts.",
    iconName: "Sliders",
    tags: ["Hierarchy", "Typography", "Color Grading"],
  },
  {
    title: "Interactive Storytelling",
    description: "Bridging technical software architecture with human-centered visual narratives that leave a lasting impression.",
    iconName: "Clapperboard",
    tags: ["User Experience", "Pacing", "Digital Experience"],
  },
];

