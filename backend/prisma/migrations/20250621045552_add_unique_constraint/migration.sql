/*
  Warnings:

  - A unique constraint covering the columns `[userId,connectionId]` on the table `Connections` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Connections_userId_connectionId_key" ON "Connections"("userId", "connectionId");
