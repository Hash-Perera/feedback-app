"use client";

import React from "react";
import { Star, User } from "lucide-react";
import { Feedback } from "@/interfaces/feedback";

interface FeedbackCardProps {
  feedback: Feedback;
  onClick: () => void;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback, onClick }) => {
  const displayName = feedback.name;
  const truncatedFeedback =
    feedback.feedback.length > 150
      ? feedback.feedback.substring(0, 150) + "..."
      : feedback.feedback;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-warning text-warning" : "text-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <div
      onClick={onClick}
      className="group flex-shrink-0 w-80 bg-gradient-card rounded-xl p-6 shadow-soft hover:shadow-card transition-all duration-300 cursor-pointer border hover:border-primary/20 hover:scale-[1.02]"
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold">
            {feedback.name.charAt(0).toUpperCase()}
            <User className="w-6 h-6" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-foreground truncate">
              {displayName}
            </h3>
            <div className="flex items-center space-x-1">
              {renderStars(feedback.rating)}
            </div>
          </div>

          <p className="text-sm font-medium text-primary mb-3 truncate">
            {feedback.projectName}
          </p>

          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {truncatedFeedback}
          </p>

          {feedback.feedback.length > 150 && (
            <p className="text-xs text-primary mt-2 group-hover:text-primary-glow transition-colors">
              Click to read more...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;
