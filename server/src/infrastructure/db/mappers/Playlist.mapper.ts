import {Injectable} from "@nestjs/common";
import {Favorite, Playlist, Song as SongEntity, Genres} from "@prisma/client";
import {Song} from "../../../core/domain/Song";

@Injectable()
export class PlaylistMapper {
    playlistEntityToDomain(dto: Playlist & {playlist_songs: ({song: SongEntity & { favorite: Favorite[] } & {genre: {genre: Genres}[]}})[]}): Playlist & { playlist_songs: Song[] } {
        return {
            ...dto,
            playlist_songs: dto.playlist_songs.map(songObj => ({
                ...songObj.song,
                isLiked: !!songObj.song.favorite[0]?.id,
                genre: songObj.song.genre.map(genre => genre.genre)
            }))
        }
    }
}