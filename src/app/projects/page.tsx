"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, projectCategories } from "@/lib/data/projects";
import Link from "next/link";
import Image from "next/image";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = projects.filter((project) =>
    activeCategory === "All" ? true : project.category === activeCategory
  );

  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-8">
            Work
          </h1>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {projectCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-white text-black"
                    : "bg-white/5 text-muted hover:bg-white/10 hover:text-foreground border border-white/5"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <Link href={`/projects/${project.slug}`} className="group block">
                  <div className="relative rounded-2xl overflow-hidden bg-card border border-white/5 aspect-video mb-6 bg-[#0a0510]">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10 pointer-events-none" />
                    
                    {project.iframeUrl ? (
                      <iframe 
                        src={project.iframeUrl} 
                        className="w-full h-full border-0 pointer-events-none scale-100 group-hover:scale-105 transition-transform duration-700 object-cover" 
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
                      <div className="absolute inset-0 bg-gradient-to-br from-[#2A1544] to-[#0F071D] flex flex-col items-center justify-center p-6 text-center transition-transform duration-700 group-hover:scale-105">
                         <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                           <span className="text-xl font-mono text-primary font-light">Σ</span>
                         </div>
                         <span className="text-lg font-bold text-white tracking-wide opacity-90">{project.title}</span>
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -z-10" />
                  </div>
                  
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-primary">
                      {project.category}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="text-xs font-mono text-muted">
                      {project.year}
                    </span>
                  </div>
                  <h2 className="text-2xl font-medium mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-muted font-light text-sm line-clamp-2 mb-4">
                    {project.shortDescription}
                  </p>

                  {project.features && (
                    <ul className="space-y-1.5 mt-auto">
                      {project.features.slice(0, 2).map((feature, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-muted/80">
                           <span className="text-primary mt-0.5 opacity-70">✦</span>
                           <span className="line-clamp-1">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="py-32 text-center text-muted">
            No projects found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
