"use client";

import { useConnection } from "../../../store/connectionStore";
import { useMessageStore } from "../../../store/messageStore";
import { useActiveChat } from "../../../store/activeChatStore";
import { useEffect, useState } from "react";
import { useUser } from "../../../store/userStore";

interface ChatPreview {
  id: string;
  userId: string;
  username: string;
  avatar?: string;
  lastMessage?: string;
  timeStamp? : string
}

export default function ChatsList() {
  const {user} = useUser()
  const { connections } = useConnection();
  const { message, populateMessage } = useMessageStore();
  const { activeChatId, setActiveChatId } = useActiveChat();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("connections",connections)
    const loadMessages = async () => {
      setIsLoading(true);
      if (connections && connections.length > 0) {
        console.log("Loading messages for connections:", connections);
        for (const conn of connections) {
          if (conn.id) {
            console.log("Loading messages for connection:", conn.connectionId);
            await populateMessage(conn.id);
          }
        }
      }
      setIsLoading(false);
    };
    
    loadMessages();
  }, [connections, populateMessage]);
  
  
  // Extract chats that have messages
  const chatPreviews: ChatPreview[] = connections
    .filter(conn => 
  {
    return message[conn.id] && Array.isArray(message[conn.id])
  }

    )
    .map((conn) => {
      const msgs = message[conn.id];
      const lastMsg = msgs[msgs.length - 1];
      
      return {
        id: conn.id || "",
        userId: conn?.connectedUser?.id || "",
        username: conn.connectedUser?.username || "",
        avatar: conn.connectedUser?.avatar || "",
        lastMessage: lastMsg?.content || "",
      };
    });
  
  console.log("Final chatPreviews:", chatPreviews);

  // Handle selecting a chat
  const handleSelectChat = (chatId: string) => {
    console.log("Selecting chat:", chatId);
    setActiveChatId(chatId);
  };
  
  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-500">
        <div className="animate-pulse flex flex-col space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (chatPreviews.length === 0) {
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
        {chatPreviews.map((chat) => (
          <div 
            key={chat.id}
            onClick={() => handleSelectChat(chat.id)}
            className={`flex items-center p-2 rounded-md cursor-pointer
              ${activeChatId === chat.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
          >
            <div className="relative">
              <img 
                src={chat.avatar || "https://github.com/identicons/default.png"} 
                alt="Profile"
                className="w-10 h-10 rounded-full mr-3"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h4 className="text-sm font-medium text-gray-800 truncate">
                  {chat.username}
                </h4>
              </div>
              {chat.lastMessage && (
                <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
