"use client";

import React from "react";
import { Star, Award, Users, Clock } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-hero py-16 px-4">
      <div className="container mx-auto text-center max-w-4xl">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Trusted Academic Excellence
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Empowering your studies with expert academic writing, research help,
            Web & Mobile app development, and IT, Business & Engineering
            assignments.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="flex flex-col items-center p-4 rounded-xl bg-gradient-card shadow-soft">
              <Star className="w-8 h-8 text-primary mb-2" />
              <span className="text-2xl font-bold text-primary">4.9+</span>
              <span className="text-sm text-muted-foreground">
                Average Rating
              </span>
            </div>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="flex flex-col items-center p-4 rounded-xl bg-gradient-card shadow-soft">
              <Users className="w-8 h-8 text-secondary mb-2" />
              <span className="text-2xl font-bold text-secondary">100+</span>
              <span className="text-sm text-muted-foreground">
                Happy Clients
              </span>
            </div>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="flex flex-col items-center p-4 rounded-xl bg-gradient-card shadow-soft">
              <Award className="w-8 h-8 text-accent mb-2" />
              <span className="text-2xl font-bold text-accent">98%</span>
              <span className="text-sm text-muted-foreground">
                Success Rate
              </span>
            </div>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="flex flex-col items-center p-4 rounded-xl bg-gradient-card shadow-soft">
              <Clock className="w-8 h-8 text-success mb-2" />
              <span className="text-2xl font-bold text-success">24/7</span>
              <span className="text-sm text-muted-foreground">Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
