import axios from "axios";
import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();

export const syncGitHubConnections = async (yourUserId, yourUsername) => {
  let followers = [];
  let following = [];
  
  // Get the user's GitHub token from the database
  const user = await prisma.user.findUnique({
    where: { id: yourUserId },
    select: { githubToken: true }
  });

  if (!user || !user.githubToken) {
    console.error("No GitHub token found for user");
    throw new Error("GitHub token not available. Please re-authenticate.");
  }

  const headers = {
    Authorization: `token ${user.githubToken}`,
    Accept: 'application/json'
  };
  
  try {
    console.log(`Syncing GitHub connections for user: ${yourUsername}`);
    
    const [followersRes, followingRes] = await Promise.all([
      axios.get(`https://api.github.com/users/${yourUsername}/followers`, { headers }),
      axios.get(`https://api.github.com/users/${yourUsername}/following`, { headers }),
    ]);

    followers = followersRes.data.map((f) => f.login);
    following = followingRes.data.map((f) => f.login);
    
    console.log(`Found ${followers.length} followers and ${following.length} following`);
  } catch (error) {
    if (error.response?.status === 403) {
      console.error("GitHub API access denied:");
      console.error("Status:", error.response?.status);
      console.error("Headers:", error.response?.headers);
      console.error("Error details:", error.response?.data);
      
      // Check if it's rate limiting
      if (error.response?.headers['x-ratelimit-remaining'] === '0') {
        const resetTime = new Date(error.response?.headers['x-ratelimit-reset'] * 1000);
        throw new Error(`GitHub API rate limit exceeded. Resets at ${resetTime}`);
      }
      
      throw new Error("GitHub API access denied. Token may be expired or invalid. Please re-authenticate.");
    }
    console.error("Unexpected error:", error.message);
    throw error;
  }

  const allUsernames = [...new Set([...followers, ...following])];

  const localUsers = await prisma.user.findMany({
    where: { username: { in: allUsernames } },
  });

  const usernameToIdMap = new Map(
    localUsers.map((user) => [user.username, user.id])
  );

  const existingConnections = await prisma.connections.findMany({
    where: {
      OR: [
        { userId: yourUserId },
        { connectionId: yourUserId },
      ],
    },
  });

  const existingOutgoing = new Set(
    existingConnections
      .filter((conn) => conn.userId === yourUserId)
      .map((conn) => conn.connectionId)
  );

  const existingIncoming = new Set(
    existingConnections
      .filter((conn) => conn.connectionId === yourUserId)
      .map((conn) => conn.userId)
  );

  const desiredOutgoing = new Set(
    following.map((username) => usernameToIdMap.get(username)).filter(Boolean)
  );

  const desiredIncoming = new Set(
    followers.map((username) => usernameToIdMap.get(username)).filter(Boolean)
  );

  const outgoingToAdd = [...desiredOutgoing].filter((id) => !existingOutgoing.has(id));
  const outgoingToRemove = [...existingOutgoing].filter((id) => !desiredOutgoing.has(id));

  const incomingToAdd = [...desiredIncoming].filter((id) => !existingIncoming.has(id));
  const incomingToRemove = [...existingIncoming].filter((id) => !desiredIncoming.has(id));

  const connectionsToCreate = [
    ...outgoingToAdd.map((id) => ({ userId: yourUserId, connectionId: id })),
    ...incomingToAdd.map((id) => ({ userId: id, connectionId: yourUserId })),
  ];

  if (connectionsToCreate.length > 0) {
    await prisma.connections.createMany({
      data: connectionsToCreate,
      skipDuplicates: true,
    });
  }

  await prisma.connections.deleteMany({
    where: {
      OR: [
        { userId: yourUserId, connectionId: { in: outgoingToRemove } },
        { userId: { in: incomingToRemove }, connectionId: yourUserId },
      ],
    },
  });

  console.log("GitHub connections synced successfully.");
};
