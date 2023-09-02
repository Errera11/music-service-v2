import {AxiosResponse} from "axios";
import {Song} from "@/assets/types/Song";
import api from "./root";
const getAllSongs = (skip?: number, take?: number) => api.get<Song[], AxiosResponse<Song[]>>('songs', {
    params: {
        take, skip
    }
});

export const songsApi = {
    getAllSongs
}