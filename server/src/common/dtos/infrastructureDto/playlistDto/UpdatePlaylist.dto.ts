import {Transform} from "class-transformer";

export class UpdatePlaylistDto {
    @Transform(({value}) => Number.parseInt(value))
    readonly playlist_id: number
    readonly user_id: string
    readonly title?: string
    readonly description?: string
    readonly image?: Express.Multer.File
}