import {Song} from "./Song";

export class Album {
    id: number
    title: string
    description: string
    author: string
    image: string
    album_songs: Song[]
    isLiked: boolean
}