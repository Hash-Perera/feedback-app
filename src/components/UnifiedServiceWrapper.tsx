"use client";

import React from "react";
import Services from "./Services";
import WhyChooseUs from "./WhyChooseUs";
import LogoLoop from "./LogoLoop";
import LogoLoopContainer from "./LogoLoopContainer";

const UnifiedServicesWrapper = () => {
  return (
    <section
      id="services"
      className="relative overflow-hidden py-20 px-6 bg-gradient-to-br from-background via-muted/20 to-background"
    >
      {/* Shared Background Decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[45rem] h-[45rem] bg-primary/10 rounded-full blur-3xl opacity-40 animate-pulse" />
      <div className="absolute bottom-0 right-1/3 w-[35rem] h-[35rem] bg-secondary/10 rounded-full blur-3xl opacity-40 animate-pulse delay-700" />
      <div className="absolute inset-0 bg-gradient-to-tr from-secondary/10 via-transparent to-primary/10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <Services />
        <LogoLoopContainer />
        <WhyChooseUs />
      </div>
    </section>
  );
};

export default UnifiedServicesWrapper;
