"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data/profile";

export function About() {
  return (
    <section id="about" className="py-32 px-6 relative">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-xs font-mono text-primary tracking-widest mb-6">
            ABOUT ME
          </div>
          <h2 className="text-2xl md:text-4xl font-medium tracking-tight mb-8">
            {profile.about.heading}
          </h2>
          <div className="prose prose-invert prose-p:text-muted prose-p:font-light prose-p:leading-relaxed prose-p:text-sm md:prose-p:text-base">
            <p>{profile.about.text}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
