"use client"

import { useEffect, useState } from "react";
import { useConnection } from "../../store/connectionStore";
import { useSocketStore } from "../../store/useSocketStore";
interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: Date;
}
interface ChatWindowProps {
  activeChat: string | null;
}

export default function ChatWindow({ activeChat }: ChatWindowProps) {
  const { connections } = useConnection();
  const [message, setMessage] = useState("");

  const {socket} = useSocketStore();
  

  console.log(activeChat)

  console.log("connections from connection list", connections)
  
  const [messages] = useState<Record<string, ChatMessage[]>>({
    "1": [
      {
        id: "m1",
        sender: "dev_ash",
        text: "Hey there!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      },
      {
        id: "m2",
        sender: "me",
        text: "Hello! How are you?",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      },
      {
        id: "m3",
        sender: "dev_ash",
        text: "I'm good! Working on a new project.",
        timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
      },
    ],
  });
  

  const activeConnection = connections?.find(c => c.id === activeChat);
  console.log(activeConnection)
 

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !activeChat) return;

     socket?.emit("send_message", {
    content:message,
    connectionId: activeConnection?.id,
    senderId: activeConnection?.connectedUser?.id,
    receiverId: activeConnection?.user?.id
  });
    console.log("Sending message:", message);
    // TODO: Implement actual API call to send message
    
    setMessage("");
  };

  return (
    <div className="h-full flex flex-col">
      {activeChat ? (
        <>
          {/* Chat Header */}
          <div className="bg-white border-b border-gray-200 p-4 flex items-center">
            <img 
              src={activeConnection?.user?.avatar || "https://github.com/identicons/default.png"}
              alt="Avatar" 
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h2 className="font-medium text-gray-800">
                {activeConnection?.user?.username || "Unknown User"}
              </h2>
              <p className="text-xs text-gray-500">Online</p>
            </div>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            <div className="space-y-4">
              {messages[activeChat]?.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`p-3 rounded-lg max-w-[70%] ${
                      msg.sender === 'me' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white border border-gray-200'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p 
                      className={`text-xs mt-1 ${
                        msg.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
                      }`}
                    >
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Message Input */}
          <form onSubmit={sendMessage} className="p-4 bg-white border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button 
                type="submit"
                disabled={!message.trim()}
                className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none disabled:opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </>
      ) : (
        // No active chat selected
        <div className="h-full flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-md p-8">
            <div className="rounded-full bg-blue-100 p-3 mx-auto w-16 h-16 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Your messages</h3>
            <p className="text-gray-500 mb-6">Select a conversation from the sidebar to start chatting</p>
          </div>
        </div>
      )}
    </div>
  );
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
