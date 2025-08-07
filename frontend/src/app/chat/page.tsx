
"use client";
import ChatWindow from "@/components/ChatWindow";
import { useActiveChat } from "../../../store/activeChatStore";

export default function ChatPage() {
    const { activeChatId } = useActiveChat();
    return <ChatWindow activeChat={activeChatId} />;
}

