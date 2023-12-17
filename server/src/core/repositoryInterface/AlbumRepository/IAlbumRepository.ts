import {CreateAlbumDto} from "../../../common/dtos/repositoryDto/albumDto/CreateAlbum.dto";
import {Album} from "../../domain/Album";
import {Song} from "../../domain/Song";
import {GetItemsListDto} from "../../../common/dtos/GetItemsList.dto";
import {UpdateAlbumDto} from "../../../common/dtos/repositoryDto/albumDto/UpdateAlbum.dto";
import {SearchUserItemDto} from "../../../common/dtos/SearchUserItem.dto";


export interface IAlbumRepository {
    getAlbums(dto: SearchUserItemDto): Promise<GetItemsListDto<Omit<Album, 'album_songs'>>>
    createAlbum(dto: CreateAlbumDto): Promise<Album>
    updateAlbum(album: UpdateAlbumDto): Promise<Album>
    deleteAlbum(albumId: number): Promise<Omit<Album, 'album_songs'>>
    addSongToAlbum(songId: number, albumId: number): Promise<Song>
    deleteSongFromAlbum(songId: number, albumId: number): Promise<Song>
    getAlbumById(albumId: number): Promise<Album>
}