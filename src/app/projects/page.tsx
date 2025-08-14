// src/app/projects/page.tsx
import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Projects Showcase | AssignmentBuddy",
  description:
    "Explore our projects showcase: detailed case studies with photo/video galleries.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
