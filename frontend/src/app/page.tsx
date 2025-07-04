"use client"
import MainLayout from "@/components/MainLayout";
import ChatWindow from "@/components/ChatWindow";
import { useActiveChat } from "../../store/activeChatStore";

export default function Home() {
  const { activeChatId } = useActiveChat();
  
  return (
    <MainLayout>
      <ChatWindow activeChat={activeChatId || ""}/>
    </MainLayout>
  );
}
