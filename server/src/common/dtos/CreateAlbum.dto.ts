import {IsNotEmpty} from "class-validator";
import {Transform} from "class-transformer";

export class CreateAlbumDto {
    @IsNotEmpty()
    readonly title: string
    readonly description?: string
    @IsNotEmpty()
    readonly image: string
    @IsNotEmpty()
    readonly author: string
    @Transform(({value}) => value.map(item => Number.parseInt(item)))
    readonly album_songs?: number[]
}