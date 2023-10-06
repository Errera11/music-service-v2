
import api from './root';
import {CreateAlbumDto} from "@/assets/dto/CreateAlbumDto";
import {Album, AlbumById, AlbumSongs} from "@/assets/types/Album";

const addSongToAlbum = ({songId, albumId}: {songId: number, albumId: number}) => api.post<AlbumSongs>('album/addSong', {}, {
    params: {
        songId,
        albumId
    }
})

const getAll = ({skip, take}: {skip?: number, take?: number}) => api.get<Album[]>('album', {
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
    return api.post<Album>('album/create', formdata);
}

const updateAlbum = (dto: CreateAlbumDto) => {
    const formdata = new FormData();
    formdata.append('title', dto.title || '');
    formdata.append('author', dto.author || '');
    formdata.append('description', dto.description || '');
    formdata.append('image', dto.image || '');
    formdata.append('album_songs', JSON.stringify(dto.album_songs || ''));
    return api.post<Album>('album/update', formdata);
}

const removeSong = ({songId, albumId}: { songId: number, albumId: number }) => api.delete<{song_id: number}>('album/removeSong', {
    params: {
        songId,
        albumId
    }
})

const deleteAlbum = (albumId: number) => api.delete<Album>(`album/delete/${albumId}`)

const getAlbumById = (albumId: number) => api.get<AlbumById>(`album/getAlbumById/${albumId}`)

export const albumApi = {
    addSongToAlbum,
    getAll,
    createAlbum,
    updateAlbum,
    removeSong,
    deleteAlbum,
    getAlbumById
}