export interface CreateAlbumDto {
    readonly title: string
    readonly description?: string
    readonly author: string
    readonly image: File
    readonly album_songs?: number[]
}