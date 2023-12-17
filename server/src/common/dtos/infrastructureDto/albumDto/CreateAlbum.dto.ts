import {IsArray, IsNotEmpty, IsOptional} from "class-validator";
import {Transform} from "class-transformer";

export class CreateAlbumDto {
    @IsNotEmpty()
    readonly title: string
    readonly description?: string
    readonly image: Express.Multer.File
    @IsNotEmpty()
    readonly author: string
    @IsOptional()
    @IsArray()
    @Transform(({value}) => {
        if (value instanceof Array) return value.map(item => Number.parseInt(item))
    })
    readonly album_songs?: number[]
}