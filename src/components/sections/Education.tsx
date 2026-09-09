"use client";

import { motion } from "framer-motion";
import { education } from "@/lib/data/education";

export function Education() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-xs font-mono text-primary tracking-widest mb-4">
            ACADEMICS
          </div>
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight">
            Education
          </h2>
        </motion.div>

        <div className="space-y-8">
          {education.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 border-l border-white/10"
            >
              <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-primary" />
              <h3 className="text-xl font-medium">{item.institution}</h3>
              <div className="flex items-center gap-3 mt-1 mb-3">
                <span className="text-primary font-light">{item.degree}</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span className="text-sm font-mono text-muted">{item.period}</span>
              </div>
              <p className="text-muted font-light text-sm md:text-base">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
