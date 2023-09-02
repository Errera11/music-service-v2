import {IsNotEmpty} from "class-validator";

export class CreateSongDto {
    @IsNotEmpty()
    readonly title: string
    @IsNotEmpty()
    readonly description: string
    @IsNotEmpty()
    readonly artist: string
}