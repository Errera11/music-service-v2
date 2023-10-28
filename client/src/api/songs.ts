import {AxiosError, AxiosResponse} from "axios";
import {Song} from "@/assets/types/Song";
import api from "./root";
import {CreateSongDto} from "@/assets/dto/CreateSongDto";
import {UpdateSongDto} from "@/assets/dto/UpdateSongDto";

export interface ISongApiResponse {
    songs: Song[],
    totalCount: number
}

const getAllSongs = ({skip, take}: { skip?: number, take?: number }) => api.get<ISongApiResponse, AxiosResponse<ISongApiResponse>>('songs', {
    params: {
        take, skip
    }
});

const removeFromFavorite = ({authToken, songId}: {authToken: string, songId: number}) => api.delete('songs/removeFromFavorite', {
    params: {
        authToken,
        songId
    },
    headers: {
        authorization: localStorage.getItem('authToken')
    }
})

const searchSongs = ({query, currentPage, take}: {query?: string, currentPage?: number, take?: number}) => api.get<ISongApiResponse>('/songs/search', {
    params: {
        query,
        skip: (take && currentPage) && (currentPage - 1) * take,
        take
    }
})

const createSong = (dto: CreateSongDto) => {
    const formdata = new FormData();
    formdata.append('title', dto.title);
    formdata.append('artist', dto.artist);
    formdata.append('description', dto.description || '');
    formdata.append('genre', JSON.stringify(dto.genre || []));
    formdata.append('audio', dto.audio);
    formdata.append('image', dto.image);
    return api.post<Song>('/songs/create', formdata, {
        headers: {
            authorization: localStorage.getItem('authToken')
        }
    })
}

const getAllGenres = () => api.get<{genre: string, id: number}[]>('/songs/genres', {
    headers: {
        authorization: localStorage.getItem('authToken')
    }
})

const createGenre = (genre: string) => api.post<{genre: string, id: number}>('/songs/createGenre', {genre}, {
    headers: {
        authorization: localStorage.getItem('authToken')
    }
})

const deleteSong = (id: number) => api.delete<Song>(`/songs/delete/${id}`);

const getSongById = (id: number) => api.get<Song>(`/songs/${id}`);

const updateSong = (dto: UpdateSongDto) => {
    const formdata = new FormData();
    formdata.append('title', dto.title || '');
    formdata.append('artist', dto.artist || '');
    formdata.append('description', dto.description || '');
    formdata.append('genre', JSON.stringify(dto.genre || []));
    formdata.append('audio', dto.audio || '');
    formdata.append('image', dto.image || '');
    return api.put<Song>('songs/update', formdata)
};

export const songsApi = {
    getAllSongs,
    removeFromFavorite,
    searchSongs,
    createSong,
    getAllGenres,
    createGenre,
    deleteSong,
    getSongById,
    updateSong
}