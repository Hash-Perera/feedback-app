"use client";

import React, { useMemo, useState, useEffect } from "react";
import { projectService } from "@/services/projectService";
import Header from "@/components/Header";
import Script from "next/script";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Video } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Project } from "@/interfaces/project";

const ProjectsClient: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<Project | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // ✅ Fetch projects from DB
  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      const data = await projectService.getProjects();
      console.log("Fetched projects:", data);
      setProjects(data);
      setLoading(false);
    };
    loadProjects();
  }, []);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedDarkMode);

    if (savedDarkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, []);

  // SEO Structured Data
  const structuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: projects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `/projects#${p.id}`,
        name: p.title,
      })),
    }),
    [projects]
  );

  const handleToggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    localStorage.setItem("darkMode", newMode.toString());

    if (newMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background relative">
      <Header isDarkMode={isDarkMode} onToggleDarkMode={handleToggleDarkMode} />

      <Script id="projects-jsonld" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>

      <main className="container mx-auto px-4 pt-28 pb-20">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Projects Showcase
          </h1>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Explore our work — from data analytics to full-stack solutions.
          </p>
        </header>

        {/* Loading State */}
        {loading && (
          <p className="text-center text-muted-foreground">
            Loading projects...
          </p>
        )}

        {/* Empty State */}
        {!loading && projects.length === 0 && (
          <p className="text-center text-muted-foreground">
            No projects yet. Add some through the admin panel.
          </p>
        )}

        {/* Project Grid */}
        {!loading && projects.length > 0 && (
          <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p) => (
              <article key={p.id} id={p.id}>
                <Card
                  className={`cursor-pointer overflow-hidden rounded-2xl border hover:shadow-md transition-all`}
                  onClick={() => setActive(p)}
                >
                  <CardHeader>
                    <CardTitle>{p.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {p.summary}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="aspect-video rounded-md overflow-hidden bg-gray-100">
                      <img
                        src={p.thumbnail}
                        alt={p.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags.map((tag) => (
                        <Badge key={tag} className="bg-blue-100 text-blue-700">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </article>
            ))}
          </section>
        )}

        {/* Modal */}
        <Dialog open={!!active} onOpenChange={() => setActive(null)}>
          <DialogContent
            className="
    sm:max-w-5xl max-w-[95vw]
    w-full rounded-2xl border
    p-4 sm:p-8
    max-h-[90vh] overflow-y-auto
    bg-white dark:bg-[#111] text-black dark:text-white
  "
          >
            {active && (
              <>
                <DialogHeader className="space-y-2">
                  <DialogTitle className="text-xl sm:text-2xl font-bold">
                    {active.title}
                  </DialogTitle>

                  <DialogDescription className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                    {active.summary}
                  </DialogDescription>
                </DialogHeader>

                {/* ⭐ Mobile-First Layout */}
                <section className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-6">
                  {/* Left (Carousel) */}
                  <div className="md:col-span-3 space-y-4">
                    <Carousel className="w-full">
                      <CarouselContent>
                        {active.media.map((m, idx) => (
                          <CarouselItem key={idx}>
                            <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-white/10 w-full">
                              {m.type === "image" ? (
                                <img
                                  src={m.src}
                                  alt={
                                    m.alt || `${active.title} media ${idx + 1}`
                                  }
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <video
                                  controls
                                  className="w-full h-full rounded-xl"
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

                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      <ImageIcon className="w-4 h-4" /> Images{" "}
                      <Video className="w-4 h-4" /> Videos
                    </div>
                  </div>

                  {/* Right (Details) */}
                  <div className="md:col-span-2 space-y-4">
                    <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                      Project Details
                    </h2>

                    <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                      {active.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {active.tags.map((t) => (
                        <Badge
                          key={t}
                          className="bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-700"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      onClick={() => setActive(null)}
                      className="
              w-full md:w-auto
              bg-gradient-to-r from-blue-500 to-indigo-500
              text-white hover:opacity-90
            "
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
