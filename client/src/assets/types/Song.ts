export interface IGenre {
    id: number
    genre: string
}

export interface Song {
    id: number
    title: string
    description: string
    artist: string
    image: string // not url static path but id in cloud
    audio: string
    duration: number
    isLiked: boolean
    genre: IGenre[]
}