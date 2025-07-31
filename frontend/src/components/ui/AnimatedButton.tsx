import React from "react";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href: string;
}

export const AnimatedButton: React.FC<ButtonProps> = ({ children, href }) => (
  <Link href={href}>
    <a className="relative px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-lg transform hover:scale-105 active:scale-95 transition-transform duration-300 overflow-hidden">
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
    </a>
  </Link>
);

interface CardProps {
  title: string;
  description: string;
  icon: string;
}

export const FeatureCard: React.FC<CardProps> = ({ title, description, icon }) => (
  <div className="group relative p-8 rounded-3xl backdrop-blur-xl border dark:border-gray-700 shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105">
    <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 opacity-0 group-hover:opacity-50 transition-opacity duration-500 rounded-3xl"></div>
    <div className="relative z-10">
      <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
        <span className="text-3xl">{icon}</span>
      </div>
      <h3 className="mt-4 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-700">
        {title}
      </h3>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </div>
  </div>
);

