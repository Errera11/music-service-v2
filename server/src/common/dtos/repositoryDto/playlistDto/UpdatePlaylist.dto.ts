export class UpdatePlaylistDto {
    readonly playlist_id: number
    readonly user_id: string
    readonly title?: string
    readonly description?: string
    readonly image?: string
}