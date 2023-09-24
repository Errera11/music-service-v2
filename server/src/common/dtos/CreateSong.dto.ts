import {IsNotEmpty,  IsArray} from "class-validator";
import {Transform} from "class-transformer";

export class CreateSongDto {
    @IsNotEmpty()
    readonly title: string
    readonly description: string
    @IsNotEmpty()
    readonly artist: string
    @IsArray()
    @IsNotEmpty({ each: true })
    @Transform(({value}) => JSON.parse(value).map(item => Number.parseInt(item.id)))
    readonly genre: number[]
}