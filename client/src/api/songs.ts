import {AxiosResponse} from "axios";
import {Song} from "@/assets/types/Song";
import api from "./root";

interface IResponse {
    songs: Song[],
    totalCount: number
}

const getAllSongs = (skip?: number, take?: number) => api.get<IResponse, AxiosResponse<IResponse>>('songs', {
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

const searchSongs = (query: string, skip?: number, take?: number) => api.get<IResponse>('/songs/search', {
    params: {
        query,
        skip,
        take
    }
})


export const songsApi = {
    getAllSongs,
    removeFromFavorite,
    searchSongs
}