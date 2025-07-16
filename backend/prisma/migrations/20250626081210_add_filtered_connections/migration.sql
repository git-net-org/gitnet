-- CreateEnum
CREATE TYPE "ConnectionStatus" AS ENUM ('PENDING', 'ACCEPTED', 'BLOCKED', 'REJECTED');

-- AlterTable
ALTER TABLE "Connections" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "FilteredConnections" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "connectedUserId" TEXT NOT NULL,
    "isConversationInvited" BOOLEAN NOT NULL DEFAULT false,
    "isPlatformInvited" BOOLEAN NOT NULL DEFAULT false,
    "isMutual" BOOLEAN NOT NULL,
    "isFollower" BOOLEAN NOT NULL,
    "isFollowing" BOOLEAN NOT NULL,
    "allowed" BOOLEAN NOT NULL DEFAULT false,
    "invitedBy" TEXT DEFAULT '',
    "connectedAt" TIMESTAMP(3),
    "connectionStatus" "ConnectionStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FilteredConnections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FilteredConnections_userId_connectedUserId_key" ON "FilteredConnections"("userId", "connectedUserId");

-- AddForeignKey
ALTER TABLE "FilteredConnections" ADD CONSTRAINT "FilteredConnections_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilteredConnections" ADD CONSTRAINT "FilteredConnections_connectedUserId_fkey" FOREIGN KEY ("connectedUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
