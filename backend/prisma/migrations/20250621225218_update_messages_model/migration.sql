/*
  Warnings:

  - Added the required column `connectionId` to the `Messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Messages" ADD COLUMN     "connectionId" TEXT NOT NULL;
