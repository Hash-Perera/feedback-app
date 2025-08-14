"use client";

import React, { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  animationDuration: number;
}

interface ConfettiProps {
  trigger: boolean;
  onComplete?: () => void;
  intensity?: number; // Number of confetti pieces
  duration?: number; // How long the effect lasts
}

const Confetti: React.FC<ConfettiProps> = ({
  trigger,
  onComplete,
  intensity = 50,
  duration = 3000,
}) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const [isActive, setIsActive] = useState(false);

  const colors = [
    "hsl(217, 91%, 60%)", // Primary blue
    "hsl(258, 90%, 66%)", // Secondary purple
    "hsl(25, 95%, 53%)", // Accent orange
    "hsl(142, 71%, 45%)", // Success green
    "hsl(43, 96%, 56%)", // Warning yellow
    "hsl(0, 84%, 60%)", // Red
    "hsl(280, 100%, 70%)", // Pink
    "hsl(200, 100%, 50%)", // Cyan
  ];

  useEffect(() => {
    if (trigger && !isActive) {
      setIsActive(true);

      // Generate confetti pieces
      const newPieces: ConfettiPiece[] = Array.from(
        { length: intensity },
        (_, i) => ({
          id: i,
          x: Math.random() * 100, // Percentage across screen
          y: -10, // Start above screen
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 8 + 4, // 4-12px
          rotation: Math.random() * 360,
          animationDuration: Math.random() * 1000 + 2000, // 2-3 seconds
        })
      );

      setPieces(newPieces);

      // Clean up after animation
      const cleanup = setTimeout(() => {
        setIsActive(false);
        setPieces([]);
        onComplete?.();
      }, duration);

      return () => clearTimeout(cleanup);
    }
  }, [trigger, isActive, intensity, duration, onComplete]);

  if (!isActive || pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            transform: `rotate(${piece.rotation}deg)`,
            animationDuration: `${piece.animationDuration}ms`,
            animationDelay: `${Math.random() * 500}ms`,
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
