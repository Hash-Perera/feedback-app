"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Star, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { feedbackService } from "@/services/feedbackService";
import { CreateFeedbackData } from "@/interfaces/feedback";
import Confetti from "@/components/Confetti";
import Link from "next/link";

export default function AddFeedbackPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    projectName: "",
    feedback: "",
    rating: 0,
    honeypot: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleToggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());
    if (newMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  const updateField = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.projectName.trim())
      newErrors.projectName = "Project name is required";
    if (!formData.feedback.trim()) newErrors.feedback = "Feedback is required";
    if (formData.feedback.length > 1000)
      newErrors.feedback = "Feedback must be under 1000 characters";
    if (formData.rating === 0) newErrors.rating = "Please select a rating";
    if (formData.mobile.trim() && !/^\+?[\d\s-()]+$/.test(formData.mobile))
      newErrors.mobile = "Invalid mobile number";
    if (
      formData.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    )
      newErrors.email = "Invalid email";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const renderStars = () =>
    Array.from({ length: 5 }, (_, i) => {
      const starValue = i + 1;
      const isActive = starValue <= (hoverRating || formData.rating);

      return (
        <button
          key={i}
          type="button"
          onClick={() => updateField("rating", starValue)}
          onMouseEnter={() => setHoverRating(starValue)}
          onMouseLeave={() => setHoverRating(0)}
          className="p-1 transition-transform hover:scale-110"
        >
          <Star
            className={`w-8 h-8 transition-colors ${
              isActive
                ? "fill-yellow-400 text-yellow-400"
                : "text-muted-foreground hover:text-yellow-400"
            }`}
          />
        </button>
      );
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return;

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const { honeypot, ...submitData } = formData;
      const result = await feedbackService.addFeedback(
        submitData as CreateFeedbackData
      );

      if (result.success) {
        toast({
          title: "Thank you!",
          description: "Your feedback has been submitted successfully.",
          duration: 4000,
        });
        setShowConfetti(true);
        setFormData({
          name: "",
          mobile: "",
          email: "",
          projectName: "",
          feedback: "",
          rating: 0,
          honeypot: "",
        });
      } else {
        toast({
          title: "Submission Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "dark bg-[#0b0b0b]" : "bg-[#f8f9fb]"
      }`}
    >
      <main className="flex flex-col items-center justify-center pt-10 px-4  pb-20">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-3">
          Share Your Feedback
        </h1>
        <p className="text-muted-foreground mb-8 text-center max-w-2xl">
          Help us improve by submitting your valuable feedback about your
          experience with AssignmentBuddy.
        </p>

        {/* Glass Form Card */}
        <form
          onSubmit={handleSubmit}
          className={`w-full max-w-2xl rounded-3xl border ${
            isDarkMode
              ? "border-white/10 bg-white/10"
              : "border-gray-200 bg-white/70"
          } backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-8 space-y-6 transition-all`}
        >
          <input
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={(e) => updateField("honeypot", e.target.value)}
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Name + Project */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Customer Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Enter your full name"
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name *</Label>
              <Input
                id="projectName"
                value={formData.projectName}
                onChange={(e) => updateField("projectName", e.target.value)}
                placeholder="e.g., MBA Dissertation, Web App Development"
                className={errors.projectName ? "border-destructive" : ""}
              />
              {errors.projectName && (
                <p className="text-sm text-destructive">{errors.projectName}</p>
              )}
            </div>
          </div>

          {/* Contact */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input
                id="mobile"
                value={formData.mobile}
                onChange={(e) => updateField("mobile", e.target.value)}
                placeholder="+94 77 123 4567"
                className={errors.mobile ? "border-destructive" : ""}
              />
              {errors.mobile && (
                <p className="text-sm text-destructive">{errors.mobile}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="your.email@example.com"
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Info Note */}
          <p className="text-xs text-muted-foreground">
            We won’t publish your contact details. These are only collected if
            we need to reach out to you later.
          </p>

          {/* Rating */}
          <div className="space-y-2">
            <Label htmlFor="rating">Rating *</Label>
            <div className="flex items-center space-x-1">{renderStars()}</div>
            {errors.rating && (
              <p className="text-sm text-destructive">{errors.rating}</p>
            )}
          </div>

          {/* Feedback */}
          <div className="space-y-2">
            <Label htmlFor="feedback">Your Feedback *</Label>
            <Textarea
              id="feedback"
              value={formData.feedback}
              onChange={(e) => updateField("feedback", e.target.value)}
              placeholder="Share your experience with our services..."
              className={`min-h-[120px] resize-none ${
                errors.feedback ? "border-destructive" : ""
              }`}
              maxLength={1000}
            />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {formData.feedback.length}/1000
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <Link href="/">
              <Button
                type="button"
                className="border border-input bg-background text-foreground hover:bg-muted"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </Link>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow hover:scale-[1.02] transition-transform"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                  Submitting...
                </>
              ) : (
                "Submit Feedback"
              )}
            </Button>
          </div>
        </form>

        <Confetti
          trigger={showConfetti}
          onComplete={() => setShowConfetti(false)}
          intensity={60}
          duration={4000}
        />
      </main>
    </div>
  );
}
