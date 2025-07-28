/**
 * User Registration Handler
 * Handles user socket registration and mapping
 */

let userSocketMap = new Map();

export const getUserSocketMap = () => userSocketMap;

export const setUserSocketMap = (map) => {
  userSocketMap = map;
};

export const handleUserRegistration = (socket, io) => {
  socket.on("register", ({ userId, tabId }) => {
    const existing = userSocketMap.get(userId);

    if (existing && existing.tabId !== tabId) {
      socket.emit("multiple_tab_blocked");
      socket.disconnect();
      return;
    }

    userSocketMap.set(userId, { tabId, socketId: socket.id });
    console.log("Current map:", userSocketMap);
  });
};

export const cleanupUserFromMap = (socketId) => {
  for (const [userId, info] of userSocketMap.entries()) {
    if (info.socketId === socketId) {
      userSocketMap.delete(userId);
      console.log(`Removed socket for user: ${userId}`);
      return userId;
    }
  }
  return null;
};
