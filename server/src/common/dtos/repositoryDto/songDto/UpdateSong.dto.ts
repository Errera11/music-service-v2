export class UpdateSongDto {
    readonly id: number
    readonly title?: string
    readonly description?: string
    readonly artist?: string
    readonly genre?: number[]
    readonly audio?: string
    readonly image?: string
}