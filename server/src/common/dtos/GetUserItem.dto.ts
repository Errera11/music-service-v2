import {IsNotEmpty} from "class-validator";

export class GetUserItemDto {
    readonly userId: string
    @IsNotEmpty()
    readonly itemId: number | string
}