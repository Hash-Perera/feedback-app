"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import Header from "@/components/Header"; // ✅ make sure this path points to your header file
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Image as ImageIcon, Video } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const sampleProjects: ProjectItem[] = [
  {
    id: "p1",
    title: "Marketing Strategy Case Study",
    summary: "End-to-end research and go-to-market plan for a SaaS startup.",
    description:
      "We developed a comprehensive marketing strategy including user research, competitor analysis, and a phased GTM plan. The project delivered a 28% increase in qualified leads within the first quarter.",
    tags: ["Research", "GTM", "SaaS"],
    thumbnail: "/placeholder.svg",
    media: [
      { type: "image", src: "/placeholder.svg", alt: "Marketing charts" },
      { type: "image", src: "/placeholder.svg", alt: "Persona boards" },
    ],
  },
  {
    id: "p2",
    title: "Data Analysis for Publication",
    summary: "Statistical analysis and visualization for an academic paper.",
    description:
      "We performed data cleaning, exploratory analysis, and built publication-ready figures. The study was accepted in a peer-reviewed journal.",
    tags: ["Data", "Statistics", "Academic"],
    thumbnail: "/placeholder.svg",
    media: [
      { type: "image", src: "/placeholder.svg", alt: "Graphs" },
      { type: "image", src: "/placeholder.svg", alt: "Tables" },
    ],
  },
  {
    id: "p3",
    title: "Portfolio Website Redesign",
    summary:
      "Modern UI refresh with accessibility and performance improvements.",
    description:
      "We delivered a responsive redesign focused on readability and conversions, including semantic HTML, performance budget, and a new design system.",
    tags: ["Web", "UX", "Accessibility"],
    thumbnail: "/placeholder.svg",
    media: [
      { type: "image", src: "/placeholder.svg", alt: "Landing page" },
      { type: "image", src: "/placeholder.svg", alt: "Components" },
    ],
  },
];

const ProjectsClient: React.FC = () => {
  const [active, setActive] = useState<ProjectItem | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const structuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: sampleProjects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `/projects#${p.id}`,
        name: p.title,
      })),
    }),
    []
  );

  const handleAddFeedbackClick = () => {
    alert("Feedback form coming soon! 🚀");
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div
      className={`${
        isDarkMode ? "dark bg-[#0b0b0b]" : "bg-white"
      } min-h-screen transition-colors duration-500`}
    >
      {/* ✅ Modern Header */}
      <Header
        onAddFeedbackClick={handleAddFeedbackClick}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      {/* JSON-LD */}
      <Script
        id="ld-projects"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(structuredData)}
      </Script>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-28 pb-20">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Projects Showcase
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-3 text-base">
            Explore our featured projects — from data-driven insights to elegant
            web solutions.
          </p>
        </header>

        {/* Project Grid */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleProjects.map((p) => (
            <article key={p.id} id={p.id}>
              <Card
                className={`cursor-pointer overflow-hidden rounded-2xl border ${
                  isDarkMode
                    ? "border-white/10 bg-white/5 text-white hover:bg-white/10"
                    : "border-gray-200 bg-white hover:bg-gray-50"
                } shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300`}
                onClick={() => setActive(p)}
              >
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    {p.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {p.summary}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video rounded-md overflow-hidden bg-gray-100">
                    <img
                      src={p.thumbnail}
                      alt={`${p.title} thumbnail`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <Badge
                        key={t}
                        className="bg-blue-100 text-blue-700 border border-blue-200 font-medium"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </article>
          ))}
        </section>

        {/* Dialog / Modal */}
        <Dialog open={!!active} onOpenChange={() => setActive(null)}>
          <DialogContent
            className={`sm:max-w-5xl max-w-[95vw] rounded-3xl border ${
              isDarkMode
                ? "border-white/10 bg-white/10 backdrop-blur-2xl text-white shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
                : "border-gray-200 bg-white shadow-xl"
            }`}
          >
            {active && (
              <>
                <DialogHeader>
                  <DialogTitle
                    className={`text-2xl font-bold ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {active.title}
                  </DialogTitle>
                  <DialogDescription
                    className={isDarkMode ? "text-gray-300" : "text-gray-600"}
                  >
                    {active.summary}
                  </DialogDescription>
                </DialogHeader>

                <section className="grid md:grid-cols-5 gap-8 mt-4">
                  <div className="md:col-span-3 space-y-4">
                    <Carousel className="w-full">
                      <CarouselContent>
                        {active.media.map((m, idx) => (
                          <CarouselItem key={idx}>
                            <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-white/10">
                              {m.type === "image" ? (
                                <img
                                  src={m.src}
                                  alt={
                                    m.alt || `${active.title} media ${idx + 1}`
                                  }
                                  loading="lazy"
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <video
                                  controls
                                  className="w-full h-full rounded-xl"
                                  aria-label={
                                    m.alt || `${active.title} video ${idx + 1}`
                                  }
                                >
                                  <source src={m.src} />
                                </video>
                              )}
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                    <div
                      className={`flex items-center gap-2 text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      <ImageIcon className="w-4 h-4" /> Images{" "}
                      <Video className="w-4 h-4" /> Videos
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-4">
                    <h2
                      className={`text-lg font-semibold ${
                        isDarkMode ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      Project Details
                    </h2>
                    <p
                      className={`text-sm leading-relaxed ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {active.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {active.tags.map((t) => (
                        <Badge
                          key={t}
                          className="bg-blue-100 text-blue-700 border border-blue-200 font-medium"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      onClick={() => setActive(null)}
                      className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:opacity-90"
                    >
                      Close
                    </Button>
                  </div>
                </section>
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default ProjectsClient;
