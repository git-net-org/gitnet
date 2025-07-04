import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();

export const getUserConnections = async (yourUserId) => {
  // Fetch all connections where current user is either userId or connectionId
  const allConnections = await prisma.connections.findMany({
    where: {
      OR: [
        { userId: yourUserId },
        { connectionId: yourUserId }
      ]
    }
  });

  // Pre-fetch your own user data
  const reqUser = await prisma.user.findUnique({
    where: { id: yourUserId },
    select: { id: true, username: true, avatar: true }
  });

  const seen = new Set();
  const results = [];

  for (const conn of allConnections) {
    const A = conn.userId;
    const B = conn.connectionId;

    // Skip if this pair is already handled
    const key = [A, B].sort().join("-");
    if (seen.has(key)) continue;
    seen.add(key);

    // Check if reverse connection exists (mutual)
    const reverse = allConnections.find(c => c.userId === B && c.connectionId === A);
    const isMutual = Boolean(reverse);

    // Identify who the "other" user is in this connection
    const otherUserId = A === yourUserId ? B : A;

    const otherUser = await prisma.user.findUnique({
      where: { id: otherUserId },
      select: { id: true, username: true, avatar: true }
    });

    if (otherUser) {
      results.push({
        id: conn.id,
        userId: conn.userId,
        connectionId: conn.connectionId,
        user:  otherUser,
        connectedUser: reqUser,
        isMutual
      });
    }
  }

  return results;
};
