/*
  Warnings:

  - You are about to drop the column `audio` on the `Song` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Song_audio_key";

-- AlterTable
ALTER TABLE "Song" DROP COLUMN "audio";
