"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data/profile";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 max-w-5xl mx-auto min-h-screen flex flex-col justify-center">
      {/* Top Section: Avatar & Quote */}
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-12 md:gap-20 mb-32">
        {/* Avatar with Glow & Arrow */}
        <div className="relative">
          {/* Intense Purple Glow */}
          <div className="absolute inset-0 bg-primary/40 blur-[80px] rounded-full w-48 h-48 scale-150" />
          
          <div className="relative w-40 h-40 md:w-48 md:h-48 z-10 rounded-2xl overflow-hidden border-2 border-white/5 bg-[#120820] shadow-2xl">
            {profile.image ? (
              <Image 
                src={profile.image} 
                alt={profile.name} 
                fill 
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl font-mono">SS</div>
            )}
          </div>

          {/* Sleek Terminal Prompt Name Tag */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-2 rounded-xl bg-[#0a0510] border border-white/10 shadow-[0_10px_30px_rgba(168,85,247,0.3)] font-mono text-xs md:text-sm z-30 flex items-center gap-2"
          >
            <span className="text-primary font-bold">{`~/`}</span>
            <span className="text-white font-bold tracking-tight">{profile.name}</span>
            <span className="w-1.5 h-3.5 bg-primary animate-pulse" />
          </motion.div>
        </div>

        {/* Quote Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left mt-8 md:mt-0 z-10"
        >
          <p className="text-sm md:text-base font-medium text-muted mb-2 tracking-wide">
            An Engineer who
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white mb-4">
            Teaches machines<br />
            how to <span className="relative inline-block">
              think
              {/* Hand-drawn style ellipse around "think" */}
              <svg className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] text-primary pointer-events-none" viewBox="0 0 100 50" preserveAspectRatio="none">
                <path d="M50,5 C80,5 95,20 95,25 C95,30 80,45 50,45 C20,45 5,30 5,25 C5,20 20,5 50,5 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" className="opacity-80" />
              </svg>
            </span>...
          </h1>
          <p className="text-xs md:text-sm text-muted/80 font-mono italic mt-2">
            Because writing static, predictable algorithms is incredibly boring.
          </p>
        </motion.div>
      </div>

      {/* Bottom Section: Introduction */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="max-w-3xl z-10"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4 flex items-center text-white">
          I&apos;m a Software Engineer.<span className="animate-pulse font-light text-primary">|</span>
        </h2>
        
        <p className="text-sm md:text-base font-medium mb-8 flex flex-wrap items-center gap-2 text-muted">
          Currently, I&apos;m a Computer Science Student at 
          <span className="inline-flex items-center gap-1 text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            East West University
          </span>.
        </p>
        
        <div className="space-y-4 text-base md:text-lg leading-relaxed text-muted/90 font-light max-w-2xl">
          <p>{profile.about.text}</p>
        </div>
      </motion.div>
    </section>
  );
}
