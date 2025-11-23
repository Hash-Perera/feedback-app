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
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const defaultFeedbacks: Feedback[] = [
    {
      id: "1",
      name: "Lauren Contreras",
      mobile: "555-123-4567",
      email: "lauren.contreras@example.com",
      projectName: "Project Alpha",
      feedback:
        "The UI is intuitive and the team was very responsive. A fantastic experience.",
      rating: 4.8,
      createdAt: new Date("2017-08-27"),
    },
    {
      id: "2",
      name: "Edward Alexander",
      mobile: "555-987-6543",
      email: "edward.alexander@example.com",
      projectName: "E-Commerce Suite",
      feedback:
        "They have awesome customer service. I wouldn't recommend going to anyone else. Definitely love the way the workflow works.",
      rating: 5,
      createdAt: new Date("2017-08-27"),
    },
    {
      id: "3",
      name: "Diana Johnston",
      mobile: "555-555-1212",
      email: "diana.johnston@example.com",
      projectName: "Mobile App Redesign",
      feedback:
        "Great experience overall. Highly recommended for complex projects.",
      rating: 4.7,
      createdAt: new Date("2017-08-27"),
    },
    {
      id: "4",
      name: "Michael Chen",
      mobile: "555-444-0000",
      email: "michael.chen@example.com",
      projectName: "Automation Tools",
      feedback:
        "Professional and dedicated team. They delivered beyond expectations.",
      rating: 4.9,
      createdAt: new Date("2017-08-27"),
    },
    {
      id: "5",
      name: "Sarah Smith",
      mobile: "555-222-3333",
      email: "sarah.smith@example.com",
      projectName: "Workflow Optimization",
      feedback: "Absolutely loved the workflow. It saved us so much time.",
      rating: 4.6,
      createdAt: new Date("2017-08-27"),
    },
  ];

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
    const fetchFeedbacks = async () => {
      const loadedFeedbacks = await feedbackService.getFeedbacks();
      setFeedbacks(loadedFeedbacks);
    };
    fetchFeedbacks();

    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedDarkMode);
    if (savedDarkMode) document.documentElement.classList.add("dark");
  }, []);

  //! Add Feedback
  const handleAddFeedback = async (data: CreateFeedbackData) => {
    const result = await feedbackService.addFeedback(data);

    if (result.success) {
      setFeedbacks(await feedbackService.getFeedbacks());
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
    <div className="min-h-screen bg-background relative">
      <Header isDarkMode={isDarkMode} onToggleDarkMode={handleToggleDarkMode} />

      <main>
        <Hero />
        <Services />
        <WhyChooseUs />
        <HowItWorks />
        <FeedbackLoop feedbacks={defaultFeedbacks} />
      </main>

      <Footer />

      {/* WhatsApp Floating Button */}
      <WhatsAppButton phoneNumber="94763148962" isDarkMode={isDarkMode} />

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

      <Confetti
        trigger={showConfetti}
        onComplete={() => setShowConfetti(false)}
        intensity={60}
        duration={4000}
      />
    </div>
  );
}
