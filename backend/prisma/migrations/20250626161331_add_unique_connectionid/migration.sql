/*
  Warnings:

  - A unique constraint covering the columns `[connectionId]` on the table `FilteredConnections` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FilteredConnections_connectionId_key" ON "FilteredConnections"("connectionId");
