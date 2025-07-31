"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useTheme } from '@/contexts/ThemeContext';

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const features = [
    {
      title: "Real-Time Chat",
      description: "Lightning-fast messaging with end-to-end encryption and rich media support for seamless communication.",
      icon: "💬",
      gradient: "from-cyan-400 via-blue-500 to-indigo-600",
      iconBg: "from-cyan-400/20 to-blue-500/20",
      borderColor: "border-cyan-300/30 dark:border-cyan-400/30",
      glowColor: "shadow-cyan-500/20",
      hoverGlow: "group-hover:shadow-cyan-500/40",
    },
    {
      title: "Video Conferences",
      description: "Crystal-clear HD video calls with screen sharing, virtual backgrounds, and AI-powered noise cancellation.",
      icon: "📹",
      gradient: "from-emerald-400 via-teal-500 to-cyan-600",
      iconBg: "from-emerald-400/20 to-teal-500/20",
      borderColor: "border-emerald-300/30 dark:border-emerald-400/30",
      glowColor: "shadow-emerald-500/20",
      hoverGlow: "group-hover:shadow-emerald-500/40",
    },
    {
      title: "Built for Teams",
      description: "Powerful workspaces with advanced project management, file sharing, and seamless third-party integrations.",
      icon: "👥",
      gradient: "from-purple-400 via-pink-500 to-rose-600",
      iconBg: "from-purple-400/20 to-pink-500/20",
      borderColor: "border-purple-300/30 dark:border-purple-400/30",
      glowColor: "shadow-purple-500/20",
      hoverGlow: "group-hover:shadow-purple-500/40",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      y: 80, 
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  return (
    <section id="features" className={`relative py-24 overflow-hidden transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-blue-900' 
        : 'bg-gradient-to-br from-white via-blue-50/80 to-indigo-100/90'
    }`}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 -left-20 w-40 h-40 bg-gradient-to-r from-blue-400/10 to-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 -right-20 w-60 h-60 bg-gradient-to-r from-emerald-400/10 to-cyan-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-black mb-6"
            animate={isInView ? {
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            } : {}}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span 
              className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent"
              style={{ backgroundSize: "300% 300%" }}
            >
              Powerful Features
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Experience next-level communication with our suite of cutting-edge tools designed to enhance productivity and collaboration.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                scale: 1.02,
              }}
              className={`group relative p-8 rounded-3xl transition-all duration-500 bg-white/80 dark:bg-slate-800/80 border ${feature.borderColor} shadow-xl hover:shadow-2xl backdrop-blur-sm`}
            >
              {/* Glassmorphism overlay */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 dark:from-slate-700/20 dark:to-slate-800/20" />
              
              {/* Gradient background on hover */}
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-all duration-500`}
                whileHover={{ opacity: 0.1 }}
              />
              
              {/* Icon background glow */}
              <motion.div 
                className={`absolute top-6 left-6 w-20 h-20 bg-gradient-to-br ${feature.iconBg} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.5,
                }}
              />
              
              <div className="relative z-10">
                {/* Icon Container */}
                <motion.div 
                  className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.iconBg} border ${feature.borderColor} mb-6 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden`}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.span 
                    className="text-4xl relative z-10"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.3,
                    }}
                  >
                    {feature.icon}
                  </motion.span>
                  {/* Icon glow effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-20 rounded-2xl`}
                    animate={{
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
                
                {/* Title */}
                <motion.h3 
                  className={`text-2xl font-bold mb-4 text-zinc-800 dark:text-zinc-300`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {feature.title}
                </motion.h3>
                
                {/* Description */}
                <p className="text-zinc-600 dark:text-slate-400 leading-relaxed font-medium mb-6">
                  {feature.description}
                </p>
                
                {/* Learn More Link */}
                <motion.div 
                  className="flex items-center text-zinc-500 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-purple-400 transition-colors duration-300 cursor-pointer"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-sm font-medium mr-2">Explore feature</span>
                  <motion.svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </motion.svg>
                </motion.div>
              </div>

              {/* Decorative elements */}
              <motion.div
                className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-white/40 to-white/20 dark:from-slate-400/40 dark:to-slate-400/20 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.7,
                }}
              />
              <motion.div
                className="absolute bottom-4 left-4 w-1 h-1 bg-gradient-to-r from-white/30 to-white/10 dark:from-slate-500/30 dark:to-slate-500/10 rounded-full"
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.4,
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.p 
            className="text-zinc-500 dark:text-slate-400 mb-8 text-lg font-medium"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Ready to experience the future of communication?
          </motion.p>
          <Link href="/login">
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300"
            >
              Get Started Today
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
