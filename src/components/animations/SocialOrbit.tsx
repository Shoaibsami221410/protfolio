"use client";

import { motion } from "framer-motion";
import { socials } from "@/lib/data/socials";

export function SocialOrbit() {
  return (
    <div className="relative w-full max-w-[400px] aspect-square mx-auto flex items-center justify-center">
      {/* Central Glowing Object */}
      <div className="relative z-10 w-20 h-20 rounded-full bg-card border border-white/10 flex items-center justify-center shadow-[0_0_50px_rgba(168,85,247,0.3)]">
        <span className="text-xl font-mono text-foreground tracking-tighter">SS</span>
      </div>

      {/* Orbit Rings */}
      <div className="absolute inset-4 rounded-full border border-white/5" />
      <div className="absolute inset-12 rounded-full border border-white/5 border-dashed opacity-50" />

      {/* Orbiting Icons */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        {socials.map((social, index) => {
          const angle = (index * 360) / socials.length;
          // Calculate position on the circle (using 50% radius)
          const radius = 50; // percentage
          const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
          const y = 50 + radius * Math.sin((angle * Math.PI) / 180);

          return (
            <div
              key={social.name}
              className="absolute w-10 h-10 -ml-5 -mt-5"
              style={{
                left: `${x}%`,
                top: `${y}%`,
              }}
            >
              {/* Counter-rotate the icon so it stays upright */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="w-full h-full"
              >
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-full flex items-center justify-center rounded-full bg-card border border-white/10 text-muted hover:text-primary hover:border-primary/50 transition-colors shadow-lg"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              </motion.div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
