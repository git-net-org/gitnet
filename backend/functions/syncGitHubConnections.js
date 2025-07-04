// syncGitHubConnections.js
import axios from "axios";
import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();

export const syncGitHubConnections = async (yourUserId, yourUsername) => {
  const [followersRes, followingRes] = await Promise.all([
    axios.get(`https://api.github.com/users/${yourUsername}/followers`),
    axios.get(`https://api.github.com/users/${yourUsername}/following`)
  ]);

  const followers = followersRes.data.map(f => f.login);
  const following = followingRes.data.map(f => f.login);
  const allUsernames = [...new Set([...followers, ...following])];

  const localUsers = await prisma.user.findMany({
    where: { username: { in: allUsernames } }
  });

  const connectionsToCreate = [];

  for (const user of localUsers) {
    if (following.includes(user.username)) {
      connectionsToCreate.push({ userId: yourUserId, connectionId: user.id });
    }
    if (followers.includes(user.username)) {
      connectionsToCreate.push({ userId: user.id, connectionId: yourUserId });
    }
  }
  await prisma.connections.deleteMany({
    where: {
      OR: [
        { userId: yourUserId },
        { connectionId: yourUserId }
      ]
    }
  });

  await prisma.connections.createMany({
    data: connectionsToCreate,
    skipDuplicates: true,
  });
};
