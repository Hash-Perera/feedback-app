// src/app/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeedbackLoop from "@/components/FeedbackLoop";
import FeedbackDetailsModal from "@/components/FeedbackDetailsModal";
import AddFeedbackModal from "@/components/AddFeedbackModal";
import Footer from "@/components/Footer";
import Confetti from "@/components/Confetti";
import { feedbackService } from "@/services/feedbackService";
import { CreateFeedbackData, Feedback } from "@/interfaces/feedback";
import AuthDialog from "@/components/LoginModel";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(
    null
  );
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { toast } = useToast();

  //! Get Feedbacks
  useEffect(() => {
    // Load feedbacks on mount (client-side only)
    const fetchFeedbacks = async () => {
      const loadedFeedbacks = await feedbackService.getFeedbacks();
      setFeedbacks(loadedFeedbacks);
    };
    fetchFeedbacks();

    // Restore dark mode
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedDarkMode);
    if (savedDarkMode) document.documentElement.classList.add("dark");
  }, []);

  //! Add Feedback
  const handleAddFeedback = async (data: CreateFeedbackData) => {
    const result = await feedbackService.addFeedback(data);

    if (result.success) {
      setFeedbacks(await feedbackService.getFeedbacks()); // refresh
      setShowConfetti(true);
      toast({
        title: "Thank you!",
        description:
          "Your feedback is now live and helping others trust our services.",
        duration: 5000,
      });
    } else {
      toast({
        title: "Submission Failed",
        description: result.message,
        variant: "destructive",
        duration: 5000,
      });
    }

    return result;
  };

  const handleAuthenticate = async (
    username: string,
    password: string
  ): Promise<void> => {
    setIsAuthDialogOpen(false);
    toast({
      title: "Successfully Authenticated",
      description: "You can now submit feedback.",
      duration: 5000,
    });
  };

  const handleToggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
    if (newDarkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  const handleCardClick = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        onAddFeedbackClick={() => setIsAddModalOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      <main>
        <Hero />
        <Services />
        <WhyChooseUs />
        <HowItWorks />
        <FeedbackLoop feedbacks={feedbacks} onCardClick={handleCardClick} />
      </main>

      <Footer onAddProjectClick={() => setIsAuthDialogOpen(true)} />

      {/* Modals */}
      <FeedbackDetailsModal
        feedback={selectedFeedback}
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedFeedback(null);
        }}
      />

      <AddFeedbackModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddFeedback}
      />

      <AuthDialog
        isOpen={isAuthDialogOpen}
        onClose={() => setIsAuthDialogOpen(false)}
        // onAuthenticate={handleAuthenticate}
      />

      {/* Confetti Effect */}
      <Confetti
        trigger={showConfetti}
        onComplete={() => setShowConfetti(false)}
        intensity={60}
        duration={4000}
      />
    </div>
  );
}
