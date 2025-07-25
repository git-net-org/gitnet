"use client";

import MainLayout from "@/components/MainLayout";
import Link from "next/link";

export default function LandingPage() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white">
        {/* Header */}
        <h1 className="text-5xl font-extrabold mb-6 text-center">
          Welcome to <span className="text-blue-400">Gignet</span>
        </h1>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-center max-w-2xl mb-10 text-gray-300">
          A modern communication suite built for collaboration, video conferencing, and productive teamwork — all in one place.
        </p>

        {/* CTA Button */}
        <Link href="/home">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition duration-300">
            Launch App
          </button>
        </Link>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
          {[
            {
              title: "Real-Time Chat",
              desc: "Stay in sync with team members using secure and fast messaging.",
            },
            {
              title: "Video Conferences",
              desc: "Connect face-to-face with built-in video meetings, no third-party tools needed.",
            },
            {
              title: "Built for Teams",
              desc: "Create workspaces and collaborate efficiently — all under one roof.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="bg-[#1e293b] p-6 rounded-xl border border-gray-700 shadow-md"
            >
              <h3 className="text-xl font-bold text-blue-300 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
