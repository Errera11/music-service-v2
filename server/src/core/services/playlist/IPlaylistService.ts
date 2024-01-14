import {Playlist} from "../../domain/Playlist";
import {Song} from "../../domain/Song";
import {GetItemsListDto} from "../../../common/dtos/GetItemsList.dto";
import {CreatePlaylistDto} from "../../../common/dtos/infrastructureDto/playlistDto/CreatePlaylist.dto";
import {UpdatePlaylistDto} from "../../../common/dtos/infrastructureDto/playlistDto/UpdatePlaylist.dto";
import {GetUserItemDto} from "../../../common/dtos/GetUserItem.dto";
import {GetParentItemsDto} from "../../../common/dtos/GetParentItems.dto";
import {GetUserItemsDto} from "../../../common/dtos/GetUserItems.dto";


export interface IPlaylistService {
    createPlaylist(dto: CreatePlaylistDto): Promise<Playlist>
    deletePlaylist(dto: GetUserItemDto): Promise<Playlist>
    addSongToPlaylist(dto: GetUserItemDto & {songId: number}): Promise<Song>
    removeSongFromPlaylist(dto: GetUserItemDto & {songId: number}): Promise<Song>
    updatePlaylist(dto: UpdatePlaylistDto): Promise<Playlist>
    getPlaylistSongs(dto: GetParentItemsDto): Promise<GetItemsListDto<Song>>
    getUserPlaylists(dto: GetUserItemsDto): Promise<GetItemsListDto<Playlist>>
    getPlaylistById(dto: GetUserItemDto): Promise<Playlist>
}