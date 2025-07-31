"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

export default function LoginPageClient() {
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  if (!mounted) return null;

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-blue-900' 
        : 'bg-gradient-to-br from-white via-blue-50/80 to-indigo-100/90'
    }`}>
          {/* Theme Toggle positioned at top-right */}
          <div className="fixed top-6 right-6 z-50">
            <div className="relative group" style={{ background: 'transparent' }}>
              <button
                onClick={toggleTheme}
                className={`relative p-2 rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                  isDark 
                    ? 'bg-slate-800/80 text-yellow-500 border border-slate-600' 
                    : 'bg-white/80 text-slate-600 border border-slate-200'
                }`}
                aria-label="Toggle theme"
              >
                <div className="text-lg transition-all duration-300">
                  {isDark ? '☀️' : '🌙'}
                </div>
              </button>
            </div>
          </div>
          {/* Back to Home Link */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="fixed top-6 left-6 z-40"
          >
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white/90 dark:bg-slate-800/50 backdrop-blur-sm border border-blue-200/60 dark:border-slate-600/30 text-slate-700 dark:text-slate-300 hover:bg-blue-50/80 dark:hover:bg-slate-700/50 transition-all duration-300 cursor-pointer shadow-lg"
              >
                <motion.svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  whileHover={{ x: -3 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </motion.svg>
                <span className="text-sm font-medium">Back to Home</span>
              </motion.div>
            </Link>
          </motion.div>

          {/* Background Effects */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-purple-600/20 rounded-full mix-blend-multiply filter blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.15, 0.35, 0.15],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
              className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full mix-blend-multiply filter blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.25, 0.45, 0.25],
                rotate: [0, 360, 0],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 4,
              }}
              className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-rose-600/20 rounded-full mix-blend-multiply filter blur-3xl"
            />

            {/* Floating particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  x: [0, 40, -40, 0],
                  y: [0, -30, 30, 0],
                  scale: [1, 1.2, 0.8, 1],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 8 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.7,
                }}
                className={`absolute w-3 h-3 rounded-full ${
                  i % 4 === 0
                    ? "bg-gradient-to-r from-cyan-400 to-blue-500"
                    : i % 4 === 1
                    ? "bg-gradient-to-r from-purple-400 to-pink-500"
                    : i % 4 === 2
                    ? "bg-gradient-to-r from-indigo-400 to-purple-500"
                    : "bg-gradient-to-r from-emerald-400 to-teal-500"
                }`}
                style={{
                  top: `${15 + i * 12}%`,
                  left: `${8 + i * 11}%`,
                }}
              />
            ))}
          </div>

          <div className="relative flex flex-col items-center justify-center min-h-screen px-6 py-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center p-8 max-w-md w-full"
            >

              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl font-black mb-6"
              >
                <motion.span
                  className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 dark:from-cyan-300 dark:via-indigo-300 dark:to-purple-300 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ backgroundSize: "300% 300%" }}
                >
                  Welcome to Gignet
                </motion.span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg mb-8 text-slate-600 dark:text-slate-300 font-medium leading-relaxed"
              >
                Connect with developers and showcase your projects through our
                advanced communication platform.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col gap-4 mb-8"
              >
                <motion.a
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(147, 51, 234, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-2xl shadow-purple-500/25 transition-all duration-300 overflow-hidden"
                  href="http://localhost:8080/auth/github"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <motion.span
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="text-xl"
                    >
                      🚀
                    </motion.span>
                    Sign up with GitHub
                  </span>
                  <motion.div
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
                  />
                </motion.a>

                <motion.a
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(99, 102, 241, 0.1)",
                    borderColor: "rgba(99, 102, 241, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 font-bold rounded-2xl border-2 border-slate-400 dark:border-slate-600 text-black dark:text-slate-300 hover:text-indigo-700 dark:hover:text-purple-400 backdrop-blur-sm transition-all duration-300"
                  href="/login"
                >
                  <span className="flex items-center justify-center gap-3">
                    <span className="text-xl">✨</span>
                    Already have an account?
                  </span>
                </motion.a>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-8"
              >
                Secure authentication powered by GitHub OAuth
              </motion.p>

              {/* Decorative elements */}
              <motion.div
                variants={itemVariants}
                className="flex items-center justify-center gap-6 opacity-50"
              >
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [-10, 10, -10],
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3,
                    }}
                    className={`${i === 0 ? 'w-6 h-6' : i === 1 ? 'w-7 h-7' : i === 2 ? 'w-8 h-8' : 'w-9 h-9'} rounded-full ${
                      i % 3 === 0
                        ? "bg-gradient-to-br from-cyan-400 to-blue-500"
                        : i % 3 === 1
                        ? "bg-gradient-to-br from-purple-400 to-pink-500"
                        : "bg-gradient-to-br from-indigo-400 to-purple-500"
                    }`}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>
    </div>
  );
}

