"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Script from "next/script";

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

  return (
    <main className="container mx-auto px-4 py-12">
      {/* JSON-LD (replaces Helmet script) */}
      <Script
        id="ld-projects"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(structuredData)}
      </Script>

      <nav className="mb-6 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          ← Back to Home
        </Link>
      </nav>

      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Projects Showcase
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Browse selected work delivered across research, analysis, and web.
        </p>
      </header>

      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleProjects.map((p) => (
          <article key={p.id} id={p.id}>
            <Card
              className="hover-scale cursor-pointer"
              onClick={() => setActive(p)}
            >
              <CardHeader>
                <CardTitle className="text-xl">{p.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {p.summary}
                </CardDescription>
                <div className="mt-1 text-xs text-primary">See more</div>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-md overflow-hidden bg-muted">
                  {/* You can switch to next/image if you want optimization */}
                  <img
                    src={p.thumbnail}
                    alt={`${p.title} thumbnail`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </article>
        ))}
      </section>

      <Dialog open={!!active} onOpenChange={() => setActive(null)}>
        <DialogContent className="sm:max-w-5xl max-w-[95vw]">
          {active && (
            <>
              <DialogHeader>
                <DialogTitle>{active.title}</DialogTitle>
                <DialogDescription>{active.summary}</DialogDescription>
              </DialogHeader>

              <section className="grid md:grid-cols-5 gap-6">
                <div className="md:col-span-3 space-y-4">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {active.media.map((m, idx) => (
                        <CarouselItem key={idx}>
                          <div className="aspect-video rounded-lg overflow-hidden bg-muted">
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
                                className="w-full h-full"
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
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ImageIcon className="w-4 h-4" /> Supports images
                    <Video className="w-4 h-4" /> Supports videos via URL
                  </div>
                </div>

                <div className="md:col-span-2 space-y-4">
                  <h2 className="text-lg font-semibold">Project Details</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {active.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {active.tags.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                  <Button onClick={() => setActive(null)} className="mt-2">
                    Close
                  </Button>
                </div>
              </section>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default ProjectsClient;
