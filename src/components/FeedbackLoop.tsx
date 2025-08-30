"use client";

import React, { useEffect, useRef, useState } from "react";
import { Feedback } from "@/interfaces/feedback";
import FeedbackCard from "./FeedbackCard";

interface FeedbackLoopProps {
  feedbacks: Feedback[];
  onCardClick: (feedback: Feedback) => void;
}

const FeedbackLoop: React.FC<FeedbackLoopProps> = ({
  feedbacks,
  onCardClick,
}) => {
  const [pausedRows, setPausedRows] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const [duplicatedFeedbacks, setDuplicatedFeedbacks] = useState<Feedback[]>(
    []
  );
  const rowRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const speeds = useRef<number[]>([0.8, 1.0, 1.2]);

  // Configuration
  const ANIMATION_SPEED = 80; // seconds for one complete loop (slower)
  const CARD_WIDTH = 320; // 80 (w-80) * 4 (rem to px)
  const GAP = 24; // 6 (gap-6) * 4 (rem to px)

  useEffect(() => {
    // Duplicate feedbacks to create seamless infinite loop
    if (feedbacks.length > 0) {
      // Create enough duplicates to ensure smooth infinite scroll
      const totalWidth = (CARD_WIDTH + GAP) * feedbacks.length;
      const viewportWidth = window.innerWidth;
      const duplicatesNeeded = Math.ceil((viewportWidth * 2) / totalWidth) + 2;

      const duplicated: Feedback[] = [];
      for (let i = 0; i < duplicatesNeeded; i++) {
        duplicated.push(
          ...feedbacks.map((f) => ({ ...f, id: `${f.id}-${i}` }))
        );
      }
      setDuplicatedFeedbacks(duplicated);
    }
  }, [feedbacks]);

  useEffect(() => {
    // RAF-based auto-scroll per row for smooth, controllable animation
    let rafId: number;

    const animate = () => {
      [0, 1, 2].forEach((rowIndex) => {
        const el = rowRefs.current.get(rowIndex);
        if (!el || pausedRows.has(rowIndex)) return;
        const halfWidth = el.scrollWidth / 2;
        el.scrollLeft += speeds.current[rowIndex % speeds.current.length];
        if (el.scrollLeft >= halfWidth) {
          // seamless loop without blink
          el.scrollLeft -= halfWidth;
        }
      });
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [pausedRows, duplicatedFeedbacks]);

  const handleMouseEnter = (rowIndex: number) => {
    setPausedRows((prev) => new Set(prev).add(rowIndex));
  };

  const handleMouseLeave = (rowIndex: number) => {
    setPausedRows((prev) => {
      const newSet = new Set(prev);
      newSet.delete(rowIndex);
      return newSet;
    });
  };

  const handleTouchStart = (rowIndex: number) => {
    setPausedRows((prev) => new Set(prev).add(rowIndex));
  };

  const handleTouchEnd = (rowIndex: number) => {
    setPausedRows((prev) => {
      const newSet = new Set(prev);
      newSet.delete(rowIndex);
      return newSet;
    });
  };

  if (feedbacks.length === 0) {
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="bg-gradient-card rounded-xl p-12 shadow-soft">
            <h3 className="text-2xl font-semibold mb-4">No feedback yet</h3>
            <p className="text-muted-foreground">
              Be the first to share your experience with our services!
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Split feedbacks into 3 rows
  const getRowFeedbacks = (rowIndex: number) => {
    const rowFeedbacks = duplicatedFeedbacks.filter(
      (_, index) => index % 3 === rowIndex
    );
    return rowFeedbacks;
  };

  return (
    <section className="py-16 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          What Our Clients Say
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          Real feedback from satisfied clients who trusted us with their
          academic and professional projects.
        </p>
      </div>

      <div className="space-y-6">
        {[0, 1, 2].map((rowIndex) => (
          <div key={rowIndex} className="relative">
            <div
              ref={(el) => {
                if (el) rowRefs.current.set(rowIndex, el);
              }}
              className="flex space-x-6 overflow-x-auto scrollbar-hide"
              onMouseEnter={() => handleMouseEnter(rowIndex)}
              onMouseLeave={() => handleMouseLeave(rowIndex)}
              onTouchStart={() => handleTouchStart(rowIndex)}
              onTouchEnd={() => handleTouchEnd(rowIndex)}
            >
              {[...Array(2)].map((_, loopIndex) => (
                <React.Fragment key={`loop-${loopIndex}`}>
                  {getRowFeedbacks(rowIndex).map((feedback, index) => (
                    <FeedbackCard
                      key={`${feedback.id}-${index}-row-${rowIndex}-loop-${loopIndex}`}
                      feedback={feedback}
                      onClick={() => onCardClick(feedback)}
                    />
                  ))}
                </React.Fragment>
              ))}
            </div>

            {/* Gradient overlays for smooth edges */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeedbackLoop;
