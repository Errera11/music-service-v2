export class CreateSongDto {
    readonly title: string
    readonly description: string
    readonly artist: string
    readonly genre?: number[]
    image: string
    audio: string
}