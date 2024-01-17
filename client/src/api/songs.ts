import {AxiosRequestConfig, AxiosResponse} from "axios";
import {Genre, Song} from "@/assets/types/Song";
import api from "./root";
import {ICreateSong} from "@/assets/types/ICreateSong";
import {IUpdateSong} from "@/assets/types/IUpdateSong";
import {IGetItemsList} from "@/assets/types/IGetItemsList";
import {ISearchItems} from "@/assets/types/ISearchItems";

// Granted everyone, using token to mark liked songs
const getAllSongs = (dto: ISearchItems, req?: AxiosRequestConfig) => api.get<IGetItemsList<Song>>('songs', {
    headers: req?.headers,
    params: {
        ...dto
    }
});

// Granted to authorized user
const getUserFavSongs = (dto: ISearchItems, req?: AxiosRequestConfig) => api.get<IGetItemsList<Song>>('songs/mySongs', {
    headers: req?.headers,
    params: {
        ...dto
    }
});

// Granted to authorized user
const removeFromFavorite = (songId: number, req?: AxiosRequestConfig) => api.delete<AxiosResponse<Song>>('songs/removeFromFavorite', {
    headers: req?.headers,
    params: {
        songId
    }
})

// Granted to administrator
const createSong = (dto: ICreateSong, req?: AxiosRequestConfig) => {
    const formdata = new FormData();
    formdata.append('title', dto.title);
    formdata.append('artist', dto.artist);
    formdata.append('description', dto.description || '');
    formdata.append('genre', JSON.stringify(dto.genre || []));
    formdata.append('audio', dto.audio);
    formdata.append('image', dto.image);
    return api.post<Song>('/songs/create', formdata, {
        headers: req?.headers
    })
}

// Granted to administrator?
const getAllGenres = () => api.get<Genre[]>('/songs/genres', {})

// Granted to administrator
const createGenre = (genre: string, req?: AxiosRequestConfig) => api.post<Genre>('/songs/createGenre', {genre}, {
        headers: req?.headers
    }
)

// Granted to administrator
const deleteSong = (id: number,  req?: AxiosRequestConfig) => api.delete<Song>(`/songs/delete/${id}`, {
    headers: req?.headers
});

// Granted everyone
const getSongById = (id: number) => api.get<Song>(`/songs/${id}`);

// Granted to administrator
const updateSong = (dto: IUpdateSong, req?: AxiosRequestConfig) => {
    const formdata = new FormData();
    formdata.append('title', dto.title || '');
    formdata.append('artist', dto.artist || '');
    formdata.append('description', dto.description || '');
    formdata.append('genre', JSON.stringify(dto.genre || []));
    formdata.append('audio', dto.audio || '');
    formdata.append('image', dto.image || '');
    return api.put<Song>('songs/update', formdata, {
        headers: req?.headers
    })
};

// Granted to authorized user
const addToFavorite = ({songId}: {songId: number}, req?: AxiosRequestConfig) => api.post('/favorite', {
    songId
}, {
    headers: req?.headers
})

export const songsApi = {
    getAllSongs,
    removeFromFavorite,
    createSong,
    getAllGenres,
    createGenre,
    deleteSong,
    getSongById,
    updateSong,
    addToFavorite,
    getUserFavSongs
}