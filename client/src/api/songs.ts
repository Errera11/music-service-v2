import {AxiosResponse} from "axios";
import {Song} from "@/assets/types/Song";
import api from "./root";
const getAllSongs = (skip?: number, take?: number) => api.get<Song[], AxiosResponse<Song[]>>('songs', {
    params: {
        take, skip
    }
});

const removeFromFavorite = (authToken: string, songId: number) => api.delete('songs/removeFromFavorite', {
    params: {
        authToken,
        songId
    }
})



export const songsApi = {
    getAllSongs,
    removeFromFavorite
}