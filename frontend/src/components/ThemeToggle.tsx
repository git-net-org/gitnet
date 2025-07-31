"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    toggleTheme();
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className="relative">
      <div className="relative group" style={{ background: 'transparent' }}>
        
        {/* Main button */}
        <button
          onClick={handleToggle}
          className={`relative p-2 rounded-full bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-600 transition-all duration-200 transform hover:scale-105 active:scale-95`}
          aria-label="Toggle theme"
        >
          {/* Icon container with simple rotation animation */}
          <div className={`text-lg transition-all duration-300 transform ${
            isAnimating ? 'rotate-180' : 'rotate-0'
          }`}>
            {theme === 'dark' ? (
              <span className="text-yellow-500">☀️</span>
            ) : (
              <span className="text-slate-600">🌙</span>
            )}
          </div>
        </button>
        
        {/* Tooltip */}
        <div className={`absolute top-full right-0 mt-2 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 transform origin-top-right ${
          theme === 'dark'
            ? 'bg-gray-800/90 text-amber-300 border border-amber-500/20'
            : 'bg-white/90 text-indigo-700 border border-indigo-200/50'
        } opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 backdrop-blur-sm pointer-events-none`}>
          Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
          <div className={`absolute -top-1 right-4 w-2 h-2 rotate-45 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}></div>
        </div>
      </div>
    </div>
  );
}
