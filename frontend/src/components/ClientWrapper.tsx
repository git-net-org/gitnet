"use client";

import { ReactNode, useEffect } from "react";
import { useUser } from "../../store/userStore";
import { useConnection } from "../../store/connectionStore";
import { useSocketStore } from "../../store/useSocketStore";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const { setUserData } = useUser();
  const { setConnections } = useConnection();
  const { createSocketConnection,disconnectSocketConnection} = useSocketStore();
  
  useEffect(() => {
    setUserData();
    setConnections();
     createSocketConnection();

      return () => {
      disconnectSocketConnection();
    };
    
  }, []);

  return <>{children}</>;
}
