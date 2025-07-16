import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

export const getMessages = async (req, res) => {
  const { connectionId } = req.params;

  try {
    const messages = await prisma.messages.findMany({
      where: { connectionId },
      orderBy: { sentAt: "asc" },
      select: {
        senderId: true,
        receiverId: true,
        content: true,
        connectionId: true,
        sentAt: true,
      },
    });

    res.json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};
