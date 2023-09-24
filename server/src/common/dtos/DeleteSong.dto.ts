import {Transform} from "class-transformer";
import {IsNotEmpty} from "class-validator";

export class DeleteSongDto {
    @IsNotEmpty()
    readonly imageId: string
    @IsNotEmpty()
    readonly audioId: string
    @IsNotEmpty()
    @Transform(({value}) => Number.parseInt(value))
    readonly id: number
}