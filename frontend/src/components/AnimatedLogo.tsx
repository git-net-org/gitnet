import React from 'react';
import { motion } from 'framer-motion';

const AnimatedLogo = () => {
  const logoVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
    },
  };

  const letters = ['G', 'i', 'g', 'n', 'e', 't'];

  return (
    <motion.div
      variants={logoVariants}
      initial="hidden"
      animate="visible"
      className="flex items-center text-5xl font-extrabold text-slate-800 dark:text-white mb-4"
    >
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          variants={letterVariants}
          whileHover={{ y: -5, scale: 1.1, color: '#6366f1' }}
          className="cursor-default"
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedLogo;
