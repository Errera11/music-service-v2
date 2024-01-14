import {SearchItemsDto} from "./SearchItems.dto";

export class GetParentItemsDto extends SearchItemsDto {
    readonly parentId: number
}