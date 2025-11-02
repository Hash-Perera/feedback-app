"use client";

import React from "react";
import { MessageCircle, Mail, Heart, MessageSquarePlus } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

interface FooterProps {
  onAddProjectClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAddProjectClick }) => {
  const currentYear = new Date().getFullYear();

  // const onAddProjectClick = () => {
  //   // window.location.href = "/projects";
  // };

  return (
    <footer className="bg-gradient-card border-t py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
              AssignmentBuddy
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Empowering your studies with expert academic writing, research
              help, Web & Mobile app development, and IT, Business & Engineering
              assignments.
            </p>
            <Button
              onClick={onAddProjectClick}
              className="bg-gradient-primary text-white font-medium shadow-soft hover:shadow-card transition-all duration-300 hover:scale-105 text-xs cursor-pointer"
              size="sm"
            >
              + Project
            </Button>
            {/* <Link href="/projects/add">Projects</Link> */}
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Our Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Academic Writing</li>
              <li>• Research Assistance</li>
              <li>• Data Analysis</li>
              <li>• Business Consulting</li>
              <li>• Editing & Proofreading</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">Get in Touch</h4>
            <div className="space-y-3">
              <a
                href="https://wa.me/94763148962"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>WhatsApp: +94 76 314 8962</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {currentYear} AssignmentBuddy. All rights reserved.
          </p>

          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>for academic excellence</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
