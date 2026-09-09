"use client";

import { motion } from "framer-motion";

// Helper to get an icon character or short name for the nodes
const getSkillInitial = (skill: string) => {
  return skill.substring(0, 2).toUpperCase();
};

export function FiberSkills() {
  // Planetary Orbits Configuration
  // sizeClass determines the diameter of the orbit ring relative to the container
  const orbits = [
    { sizeClass: "w-[40%] h-[40%]", duration: 25, reverse: false, skills: ["Python", "Pandas", "NumPy", "HTML5", "CSS3"] },
    { sizeClass: "w-[70%] h-[70%]", duration: 35, reverse: true, skills: ["Frontend Design", "Canva", "Adobe Lightroom", "Microsoft Office", "Management Skills"] },
    { sizeClass: "w-[100%] h-[100%]", duration: 45, reverse: false, skills: ["React", "Next.js", "Tailwind CSS", "OpenCV", "Supabase"] },
  ];

  return (
    <section className="py-32 px-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[90vh]">
      
      {/* Intro Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 z-10"
      >
        <h2 className="text-xl md:text-2xl font-medium tracking-tight text-white mb-2">
          I&apos;m currently looking to join a <span className="text-primary font-bold">cross-functional</span> team
        </h2>
        <p className="text-sm text-muted">
          that values improving people&apos;s lives through accessible design and technology.
        </p>
      </motion.div>

      {/* Solar System Visualization */}
      <div className="relative w-full max-w-[350px] md:max-w-[600px] aspect-square mx-auto flex items-center justify-center mt-8">
        
        {/* The Sun (Center Object) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
          <div className="relative w-20 h-20 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#E9D5FF] via-[#A855F7] to-[#4C1D95] shadow-[0_0_80px_rgba(168,85,247,0.8)] flex items-center justify-center">
            {/* Pulsating Solar Flares */}
            <div className="absolute inset-0 bg-primary rounded-full blur-xl animate-ping opacity-30" />
            {/* Core Brightness */}
            <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-white/40 blur-md animate-pulse" />
            <div className="absolute w-4 h-4 md:w-8 md:h-8 rounded-full bg-white/80 blur-sm" />
            {/* Crisp Outer Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-white/30" />
          </div>
        </div>

        {/* The Orbits and Planets */}
        {orbits.map((orbit, orbitIndex) => (
          <div 
            key={orbitIndex} 
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${orbit.sizeClass} z-20 pointer-events-none`}
          >
            <motion.div
              animate={{ rotate: orbit.reverse ? -360 : 360 }}
              transition={{ duration: orbit.duration, repeat: Infinity, ease: "linear" }}
              className="w-full h-full rounded-full border border-white/10 relative"
            >
              {orbit.skills.map((skill, skillIndex) => {
                const angle = (360 / orbit.skills.length) * skillIndex;
                
                return (
                  <div
                    key={skill}
                    className="absolute top-0 left-0 w-full h-full"
                    style={{ transform: `rotate(${angle}deg)` }}
                  >
                    {/* The String (Tether connecting Sun to Planet) - REMOVED to reduce clutter */}

                    {/* The Planet (Skill Icon) */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                      {/* Counter-rotation to keep the icon text upright, offsetting the initial angle */}
                      <motion.div
                        initial={{ rotate: -angle }}
                        animate={{ rotate: orbit.reverse ? 360 - angle : -360 - angle }}
                        transition={{ duration: orbit.duration, repeat: Infinity, ease: "linear" }}
                        className="relative group w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#0a0510] border-2 border-white/10 flex items-center justify-center text-[10px] md:text-xs font-bold text-muted hover:text-white hover:border-primary/50 hover:bg-primary/20 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all cursor-pointer"
                      >
                        {getSkillInitial(skill)}
                        
                        {/* Tooltip */}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] md:text-xs bg-white text-black px-2 py-1 rounded whitespace-nowrap pointer-events-none">
                          {skill}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        ))}

        {/* Ambient Space Dust / Background Rings */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-full">
          <div className="absolute top-1/2 left-1/2 w-[120%] h-[120%] -translate-x-1/2 -translate-y-1/2 border border-white/5 rounded-full border-dashed opacity-20" />
        </div>
      </div>
    </section>
  );
}
