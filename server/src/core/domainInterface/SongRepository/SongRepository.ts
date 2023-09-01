import {Song} from "@prisma/client";
import {CreateSongDto} from "../../../common/dtos/CreateSong.dto";

export interface SongRepository {
    createSong(dto: CreateSongDto, image: Express.Multer.File, audio: Express.Multer.File): Promise<Song>
    delete(id: number): Promise<Song>
    getAll(): Promise<Song[]>
    getTrackById(id: number): Promise<Song>
    getUserSongs(userId: string): Promise<Song[]>
    addToFavorite(userId: string, songId: number): Promise<any>
}