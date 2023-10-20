import {CreateAlbumDto} from "../../../common/dtos/CreateAlbum.dto";
import {Album} from "../../domain/Album";
import {AlbumSongs} from "../../domain/AlbumSongs";
import {UpdateAlbumDto} from "../../../common/dtos/UpdateAlbum.dto";
import {Song} from "../../domain/Song";
import {SearchSongDto} from "../../../common/dtos/SearchSong.dto";

export interface AlbumRepository {
    getAlbums(skip: number, take: number): Promise<{albums: (Album & {album_songs: number[]})[], totalCount: number}>
    createAlbum(dto: CreateAlbumDto): Promise<Album & {album_songs: number[]}>
    updateAlbum(album: UpdateAlbumDto): Promise<Album & {album_songs: number[]}>
    deleteAlbum(albumId: number): Promise<Album>
    addSongToAlbum(songId: number, albumId: number): Promise<AlbumSongs>
    deleteSongFromAlbum(songId: number, albumId: number): Promise<{song_id: number}>
    getAlbumById(albumId: number): Promise<Album & { songs: Song[] }>
    searchAlbum(dto: SearchSongDto): Promise<{albums: (Album & {album_songs: number[]})[], totalCount: number}>
}