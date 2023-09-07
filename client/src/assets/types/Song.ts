export interface Song {
    id: number
    title: string
    description: string
    artist: string
    image: string // not url static path but download link
    audio: string
    duration: number
    name: string // some uuid generated name using to store file in cloud
}