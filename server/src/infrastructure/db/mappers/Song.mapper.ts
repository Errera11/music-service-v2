import {Favorite, Genres, Song as SongEntity} from "@prisma/client";
import {Song} from "../../../core/domain/Song";
import {Injectable} from "@nestjs/common";

@Injectable()
export class SongMapper {
    songEntityToDomain(dto: (SongEntity &
        { genre: ({ genre: Genres })[] } &
        { favorite?: Favorite[] })): Song {
        return {
            ...dto,
            genre: dto.genre.map(genre => genre.genre),
            isLiked: !!dto?.favorite[0]?.id
        }
    }

    songEntitiesToDomains(dto: {song: (SongEntity &
        { genre: ({ genre: Genres })[] } &
        { favorite?: Favorite[] })}[]): Song[] {
        return dto.map(({song}) => ({
            ...song,
            genre: song.genre.map(genre => genre.genre),
            isLiked: !!song?.favorite[0]?.id
        }))
    }
}