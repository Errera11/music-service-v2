import {Song} from "@prisma/client";
import {CreateSongDto} from "../../../common/dtos/CreateSong.dto";

export interface SongRepository {
    createSong(dto: CreateSongDto, image: Express.Multer.File, audio: Express.Multer.File): Promise<Song>
    delete(id: string): Promise<Song>
    getAll(): Promise<Song[]>
    getTrackAudio(id: string)
}