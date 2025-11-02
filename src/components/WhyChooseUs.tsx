import React from "react";
import {
  GraduationCap,
  Clock,
  Shield,
  HeadphonesIcon,
  Award,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Expert Writers",
    description:
      "PhD-qualified professionals with extensive experience in academic writing across all disciplines.",
    stat: "50+",
    statLabel: "BSc/MSc Experts",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description:
      "We guarantee timely delivery of your projects, even with the tightest deadlines.",
    stat: "99%",
    statLabel: "On Time",
  },
  {
    icon: Shield,
    title: "Plagiarism-Free",
    description:
      "100% original content verified through advanced plagiarism detection software.",
    stat: "100%",
    statLabel: "Original",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description:
      "Round-the-clock customer support to address your queries and concerns anytime.",
    stat: "24/7",
    statLabel: "Available",
  },
  {
    icon: Award,
    title: "Quality Guaranteed",
    description:
      "Rigorous quality checks and unlimited revisions to ensure your complete satisfaction.",
    stat: "4.9/5",
    statLabel: "Rating",
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-tr from-secondary/10 via-transparent to-primary/10 pointer-events-none" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Why Choose Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            What makes us the preferred choice for academic excellence
          </p>
        </div>

        {/* Bento grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`group relative animate-fade-in ${
                index === 0 ? "lg:col-span-2" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="h-full p-8 rounded-2xl bg-gradient-card border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-card">
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 rounded-xl bg-gradient-primary shadow-soft group-hover:scale-110 transition-transform duration-500">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                      {feature.stat}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {feature.statLabel}
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
