import {Transform} from "class-transformer";

export class GetUserItemDto {
    readonly userId: string
    @Transform(({value}) => {
        if (Number(value)) {
            return Number.parseInt(value);
        }
        return value;
    })
    readonly itemId: number | string
}