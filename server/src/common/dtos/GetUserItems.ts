import {SearchItemsDto} from "./SearchItems.dto";

export class GetUserItems extends SearchItemsDto {
    readonly userId: string
    readonly parentId?: string | number
}