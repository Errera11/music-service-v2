
import api from './root';
import {CreateAlbumDto, UpdateAlbumDto} from "@/assets/dto/CreateAlbumDto";
import {Album, AlbumById, AlbumSongs} from "@/assets/types/Album";

export interface IGetAllAlbumResponse {
    albums: Album[]
    totalCount: number
}

const addSongToAlbum = ({songId, albumId}: {songId: number, albumId: number}) => api.post<AlbumSongs>('album/addSong', {}, {
    params: {
        songId,
        albumId
    }
})

const getAll = ({skip, take}: {skip?: number, take?: number}) => api.get<IGetAllAlbumResponse>('album', {
    params: {
        skip,
        take
    }
})

const createAlbum = (dto: CreateAlbumDto) => {
    const formdata = new FormData();
    formdata.append('title', dto.title);
    formdata.append('author', dto.author);
    formdata.append('description', dto?.description || '');
    formdata.append('image', dto.image);
    formdata.append('album_songs', JSON.stringify(dto.album_songs));
    return api.post<Album>('album/create', formdata);
}

const updateAlbum = (dto: UpdateAlbumDto) => {
    const formdata = new FormData();
    formdata.append('id', String(dto.id))
    formdata.append('title', dto.title || '');
    formdata.append('author', dto.author || '');
    formdata.append('description', dto.description || '');
    formdata.append('image', dto.image || '');
    formdata.append('album_songs', JSON.stringify(dto.album_songs || []));
    return api.put<Album>('album/update', formdata);
}

const removeSong = ({songId, albumId}: { songId: number, albumId: number }) => api.delete<{song_id: number}>('album/removeSong', {
    params: {
        songId,
        albumId
    }
})

const deleteAlbum = (albumId: number) => api.delete<Album>(`album/delete/${albumId}`)

const getAlbumById = (albumId: number) => api.get<AlbumById>(`album/getAlbumById/${albumId}`)

const searchAlbum = ({query, take, skip}: {query?: string, take?: number, skip?: number}) => api.get<IGetAllAlbumResponse>('album/search', {
    params: {
        query,
        take,
        skip
    }
})

export const albumApi = {
    addSongToAlbum,
    getAll,
    createAlbum,
    updateAlbum,
    removeSong,
    deleteAlbum,
    getAlbumById,
    searchAlbum
}