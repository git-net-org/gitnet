/**
 * Message Handler
 * Handles sending and receiving messages
 */

import { saveMessageToDB } from "../socketHelpers/saveMessagetoDB.js";
import { getUserSocketMap } from "./userRegistrationHandler.js";

export const handleMessages = (socket, io) => {
  socket.on("send_message", async (data) => {
    console.log("Receiver message:", data.receiverId);
    const res = await saveMessageToDB({ ...data });
    const userSocketMap = getUserSocketMap();
    const receiver = userSocketMap.get(data.receiverId);

    if (receiver) {
      io.to(receiver.socketId).emit("message_received", {
        ...data,
        connectionId: data.connectionId,
      });
    }
  });
};
