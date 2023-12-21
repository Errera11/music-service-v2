import {Transform} from "class-transformer";

export class UserItemParentDto {
    readonly userId: string
    @Transform(({value}) => Number.parseInt(value))
    readonly parentId: number
    @Transform(({value}) => Number.parseInt(value))
    readonly itemId: number
}