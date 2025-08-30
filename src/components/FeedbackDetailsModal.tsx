"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Star, User, Calendar, Mail, Phone } from "lucide-react";
import { Feedback } from "@/interfaces/feedback";

interface FeedbackDetailsModalProps {
  feedback: Feedback | null;
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackDetailsModal: React.FC<FeedbackDetailsModalProps> = ({
  feedback,
  isOpen,
  onClose,
}) => {
  if (!feedback) return null;

  const displayName = feedback.name;
  const maskedEmail = feedback.email.replace(/(.{2})(.*)(@.*)/, "$1***$3");
  const maskedPhone = feedback.mobile.replace(/(.{6})(.*)(.{4})/, "$1***$3");

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-6 h-6 ${
          i < rating ? "fill-warning text-warning" : "text-muted-foreground"
        }`}
      />
    ));
  };

  // utils/formatDate.ts
  function formatDate(
    input: string | Date,
    tz: string = "Asia/Colombo"
  ): string {
    const d = typeof input === "string" ? new Date(input) : input;
    if (!(d instanceof Date) || isNaN(d.getTime())) return "—";

    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "long", // "Aug 30, 2025" -> use "medium" if you prefer shorter
      timeStyle: "short", // "2:37 PM"
      timeZone: tz,
      hour12: true,
    }).format(d);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Feedback Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Info */}
          <div className="flex items-start space-x-4 p-4 bg-gradient-card rounded-lg">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-xl">
                {feedback.name.charAt(0).toUpperCase()}
                <User className="w-8 h-8" />
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">{displayName}</h3>
              <div className="flex items-center space-x-1 mb-3">
                <span className="font-medium text-muted-foreground mr-2">
                  Rating:
                </span>
                {renderStars(feedback.rating)}
                <span className="ml-2 font-semibold text-lg">
                  {feedback.rating}/5
                </span>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-primary mb-2">Project Name</h4>
              <p className="text-lg font-medium bg-muted/50 rounded-lg p-3">
                {feedback.projectName}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-primary mb-2">Feedback</h4>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="leading-relaxed text-foreground whitespace-pre-wrap">
                  {feedback.feedback}
                </p>
              </div>
            </div>
          </div>

          {/* Contact & Meta Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">Email:</span>
                <span className="text-muted-foreground">{maskedEmail}</span>
              </div>

              <div className="flex items-center space-x-3 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">Mobile:</span>
                <span className="text-muted-foreground">{maskedPhone}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">Submitted:</span>
              <span className="text-muted-foreground">
                {feedback.createdAt
                  ? formatDate(feedback.createdAt)
                  : "Unknown"}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDetailsModal;
