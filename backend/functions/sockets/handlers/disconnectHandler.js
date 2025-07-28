/**
 * Disconnect Handler
 * Handles socket disconnection and cleanup
 */

import { cleanupUserFromMap } from "./userRegistrationHandler.js";
import { cleanupTypingTimeouts } from "./typingHandler.js";
import { cleanupCallTimeouts } from "./videoCallHandler.js";

export const handleDisconnection = (socket, io) => {
  socket.on('disconnect', () => {
    console.log('Socket disconnected: ', socket.id);

    // Clean up user from socket map and get the userId
    const userId = cleanupUserFromMap(socket.id);

    if (userId) {
      // Clean up typing timeouts for this user
      cleanupTypingTimeouts(userId);

      // Clean up call timeouts for this user
      cleanupCallTimeouts(userId);
    }
  });
};
