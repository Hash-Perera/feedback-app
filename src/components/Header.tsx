"use client";

import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquarePlus, Moon, Sun } from "lucide-react";

interface HeaderProps {
  onAddFeedbackClick: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onAddFeedbackClick,
  isDarkMode,
  onToggleDarkMode,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            AssignmentBuddy
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <Link href="/projects" className="story-link text-sm text-foreground">
            Projects
          </Link>
          <Button
            onClick={onToggleDarkMode}
            className="h-9 w-9"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          <Button
            onClick={onAddFeedbackClick}
            className="bg-gradient-primary text-white font-medium shadow-soft hover:shadow-card transition-all duration-300 hover:scale-105"
          >
            <MessageSquarePlus className="w-4 h-4 mr-2" />
            Add Feedback
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
