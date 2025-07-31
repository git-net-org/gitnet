"use client";

import { ReactNode, useEffect } from "react";
import { useUser } from "../../store/userStore";
import { useConnection } from "../../store/connectionStore";
import { useSocketStore } from "../../store/useSocketStore";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ThemeWrapper from "@/components/ThemeWrapper";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const { user,setUserData } = useUser();
  const { setConnections } = useConnection();
  const {socket, createSocketConnection,disconnectSocketConnection} = useSocketStore();
  
  function setTabId()
  {
    const id = Math.random().toString(32).substring(2)
    sessionStorage.setItem("tabId", id);
  }

  useEffect(() => {
    setUserData();
    setConnections();
    createSocketConnection();

    setTabId()
      return () => {
      disconnectSocketConnection();
    };
    
  }, []);
// to amp all socket id ewith userID
  useEffect(() => {
    if (user && socket) {
      let tabId = sessionStorage.getItem("tabId");

      socket.emit("register", { userId: user.id, tabId });

      socket.on("multiple_tab_blocked", () => {
        alert("multiple tabs are not allowed");
        socket.disconnect();

        document.body.innerHTML = `
    <div style="display:flex; justify-content:center; align-items:center; height:100vh; font-family:sans-serif">
      <h2>This app is already open in another tab.</h2>
    </div>
  `;

        throw new Error("Tab blocked due to multiple instances.");
      });
    }
  }, [user, socket]);


  return (
    <ThemeProvider>
      <ThemeWrapper>
        {children}
      </ThemeWrapper>
    </ThemeProvider>
  );
}
