import {IsNotEmpty} from "class-validator";
import {Transform} from "class-transformer";

export class UserItemDto {
    @IsNotEmpty()
    readonly userId: string
    @IsNotEmpty()
    readonly itemId: number | string
}