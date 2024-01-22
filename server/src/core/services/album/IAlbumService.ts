import {Album} from "../../domain/Album";
import {Song} from "../../domain/Song";
import {GetItemsListDto} from "../../../common/dtos/GetItemsList.dto";
import {CreateAlbumDto} from "../../../common/dtos/infrastructureDto/albumDto/CreateAlbum.dto";
import {UpdateAlbumDto} from "../../../common/dtos/infrastructureDto/albumDto/UpdateAlbum.dto";
import {GetUserItemsDto} from "../../../common/dtos/GetUserItems.dto";

export interface IAlbumService {
    getAlbums(dto: GetUserItemsDto): Promise<GetItemsListDto<Omit<Album, 'album_songs'>>>
    createAlbum(dto: CreateAlbumDto): Promise<Album>
    updateAlbum(album: UpdateAlbumDto): Promise<Album>
    deleteAlbum({albumId}: { albumId: number }): Promise<Omit<Album, 'album_songs'>>
    addSongToAlbum({songId, albumId}: { songId: number, albumId: number }): Promise<Song>
    deleteSongFromAlbum({songId, albumId}: {songId: number, albumId: number}): Promise<Song>
    getAlbumById({albumId}: {albumId: number}): Promise<Album>
}