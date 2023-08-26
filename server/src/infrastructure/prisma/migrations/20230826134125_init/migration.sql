/*
  Warnings:

  - Added the required column `audio` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "audio" TEXT NOT NULL;
