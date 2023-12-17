-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRoles"[] DEFAULT ARRAY['USER']::"UserRoles"[],
    "avatar" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TokenSession" (
    "id" SERIAL NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "TokenSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Song" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "audio" TEXT NOT NULL,
    "description" TEXT,
    "artist" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MusicGenres" (
    "id" SERIAL NOT NULL,
    "song_id" INTEGER NOT NULL,
    "genre_id" INTEGER NOT NULL,

    CONSTRAINT "MusicGenres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genres" (
    "id" SERIAL NOT NULL,
    "genre" TEXT NOT NULL,

    CONSTRAINT "Genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAlbumFavorite" (
    "id" SERIAL NOT NULL,
    "album_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "UserAlbumFavorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Album" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "author" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "song_id" INTEGER NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Playlist" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Playlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlbumSongs" (
    "id" SERIAL NOT NULL,
    "album_id" INTEGER NOT NULL,
    "song_id" INTEGER NOT NULL,

    CONSTRAINT "AlbumSongs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlaylistSongs" (
    "id" SERIAL NOT NULL,
    "playlist_id" INTEGER NOT NULL,
    "song_id" INTEGER NOT NULL,

    CONSTRAINT "PlaylistSongs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailAuth" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "is_email_auth" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "EmailAuth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TokenSession_refreshToken_key" ON "TokenSession"("refreshToken");

-- CreateIndex
CREATE UNIQUE INDEX "Song_title_key" ON "Song"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Genres_genre_key" ON "Genres"("genre");

-- CreateIndex
CREATE UNIQUE INDEX "EmailAuth_user_id_key" ON "EmailAuth"("user_id");

-- AddForeignKey
ALTER TABLE "TokenSession" ADD CONSTRAINT "TokenSession_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MusicGenres" ADD CONSTRAINT "MusicGenres_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MusicGenres" ADD CONSTRAINT "MusicGenres_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "Genres"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAlbumFavorite" ADD CONSTRAINT "UserAlbumFavorite_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAlbumFavorite" ADD CONSTRAINT "UserAlbumFavorite_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlbumSongs" ADD CONSTRAINT "AlbumSongs_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlbumSongs" ADD CONSTRAINT "AlbumSongs_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistSongs" ADD CONSTRAINT "PlaylistSongs_playlist_id_fkey" FOREIGN KEY ("playlist_id") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistSongs" ADD CONSTRAINT "PlaylistSongs_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailAuth" ADD CONSTRAINT "EmailAuth_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
