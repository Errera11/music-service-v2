import root from "@/api/root";
import {Song} from "@/assets/types/Song";
import {Playlist, PlaylistById} from "@/assets/types/Playlist";
import {IPaginationLimit} from "@/assets/types/IPaginationLimit";
import {IGetItemsList} from "@/assets/types/IGetItemsList";
import {AxiosRequestConfig} from "axios/index";

const api = root;

export interface ICreatePlaylist {
    readonly title: string
    readonly description?: string
    readonly image?: File
}

export interface IUpdatePlaylist {
    readonly playlist_id: number
    readonly user_id: string
    readonly title?: string
    readonly description?: string
    readonly image?: File
}

interface IGetPlaylistSongs extends IPaginationLimit {
    readonly playlistId: number
}

const addSongToPlaylist = ({songId, playlistId}: { songId: number, playlistId: number }) => api.post<Song>('/playlist/addSong', {}, {
    params: {
        itemId: songId,
        parentId: playlistId
    }
})

const createPlaylist = (playlist: ICreatePlaylist, req?: AxiosRequestConfig) => {
    const formData = new FormData();
    formData.append('title', playlist.title);
    formData.append('description', playlist?.description || '');
    formData.append('image', playlist?.image || '')
    return api.post<Playlist>('/playlist/create', formData)
}

const deletePlaylist = (playlistId: number) => api.delete<Song>('/playlist/delete/' + playlistId)

const getPlaylistById = ({playlistId}: { playlistId: number } & IPaginationLimit, req?: AxiosRequestConfig) => api.get<PlaylistById>('/playlist/' + playlistId, req)

const getPlaylistSongs = (dto: IGetPlaylistSongs, req?: AxiosRequestConfig) => api.get<IGetItemsList<Song>>('/playlist/songs/' + dto.playlistId, {
    ...req,
    params: {
        skip: dto.skip,
        take: dto.take
    }
});

const getUserPlaylists = (dto: IPaginationLimit, req?: AxiosRequestConfig) => api.get<IGetItemsList<Playlist>>('/playlist', {
    ...req,
    params: {
        skip: dto.skip,
        take: dto.take
    }
});


const removeSongFromPlaylist = (songId: number, playlistId: number) => api.delete<Song>('/playlist/removeSong', {
    params: {
        itemId: songId,
        parentId: playlistId
    }
});

const updatePlaylist = (dto: IUpdatePlaylist) => {
    const formData = new FormData();
    formData.append('playlist_id', String(dto.playlist_id));
    formData.append('title', dto?.title || '');
    formData.append('description', dto?.description || '');
    formData.append('image', dto?.image || '');
    return api.put<Playlist>('/playlist/update', formData);
}

export const playlistApi = {
    addSongToPlaylist,
    createPlaylist,
    deletePlaylist,
    getPlaylistById,
    getPlaylistSongs,
    getUserPlaylists,
    removeSongFromPlaylist,
    updatePlaylist
}