"use client";

import { useState } from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarTab from "./SidebarTab";
import ChatsList from "./ChatsList";
import ConnectionsList from "./ConnectionsList";
import ExploreMore from "./ExploreMore";

type TabType = "chats" | "connections" | "explore";

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState<TabType>("connections");

  return (
    <div className="h-screen w-72 flex flex-col border-r border-gray-200 bg-white">
      <SidebarHeader />
      
      <div className="flex border-b border-gray-200">
        <SidebarTab 
          label="Chats" 
          isActive={activeTab === "chats"} 
          onClick={() => setActiveTab("chats")} 
        />
        <SidebarTab 
          label="Connections" 
          isActive={activeTab === "connections"} 
          onClick={() => setActiveTab("connections")} 
        />
        <SidebarTab 
          label="Explore" 
          isActive={activeTab === "explore"} 
          onClick={() => setActiveTab("explore")} 
        />
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {activeTab === "chats" && <ChatsList />}
        {activeTab === "connections" && <ConnectionsList />}
        {activeTab === "explore" && <ExploreMore />}
      </div>
    </div>
  );
}
