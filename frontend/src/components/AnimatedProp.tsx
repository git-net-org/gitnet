
import React from 'react';
import { motion } from 'framer-motion';

const AnimatedProp = () => {
  const orbCount = 8;

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      <motion.div
        className="relative w-full max-w-sm h-auto aspect-square"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }}
      >
        {/* Central Orb */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-16 h-16 sm:w-20 sm:h-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-2xl shadow-purple-500/50"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
        />
        
        {/* Orbiting Particles and Lines */}
        {[...Array(orbCount)].map((_, i) => {
          const angle = (i / orbCount) * 2 * Math.PI;
          const radius = 120; // sm: 140, md: 160

          return (
            <motion.g key={i}>
              {/* Connection Line */}
              <motion.svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 400 400">
                <motion.line
                  x1="200"
                  y1="200"
                  x2={200 + Math.cos(angle) * radius}
                  y2={200 + Math.sin(angle) * radius}
                  stroke="#6366f1"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.5 }}
                  transition={{ 
                    pathLength: { delay: 0.5 + i * 0.1, type: "spring", duration: 1.5, bounce: 0 },
                    opacity: { delay: 0.5 + i * 0.1, duration: 0.1 },
                  }}
                />
              </motion.svg>

              {/* Orbiting Orb */}
              <motion.div
                className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full bg-cyan-400 shadow-lg"
                style={{
                  transform: `translate(calc(-50% + ${Math.cos(angle) * radius}px), calc(-50% + ${Math.sin(angle) * radius}px))`
                }}
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            </motion.g>
          );
        })}
      </motion.div>
    </div>
  );
};

export default AnimatedProp;
