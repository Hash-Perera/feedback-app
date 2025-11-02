import React from "react";
import {
  FileText,
  Search,
  Users,
  Edit,
  BarChart,
  CheckCircle,
} from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "Academic Writing",
    description:
      "Professional essays, research papers, dissertations, and thesis writing with proper citations and formatting.",
    gradient: "from-primary to-primary-glow",
  },
  {
    icon: Search,
    title: "Research Assistance",
    description:
      "Comprehensive literature reviews, data collection, and in-depth research support for your projects.",
    gradient: "from-secondary to-purple-400",
  },
  {
    icon: Users,
    title: "Consulting Services",
    description:
      "Expert guidance on project planning, methodology design, and academic career development.",
    gradient: "from-accent to-orange-400",
  },
  {
    icon: Edit,
    title: "Editing & Proofreading",
    description:
      "Thorough editing and proofreading to ensure clarity, coherence, and error-free submissions.",
    gradient: "from-success to-emerald-400",
  },
  {
    icon: BarChart,
    title: "Data Analysis",
    description:
      "Statistical analysis using SPSS, R, Python, and advanced data visualization for your research.",
    gradient: "from-warning to-yellow-400",
  },
  {
    icon: CheckCircle,
    title: "Quality Assurance",
    description:
      "Plagiarism checks, formatting verification, and comprehensive quality reviews before delivery.",
    gradient: "from-primary to-secondary",
  },
];

const Services: React.FC = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive academic solutions tailored to your success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient border effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl`}
              />

              <div className="relative h-full p-8 rounded-2xl bg-card border border-border/50 hover:border-transparent transition-all duration-500 hover:shadow-floating">
                {/* Icon with gradient background */}
                <div
                  className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.gradient} mb-6 group-hover:scale-110 transition-transform duration-500`}
                >
                  <service.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
