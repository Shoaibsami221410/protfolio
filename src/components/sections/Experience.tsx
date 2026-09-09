"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experiences } from "@/lib/data/experience";
import { Briefcase, Medal, MonitorPlay, Presentation } from "lucide-react";

const getIcon = (index: number) => {
  const icons = [Medal, MonitorPlay, Presentation, Briefcase];
  return icons[index % icons.length];
};

export function Experience() {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggleExpand = (index: number) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section id="experience" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white">
            Work Experience
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experiences.map((exp, index) => {
            const Icon = getIcon(index);
            const isExpanded = expanded[index];

            return (
              <motion.div
                layout
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center overflow-hidden border border-[#2e1a47] bg-gradient-to-br from-[#1E1033] to-[#0A0512] hover:border-[#6B32A8] transition-all duration-500"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* 3D-ish Icon Container */}
                <motion.div layout className="relative w-20 h-20 shrink-0 rounded-2xl bg-gradient-to-br from-[#2A1544] to-[#0F071D] border border-white/5 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.15)] group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-shadow duration-500">
                  <Icon className="w-8 h-8 text-primary drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                  <div className="absolute top-2 right-2 w-1 h-1 bg-white/40 rounded-full" />
                  <div className="absolute bottom-3 left-2 w-1.5 h-1.5 bg-primary/40 rounded-full" />
                </motion.div>

                {/* Content */}
                <motion.div layout className="flex-1 z-10 flex flex-col items-start w-full">
                  <motion.h3 layout className="text-xl font-bold text-white mb-1">{exp.company}</motion.h3>
                  <motion.p layout className="text-primary/80 text-xs font-mono mb-3">{exp.role} • {exp.period}</motion.p>
                  
                  <motion.p layout className={`text-sm text-muted/90 leading-relaxed mb-4 ${isExpanded ? "" : "line-clamp-2"}`}>
                    {exp.description}
                  </motion.p>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-4 w-full"
                      >
                        <div className="flex flex-wrap gap-2 pt-2">
                          {exp.technologies.map((tech) => (
                            <span key={tech} className="px-2 py-1 rounded bg-white/5 text-xs font-mono text-muted/80 border border-white/10">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <motion.button 
                    layout
                    onClick={() => toggleExpand(index)}
                    className="mt-2 px-5 py-2 rounded-lg border border-primary/40 bg-primary/5 text-xs font-semibold tracking-wider text-primary hover:bg-primary/20 transition-colors uppercase cursor-pointer z-20 relative"
                  >
                    {isExpanded ? "Show Less" : (index % 2 === 0 ? "Learn More" : "Experience")}
                  </motion.button>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
