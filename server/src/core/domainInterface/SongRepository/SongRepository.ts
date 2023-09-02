import {Song} from "@prisma/client";
import {CreateSongDto} from "../../../common/dtos/CreateSong.dto";

export interface SongRepository {
    createSong(dto: CreateSongDto, image: Express.Multer.File, audio: Express.Multer.File): Promise<Song>
    delete(id: number): Promise<Song>
    getAll(skip: number, take: number): Promise<Song[]>
    getTrackById(id: number): Promise<Song>
    getUserSongs(userId: string, skip: number, take: number): Promise<Song[]>
    addToFavorite(userId: string, songId: number): Promise<any>
    searchSong(query: string, skip: number, take: number): Promise<Song[]>
}