import {Transform} from "class-transformer";
import {IsArray, IsNotEmpty, IsOptional} from "class-validator";

export class UpdateAlbumDto {
    @IsNotEmpty()
    @Transform(({value}) => Number.parseInt(value))
    id: number
    @IsOptional()
    author?: string
    @IsOptional()
    title?: string
    @IsOptional()
    description?: string
    @IsOptional()
    image?: Express.Multer.File
    @IsOptional()
    @IsArray()
    @Transform(({value}) => {
        value = JSON.parse(value);
        if (value instanceof Array) return value.map(item => Number.parseInt(item))
    })
    album_songs?: number[]

}