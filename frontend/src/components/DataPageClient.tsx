"use client";

import React, { useEffect } from 'react';
import { useUser } from '../../store/userStore';
import { useConnection } from '../../store/connectionStore';

export default function DataPageClient() {
  const { user, setLoading, setUserData } = useUser();
  const { connections, setConnections } = useConnection();
  
  useEffect(() => {
    setUserData();
    setConnections();
  }, []);
  
  console.log(user);
  console.log("connections", connections);
  
  return (
    <div>
      {user ? user.username ?? "hi" : "hi"}
    </div>
  );
}
