import {SearchItemsDto} from "./SearchItems.dto";
import {IsOptional} from "class-validator";

export class SearchUserItemsDto extends SearchItemsDto {
    @IsOptional()
    userId?: string
}