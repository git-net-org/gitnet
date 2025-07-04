"use client";

import { useState } from "react";
import { useUser } from "../../../store/userStore";
import { useConnection } from "../../../store/connectionStore";

// This is a placeholder. In a real app, you would fetch messages from your API
interface ChatPreview {
  id: string;
  userId: string;
  username: string;
  avatar?: string;
  lastMessage: string;
  timestamp: Date;
  unread: boolean;
}

export default function ChatsList() {
  const { user } = useUser();
  const { connections } = useConnection();
  
  // Mock data - replace with actual data from your API
  const [chats] = useState<ChatPreview[]>([
    {
      id: "1",
      userId: "user1",
      username: "Jane Smith",
      avatar: "https://github.com/identicons/john.png",
      lastMessage: "Hey, how's it going?",
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      unread: true,
    },
    {
      id: "2",
      userId: "user2",
      username: "Mike Johnson",
      avatar: "https://github.com/identicons/mike.png",
      lastMessage: "Did you see the new feature?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      unread: false,
    }
  ]);
  
  if (chats.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        <p>No chats yet</p>
        <p className="mt-1 text-xs">Connect with someone to start chatting</p>
      </div>
    );
  }
  
  return (
    <div className="p-2">
      <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider px-2 mb-2">
        Recent Chats
      </h3>
      
      <div className="space-y-1">
        {chats.map((chat) => (
          <div 
            key={chat.id}
            className="flex items-center p-2 hover:bg-gray-50 rounded-md cursor-pointer"
          >
            <div className="relative">
              <img 
                src={chat.avatar || "https://github.com/identicons/default.png"} 
                alt="Profile"
                className="w-10 h-10 rounded-full mr-3"
              />
              {chat.unread && (
                <div className="absolute w-3 h-3 bg-blue-500 rounded-full top-0 right-3"></div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h4 className="text-sm font-medium text-gray-800 truncate">
                  {chat.username}
                </h4>
                <span className="text-xs text-gray-500">
                  {formatTime(chat.timestamp)}
                </span>
              </div>
              <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  if (diff < 1000 * 60) {
    return "just now";
  } else if (diff < 1000 * 60 * 60) {
    const mins = Math.floor(diff / (1000 * 60));
    return `${mins}m ago`;
  } else if (diff < 1000 * 60 * 60 * 24) {
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return `${hours}h ago`;
  } else {
    return date.toLocaleDateString();
  }
}
