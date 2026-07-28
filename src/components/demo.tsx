"use client";

import { Code2, Database, Palette, Terminal, Layers, GitBranch, Smartphone, Brush, Layers3, Users } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import type { SkillNode } from "@/components/ui/radial-orbital-timeline";

const skillData: SkillNode[] = [
  {
    id: 1,
    title: "React Native",
    subtitle: "Mobile Development",
    content: "Building high-performance cross-platform mobile apps with hooks, Redux state management, and REST API integration for iOS and Android.",
    category: "Mobile",
    icon: Smartphone,
    relatedIds: [2, 4, 6],
    status: "master",
    energy: 90,
  },
  {
    id: 2,
    title: "TypeScript",
    subtitle: "Typed JavaScript",
    content: "Writing type-safe, maintainable code with advanced generics, utility types, and strict compiler options across mobile and web projects.",
    category: "Frontend",
    icon: Layers3,
    relatedIds: [1, 4, 9],
    status: "master",
    energy: 88,
  },
  {
    id: 3,
    title: "Figma",
    subtitle: "Design & Handoff",
    content: "Creating high-fidelity mockups, wireframes, interactive prototypes, and design system documentation for cross-functional handoff.",
    category: "Design",
    icon: Palette,
    relatedIds: [5, 10],
    status: "master",
    energy: 92,
  },
  {
    id: 4,
    title: "Tailwind CSS",
    subtitle: "Utility-first Styling",
    content: "Rapidly building responsive, accessible designs using utility classes with design-system consistency across viewports.",
    category: "Frontend",
    icon: Brush,
    relatedIds: [1, 2, 5],
    status: "master",
    energy: 92,
  },
  {
    id: 5,
    title: "Flutter",
    subtitle: "Cross-platform Apps",
    content: "Developing full-featured mobile apps with Dart, integrating Firebase Auth, Firestore, and push notifications.",
    category: "Mobile",
    icon: Smartphone,
    relatedIds: [1, 7, 8],
    status: "proficient",
    energy: 82,
  },
  {
    id: 6,
    title: "Redux / Zustand",
    subtitle: "State Management",
    content: "Managing complex application state with Redux for predictable data flow and Zustand for lightweight stores.",
    category: "Frontend",
    icon: Layers,
    relatedIds: [1, 2, 7],
    status: "proficient",
    energy: 85,
  },
  {
    id: 7,
    title: "Firebase",
    subtitle: "Backend Services",
    content: "Implementing Auth, Firestore, Realtime DB, and FCM push notifications for serverless mobile backends.",
    category: "Backend",
    icon: Database,
    relatedIds: [5, 6, 8],
    status: "proficient",
    energy: 80,
  },
  {
    id: 8,
    title: "REST API",
    subtitle: "API Integration",
    content: "Integrating RESTful services using Axios and Fetch for real-time client-server data exchange.",
    category: "Backend",
    icon: Terminal,
    relatedIds: [1, 6, 7],
    status: "proficient",
    energy: 88,
  },
  {
    id: 9,
    title: "Git / GitHub",
    subtitle: "Version Control",
    content: "Managing branches, code reviews, and organized team workflows with clean commit histories.",
    category: "Tools",
    icon: GitBranch,
    relatedIds: [1, 2, 10],
    status: "master",
    energy: 90,
  },
  {
    id: 10,
    title: "Agile / Scrum",
    subtitle: "Collaboration",
    content: "Working in cross-functional teams through sprints, standups, and iterative development cycles from requirement analysis to deployment.",
    category: "Tools",
    icon: Users,
    relatedIds: [3, 9],
    status: "proficient",
    energy: 85,
  },
];

export function RadialOrbitalTimelineDemo() {
  return <RadialOrbitalTimeline skillData={skillData} />;
}

export default { RadialOrbitalTimelineDemo };
