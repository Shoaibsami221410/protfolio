"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/data/projects";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function ProjectShowcase() {
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24 text-center md:text-left"
        >
          <div className="text-xs font-mono text-primary tracking-widest mb-4">
            SELECTED WORK
          </div>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight">
            Featured Projects
          </h2>
        </motion.div>

        <div className="space-y-32">
          {featuredProjects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`group flex flex-col ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                } gap-10 md:gap-4 items-center relative`}
              >
                {/* Content (Text block overlapping slightly) */}
                <div className={`w-full md:w-7/12 z-20 ${isEven ? 'md:-mr-12' : 'md:-ml-12'}`}>
                  <div className="bg-[#0f071d]/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative overflow-hidden">
                    {/* Subtle inner gradient for the text card */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50 pointer-events-none" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-xs font-mono text-muted bg-white/5 px-3 py-1.5 rounded-full">
                          PROJECT / 0{index + 1}
                        </span>
                        <span className="text-xs font-mono text-primary font-bold uppercase tracking-widest">
                          {project.category}
                        </span>
                      </div>
                      
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        {project.title}
                      </h3>
                      
                      <p className="text-muted/90 font-light leading-relaxed mb-8 text-base md:text-lg">
                        {project.description}
                      </p>

                      {project.features && (
                        <ul className="space-y-3 mb-8">
                          {project.features.slice(0, 3).map((feature, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-muted/90">
                              <span className="text-primary mt-1">✦</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-mono text-primary/80 bg-primary/10 px-3 py-1 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <div className="pt-8">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="group/btn inline-flex items-center gap-2 text-sm font-bold text-white hover:text-primary transition-colors uppercase tracking-widest"
                        >
                          View Project
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visual Preview */}
                <div className="w-full md:w-6/12 relative mt-8 md:mt-0">
                  {/* 1. The Glowing Aura Backdrop */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br from-primary/40 to-purple-900/40 blur-2xl rounded-3xl -z-20 transition-all duration-700 opacity-50 group-hover:opacity-80 group-hover:blur-3xl ${
                      isEven ? 'translate-x-4 -translate-y-4 md:translate-x-8 md:-translate-y-8' : '-translate-x-4 -translate-y-4 md:-translate-x-8 md:-translate-y-8'
                    }`}
                  />
                  
                  {/* 2. The Solid Offset Box Backdrop (Matches user's request perfectly) */}
                  <div 
                    className={`absolute inset-0 bg-[#1A0B2E] rounded-2xl border border-primary/20 -z-10 transition-all duration-700 ${
                      isEven ? 'translate-x-3 -translate-y-3 md:translate-x-6 md:-translate-y-6 group-hover:translate-x-8 group-hover:-translate-y-8' : '-translate-x-3 -translate-y-3 md:-translate-x-6 md:-translate-y-6 group-hover:-translate-x-8 group-hover:-translate-y-8'
                    }`}
                  />

                  <Link href={`/projects/${project.slug}`} className="block relative z-10">
                    <div className="relative rounded-2xl overflow-hidden bg-[#0a0510] border border-white/10 aspect-[4/3] flex items-center justify-center shadow-2xl group-hover:shadow-[0_0_40px_rgba(168,85,247,0.3)] transition-all duration-700 group-hover:-translate-y-1">
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent z-10 pointer-events-none" />
                      
                      {project.iframeUrl ? (
                        <iframe 
                          src={project.iframeUrl} 
                          className="w-full h-full border-0 pointer-events-none scale-[1.02] group-hover:scale-105 transition-transform duration-700 object-cover" 
                          tabIndex={-1} 
                          scrolling="no" 
                        />
                      ) : project.image ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#2A1544] to-[#0F071D] flex flex-col items-center justify-center p-8 text-center transition-transform duration-700 group-hover:scale-105">
                          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                            <span className="text-3xl font-mono text-primary font-light">Σ</span>
                          </div>
                          <span className="text-xl md:text-2xl font-bold text-white tracking-wide opacity-90">{project.title}</span>
                          <span className="text-xs text-primary/70 font-mono mt-2 uppercase tracking-widest">{project.category}</span>
                        </div>
                      )}
                    </div>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-32 flex justify-center">
          <Link
            href="/projects"
            className="px-6 py-3 rounded-full border border-white/10 text-sm font-medium hover:bg-white/5 hover:border-white/20 transition-all"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
