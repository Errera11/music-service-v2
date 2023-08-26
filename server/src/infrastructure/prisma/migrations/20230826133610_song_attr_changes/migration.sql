/*
  Warnings:

  - The primary key for the `Song` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Song` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `song_id` on the `AlbumSongs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `song_id` on the `Favorite` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `song_id` on the `PlaylistSongs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "AlbumSongs" DROP CONSTRAINT "AlbumSongs_song_id_fkey";

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_song_id_fkey";

-- DropForeignKey
ALTER TABLE "PlaylistSongs" DROP CONSTRAINT "PlaylistSongs_song_id_fkey";

-- AlterTable
ALTER TABLE "AlbumSongs" DROP COLUMN "song_id",
ADD COLUMN     "song_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Favorite" DROP COLUMN "song_id",
ADD COLUMN     "song_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PlaylistSongs" DROP COLUMN "song_id",
ADD COLUMN     "song_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Song" DROP CONSTRAINT "Song_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Song_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlbumSongs" ADD CONSTRAINT "AlbumSongs_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistSongs" ADD CONSTRAINT "PlaylistSongs_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
