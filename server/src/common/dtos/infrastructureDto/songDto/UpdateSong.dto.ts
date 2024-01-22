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
    @Transform(({value}) => JSON.parse(value))
    readonly genre?: number[]
    readonly audio?: Express.Multer.File
    readonly image?: Express.Multer.File

}