import {Transform} from "class-transformer";

export class ParentItemDto {
    @Transform(({value}) => Number.parseInt(value))
    readonly parentId: number
    @Transform(({value}) => Number.parseInt(value))
    readonly itemId: number
}