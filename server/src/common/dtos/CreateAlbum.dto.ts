
export class CreateAlbumDto {
    readonly title: string
    readonly description?: string
    readonly author: string
    readonly album_songs: number[]
}