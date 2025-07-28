/**
 * Socket Event Handlers - Main Entry Point
 * Modularized socket event handling with separate handlers for different features
 */

import {
  handleUserRegistration,
  getUserSocketMap,
  handleMessages,
  handleInvitations,
  handleTypingIndicators,
  handleVideoCalls,
  handleDisconnection
} from "./sockets/handlers/index.js";

export { getUserSocketMap };

export const socketEventHandlers = (socket, io) => {
  // Register all modularized handlers
  handleUserRegistration(socket, io);
  handleMessages(socket, io);
  handleInvitations(socket, io);
  handleTypingIndicators(socket, io);
  handleVideoCalls(socket, io);
  handleDisconnection(socket, io);
};
