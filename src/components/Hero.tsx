"use client";

import React, { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  SiReact,
  SiAngular,
  SiNodedotjs,
  SiNextdotjs,
  SiPython,
  SiDotnet,
  SiTensorflow,
  SiDocker,
} from "react-icons/si";
import { Star, Award, Users, Clock, FileText } from "lucide-react";

const floaters = [
  // existing ones
  {
    Icon: SiReact,
    color: "#61DAFB",
    size: 40,
    top: "16%",
    left: "10%",
    dx: 240,
    dy: -120,
    dur: 70,
  },
  {
    Icon: SiAngular,
    color: "#DD0031",
    size: 38,
    top: "68%",
    left: "12%",
    dx: -220,
    dy: 140,
    dur: 78,
  },
  {
    Icon: SiNodedotjs,
    color: "#83CD29",
    size: 44,
    top: "72%",
    left: "84%",
    dx: -260,
    dy: -160,
    dur: 76,
  },
  {
    Icon: SiNextdotjs,
    color: "#000000",
    size: 34,
    top: "24%",
    left: "82%",
    dx: 220,
    dy: 120,
    dur: 82,
  },
  {
    Icon: SiPython,
    color: "#3776AB",
    size: 36,
    top: "12%",
    left: "55%",
    dx: 200,
    dy: 140,
    dur: 74,
  },

  {
    Icon: SiTensorflow,
    color: "#FF6F00",
    size: 42,
    top: "45%",
    left: "8%",
    dx: 180,
    dy: 150,
    dur: 90,
  },

  {
    Icon: SiDotnet,
    color: "#512BD4",
    size: 40,
    top: "60%",
    left: "60%",
    dx: -200,
    dy: 130,
    dur: 85,
  },

  {
    Icon: FileText,
    color: "#FFB800",
    size: 38,
    top: "30%",
    left: "40%",
    dx: 160,
    dy: -120,
    dur: 88,
  },

  {
    Icon: SiDocker,
    color: "#2496ED",
    size: 44,
    top: "80%",
    left: "30%",
    dx: -240,
  },
];

const Hero: React.FC = () => {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  // Smooth mouse-follow spotlight (throttled with rAF)
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    rafRef.current = requestAnimationFrame(() => {
      spotlightRef.current?.style.setProperty("--mx", `${x}%`);
      spotlightRef.current?.style.setProperty("--my", `${y}%`);
    });
  }, []);

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 bg-gradient-hero"
    >
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute inset-0 -z-10 mouse-spotlight"
      />

      {floaters.map(({ Icon, color, size, top, left, dx, dy, dur }, i) => {
        const randomOffset = Math.random() * 100;
        const dxLocal = dx ?? 0;
        const dyLocal = dy ?? 0;
        const duration = (dur ?? 80) + Math.random() * 20;
        return (
          <motion.div
            key={i}
            className="absolute opacity-40 md:opacity-50"
            style={{
              top,
              left,
              filter: "drop-shadow(0 8px 16px rgba(0,0,0,.15))",
            }}
            animate={{
              x: [0, dxLocal + randomOffset, -dxLocal - randomOffset, 0],
              y: [0, dyLocal + randomOffset, -dyLocal - randomOffset, 0],
              rotate: [0, 8, -8, 0],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Icon size={size} color={color} />
          </motion.div>
        );
      })}

      {/* Your content unchanged */}
      <div className="container mx-auto text-center max-w-4xl relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
          Trusted Academic Excellence
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Empowering your studies with expert academic writing, research help,
          Web & Mobile app development, and IT, Business & Engineering
          assignments.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {[
            {
              Icon: Star,
              label: "Average Rating",
              value: "4.9+",
              color: "text-primary",
            },
            {
              Icon: Users,
              label: "Happy Clients",
              value: "100+",
              color: "text-secondary",
            },
            {
              Icon: Award,
              label: "Success Rate",
              value: "98%",
              color: "text-accent",
            },
            {
              Icon: Clock,
              label: "Support",
              value: "24/7",
              color: "text-success",
            },
          ].map(({ Icon, label, value, color }) => (
            <div
              key={label}
              className="flex flex-col items-center p-4 rounded-xl bg-gradient-card shadow-soft transition-transform hover:scale-[1.03]"
            >
              <Icon className={`w-8 h-8 mb-2 ${color}`} />
              <span className={`text-2xl font-bold ${color}`}>{value}</span>
              <span className="text-sm text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
