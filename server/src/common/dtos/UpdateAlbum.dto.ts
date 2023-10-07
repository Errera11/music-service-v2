import {Transform} from "class-transformer";
import {IsArray, IsNotEmpty, IsOptional} from "class-validator";

export class UpdateAlbumDto {
    @IsNotEmpty()
    @Transform(({value}) => Number.parseInt(value))
    id: number
    author?: string
    title?: string
    description?: string
    image?: Express.Multer.File
    @IsOptional()
    @IsArray()
    @Transform(({value}) => {
        if (value instanceof Array) return value.map(item => Number.parseInt(item))
    })
    album_songs?: number[]

}