"use client";

import Sidebar from "./sidebar/Sidebar";
import VideoCallManager from "./VideoCallManager";
import { useVideoCallStore } from "../../store/videoCallStore";
import { useSocketStore } from "../../store/useSocketStore";
import { useEffect } from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { 
    isCallModalOpen, 
    receiverId, 
    incomingCall, 
    setIncomingCall, 
    closeCallModal 
  } = useVideoCallStore();
  const { socket } = useSocketStore();

  // Listen for incoming calls
  useEffect(() => {
    if (!socket) return;

    const handleIncomingCall = (data: any) => {
      console.log('🔔 Incoming call received in MainLayout:', data);
      setIncomingCall({
        callerId: data.callerId,
        receiverId:data.receiverId,
        callerPeerId: data.callerPeerId,
        callType: data.callType,
      });
    };

    socket.on('incoming_call', handleIncomingCall);
    console.log('📱 MainLayout listening for incoming calls');

    return () => {
      socket.off('incoming_call', handleIncomingCall);
      console.log('📱 MainLayout stopped listening for incoming calls');
    };
  }, [socket, setIncomingCall]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
      
      {/* Video Call Manager */}
      <VideoCallManager
        isOpen={isCallModalOpen}
        onClose={closeCallModal}
        receiverId={receiverId || undefined}
        incomingCall={incomingCall || undefined}
      />
    </div>
  );
}
