import {Song} from "../../domain/Song";
import {Playlist} from "../../domain/Playlist";
import {CreatePlaylistDto} from "../../../common/dtos/CreatePlaylist.dto";
import {GetItemsListDto} from "../../../common/dtos/GetItemsList.dto";
import {PaginationLimitDto} from "../../../common/dtos/PaginationLimit.dto";

export interface IPlaylistRepository {
    addToPlaylist({songId, playlistId}: {songId: number, playlistId: number}): Promise<Song>
    removeFromPlaylist({songId, playlistId}: {songId: number, playlistId: number}): Promise<Song>
    createPlaylist(dto: CreatePlaylistDto): Promise<Playlist>
    deletePlaylist({playlistId}: {playlistId: number}): Promise<Playlist>
    getPlaylistById({userId, playlistId}: {userId: string, playlistId: number}): Promise<Playlist>
    getUserPlaylists(dto: { userId: string } & PaginationLimitDto): Promise<GetItemsListDto<Omit<Playlist, 'songs'>>>
}