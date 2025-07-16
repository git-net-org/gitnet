"use client";

import { useConnection } from "../../../store/connectionStore";
import { useActiveChat } from "../../../store/activeChatStore";
import { IConnection } from "../../../types/schemaTypes";
import { useState } from "react";
import { useSocketStore } from "../../../store/useSocketStore";

export default function ConnectionsList() {
  const { connections, isLoading, setConnections } = useConnection();
  const { setActiveChatId } = useActiveChat();
  const [invitingSent, setInvitingSent] = useState<Record<string, boolean>>({});
  const [selectedConnectionId, setSelectedConnectionId] = useState<string | null>(null);

  console.log("CONNECTIONS",connections)

  const handleInvite = async (connectionId: string) => {
    try {
      setInvitingSent(prev => ({ ...prev, [connectionId]: true }));
      
      // Make API call to send invitation
      // Replace with your actual API endpoint
      /*
      await axios.post(
        "http://localhost:5000/user/send-invitation", 
        { connectionId },
        {
          withCredentials: true,
          headers: {
            "x-csrf-token": (() => {
              const value = `; ${document.cookie}`;
              const parts = value.split(`; csrfToken=`);
              if (parts.length === 2) return parts.pop()?.split(';').shift();
              return null;
            })(),
          },
        }
      );
      */
      
      // For now, just log it
      console.log("Invitation sent to user with ID:", connectionId);
      
      // TODO: After successful API call, update the local connections data
      // You might want to refetch connections or update the local state
      
    } catch (error) {
      console.error("Failed to send invitation:", error);
      setInvitingSent(prev => ({ ...prev, [connectionId]: false }));
    }
  };

  const handleSelectConnection = (connectionId: string) => {
    setSelectedConnectionId(connectionId);
    setActiveChatId(connectionId);
  };
  
  const isMutualConnection = (connection: IConnection) => {
    if (connection.isMutual !== undefined) {
      return connection.isMutual;
    }

    return false;
  };
  // Loading state
  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-500">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2.5"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }
  
  // Empty state
  if (!connections || connections.length === 0 || !connections[0].id) {
    return (
      <div className="p-6 text-center text-gray-500">
        <p>No connections found</p>
        <button className="mt-2 px-4 py-2 text-sm bg-blue-500 text-white rounded-md">
          Find people
        </button>
      </div>
    );
  }

  return (
    <div className="p-2">
      <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider px-2 mb-2">
        Your Connections
      </h3>
      
      <div className="space-y-1">
        {connections.map((connection) => (
          <div 
            key={connection.id}
            onClick={() => {isMutualConnection(connection);  handleSelectConnection(connection.id)}}
            className={`flex items-center justify-between p-2 rounded-md 
              ${isMutualConnection(connection) ? 'cursor-pointer hover:bg-gray-50' : ''}
              ${selectedConnectionId === connection.id ? 'bg-gray-50' : ''}`}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mr-3">
                {connection.user?.avatar ? (
                  <img 
                    src={connection.connectedUser?.avatar} 
                    alt="Profile" 
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <span className="text-lg text-gray-500">
                    {connection.connectedUser?.username?.charAt(0) || '?'}
                  </span>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {connection.connectedUser?.username || "Unknown User"}
                </p>
                <p className="text-xs text-gray-400">
                  {isMutualConnection(connection) ? "Connected" : ""}
                </p>
                <p className="text-xs text-gray-400">
                  {connection.isFollower && !isMutualConnection(connection) ? "They follow you." : ""}
                </p>
                <p className="text-xs text-gray-400">
                  {connection.isFollowing && !isMutualConnection(connection) ? "you follow them." : ""}
                </p>
              </div>
            </div>
            {/* isFollowing , no spamming sent a message, we will dispaly button to initiate convo */}
            {/* isFollower, no spamming sent a message, we will dispaly button to initiate convo */}

            {/* {!isMutualConnection(connection) && (
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent parent div click
                  handleInvite(connection.id);
                }}
                disabled={invitingSent[connection.id]}
                className={`text-xs px-3 py-1 rounded-full 
                  ${invitingSent[connection.id]
                    ? "bg-gray-100 text-gray-500"
                    : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                  }`}
              >
                {invitingSent[connection.id] ? "Invited" : "Connect"}
              </button>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
}
