export interface UpdateSongDto {
    readonly id: number
    readonly title?: string
    readonly description?: string
    readonly artist?: string
    readonly genre?: number[]
    readonly image?: File
    readonly audio?: File
}