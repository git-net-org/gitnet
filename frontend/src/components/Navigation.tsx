"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import NewAnimatedLogo from "./NewAnimatedLogo";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "" },
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-700 ${
        isScrolled
          ? isDark 
            ? "bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 shadow-lg shadow-slate-900/50"
            : "bg-gradient-to-r from-blue-50/95 to-indigo-50/95 backdrop-blur-xl border-b border-blue-200/50 shadow-lg shadow-blue-200/30"
          : isDark
            ? "bg-slate-800/50 backdrop-blur-sm"
            : "bg-gradient-to-r from-blue-50/90 to-purple-50/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <NewAnimatedLogo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <Link href={link.href}>
                  <span className={`relative font-semibold cursor-pointer transition-colors duration-300 group ${
                    isDark 
                      ? "text-slate-300 hover:text-purple-400" 
                      : "text-slate-800 hover:text-indigo-600"
                  }`}>
                    {link.name}
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
                      isDark ? "bg-purple-400" : "bg-indigo-600"
                    }`}></span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA and Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Link href="/login">
                <button className="group relative px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transform hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden">
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Launch App</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </button>
              </Link>
            </motion.div>
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

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
                onClick={toggleTheme}
                className={`relative p-2 rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                  isDark
                    ? 'bg-slate-800/80 text-yellow-500 border border-slate-600'
                    : 'bg-white/80 text-slate-600 border border-slate-200'
                }`}
                aria-label="Toggle theme"
              >
                <div className="text-sm transition-all duration-300">
                  {isDark ? '☀️' : '🌙'}
                </div>
              </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-700 dark:text-slate-300 hover:bg-zinc-100 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="w-6 h-6 relative">
                <span className={`absolute block w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 top-3' : 'top-1'}`}></span>
                <span className={`absolute block w-full h-0.5 bg-current transition-all duration-300 top-3 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`absolute block w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 top-3' : 'top-5'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden backdrop-blur-xl border-t transition-all duration-300 ${
              isDark
                ? "bg-slate-900/95 border-slate-700/50"
                : "bg-gradient-to-r from-blue-50/95 to-indigo-50/95 border-blue-200/50"
            }`}
          >
            <div className="px-6 py-4 space-y-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={link.href}>
                    <span
                      className={`block font-semibold cursor-pointer transition-colors duration-300 ${
                        isDark
                          ? "text-slate-300 hover:text-purple-400"
                          : "text-slate-800 hover:text-indigo-600"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="pt-4"
              >
                <Link href="/login">
                  <button
                    className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Launch App
                  </button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
