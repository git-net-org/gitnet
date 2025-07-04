import { PrismaClient } from "../../../generated/prisma/index.js";
const prisma = new PrismaClient();

/**
 * Save a message to the DB
 */
export const saveMessageToDB = async ({ senderId, receiverId, content, connectionId }) => {
  console.log(senderId, receiverId)
    if (!senderId || !receiverId || !content || !connectionId) {
    throw new Error("Missing required fields to save message");
  }

  const saved = await prisma.messages.create({
    data: {
      senderId,
      receiverId,
      content,
      connectionId,
    },
  });

  return saved;
};