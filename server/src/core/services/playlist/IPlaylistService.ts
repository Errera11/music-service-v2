import {Playlist} from "../../domain/Playlist";
import {Song} from "../../domain/Song";
import {GetItemsListDto} from "../../../common/dtos/GetItemsList.dto";
import {SearchUserItemDto} from "../../../../dist/common/dtos/SearchUserItem.dto";
import {GetUserItems} from "../../../common/dtos/GetUserItems";
import {CreatePlaylistDto} from "../../../common/dtos/infrastructureDto/playlistDto/CreatePlaylist.dto";
import {UpdatePlaylistDto} from "../../../common/dtos/infrastructureDto/playlistDto/UpdatePlaylist.dto";


export interface IPlaylistService {
    createPlaylist(dto: CreatePlaylistDto): Promise<Playlist>
    deletePlaylist(dto: SearchUserItemDto): Promise<Playlist>
    addSongToPlaylist(dto: SearchUserItemDto & {songId: number}): Promise<Song>
    removeSongFromPlaylist(dto: SearchUserItemDto & {songId: number}): Promise<Song>
    updatePlaylist(dto: UpdatePlaylistDto): Promise<Playlist>
    getPlaylistSongs(dto: GetUserItems): Promise<GetItemsListDto<Song>>
    getUserPlaylists(dto: GetUserItems): Promise<GetItemsListDto<Playlist>>
    getPlaylistById(dto: SearchUserItemDto): Promise<Playlist>
}