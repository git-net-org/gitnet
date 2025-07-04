"use client";

import { useUser } from "../../../store/userStore";
import { FetchButton } from "../FetchButton";

export default function SidebarHeader() {
  const { user } = useUser();
  
  return (
    <div className="p-4 border-b border-gray-200">
      <FetchButton/>
      <div className="flex items-center">
        {user?.avatar && (
          <img 
            src={user.avatar} 
            alt="Profile" 
            className="w-10 h-10 rounded-full mr-3"
          />
        )}
        <div>
          <h2 className="font-medium text-gray-800">{user?.username || "User"}</h2>
          <p className="text-xs text-gray-500">Git-Conn</p>
        </div>
      </div>
    </div>
  );
}
