/*
  Warnings:

  - You are about to drop the column `is_auth` on the `EmailAuth` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EmailAuth" DROP COLUMN "is_auth",
ADD COLUMN     "is_email_auth" BOOLEAN NOT NULL DEFAULT false;
