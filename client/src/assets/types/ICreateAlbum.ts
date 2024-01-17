export interface ICreateAlbum {
    readonly title: string
    readonly description?: string
    readonly author: string
    readonly image: File
    readonly album_songs?: number[]
}