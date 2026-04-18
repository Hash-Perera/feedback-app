"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

interface WhatsAppButtonProps {
  phoneNumbers: string[];
  isDarkMode?: boolean;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumbers,
  isDarkMode = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const normalizedNumbers = useMemo(
    () => phoneNumbers.map((number) => number.replace(/[^\d]/g, "")).filter(Boolean),
    [phoneNumbers]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-50">
      <div className="relative flex items-end justify-end">
        <div
          className={`absolute bottom-full right-0 mb-4 flex origin-bottom-right flex-col items-end gap-3 transition-all duration-300 ease-out ${
            isOpen
              ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
              : "pointer-events-none translate-y-3 scale-95 opacity-0"
          }`}
        >
          {normalizedNumbers.map((phoneNumber, index) => (
            <a
              key={phoneNumber}
              href={`https://wa.me/${phoneNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex min-w-[180px] items-center justify-start gap-3 rounded-full px-4 py-3 text-sm font-medium shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl ${
                isDarkMode
                  ? "bg-white/12 text-white border border-white/10"
                  : "bg-white/95 text-gray-900 border border-gray-200"
              }`}
              style={{ transitionDelay: isOpen ? `${index * 70}ms` : "0ms" }}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500/10">
                <FaWhatsapp className="h-4 w-4 text-green-500" />
              </span>
              <span>WhatsApp {index + 1}</span>
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Open WhatsApp contacts"
          aria-expanded={isOpen}
          className="group flex items-center gap-3"
        >
          <span
            className={`hidden sm:inline-flex translate-x-2 rounded-full px-3 py-2 text-sm font-medium backdrop-blur-md shadow-md transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 ${
              isDarkMode
                ? "bg-white/10 text-white border border-white/10 opacity-0"
                : "bg-white/90 text-gray-900 border border-gray-200 opacity-0"
            }`}
          >
            Chat with us
          </span>

          <div
            className={`relative rounded-full p-4 shadow-lg border transition-all duration-300 glow-animate ${
              isDarkMode
                ? "bg-green-500 border-green-400/90"
                : "bg-green-500 border-green-400/90"
            } ${isOpen ? "scale-105 shadow-[0_0_25px_8px_rgba(37,211,102,0.35)]" : "group-hover:scale-110 group-hover:shadow-[0_0_25px_8px_rgba(37,211,102,0.6)]"}`}
          >
            <span
              className={`absolute inset-0 rounded-full blur-2xl transition-opacity duration-500 ${
                isOpen ? "opacity-100" : "opacity-70 group-hover:opacity-100"
              } ${
                isDarkMode
                  ? "bg-[radial-gradient(circle_at_center,_rgba(37,211,102,0.3)_0%,_transparent_70%)]"
                  : "bg-[radial-gradient(circle_at_center,_rgba(37,211,102,0.9)_0%,_transparent_70%)]"
              }`}
            ></span>

            <FaWhatsapp
              className={`relative z-10 h-7 w-7 text-white transition-transform duration-300 ${
                isOpen ? "scale-110" : "group-hover:scale-110"
              }`}
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default WhatsAppButton;
