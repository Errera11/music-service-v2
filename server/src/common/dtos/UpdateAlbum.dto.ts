export class UpdateAlbumDto {
    id: number
    author?: string
    title?: string
    description?: string
    image?: Express.Multer.File
    album_songs?: number[]

}