import {Genre} from "./Genre";

export class Song {
    id: number
    title: string
    image: string
    audio: string
    description: string
    artist: string
    duration: number
    genre: Genre[]
    isLiked: boolean
}
