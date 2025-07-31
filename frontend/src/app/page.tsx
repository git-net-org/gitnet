import React from "react";
import { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";

export const metadata: Metadata = {
  title: "Gignet - The Future of Communication",
  description: "Experience next-generation communication with real-time chat, video conferences, and team collaboration tools. Built for modern teams.",
  keywords: "communication, chat, video, collaboration, teams, real-time, messaging",
  authors: [{ name: "Gignet Team" }],
  creator: "Gignet",
  openGraph: {
    title: "Gignet - The Future of Communication",
    description: "Experience next-generation communication with real-time chat, video conferences, and team collaboration tools.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gignet - The Future of Communication",
    description: "Experience next-generation communication with real-time chat, video conferences, and team collaboration tools.",
  },
};

// This is a Server Component
export default function HomePage() {
  return <HomePageClient />;
}
