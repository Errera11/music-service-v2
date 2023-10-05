import {AxiosError, AxiosResponse} from "axios";
import {Song} from "@/assets/types/Song";
import api from "./root";

export interface ISongApiResponse {
    songs: Song[],
    totalCount: number
}

const getAllSongs = (skip?: number, take?: number) => api.get<ISongApiResponse, AxiosResponse<ISongApiResponse>>('songs', {
    params: {
        take, skip
    }
});

const removeFromFavorite = (authToken: string, songId: number) => api.delete('songs/removeFromFavorite', {
    params: {
        authToken,
        songId
    },
    headers: {
        authorization: localStorage.getItem('authToken')
    }
})

const searchSongs = ({query, skip, take}: {query?: string, skip?: number, take?: number}) => api.get<ISongApiResponse>('/songs/search', {
    params: {
        query,
        skip,
        take
    }
})

const createSong = (formdata: FormData) => api.post<Song>('/songs/create', formdata, {
    headers: {
        authorization: localStorage.getItem('authToken')
    }
})

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

const updateSong = (formdata: FormData) => api.put<Song>('songs/update', formdata);

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