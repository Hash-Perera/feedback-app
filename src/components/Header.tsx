"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, onToggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleScrollLink = (id: string) => {
    if (pathname === "/") {
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: "Services", href: "#services", id: "services" },
    { name: "How It Works", href: "#how-it-works", id: "how-it-works" },
    { name: "Feedbacks", href: "#feedbacks", id: "feedbacks" },
    { name: "Projects", href: "/projects" },
  ];

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl rounded-full border backdrop-blur-[25px] backdrop-saturate-150 transition-all duration-500
      ${
        isDarkMode
          ? "bg-white/10 border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.35)]"
          : "bg-white/20 border-white/30 shadow-[0_4px_24px_rgba(31,38,135,0.15)]"
      }`}
      style={{
        boxShadow: isDarkMode
          ? "0 4px 24px rgba(0,0,0,0.35), inset 0 1px 1px rgba(255,255,255,0.08)"
          : "0 4px 24px rgba(31,38,135,0.15), inset 0 1px 1px rgba(255,255,255,0.25)",
        backgroundImage: isDarkMode
          ? "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))"
          : "linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.12))",
      }}
    >
      <div className="flex items-center justify-between px-6 py-3 md:px-8">
        {/* Brand */}
        <Link href="/" onClick={() => setIsMenuOpen(false)}>
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent select-none cursor-pointer">
            AssignmentBuddy
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) =>
            item.href.startsWith("#") ? (
              <button
                key={item.name}
                onClick={() => handleScrollLink(item.id!)}
                className={`text-sm font-medium transition-colors duration-300 cursor-pointer ${
                  isDarkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                {item.name}
              </button>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-300 cursor-pointer ${
                  isDarkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                {item.name}
              </Link>
            )
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          {/* Dark Mode Toggle */}
          <Button
            onClick={onToggleDarkMode}
            className={`h-9 w-9 rounded-full border transition-all duration-300 cursor-pointer ${
              isDarkMode
                ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                : "bg-white/25 border-gray-200 text-gray-800 hover:bg-white/40"
            }`}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-full border bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X
                className={`h-5 w-5 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              />
            ) : (
              <Menu
                className={`h-5 w-5 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-[72px] left-1/2 -translate-x-1/2 w-[90%] max-w-sm rounded-3xl border backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 ease-out transform origin-top ${
          isMenuOpen
            ? "opacity-100 scale-100 visible"
            : "opacity-0 scale-95 invisible"
        } ${
          isDarkMode
            ? "bg-white/10 border-white/10 text-white"
            : "bg-white/70 border-gray-200 text-gray-800"
        } shadow-[0_4px_30px_rgba(0,0,0,0.15)]`}
        style={{
          backgroundImage: isDarkMode
            ? "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.03))"
            : "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.4))",
        }}
      >
        <div className="flex flex-col items-center py-6 space-y-5">
          {navItems.map((item) =>
            item.href.startsWith("#") ? (
              <button
                key={item.name}
                onClick={() => handleScrollLink(item.id!)}
                className={`text-base font-medium cursor-pointer transition-colors ${
                  isDarkMode
                    ? "text-gray-200 hover:text-white"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                {item.name}
              </button>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-base font-medium cursor-pointer transition-colors ${
                  isDarkMode
                    ? "text-gray-200 hover:text-white"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                {item.name}
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
