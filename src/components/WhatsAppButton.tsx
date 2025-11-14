"use client";

import React from "react";
import { FaWhatsapp } from "react-icons/fa";

interface WhatsAppButtonProps {
  phoneNumber: string; // e.g. "94771234567"
  isDarkMode?: boolean;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber,
  isDarkMode = false,
}) => {
  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group flex items-center space-x-2"
    >
      {/* Chat Text (slides in on hover) */}
      <span
        className={`opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-sm font-medium px-3 py-2 rounded-full backdrop-blur-md shadow-md 
          ${
            isDarkMode
              ? "bg-white/10 text-white border border-white/10"
              : "bg-white/90 text-gray-900 border border-gray-200"
          }`}
      >
        Chat with us
      </span>

      {/* WhatsApp Icon */}
      <div
        className={`relative rounded-full p-4 shadow-lg border transition-all duration-300 glow-animate
          ${
            isDarkMode
              ? "bg-green-500 border-green-400/90"
              : "bg-green-500 border-green-400/90"
          }
          group-hover:scale-110 group-hover:shadow-[0_0_25px_8px_rgba(37,211,102,0.6)]`}
      >
        {/* Enhanced Glowing Ring */}
        <span
          className={`absolute inset-0 rounded-full blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500
            ${
              isDarkMode
                ? "bg-[radial-gradient(circle_at_center,_rgba(37,211,102,0.3)_0%,_transparent_70%)]"
                : "bg-[radial-gradient(circle_at_center,_rgba(37,211,102,0.9)_0%,_transparent_70%)]"
            }`}
        ></span>

        <FaWhatsapp
          className={`relative z-10 w-7 h-7 transition-transform duration-300 ${
            isDarkMode ? "text-white" : "text-white"
          } group-hover:scale-110`}
        />
      </div>
    </a>
  );
};

export default WhatsAppButton;
