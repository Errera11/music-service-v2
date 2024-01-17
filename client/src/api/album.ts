import api from './root';
import {ICreateAlbum} from "@/assets/types/ICreateAlbum";
import {IUpdateAlbum} from "@/assets/types/IUpdateAlbum";
import {Album, AlbumById, AlbumSongs} from "@/assets/types/Album";
import {IGetItemsList} from "@/assets/types/IGetItemsList";
import {ISearchItems} from "@/assets/types/ISearchItems";

// Granted to administrator
const addSongToAlbum = ({songId, albumId}: {songId: number, albumId: number}) => api.post<AlbumSongs>('album/addSong', {}, {
    params: {
        songId,
        albumId
    }
})

const getAll = (dto: ISearchItems) => api.get<IGetItemsList<Album>>('album', {
    params: {
        ...dto
    }
})

// Granted to administrator
const createAlbum = (dto: ICreateAlbum) => {
    const formdata = new FormData();
    formdata.append('title', dto.title);
    formdata.append('author', dto.author);
    formdata.append('description', dto?.description || '');
    formdata.append('image', dto.image);
    formdata.append('album_songs', JSON.stringify(dto.album_songs));
    return api.post<Album>('album/create', formdata);
}

// Granted to administrator
const updateAlbum = (dto: IUpdateAlbum) => {
    const formdata = new FormData();
    formdata.append('id', String(dto.id))
    formdata.append('title', dto.title || '');
    formdata.append('author', dto.author || '');
    formdata.append('description', dto.description || '');
    formdata.append('image', dto.image || '');
    formdata.append('album_songs', JSON.stringify(dto?.album_songs || []));
    return api.put<Album>('album/update', formdata);
}

// Granted to administrator
const removeSong = ({songId, albumId}: { songId: number, albumId: number }) => api.delete<{song_id: number}>('album/removeSong', {
    params: {
        songId,
        albumId
    }
})

// Granted to administrator
const deleteAlbum = (albumId: number) => api.delete<Album>(`album/delete/${albumId}`)

const getAlbumById = (albumId: number) => api.get<AlbumById>(`album/getAlbumById/${albumId}`)

export const albumApi = {
    addSongToAlbum,
    getAll,
    createAlbum,
    updateAlbum,
    removeSong,
    deleteAlbum,
    getAlbumById,
}