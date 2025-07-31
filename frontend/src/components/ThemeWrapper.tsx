"use client";

import { useTheme } from "@/contexts/ThemeContext";

interface ThemeWrapperProps {
  children: React.ReactNode;
}

export default function ThemeWrapper({ children }: ThemeWrapperProps) {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen transition-all duration-700 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-blue-900 text-slate-100' 
        : 'bg-gradient-to-br from-white via-blue-50/80 to-indigo-100/90 text-slate-900'
    }`}>
      {children}
    </div>
  );
}
