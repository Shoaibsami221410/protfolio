"use client";

import { motion } from "framer-motion";
import { SocialOrbit } from "@/components/animations/SocialOrbit";

export function Connect() {
  return (
    <section className="py-32 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="text-xs font-mono text-primary tracking-widest mb-4">
            CONNECT
          </div>
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight">
            Find me on the internet.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <SocialOrbit />
        </motion.div>
      </div>
    </section>
  );
}
