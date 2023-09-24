import {Song} from "@prisma/client";
import {CreateSongDto} from "../../../common/dtos/CreateSong.dto";
import {UpdateSongDto} from "../../../common/dtos/UpdateSong.dto";
import {IGenre} from "../../../common/types/Genre";

export interface SongRepository {
    createSong(dto: CreateSongDto, image: Express.Multer.File, audio: Express.Multer.File): Promise<Song>
    updateSong(dto: UpdateSongDto): Promise<Song>
    createSongGenre(genre: string): Promise<{id: number, genre: string}>
    getAllGenres(): Promise<{id: number, genre: string}[]>
    delete(id: number): Promise<Song>
    getAll(skip: number, take: number, userId?: string): Promise<{songs: (Song & {isLiked: boolean})[],  totalCount: number}>
    getTrackById(id: number): Promise<Song & { genre: IGenre[]}>
    getUserSongs(userId: string, skip: number, take: number): Promise<{songs: (Song & {isLiked: boolean})[],  totalCount: number}>
    addToFavorite(userId: string, songId: number): Promise<any>
    searchSong(query: string, skip: number, take: number, userId?: string): Promise<{songs: (Song & {isLiked: boolean})[],  totalCount: number}>
}