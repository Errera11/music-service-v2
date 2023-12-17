import {IsNotEmpty,  IsArray} from "class-validator";
import {Transform} from "class-transformer";

export class UpdateSongDto {
    @IsNotEmpty()
    @Transform(({value}) => Number.parseInt(value))
    readonly id: number
    @IsNotEmpty()
    readonly title?: string
    readonly description?: string
    @IsNotEmpty()
    readonly artist?: string
    @IsArray()
    @IsNotEmpty({each: true})
    @Transform(({value}) => JSON.parse(value).map(item => Number.parseInt(item.id)))
    readonly genre?: number[]
    readonly audio?: Express.Multer.File
    readonly image?: Express.Multer.File

}