import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();

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

export const getUserConnections = async (yourUserId) => {
  const filteredRows = await prisma.filteredConnections.findMany({
    where: {
      OR: [
        { userId: yourUserId },
        { connectedUserId: yourUserId }
      ]
    },
    include: {
      user: { select: { id: true, username: true, avatar: true } },
      connectedUser: { select: { id: true, username: true, avatar: true } }
    },
    orderBy: {
      connectedAt: 'desc'
    }
  });

  return filteredRows.map(row => formatConnectionView(row, yourUserId));
};
