"use client";

import React, { useState, useEffect, useRef } from "react";
import { Star } from "lucide-react";
import { Feedback } from "@/interfaces/feedback";

interface FeedbackLoopProps {
  feedbacks?: Feedback[];
  autoRotateInterval?: number;
}

const FeedbackLoop: React.FC<FeedbackLoopProps> = ({
  feedbacks = [],
  autoRotateInterval = 4000,
}) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = feedbacks.length;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cyclePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (
      parts[0].charAt(0).toUpperCase() +
      parts[parts.length - 1].charAt(0).toUpperCase()
    );
  };

  useEffect(() => {
    timerRef.current = setInterval(cyclePrev, autoRotateInterval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [total, autoRotateInterval]);

  const handleManualClick = (index: number) => {
    setActiveIndex(index);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(cyclePrev, autoRotateInterval);
  };

  const getPositionClass = (index: number) => {
    if (index === activeIndex) return "active";
    const prevIndex = (activeIndex - 1 + total) % total;
    if (index === prevIndex) return "top";
    const nextIndex = (activeIndex + 1) % total;
    if (index === nextIndex) return "bottom";
    return "hidden";
  };

  // --- Updated getTextStyles ---
  const getTextStyles = (pos: string) => {
    if (isMobile) {
      // Mobile: horizontal slide with same timing
      if (pos === "active")
        return "opacity-100 translate-x-0 pointer-events-auto z-20";
      if (pos === "top") return "opacity-0 -translate-x-8 z-10"; // previous → from left
      if (pos === "bottom") return "opacity-0 translate-x-8 z-10"; // next → from right
      return "opacity-0 translate-x-12 z-0";
    }

    // Desktop: original vertical slide
    if (pos === "active")
      return "opacity-100 translate-y-0 pointer-events-auto z-20";
    if (pos === "top") return "opacity-0 -translate-y-8 z-10";
    if (pos === "bottom") return "opacity-0 translate-y-8 z-10";
    return "opacity-0 translate-y-12 z-0";
  };

  // --- PATH CONFIGURATION ---
  const DESKTOP_PATH = "M 1 5 Q 250 250 1 450"; // vertical bulge (desktop)
  const MOBILE_PATH = "M 0 20 Q 150 140 300 20"; // downward U (smile) — active at bottom

  const CURVE_PATH = isMobile ? MOBILE_PATH : DESKTOP_PATH;
  const VIEWBOX = isMobile ? "0 0 300 160" : "0 0 300 500";

  return (
    <section className="relative py-12 md:py-24 px-4 md:px-20 bg-gradient-to-br from-background via-muted/20 to-background overflow-hidden">
      <div
        id="feedbacks"
        className="absolute inset-0 bg-gradient-to-tr from-secondary/10 via-transparent to-primary/10 pointer-events-none"
      />

      <div className="container mx-auto relative">
        <div className="text-center mb-10 lg:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-base md:text-lg">
            Real experiences shared by students and professionals we’ve helped.
          </p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-24 items-center px-0 md:px-36">
          {/* --- AVATAR SECTION --- */}
          <div
            className={`relative w-full max-w-[300px] mx-auto mt-10 flex-shrink-0 ${
              isMobile ? "h-[160px]" : "h-[500px]"
            }`}
          >
            <svg
              className="absolute left-0 top-0 w-full h-full pointer-events-none z-0"
              viewBox={VIEWBOX}
              fill="none"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient
                  id="curveGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="hsl(var(--muted-foreground) / 0.4)"
                  />
                  <stop offset="100%" stopColor="hsl(var(--border) / 0.4)" />
                </linearGradient>
              </defs>
              <path
                d={CURVE_PATH}
                stroke="url(#curveGradient)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            <div className="relative w-full h-full">
              {feedbacks.map((fb, index) => {
                const pos = getPositionClass(index);

                const offsetDistance =
                  pos === "active"
                    ? "50%"
                    : pos === "top"
                    ? "0%"
                    : pos === "bottom"
                    ? "100%"
                    : "0%";

                const transitionClass =
                  pos === "hidden"
                    ? ""
                    : "transition-all duration-[850ms] ease-[cubic-bezier(0.25,0.8,0.25,1)]";

                return (
                  <div
                    key={fb.id}
                    onClick={() => handleManualClick(index)}
                    className={`absolute left-0 top-0 cursor-pointer ${transitionClass} lg:mt-[30px]`}
                    style={{
                      offsetPath: `path("${CURVE_PATH}")`,
                      offsetRotate: "0deg",
                      offsetDistance,
                      opacity:
                        pos === "active" ? 1 : pos === "hidden" ? 0 : 0.4,
                      transform:
                        pos === "active"
                          ? "translateY(-50%) scale(1)"
                          : "translateY(-50%) scale(0.88)",
                      zIndex: pos === "active" ? 30 : 10,
                      filter: pos === "active" ? "none" : "grayscale(100%)",
                      pointerEvents: pos === "hidden" ? "none" : "auto",
                    }}
                  >
                    <div
                      className={`relative rounded-full overflow-hidden border-2 ${
                        pos === "active"
                          ? "w-20 h-20 border-primary/70 shadow-floating bg-gradient-primary glow-animate-blue"
                          : "w-16 h-16 border-border bg-card shadow-soft"
                      }`}
                    >
                      <div
                        className="w-full h-full flex items-center justify-center text-white font-bold text-xl"
                        style={{
                          background:
                            pos === "active"
                              ? "var(--gradient-primary)"
                              : "hsl(var(--muted-foreground) / 0.25)",
                        }}
                      >
                        {getInitials(fb.name)}
                      </div>
                    </div>

                    {/* --- POP-OUT NAME CARD (now ABOVE avatar on mobile) --- */}
                    {/* --- POP-OUT NAME CARD --- */}
                    {/* --- POP-OUT NAME CARD --- */}
                    <div
                      className={`absolute transition-all duration-500
                      lg:left-24 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0 lg:w-[280px] lg:text-left
                      left-1/2 -translate-x-1/2 top-25 w-[200px] text-center 
                      ${
                        pos === "active"
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 lg:-translate-x-4 pointer-events-none"
                      }
                    `}
                    >
                      <div className="border-none bg-transparent lg:bg-transparent sm:backdrop-blur-none lg:backdrop-blur-none p-2 lg:p-0 rounded-xl lg:rounded-none border lg:border-none lg:shadow-none">
                        <p className="font-semibold text-foreground text-lg whitespace-nowrap lg:whitespace-normal truncate">
                          {fb.name}
                        </p>
                        <div className="flex items-center justify-center lg:justify-start gap-1 mt-1">
                          {/* Stars */}
                          {[...Array(5)].map((_, i) => {
                            const filled = i + 1 <= Math.round(fb.rating);
                            return (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  filled
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "fill-none text-muted-foreground"
                                }`}
                              />
                            );
                          })}
                          {/* Rating number */}
                          <span className="text-xs font-bold text-muted-foreground ml-1">
                            {fb.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* --- TEXT SECTION --- */}
          <div className="relative w-full lg:pl-6 text-center lg:text-left">
            <span className="hidden lg:block absolute  -left-4 text-8xl font-serif text-primary/20 select-none">
              “
            </span>
            <span className="lg:hidden block text-6xl font-serif text-primary/20 select-none">
              “
            </span>

            <div className="relative h-[240px] sm:h-[260px]">
              {feedbacks.map((fb, index) => {
                const pos = getPositionClass(index);
                const textClass = getTextStyles(pos);

                // Split feedback into first char and rest
                const firstChar = fb.feedback.charAt(0);
                const rest = fb.feedback.substring(1);

                return (
                  <div
                    key={fb.id}
                    className={`
            absolute inset-0 
            flex flex-col justify-start lg:justify-center
            transition-all duration-[800ms] ease-[cubic-bezier(0.25,0.8,0.25,1)]
            ${textClass}
          `}
                  >
                    <p className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-serif text-foreground leading-relaxed italic px-2 md:px-0 relative">
                      {/* First letter — styled on all screens */}
                      <span
                        className={`
                font-bold text-primary 
                ${
                  isMobile
                    ? "text-4xl -ml-1 mr-0.5 align-baseline "
                    : "float-left text-6xl leading-[0.8] mr-2 "
                }
              `}
                      >
                        {firstChar}
                      </span>
                      {/* Rest of the text */}
                      <span>{rest}</span>
                    </p>

                    {/* Name divider — desktop only */}
                    <div className="hidden lg:flex mt-6 items-center gap-2 text-muted-foreground">
                      <div className="h-[1px] w-8 bg-border"></div>
                      <span className="text-sm font-bold tracking-widest uppercase">
                        {fb.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackLoop;
