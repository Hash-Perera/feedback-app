"use client";

import React from "react";
import { Heart } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`relative mt-24 border-t backdrop-blur-xl  border-white/10 transition-all duration-500`}
    >
      <div className="container mx-auto px-6 py-12 flex flex-col items-center text-center space-y-6">
        {/* Brand */}
        <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent select-none">
          AssignmentBuddy
        </h3>

        {/* Tagline */}
        <p
          className={`max-w-xl text-sm md:text-base leading-relaxed transition-colors duration-300 
  text-black dark:text-gray-400`}
        >
          Empowering your academic and professional success through innovation,
          creativity, and technology.
        </p>

        {/* Divider Line */}
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-purple-400/60 to-transparent my-3" />

        {/* Bottom Text */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3 text-sm transition-colors duration-300 
          text-gray-600 dark:text-gray-400`}
        >
          <p>© {currentYear} AssignmentBuddy. All rights reserved.</p>
          <span className="hidden sm:block">•</span>
          <div className="flex items-center space-x-1">
            <span>Made with</span>
            <Heart className="w-6 h-6 text-red-500 fill-current animate-pulse" />
            <span>for academic excellence</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
