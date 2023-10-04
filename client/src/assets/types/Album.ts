import {Song} from "@/assets/types/Song";

export interface Album {
    id: number
    title: string
    description: string
    author: string
    image: string
    album_songs: number[]
}

export interface AlbumById extends Omit<Album, 'album_songs'> {
    songs: Song[]
}

export interface AlbumSongs {
    readonly id: number
    readonly song_id: number
    readonly album_id: number
}