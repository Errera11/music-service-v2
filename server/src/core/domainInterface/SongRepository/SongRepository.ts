import {Song} from "@prisma/client";
import {CreateSongDto} from "../../../common/dtos/CreateSong.dto";
import {SongWithAudio} from "../../domain/Song";

export interface SongRepository {
    createSong(dto: CreateSongDto, image: Express.Multer.File, audio: Express.Multer.File): Promise<Song>
    delete(id: string): Promise<Song>
    getAll(): Promise<Song[]>
    getTrackById(id: string): Promise<SongWithAudio>
    getUserSongs(userId: string): Promise<Song[]>
}