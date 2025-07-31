"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Github, MessageCircle, Shield, Search, UserCheck, Play, ArrowRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { theme } = useTheme();
  const darkMode = theme === 'dark';

  const slides = [
    { 
      icon: <Github className={`w-10 h-10 ${darkMode ? 'text-white/90' : 'text-slate-700'}`} />, 
      title: "GitHub Authentication",
      text: "Sign in with GitHub — No email or phone number required",
      color: "blue"
    },
    { 
      icon: <MessageCircle className={`w-10 h-10 ${darkMode ? 'text-white/90' : 'text-slate-700'}`} />, 
      title: "Real-time Messaging",
      text: "Real-time dev-to-dev messaging",
      color: "green"
    },
    { 
      icon: <Search className={`w-10 h-10 ${darkMode ? 'text-white/90' : 'text-slate-700'}`} />, 
      title: "Smart Discovery",
      text: "Chat by GitHub username or repo",
      color: "purple"
    },
    { 
      icon: <Shield className={`w-10 h-10 ${darkMode ? 'text-white/90' : 'text-slate-700'}`} />, 
      title: "Privacy First",
      text: "No personal data stored",
      color: "red"
    }
  ];

  const colorMap: Record<string, string> = {
      blue: "from-blue-500 to-blue-600",
      green: "from-green-500 to-green-600",
      purple: "from-purple-500 to-purple-600",
      red: "from-red-500 to-red-600",
  };

  useEffect(() => {
    setIsVisible(true);

    // Auto-advance slides
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(slideInterval);
  }, [slides.length]);


  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-blue-900' 
        : 'bg-gradient-to-br from-white via-blue-50/80 to-indigo-100/90'
    }`}>

      {/* Hero Section */}
      <div className="container mx-auto px-6 min-h-screen flex items-center justify-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full max-w-7xl">
          
          {/* Left Column - Content */}
          <div className={`space-y-8 text-center lg:text-left ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-center lg:text-left ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Connect.
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Collaborate.
                </span>
                <br />
                <span className="bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
                  Contribute.
                </span>
              </h1>
              
              <h2 className={`text-xl md:text-2xl font-medium leading-relaxed text-center lg:text-left ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                A privacy-first, GitHub-powered chat platform for developers who want meaningful, 
                identity-based collaboration — no personal info ever required.
              </h2>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/login">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <UserCheck className="w-5 h-5" />
                    <span>Get Started</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </Link>
              
              <button className={`group px-8 py-4 font-semibold rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                darkMode 
                  ? 'border-gray-600 text-gray-300 hover:border-blue-500 hover:text-blue-400 hover:bg-blue-500/10' 
                  : 'border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50'
              }`}>
                <span className="flex items-center justify-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>View Demo</span>
                </span>
              </button>
            </div>
          </div>

          {/* Right Column - Colorful Minimalist Design */}
          <div className={`relative ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            
            {/* Floating Satellite Icons */}
            <div className="absolute top-5 -left-12 w-16 h-16 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-x-2">
                <div className={`w-full h-full rounded-2xl flex items-center justify-center ${darkMode ? 'bg-slate-900/50' : 'bg-white/90'} backdrop-blur-lg shadow-xl border ${darkMode ? 'border-slate-800' : 'border-blue-200/40'}`}>
                    <Github className={`w-7 h-7 ${darkMode ? 'text-slate-400' : 'text-blue-600'}`} />
                </div>
            </div>
            <div className="absolute bottom-5 -right-12 w-16 h-16 transition-transform duration-500 group-hover:scale-110 group-hover:translate-x-2">
                <div className={`w-full h-full rounded-2xl flex items-center justify-center ${darkMode ? 'bg-slate-900/50' : 'bg-white/90'} backdrop-blur-lg shadow-xl border ${darkMode ? 'border-slate-800' : 'border-purple-200/40'}`}>
                    <MessageCircle className={`w-7 h-7 ${darkMode ? 'text-slate-400' : 'text-purple-600'}`} />
                </div>
            </div>

            <div className="relative h-[550px] w-full max-w-sm mx-auto group">

              {/* Glowing Border Effect */}
              <div className={`absolute -inset-1 rounded-3xl bg-gradient-to-r ${colorMap[slides[currentSlide].color]} opacity-40 blur-xl group-hover:opacity-50 transition-opacity duration-500`}></div>

              {/* Main Card */}
              <div className={`relative h-full rounded-3xl p-8 transition-all duration-300 shadow-2xl ${darkMode ? 'bg-slate-900/80' : 'bg-white/90'} overflow-hidden border ${darkMode ? 'border-slate-800' : 'border-blue-200/50'}`}>
                
                {/* Background Grid Pattern */}
                <div className={`absolute inset-0 ${darkMode ? 'bg-[linear-gradient(to_right,theme(colors.slate.800)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.slate.800)_1px,transparent_1px)]' : 'bg-[linear-gradient(to_right,theme(colors.slate.200)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.slate.200)_1px,transparent_1px)]'} bg-[size:30px_30px] opacity-70`}></div>
                
                <div className="absolute inset-0 backdrop-blur-[2px]"></div>

                {/* Slide Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                  
                  {/* Top: Indicator Dots */}
                  <div className="flex-shrink-0 flex space-x-2 mb-10">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                          index === currentSlide
                            ? `bg-gradient-to-r ${colorMap[slides[currentSlide].color]} scale-125 shadow-lg`
                            : darkMode ? 'bg-slate-700' : 'bg-slate-300'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Center: Main Content */}
                  <div className="flex-grow flex flex-col items-center justify-center text-center space-y-6 w-full">
                    {/* Icon Display */}
                    <div className="relative w-28 h-28 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${colorMap[slides[currentSlide].color]} opacity-30 blur-2xl`}></div>
                        {slides[currentSlide].icon}
                    </div>
                    
                    {/* Title & Description */}
                    <div>
                      <h3 className={`text-2xl font-bold transition-colors duration-300 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        {slides[currentSlide].title}
                      </h3>
                      <p className={`mt-2 text-base leading-relaxed transition-colors duration-300 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        {slides[currentSlide].text}
                      </p>
                    </div>
                  </div>

                  {/* Bottom: Progress Bar */}
                  <div className="flex-shrink-0 w-full pt-10">
                    <div className={`h-1.5 rounded-full ${darkMode ? 'bg-slate-800' : 'bg-slate-200'} w-3/4 mx-auto overflow-hidden`}>
                      <div 
                        className={`h-full bg-gradient-to-r ${colorMap[slides[currentSlide].color]} transition-all duration-300 rounded-full`}
                        style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                </div>
                

              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default HeroSection;
