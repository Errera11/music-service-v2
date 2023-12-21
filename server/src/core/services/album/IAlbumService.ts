import {Album} from "../../domain/Album";
import {Song} from "../../domain/Song";
import {GetItemsListDto} from "../../../common/dtos/GetItemsList.dto";
import {CreateAlbumDto} from "../../../common/dtos/infrastructureDto/albumDto/CreateAlbum.dto";
import {UpdateAlbumDto} from "../../../common/dtos/infrastructureDto/albumDto/UpdateAlbum.dto";
import {SearchUserItemsDto} from "../../../common/dtos/SearchUserItems.dto";
import {CreatePlaylistDto} from "../../../common/dtos/repositoryDto/playlistDto/CreatePlaylist.dto";
import {Playlist} from "../../domain/Playlist";
import {SearchUserItemDto} from "../../../common/dtos/SearchUserItem.dto";
import {UpdatePlaylistDto} from "../../../common/dtos/repositoryDto/playlistDto/UpdatePlaylist.dto";
import {SearchParentItems} from "../../../common/dtos/SearchParentItems";
import {SearchUserItemDto} from "../../../../dist/common/dtos/SearchUserItem.dto";


export interface IAlbumService {
    getAlbums(dto: SearchUserItemsDto): Promise<GetItemsListDto<Omit<Album, 'album_songs'>>>
    createAlbum(dto: CreateAlbumDto): Promise<Album>
    updateAlbum(album: UpdateAlbumDto): Promise<Album>
    deleteAlbum(albumId: number): Promise<Omit<Album, 'album_songs'>>
    addSongToAlbum(songId: number, albumId: number): Promise<Song>
    deleteSongFromAlbum(songId: number, albumId: number): Promise<Song>
    getAlbumById(albumId: number): Promise<Album>

    createPlaylist(dto: CreatePlaylistDto): Promise<Playlist>
    deletePlaylist(dto: SearchUserItemDto): Promise<Playlist>
    addSongToPlaylist(dto: SearchUserItemDto & {songId: number}): Promise<Song>
    removeSongFromPlaylist(dto: SearchUserItemDto & {songId: number}): Promise<Song>
    updatePlaylist(dto: UpdatePlaylistDto): Promise<Playlist>
    searchPlaylistSongs(dto: SearchUserItemDto): Promise<GetItemsListDto<Song>>
    getPlaylistSongs(dto: SearchParentItems): Promise<GetItemsListDto<Song>>
    getUserPlaylists(dto: SearchParentItems): Promise<GetItemsListDto<Playlist>>
    getPlaylistById(dto: SearchParentItems): Promise<Playlist & {playlist_songs: Song[]}>
}