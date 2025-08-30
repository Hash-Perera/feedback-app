"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Star, Loader2 } from "lucide-react";
import { CreateFeedbackData, Feedback } from "@/interfaces/feedback";

interface AddFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: CreateFeedbackData
  ) => Promise<{ success: boolean; message: string }>;
}

interface FormData {
  name: string;
  mobile: string;
  email: string;
  projectName: string;
  feedback: string;
  rating: number;
  honeypot: string; // Anti-spam field
}

interface FormErrors {
  name?: string;
  mobile?: string;
  email?: string;
  projectName?: string;
  feedback?: string;
  rating?: string;
}

const AddFeedbackModal: React.FC<AddFeedbackModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    mobile: "",
    email: "",
    projectName: "",
    feedback: "",
    rating: 0,
    honeypot: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\+?[\d\s-()]+$/.test(formData.mobile)) {
      newErrors.mobile = "Please enter a valid mobile number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.projectName.trim()) {
      newErrors.projectName = "Project name is required";
    }

    if (!formData.feedback.trim()) {
      newErrors.feedback = "Feedback is required";
    } else if (formData.feedback.length > 1000) {
      newErrors.feedback = "Feedback must be less than 1000 characters";
    }

    if (formData.rating === 0) {
      newErrors.rating = "Please select a rating";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Anti-spam check
    if (formData.honeypot) {
      return; // Bot detected
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { honeypot, ...submitData } = formData;
      console.log("Submitting feedback:", submitData);
      const result = await onSubmit(submitData);

      if (result.success) {
        // Reset form
        setFormData({
          name: "",
          mobile: "",
          email: "",
          projectName: "",
          feedback: "",
          rating: 0,
          honeypot: "",
        });
        setErrors({});
        onClose();
      } else {
        // Handle error (could show toast here)
        console.error("Submission failed:", result.message);
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => {
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
          aria-label={`Rate ${starValue} stars`}
        >
          <Star
            className={`w-8 h-8 transition-colors ${
              isActive
                ? "fill-warning text-warning"
                : "text-muted-foreground hover:text-warning"
            }`}
          />
        </button>
      );
    });
  };

  const isFormValid =
    formData.name.trim() &&
    formData.mobile.trim() &&
    formData.email.trim() &&
    formData.projectName.trim() &&
    formData.feedback.trim() &&
    formData.rating > 0 &&
    Object.keys(errors).length === 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Share Your Feedback
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Anti-spam honeypot field */}
          <input
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={(e) => updateField("honeypot", e.target.value)}
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Customer Name *</Label>
              <Input
                id="name"
                type="text"
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
              <Label htmlFor="mobile">Mobile Number *</Label>
              <Input
                id="mobile"
                type="tel"
                value={formData.mobile}
                onChange={(e) => updateField("mobile", e.target.value)}
                placeholder="+94 77 123 4567"
                className={errors.mobile ? "border-destructive" : ""}
              />
              {errors.mobile && (
                <p className="text-sm text-destructive">{errors.mobile}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="your.email@example.com"
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectName">Project Name *</Label>
            <Input
              id="projectName"
              type="text"
              value={formData.projectName}
              onChange={(e) => updateField("projectName", e.target.value)}
              placeholder="e.g., MBA Dissertation, Market Research Analysis"
              className={errors.projectName ? "border-destructive" : ""}
            />
            {errors.projectName && (
              <p className="text-sm text-destructive">{errors.projectName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="rating">Rating *</Label>
            <div className="flex items-center space-x-1">
              {renderStars()}
              {formData.rating > 0 && (
                <span className="ml-3 text-sm text-muted-foreground">
                  {formData.rating}/5 stars
                </span>
              )}
            </div>
            {errors.rating && (
              <p className="text-sm text-destructive">{errors.rating}</p>
            )}
          </div>

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
              {errors.feedback ? (
                <p className="text-sm text-destructive">{errors.feedback}</p>
              ) : (
                <span></span>
              )}
              <span className="text-sm text-muted-foreground">
                {formData.feedback.length}/1000
              </span>
            </div>
          </div>

          {/* <div className="flex items-center space-x-2">
            <Checkbox
              id="showNamePublic"
              checked={formData.showNamePublic}
              onCheckedChange={(checked: any) =>
                updateField("showNamePublic", !!checked)
              }
            />
            <Label htmlFor="showNamePublic" className="text-sm">
              Show my name publicly (uncheck to appear as "Anonymous")
            </Label>
          </div> */}

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              className="border border-input bg-background text-foreground hover:bg-muted"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="bg-gradient-primary text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Feedback"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFeedbackModal;
