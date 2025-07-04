import { getUserConnections } from '../functions/getUserConnections.js';
import { syncGitHubConnections } from '../functions/syncGitHubConnections.js';
import { PrismaClient } from '../generated/prisma/index.js';
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
        // add any other fields you want
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

  res.status(200).json({ connections, message: "Connections synced" });
};

export const refreshContacts = async (req, res) => {
  const yourUserId = req.user.userId;
  const yourUsername = req.user.username;

  await syncGitHubConnections(yourUserId, yourUsername);

  const connections = await getUserConnections(yourUserId);

  res.status(200).json({ connections, message: "Connections synced" });
};


