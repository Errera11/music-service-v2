export class CreateAlbumDto {
    readonly id?: number
    readonly title: string
    readonly description?: string
    readonly image: string
    readonly author: string
    readonly album_songs?: number[]
}