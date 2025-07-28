/**
 * Invitation Handler
 * Handles connection invitations
 */

import { PrismaClient } from "../../../generated/prisma/index.js";
import { getUserSocketMap } from "./userRegistrationHandler.js";

export const handleInvitations = (socket, io) => {
  const prisma = new PrismaClient();

  socket.on("invitation_sent", async (data) => {
    console.log(" Invite received via socket:", data);

    const { connectionId, invitedBy, receiverId } = data;

    if (!connectionId || !invitedBy) {
      console.error("Missing data fields in invitation_sent event");
      return;
    }

    try {
      await prisma.filteredConnections.update({
        where: { id: connectionId },
        data: {
          invitedBy,
          isConversationInvited: true,
        },
      });
      console.log("FilteredConnection updated successfully for invite");

      socket.emit("invitation_sent_success", { connectionId });

      if (receiverId) {
        const userSocketMap = getUserSocketMap();
        const receiver = userSocketMap.get(receiverId);
        if (receiver) {
          io.to(receiver.socketId).emit("invitation_received", { connectionId });
        }
      }
    } catch (err) {
      console.error("Error updating FilteredConnection:", err);
      socket.emit("invitation_sent_error", { error: err.message });
    }
  });
};
