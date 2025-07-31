"use client";

import MainLayout from "@/components/MainLayout";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
