/**
 * Typing Indicator Handler
 * Handles typing indicators between users
 */

import { getUserSocketMap } from "./userRegistrationHandler.js";

const typingTimeouts = new Map();

export const handleTypingIndicators = (socket, io) => {
  socket.on("typing", (data) => {
    console.log("Typing event received:", data);
    const { userID, receiverID } = data;

    if (!userID || !receiverID) {
      console.error("Missing userID or receiverID in typing event");
      return;
    }

    const userSocketMap = getUserSocketMap();
    const receiver = userSocketMap.get(receiverID);

    if (receiver) {
      // Send typing indicator to receiver
      io.to(receiver.socketId).emit("user_typing", {
        userID,
        isTyping: true,
        receiverID
      });

      // Clear existing timeout for this user-receiver pair
      const typingKey = `${userID}-${receiverID}`;
      if (typingTimeouts.has(typingKey)) {
        clearTimeout(typingTimeouts.get(typingKey));
      }

      // Set auto-stop timeout (3 seconds)
      const timeout = setTimeout(() => {
        io.to(receiver.socketId).emit("user_typing", {
          userID,
          isTyping: false,
          receiverID
        });
        typingTimeouts.delete(typingKey);
      }, 3000);

      typingTimeouts.set(typingKey, timeout);
    }
  });

  socket.on("stop_typing", (data) => {
    console.log("Stop typing event received:", data);
    const { userID, receiverID } = data;

    if (!userID || !receiverID) {
      console.error("Missing userID or receiverID in stop_typing event");
      return;
    }

    const userSocketMap = getUserSocketMap();
    const receiver = userSocketMap.get(receiverID);

    if (receiver) {
      io.to(receiver.socketId).emit("user_typing", {
        userID,
        isTyping: false,
        receiverID
      });

      // Clear the timeout since user manually stopped typing
      const typingKey = `${userID}-${receiverID}`;
      if (typingTimeouts.has(typingKey)) {
        clearTimeout(typingTimeouts.get(typingKey));
        typingTimeouts.delete(typingKey);
      }
    }
  });
};

export const cleanupTypingTimeouts = (userId) => {
  // Clean up typing timeouts for this user
  for (const [typingKey, timeout] of typingTimeouts.entries()) {
    if (typingKey.startsWith(`${userId}-`)) {
      clearTimeout(timeout);
      typingTimeouts.delete(typingKey);
    }
  }
};
