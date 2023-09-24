import {CreateAlbumDto} from "../../../common/dtos/CreateAlbum.dto";
import {Album} from "../../domain/Album";

export interface AlbumRepository {
    createAlbum(dto: CreateAlbumDto): Promise<Album>
    updateAlbum(album: Album): Promise<Album>
    deleteAlbum(albumId: number): Promise<Album>
    addSongToAlbum(songId: number, albumId: number): Promise<{song_id: number}>
    deleteSongFromAlbum(songId: number, albumId: number): Promise<{song_id: number}>
}