"use client";

import { useState } from "react";

interface SuggestedUser {
  id: string;
  username: string;
  avatar?: string;
  bio?: string;
}

export default function ExploreMore() {
  // Mock data - replace with actual API call
  const [suggestedUsers] = useState<SuggestedUser[]>([
    {
      id: "user1",
      username: "alex_developer",
      avatar: "https://github.com/identicons/alex.png",
      bio: "Full-stack developer | React, Node.js, TypeScript"
    },
    {
      id: "user2",
      username: "sara_coder",
      avatar: "https://github.com/identicons/sara.png",
      bio: "Frontend Engineer | UI/UX enthusiast"
    },
    {
      id: "user3",
      username: "dev_mike",
      avatar: "https://github.com/identicons/mike.png",
      bio: "Backend developer | Python, Go, AWS"
    }
  ]);

  const [connecting, setConnecting] = useState<Record<string, boolean>>({});
  
  const handleConnect = (userId: string) => {
    // Here you would implement the connect functionality
    // For now, we'll just update the UI
    setConnecting(prev => ({ ...prev, [userId]: true }));
    
    // TODO: Add actual API call to connect with the user
    console.log("Connecting with user:", userId);
    
    // Simulate API delay
    setTimeout(() => {
      setConnecting(prev => ({ ...prev, [userId]: false }));
    }, 1500);
  };

  return (
    <div className="p-2">
      <div className="mb-4">
        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider px-2 mb-2">
          Suggested Connections
        </h3>
        
        <div className="p-2 mb-4">
          <input
            type="text"
            placeholder="Search for developers..."
            className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        
        <div className="space-y-3">
          {suggestedUsers.map((user) => (
            <div key={user.id} className="p-3 bg-white rounded-md border border-gray-200 hover:border-gray-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img 
                    src={user.avatar || "https://github.com/identicons/default.png"}
                    alt={user.username} 
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <h4 className="text-sm font-medium text-gray-800">{user.username}</h4>
                    {user.bio && <p className="text-xs text-gray-500 line-clamp-1">{user.bio}</p>}
                  </div>
                </div>
                <button
                  onClick={() => handleConnect(user.id)}
                  disabled={connecting[user.id]}
                  className={`text-xs px-3 py-1 rounded-full transition-colors
                    ${connecting[user.id] 
                      ? "bg-gray-100 text-gray-500" 
                      : "bg-blue-50 text-blue-600 hover:bg-blue-100"}`}
                >
                  {connecting[user.id] ? "Connecting..." : "Connect"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider px-2 mb-2">
          Discover by Interest
        </h3>
        <div className="flex flex-wrap gap-2 px-2">
          {["React", "Node.js", "TypeScript", "Python", "AWS", "DevOps"].map(tag => (
            <span 
              key={tag} 
              className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full cursor-pointer hover:bg-gray-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
