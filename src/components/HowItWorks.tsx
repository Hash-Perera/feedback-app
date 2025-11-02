// import React from "react";
// import { Send, UserCheck, RefreshCw, Download } from "lucide-react";

// const steps = [
//   {
//     icon: Send,
//     title: "Submit Requirements",
//     description:
//       "Share your project details, deadlines, and specific requirements through our simple submission form.",
//     step: "01",
//   },
//   {
//     icon: UserCheck,
//     title: "Get Matched with Expert",
//     description:
//       "We assign the most qualified expert in your field to ensure top-quality work.",
//     step: "02",
//   },
//   {
//     icon: RefreshCw,
//     title: "Review & Revisions",
//     description:
//       "Receive your work for review. We offer unlimited revisions until you are completely satisfied.",
//     step: "03",
//   },
//   {
//     icon: Download,
//     title: "Final Delivery",
//     description:
//       "Get your polished, plagiarism-free work delivered on time, ready for submission.",
//     step: "04",
//   },
// ];

// const HowItWorks: React.FC = () => {
//   return (
//     <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
//       <div className="container mx-auto max-w-5xl">
//         <div className="text-center mb-16 animate-fade-in">
//           <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
//             How It Works
//           </h2>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             Four simple steps to academic excellence
//           </p>
//         </div>

//         {/* Desktop Timeline */}
//         <div className="hidden lg:block relative">
//           {/* Central line */}
//           <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent transform -translate-x-1/2" />

//           {steps.map((step, index) => (
//             <div
//               key={step.title}
//               className={`relative mb-16 last:mb-0 animate-fade-in ${
//                 index % 2 === 0
//                   ? "text-right pr-[calc(50%+4rem)]"
//                   : "text-left pl-[calc(50%+4rem)]"
//               }`}
//               style={{ animationDelay: `${index * 0.2}s` }}
//             >
//               {/* Content card */}
//               <div className="inline-block max-w-md">
//                 <div className="bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-floating transition-all duration-500 hover:scale-105">
//                   <div className="flex items-start gap-4">
//                     <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-xl">
//                       {step.step}
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="text-xl font-bold mb-2">{step.title}</h3>
//                       <p className="text-sm text-muted-foreground">
//                         {step.description}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Timeline dot */}
//               <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-primary border-4 border-background shadow-card z-10" />
//             </div>
//           ))}
//         </div>

//         {/* Mobile Vertical Timeline */}
//         <div className="lg:hidden space-y-8">
//           {steps.map((step, index) => (
//             <div
//               key={step.title}
//               className="relative pl-16 animate-fade-in"
//               style={{ animationDelay: `${index * 0.15}s` }}
//             >
//               {/* Vertical line */}
//               {index < steps.length - 1 && (
//                 <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary transform -translate-x-1/2" />
//               )}

//               {/* Step number circle */}
//               <div className="absolute left-0 top-0 w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-xl shadow-card">
//                 {step.step}
//               </div>

//               {/* Content */}
//               <div className="bg-card border border-border rounded-xl p-6 shadow-soft">
//                 <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
//                   <step.icon className="w-5 h-5 text-primary" />
//                   {step.title}
//                 </h3>
//                 <p className="text-sm text-muted-foreground">
//                   {step.description}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HowItWorks;

"use client";
import React from "react";
import { Send, UserCheck, RefreshCw, Download } from "lucide-react";

const steps = [
  {
    icon: Send,
    title: "Submit Requirements",
    description:
      "Share your project details, deadlines, and specific requirements through our simple submission form.",
    step: "01",
    color: "from-primary to-blue-500",
  },
  {
    icon: UserCheck,
    title: "Get Matched with Expert",
    description:
      "We assign the most qualified expert in your field to ensure top-quality work.",
    step: "02",
    color: "from-purple-500 to-indigo-500",
  },
  {
    icon: RefreshCw,
    title: "Review & Revisions",
    description:
      "Receive your work for review. We offer unlimited revisions until you are completely satisfied.",
    step: "03",
    color: "from-amber-500 to-yellow-400",
  },
  {
    icon: Download,
    title: "Final Delivery",
    description:
      "Get your polished, plagiarism-free work delivered on time, ready for submission.",
    step: "04",
    color: "from-emerald-500 to-green-400",
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Follow these four simple steps to achieve academic excellence.
          </p>
        </div>

        {/* Circular Step Flow */}
        <div className="relative flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-16 lg:gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center text-center group"
            >
              <div
                className={`relative w-36 h-36 flex items-center justify-center rounded-full bg-gradient-to-br ${step.color} shadow-lg transition-transform duration-500 group-hover:scale-110`}
              >
                <div className="absolute inset-1 bg-card rounded-full flex flex-col items-center justify-center border border-border shadow-inner">
                  <step.icon className="w-8 h-8 text-primary mb-2" />
                  <span className="text-lg font-bold">{step.step}</span>
                </div>
              </div>

              {/* Title + Description */}
              <div className="mt-6 max-w-[220px]">
                <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
