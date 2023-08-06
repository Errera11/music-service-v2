/*
  Warnings:

  - Added the required column `is_auth` to the `EmailAuth` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmailAuth" ADD COLUMN     "is_auth" BOOLEAN NOT NULL;
