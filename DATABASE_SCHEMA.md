# 📊 Database Schema - GitNet

Quick reference for understanding the GitNet database structure.

## �️ Complete Schema

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum ConnectionStatus {
  PENDING
  ACCEPTED
  BLOCKED
  REJECTED
}

model User {
  id             String   @id @default(uuid())
  githubId       String   @unique
  username       String   @unique
  avatar         String
  email          String   @unique
  githubToken    String?
  createdAt      DateTime @default(now())

  connectionsInitiated Connections[] @relation("UserConnectionsInitiated")
  connectionsReceived  Connections[] @relation("UserConnectionsReceived")

  filteredConnections     FilteredConnections[] @relation("UserFilteredConnections")
  filteredConnectionsToMe FilteredConnections[] @relation("ConnectedUserFilteredConnections")

  sentMessages     Messages[] @relation("SentMessages")
  receivedMessages Messages[] @relation("ReceivedMessages")
}

model Connections {
  id            String   @id @default(uuid())
  userId        String
  connectionId  String

  user          User     @relation("UserConnectionsInitiated", fields: [userId], references: [id])
  connectedUser User     @relation("UserConnectionsReceived", fields: [connectionId], references: [id])

  createdAt     DateTime @default(now())

  @@unique([userId, connectionId])
}

model FilteredConnections {
  id                    String   @id @default(uuid())
  userId                String
  connectedUserId       String  
  connectionId          String?  @unique

  isConversationInvited Boolean @default(false)
  isPlatformInvited     Boolean @default(false)

  isMutual              Boolean
  isFollower            Boolean
  isFollowing           Boolean
  allowed               Boolean @default(false)

  invitedBy             String?  @default("")
  connectedAt           DateTime?
  connectionStatus      ConnectionStatus @default(PENDING)

  createdAt             DateTime @default(now())

  user             User @relation("UserFilteredConnections", fields: [userId], references: [id])
  connectedUser    User @relation("ConnectedUserFilteredConnections", fields: [connectedUserId], references: [id])

  @@unique([userId, connectedUserId])
}

model Messages {
  id           String   @id @default(uuid())
  connectionId String
  senderId     String
  receiverId   String
  content      String
  sentAt       DateTime @default(now())

  sender       User     @relation("SentMessages", fields: [senderId], references: [id])
  receiver     User     @relation("ReceivedMessages", fields: [receiverId], references: [id])
}
```

## 📋 Quick Setup

1. **Copy schema** above to `backend/prisma/schema.prisma`
2. **Install dependencies**: `pnpm install`
3. **Generate client**: `npx prisma generate`
4. **Run migrations**: `npx prisma migrate deploy`
5. **View data**: `npx prisma studio`

## 🔍 Schema Explained

### � User Table
**Purpose**: Stores GitHub user profiles
- `id` - Unique identifier
- `githubId` - GitHub user ID
- `username` - GitHub username
- `avatar` - Profile picture URL
- `email` - GitHub email
- `githubToken` - Access token (optional)
- `createdAt` - Account creation time

### 🔗 Connections Table
**Purpose**: Simple user-to-user connections
- `userId` - Who initiated the connection
- `connectionId` - Who received the connection
- `createdAt` - When connection was made

### 🔍 FilteredConnections Table
**Purpose**: Advanced GitHub-based connections with permissions
- `userId` / `connectedUserId` - The two users
- `connectionId` - Optional unique identifier
- `isConversationInvited` - Invited to chat
- `isPlatformInvited` - Invited to platform
- `isMutual` - Mutual GitHub followers
- `isFollower` / `isFollowing` - GitHub follow status
- `allowed` - Connection permitted
- `connectionStatus` - PENDING/ACCEPTED/BLOCKED/REJECTED
- `invitedBy` - Who sent invitation
- `connectedAt` - When connection was established

### 💬 Messages Table
**Purpose**: Chat messages between users
- `connectionId` - Which connection this message belongs to
- `senderId` / `receiverId` - Who sent/received
- `content` - Message text
- `sentAt` - When message was sent

## 🎯 Key Features

- **GitHub Integration**: All user data comes from GitHub
- **Connection Management**: Users can connect based on GitHub relationships
- **Real-time Messaging**: Chat between connected users
- **Permission System**: Users control who can connect to them

---

**Need setup help?** Check [DATABASE_SETUP.md](DATABASE_SETUP.md) for detailed instructions.
