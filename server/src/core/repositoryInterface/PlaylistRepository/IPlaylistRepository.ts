import {Song} from "../../domain/Song";
import {Playlist} from "../../domain/Playlist";
import {CreatePlaylistDto} from "../../../common/dtos/repositoryDto/playlistDto/CreatePlaylist.dto";
import {GetItemsListDto} from "../../../common/dtos/GetItemsList.dto";
import {GetUserItemDto} from "../../../common/dtos/GetUserItem.dto";
import {UpdatePlaylistDto} from "../../../common/dtos/repositoryDto/playlistDto/UpdatePlaylist.dto";
import {GetParentItemsDto} from "../../../common/dtos/GetParentItems.dto";
import {GetUserItemsDto} from "../../../common/dtos/GetUserItems.dto";

export interface IPlaylistRepository {
    createPlaylist(dto: CreatePlaylistDto): Promise<Playlist>
    deletePlaylist(dto: GetUserItemDto): Promise<Playlist>
    addSongToPlaylist(dto: GetUserItemDto & {songId: number}): Promise<Song>
    removeSongFromPlaylist(dto: GetUserItemDto & {songId: number}): Promise<Song>
    updatePlaylist(dto: UpdatePlaylistDto): Promise<Playlist>
    getPlaylistSongs(dto: GetParentItemsDto): Promise<GetItemsListDto<Song>>
    getUserPlaylists(dto: GetUserItemsDto): Promise<GetItemsListDto<Playlist>>
    getPlaylistById(dto: GetUserItemDto): Promise<Playlist>
}