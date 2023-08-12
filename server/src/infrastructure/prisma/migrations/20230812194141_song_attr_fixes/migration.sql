/*
  Warnings:

  - The primary key for the `Song` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "AlbumSongs" DROP CONSTRAINT "AlbumSongs_song_id_fkey";

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_song_id_fkey";

-- DropForeignKey
ALTER TABLE "PlaylistSongs" DROP CONSTRAINT "PlaylistSongs_song_id_fkey";

-- AlterTable
ALTER TABLE "AlbumSongs" ALTER COLUMN "song_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Favorite" ALTER COLUMN "song_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "PlaylistSongs" ALTER COLUMN "song_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Song" DROP CONSTRAINT "Song_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Song_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Song_id_seq";

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlbumSongs" ADD CONSTRAINT "AlbumSongs_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistSongs" ADD CONSTRAINT "PlaylistSongs_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
