import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();


function normalizeUserPair(a, b) {
  return a < b ? [a, b] : [b, a];
}

function formatConnectionView(row, currentUserId) {
  const isUser = row.userId === currentUserId;

  return {
    id: row.id,
    connectionId: row.connectionId,
    user: isUser ? row.user : row.connectedUser,
    connectedUser: isUser ? row.connectedUser : row.user,
    isFollower: isUser ? row.isFollower : row.isFollowing,
    isFollowing: isUser ? row.isFollowing : row.isFollower,
    isMutual: row.isMutual,
    allowed: row.allowed,
    invitedBy: row.invitedBy,
    isConversationInvited: row.isConversationInvited,
    isPlatformInvited: row.isPlatformInvited,
    connectionStatus: row.connectionStatus,
    connectedAt: row.connectedAt,
    createdAt: row.createdAt
  };
}

export const syncFilteredConnections = async (yourUserId) => {
  const rawConnections = await prisma.connections.findMany({
    where: {
      OR: [
        { userId: yourUserId },
        { connectionId: yourUserId }
      ]
    }
  });

  const userIdSet = new Set();
  rawConnections.forEach(conn => {
    if (conn.userId !== yourUserId) userIdSet.add(conn.userId);
    if (conn.connectionId !== yourUserId) userIdSet.add(conn.connectionId);
  });

  for (const otherUserId of userIdSet) {
    const [userA, userB] = normalizeUserPair(yourUserId, otherUserId);
    const isFollowing = rawConnections.some(c => c.userId === yourUserId && c.connectionId === otherUserId);
    const isFollower  = rawConnections.some(c => c.userId === otherUserId && c.connectionId === yourUserId);
    const isMutual    = isFollowing && isFollower;

    const connectionRecord = rawConnections.find(
      c => (c.userId === userA && c.connectionId === userB) || (c.userId === userB && c.connectionId === userA)
    );

    const existing = await prisma.filteredConnections.findUnique({
      where: {
        userId_connectedUserId: {
          userId: userA,
          connectedUserId: userB
        }
      }
    });

    if (!existing) {
      await prisma.filteredConnections.create({
        data: {
          userId: userA,
          connectedUserId: userB,
          connectionId: connectionRecord?.id ?? "",
          isFollowing,
          isFollower,
          isMutual,
          allowed: false,
          invitedBy: "",
          isConversationInvited: false,
          isPlatformInvited: false,
          connectionStatus: "PENDING"
        }
      });
    } else {
      const needsUpdate = (
        existing.isFollowing !== isFollowing ||
        existing.isFollower !== isFollower ||
        existing.isMutual !== isMutual
      );

      if (needsUpdate) {
        await prisma.filteredConnections.update({
          where: {
            userId_connectedUserId: {
              userId: userA,
              connectedUserId: userB
            }
          },
          data: {
            isFollowing,
            isFollower,
            isMutual
          }
        });
      }
    }
  }

  const all = await prisma.filteredConnections.findMany({
    where: {
      OR: [
        { userId: yourUserId },
        { connectedUserId: yourUserId }
      ]
    },
    include: {
      user: {
        select: { id: true, username: true, avatar: true }
      },
      connectedUser: {
        select: { id: true, username: true, avatar: true }
      }
    },
    orderBy: {
      connectedAt: 'desc'
    }
  });

  const processed = all.map((entry) => formatConnectionView(entry, yourUserId));

  return processed;
};
