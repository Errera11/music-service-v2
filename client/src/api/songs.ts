import axios, {AxiosResponse} from "axios";
import {Song} from "@/assets/types/Song";


const songs = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + '/songs'
})

const getAllSongs = () => songs.get<Song[], AxiosResponse<Song[]>>('');

export const songsApi = {
    getAllSongs
}