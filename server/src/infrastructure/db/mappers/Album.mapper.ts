import {Album as AlbumEntity, Favorite, Genres, Song, UserAlbumFavorite} from "@prisma/client";
import {Album} from "../../../core/domain/Album";
import {Injectable} from "@nestjs/common";

@Injectable()
export class AlbumMapper {
    albumEntityToDomain(album: AlbumEntity &
        {album_songs?: ({song: Song & {genre: {genre: Genres}[]} & { favorite: Favorite[] }})[]} &
        { user_album_favorite?: UserAlbumFavorite[]}): Album {
        return {
            ...album,
            album_songs: album.album_songs.map(song => ({
                ...song.song,
                isLiked: !!song.song.favorite[0].id,
                genre: song.song.genre.map(genre => genre.genre)
            })) || [],
            isLiked: !!album.user_album_favorite[0]?.id
        }
    }

}