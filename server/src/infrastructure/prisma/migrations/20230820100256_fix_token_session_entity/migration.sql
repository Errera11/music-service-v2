/*
  Warnings:

  - You are about to drop the `Token` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_user_id_fkey";

-- DropTable
DROP TABLE "Token";

-- CreateTable
CREATE TABLE "TokenSession" (
    "id" SERIAL NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "TokenSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TokenSession_refreshToken_key" ON "TokenSession"("refreshToken");

-- AddForeignKey
ALTER TABLE "TokenSession" ADD CONSTRAINT "TokenSession_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
