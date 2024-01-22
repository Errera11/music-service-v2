export class CreatePlaylistDto {
    readonly user_id: string
    readonly title: string
    readonly description?: string
    readonly image?: string
    readonly songs?: number[]
}