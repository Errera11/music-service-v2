export class UpdateAlbumDto {
    id: number
    author?: string
    title?: string
    description?: string
    image?: string
    album_songs?: number[]
}