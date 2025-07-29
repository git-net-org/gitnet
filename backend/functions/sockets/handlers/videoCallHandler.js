/**
 * Video Call Handler
 * Handles video call signaling events
 */

import { getUserSocketMap } from "./userRegistrationHandler.js";

const callTimeouts = new Map(); // Track active call timeouts

export const handleVideoCalls = (socket, io) => {
  // Video call signaling events
  socket.on("initiate_call", (data) => {
    console.log("Call initiated:", data);
    const { callerId, receiverId, callerPeerId, callType } = data;

    if (!callerId || !receiverId || !callerPeerId) {
      console.error("Missing required fields for call initiation");
      return;
    }

    const userSocketMap = getUserSocketMap();
    const receiver = userSocketMap.get(receiverId);

    if (receiver) {
      console.log("Receiver found:", receiver);
      io.to(receiver.socketId).emit("incoming_call", {
        callerId,
        callerPeerId,
        callType,
        receiverId,
      });

      // Set up timeout for unanswered call
      const callKey = `${callerId}-${receiverId}`;
      const timeoutId = setTimeout(() => {
        console.log("Call timed out - no response received");

        // Send timeout to caller
        socket.emit("timed_out", {
          callerId,
          callerPeerId,
          callType,
          receiverId,
        });

        // Send timeout to receiver as well
        io.to(receiver.socketId).emit("timed_out", {
          callerId,
          callerPeerId,
          callType,
          receiverId,
        });

        // Clean up timeout
        callTimeouts.delete(callKey);
      }, 2000);

      // Store timeout ID for potential cleanup
      callTimeouts.set(callKey, timeoutId);

    } else {
      socket.emit("call_failed", { reason: "User not online" });
    }
  });

  socket.on("accept_call", (data) => {
    console.log("Call accepted:", data);
    const { callerId, receiverId, receiverPeerId } = data;

    // Clear the timeout since call was answered
    const callKey = `${callerId}-${receiverId}`;
    if (callTimeouts.has(callKey)) {
      clearTimeout(callTimeouts.get(callKey));
      callTimeouts.delete(callKey);
      console.log("Call timeout cleared - call accepted");
    }

    const userSocketMap = getUserSocketMap();
    const caller = userSocketMap.get(callerId);

    if (caller) {
      io.to(caller.socketId).emit("call_accepted", {
        receiverId,
        receiverPeerId,
      });
    }
  });

  socket.on("reject_call", (data) => {
    console.log("Call rejected:", data);
    const { callerId, receiverId } = data;

    // Clear the timeout since call was answered (rejected)
    const callKey = `${callerId}-${receiverId}`;
    if (callTimeouts.has(callKey)) {
      clearTimeout(callTimeouts.get(callKey));
      callTimeouts.delete(callKey);
      console.log("Call timeout cleared - call rejected");
    }

    const userSocketMap = getUserSocketMap();
    const caller = userSocketMap.get(callerId);

    if (caller) {
      io.to(caller.socketId).emit("call_rejected", {
        receiverId,
      });
    }
  });

  socket.on("end_call", (data) => {
    console.log("Call ended:", data);
    const { callerId, receiverId } = data;

    const userSocketMap = getUserSocketMap();
    const caller = userSocketMap.get(callerId);
    const receiver = userSocketMap.get(receiverId);

    if (caller) {
      io.to(caller.socketId).emit("call_ended", { receiverId });
    }

    if (receiver) {
      io.to(receiver.socketId).emit("call_ended", { callerId });
    }
  });
};

export const cleanupCallTimeouts = (userId) => {
  // Clean up call timeouts for this user
  for (const [callKey, timeout] of callTimeouts.entries()) {
    if (callKey.startsWith(`${userId}-`) || callKey.endsWith(`-${userId}`)) {
      clearTimeout(timeout);
      callTimeouts.delete(callKey);
    }
  }
};
