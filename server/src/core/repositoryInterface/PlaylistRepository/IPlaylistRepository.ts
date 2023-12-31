import {Song} from "../../domain/Song";
import {Playlist} from "../../domain/Playlist";
import {CreatePlaylistDto} from "../../../common/dtos/repositoryDto/playlistDto/CreatePlaylist.dto";
import {GetItemsListDto} from "../../../common/dtos/GetItemsList.dto";
import {SearchUserItemDto} from "../../../common/dtos/SearchUserItem.dto";
import {UpdatePlaylistDto} from "../../../common/dtos/repositoryDto/playlistDto/UpdatePlaylist.dto";
import { GetUserItems} from "../../../common/dtos/GetUserItems";

export interface IPlaylistRepository {
    createPlaylist(dto: CreatePlaylistDto): Promise<Playlist>
    deletePlaylist(dto: SearchUserItemDto): Promise<Playlist>
    addSongToPlaylist(dto: SearchUserItemDto & {songId: number}): Promise<Song>
    removeSongFromPlaylist(dto: SearchUserItemDto & {songId: number}): Promise<Song>
    updatePlaylist(dto: UpdatePlaylistDto): Promise<Playlist>
    getPlaylistSongs(dto: GetUserItems): Promise<GetItemsListDto<Song>>
    getUserPlaylists(dto: GetUserItems): Promise<GetItemsListDto<Playlist>>
    getPlaylistById(dto: SearchUserItemDto): Promise<Playlist>
}