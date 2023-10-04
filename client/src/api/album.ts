
import api from './root';
import {CreateAlbumDto} from "@/assets/dto/CreateAlbumDto";
import {Album, AlbumById, AlbumSongs} from "@/assets/types/Album";

const addSongToAlbum = (songId: number, albumId: number) => api.post<AlbumSongs>('addSong', {}, {
    params: {
        songId,
        albumId
    }
})

const getAll = (skip?: number, take?: number) => api.get<Album[]>('', {
    params: {
        skip,
        take
    }
})

const createAlbum = (dto: CreateAlbumDto) => {
    const formdata = new FormData();
    formdata.append('title', dto.title);
    formdata.append('author', dto.author);
    formdata.append('description', dto.description);
    formdata.append('image', dto.image);
    formdata.append('album_songs', JSON.stringify(dto.album_songs));
    return api.post<Album>('create', formdata);
}

const updateAlbum = (dto: CreateAlbumDto) => {
    const formdata = new FormData();
    formdata.append('title', dto.title || '');
    formdata.append('author', dto.author || '');
    formdata.append('description', dto.description || '');
    formdata.append('image', dto.image || '');
    formdata.append('album_songs', JSON.stringify(dto.album_songs || ''));
    return api.post<Album>('update', formdata);
}

const removeSong = (songId: number, albumId: number) => api.delete<{song_id: number}>('removeSong', {
    params: {
        songId,
        albumId
    }
})

const deleteAlbum = (albumId: number) => api.delete<Album>(`delete/${albumId}`)

const getAlbumById = (albumId: number) => api.get<AlbumById>(`getAlbumById/${albumId}`)

export const albumApi = {
    addSongToAlbum,
    getAll,
    createAlbum,
    updateAlbum,
    removeSong,
    deleteAlbum,
    getAlbumById
}