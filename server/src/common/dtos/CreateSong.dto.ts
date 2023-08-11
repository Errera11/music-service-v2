import {IsNotEmpty} from "class-validator";

export class CreateSongDto {
    @IsNotEmpty()
    readonly name: string
    @IsNotEmpty()
    readonly description: string
    @IsNotEmpty()
    readonly artist: string
}