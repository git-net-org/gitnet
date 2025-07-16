import { getUserConnections } from '../functions/connections/getUserConnections.js';
import { syncFilteredConnections } from '../functions/connections/syncFilteredConnections.js';
import { syncGitHubConnections } from '../functions/connections/syncGitHubConnections.js';
import { PrismaClient } from '../generated/prisma/index.js';
import { getSocketInstance } from '../functions/sockets/initialiseSocket.js';
import { getUserSocketMap } from '../functions/socketHandler.js';

const prisma = new PrismaClient();

export const getUser = async (req, res) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ user });
  } catch (err) {
    console.error("Error fetching user:", err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getContacts = async (req, res) => {
  const yourUserId = req.user.userId;
  
  const connections = await getUserConnections(yourUserId);
  console.log(connections)

  res.status(200).json({ connections, message: "Connections synced" });
};

export const refreshContacts = async (req, res) => {
  const yourUserId = req.user.userId;
  const yourUsername = req.user.username;

  try {
    await syncGitHubConnections(yourUserId, yourUsername);
    await syncFilteredConnections(yourUserId);
    const connections = await getUserConnections(yourUserId);
    console.log(connections)

    res.status(200).json({ connections, message: "Connections synced" });
  } catch (error) {
    if (error.message === "GitHub API access denied. Please re-authenticate.") {
      res.status(401).json({ 
        error: "GitHub authentication required", 
        message: "Please log in again to refresh your GitHub permissions.",
        needsReauth: true 
      });
    } else {
      console.error("Error refreshing contacts:", error);
      res.status(500).json({ error: "Failed to refresh contacts" });
    }
  }
};

export const handleAcceptingInvite = async (req, res) => {
  try {
    const connectionId = req.params.connectionId;
    const currentUserId = req.user?.userId;

    if (!connectionId) {
      return res.status(400).json({ error: "Connection ID is required" });
    }
    if (!currentUserId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const connection = await prisma.filteredConnections.findUnique({
      where: { id: connectionId },
      include: {
        user: true,
        connectedUser: true
      }
    });

    if (!connection) {
      return res.status(404).json({ error: "Connection not found" });
    }

    const updatedConnection = await prisma.filteredConnections.updateMany({
      where: {
        id: connectionId,
      },
      data: {
        allowed: true,
        connectionStatus: "ACCEPTED",
        connectedAt: new Date(),
      },
    });

    if (updatedConnection.count === 0) {
      return res.status(404).json({ error: "Connection not found" });
    }

    // Emit socket events to both users
    const io = getSocketInstance();
    const userSocketMap = getUserSocketMap();
    
    if (io && userSocketMap) {
      
      const inviterSocketInfo = userSocketMap.get(connection.userId);
      if (inviterSocketInfo) {
        io.to(inviterSocketInfo.socketId).emit("invitation_accepted", { connectionId });
      }
      
      // Notify the person who accepted the invitation
      const accepterSocketInfo = userSocketMap.get(connection.connectedUserId);
      if (accepterSocketInfo) {
        io.to(accepterSocketInfo.socketId).emit("invitation_accepted", { connectionId });
      }
    }

    return res.status(200).json({
      message: "Invitation accepted successfully",
      connectionId,
    });
  } catch (err) {
    console.error("Error accepting invite:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};



