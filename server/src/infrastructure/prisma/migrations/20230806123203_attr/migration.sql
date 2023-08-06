/*
  Warnings:

  - The primary key for the `Album` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Album` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `AlbumSongs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `AlbumSongs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `EmailAuth` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `EmailAuth` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Favorite` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Favorite` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Playlist` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Playlist` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `PlaylistSongs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `PlaylistSongs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Song` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Song` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `album_id` on the `AlbumSongs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `song_id` on the `AlbumSongs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `song_id` on the `Favorite` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `playlist_id` on the `PlaylistSongs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `song_id` on the `PlaylistSongs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "AlbumSongs" DROP CONSTRAINT "AlbumSongs_album_id_fkey";

-- DropForeignKey
ALTER TABLE "AlbumSongs" DROP CONSTRAINT "AlbumSongs_song_id_fkey";

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_song_id_fkey";

-- DropForeignKey
ALTER TABLE "PlaylistSongs" DROP CONSTRAINT "PlaylistSongs_playlist_id_fkey";

-- DropForeignKey
ALTER TABLE "PlaylistSongs" DROP CONSTRAINT "PlaylistSongs_song_id_fkey";

-- AlterTable
ALTER TABLE "Album" DROP CONSTRAINT "Album_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Album_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "AlbumSongs" DROP CONSTRAINT "AlbumSongs_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "album_id",
ADD COLUMN     "album_id" INTEGER NOT NULL,
DROP COLUMN "song_id",
ADD COLUMN     "song_id" INTEGER NOT NULL,
ADD CONSTRAINT "AlbumSongs_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "EmailAuth" DROP CONSTRAINT "EmailAuth_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "EmailAuth_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "song_id",
ADD COLUMN     "song_id" INTEGER NOT NULL,
ADD CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Playlist" DROP CONSTRAINT "Playlist_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Playlist_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "PlaylistSongs" DROP CONSTRAINT "PlaylistSongs_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "playlist_id",
ADD COLUMN     "playlist_id" INTEGER NOT NULL,
DROP COLUMN "song_id",
ADD COLUMN     "song_id" INTEGER NOT NULL,
ADD CONSTRAINT "PlaylistSongs_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Song" DROP CONSTRAINT "Song_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Song_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlbumSongs" ADD CONSTRAINT "AlbumSongs_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlbumSongs" ADD CONSTRAINT "AlbumSongs_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistSongs" ADD CONSTRAINT "PlaylistSongs_playlist_id_fkey" FOREIGN KEY ("playlist_id") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistSongs" ADD CONSTRAINT "PlaylistSongs_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
