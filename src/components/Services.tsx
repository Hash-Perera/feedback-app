"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  BarChart3,
  Code2,
  Smartphone,
  Brain,
  Laptop2,
} from "lucide-react";
import LogoLoopContainer from "./LogoLoopContainer";

const services = [
  {
    icon: FileText,
    title: "Academic Writing",
    description:
      "Essays, dissertations, and reports written with academic integrity, formatting, and citations.",
    tags: ["IEEE", "Harvard", "Turnitin Safe"],
    gradient: "from-indigo-500 to-sky-500",
  },
  {
    icon: BarChart3,
    title: "Data Analysis",
    description:
      "Descriptive and predictive analytics using modern tools for data-driven insights.",
    tags: ["Python", "SPSS", "R Studio"],
    gradient: "from-cyan-500 to-emerald-400",
  },
  {
    icon: Code2,
    title: "Web Applications",
    description:
      "Custom-built, responsive, and high-performance web solutions for all industries.",
    tags: ["React", "Next.js", "Node.js", "Angular"],
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    icon: Smartphone,
    title: "Mobile Applications",
    description:
      "Native and cross-platform mobile app development with a user-first experience.",
    tags: ["React Native", "Flutter", "Firebase"],
    gradient: "from-orange-400 to-amber-500",
  },
  {
    icon: Brain,
    title: "AI / ML Solutions",
    description:
      "AI-powered automation and machine learning models tailored for your business goals.",
    tags: ["TensorFlow", "OpenAI", "Scikit-learn"],
    gradient: "from-pink-500 to-rose-400",
  },
  {
    icon: Laptop2,
    title: "Desktop Applications",
    description:
      "Cross-platform desktop applications with rich interfaces and offline capabilities.",
    tags: ["Electron", ".NET", "C#"],
    gradient: "from-slate-500 to-gray-400",
  },
];

const Services: React.FC = () => {
  return (
    <section
      id="services"
      className=" relative flex items-center justify-center min-h-screen px-6 py-20 overflow-hidden bg-gradient-to-br from-background via-muted/20 to-background"
    >
      {/* Subtle moving gradient blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-3xl animate-pulse opacity-40" />
      <div className="absolute bottom-0 right-1/3 w-[30rem] h-[30rem] bg-secondary/10 rounded-full blur-3xl animate-pulse opacity-40 delay-700" />

      <div className="relative z-10 container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-primary bg-clip-text text-transparent ">
            Our Services
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Modern, data-driven, and technology-backed solutions for your
            academic and professional success.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="group relative bg-card border border-border/40 hover:border-transparent rounded-2xl p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 flex flex-col justify-between"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div>
                <div
                  className={`inline-flex items-center justify-center p-4 rounded-xl bg-gradient-to-br ${service.gradient} text-white shadow-lg shadow-black/10 mb-5 group-hover:scale-110 transition-transform duration-500`}
                >
                  <service.icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Chips */}
              <div className="flex flex-wrap gap-2 mt-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-muted text-foreground/80 border border-border/50 group-hover:bg-primary/10 group-hover:text-primary transition-all"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Animated Gradient line */}
              <div
                className={`absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r ${service.gradient} group-hover:w-full transition-all duration-500`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
