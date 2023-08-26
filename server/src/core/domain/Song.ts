export class Song {
    id: string
    name: string
    image: string
    description: string
    artist: string
}

export class SongWithAudio extends Song {
    audio: string
}