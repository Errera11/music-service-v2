import {Song} from "@/assets/types/Song";
import {IGetItemsList} from "@/assets/types/IGetItemsList";

export interface Playlist {
    id: number
    title: string
    description?: string
    image?: string
}

export interface PlaylistById extends Playlist {
    playlist_songs: IGetItemsList<Song>
}