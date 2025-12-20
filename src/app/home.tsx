"use client";

import React, { useState, useEffect, Suspense } from "react";
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
import LogoLoopContainer from "@/components/LogoLoopContainer";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const defaultFeedbacks: Feedback[] = [
    {
      id: "1",
      name: "Hashan Perera",
      mobile: "+94 77 123 4567",
      email: "hashan.perera@example.com",
      projectName: "Project Alpha",
      feedback:
        "The UI is very intuitive and the team was highly responsive throughout the project. Great experience overall.",
      rating: 4.8,
      createdAt: new Date("2025-02-14"),
    },
    {
      id: "2",
      name: "Nimasha Fernando",
      mobile: "+94 71 987 6543",
      email: "nimasha.fernando@example.com",
      projectName: "E-Commerce Suite",
      feedback:
        "Excellent customer service and smooth workflow. The team understood our requirements very well.",
      rating: 5,
      createdAt: new Date("2025-03-02"),
    },
    {
      id: "3",
      name: "Kavindu Jayasinghe",
      mobile: "+94 76 555 1212",
      email: "kavindu.jayasinghe@example.com",
      projectName: "Mobile App Redesign",
      feedback:
        "A professional team with strong technical skills. Highly recommended for complex projects.",
      rating: 4.7,
      createdAt: new Date("2025-01-21"),
    },
    {
      id: "4",
      name: "Sanduni Wickramasinghe",
      mobile: "+94 72 444 0000",
      email: "sanduni.wickramasinghe@example.com",
      projectName: "Automation Tools",
      feedback:
        "Very dedicated and supportive team. They delivered more than what we initially expected.",
      rating: 4.9,
      createdAt: new Date("2025-04-08"),
    },
    {
      id: "5",
      name: "Tharindu Gunasekara",
      mobile: "+94 75 222 3333",
      email: "tharindu.gunasekara@example.com",
      projectName: "Workflow Optimization",
      feedback:
        "The workflow improvements saved us a lot of time and effort. Very satisfied with the outcome.",
      rating: 4.6,
      createdAt: new Date("2025-05-19"),
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
  const params = useSearchParams();
  const scrollTo = params.get("scrollTo");
  const { toast } = useToast();

  //! Scroll to section if scrollTo param exists
  useEffect(() => {
    if (scrollTo) {
      const el = document.getElementById(scrollTo);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 300); // small delay to allow page rendering
      }
    }
  }, [scrollTo]);

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
        <LogoLoopContainer />
        <WhyChooseUs />
        <HowItWorks />
        <FeedbackLoop feedbacks={defaultFeedbacks} />
      </main>

      <Footer />

      {/* WhatsApp Floating Button */}
      <WhatsAppButton phoneNumber="94775538374" isDarkMode={isDarkMode} />

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
