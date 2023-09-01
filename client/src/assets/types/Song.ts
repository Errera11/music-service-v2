export interface Song {
    id: number
    name: string
    description: string
    artist: string
    image: string // not url static path but download link
    audio: string
}