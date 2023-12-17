import {SearchItemDto} from "./SearchItem.dto";
import {IsOptional} from "class-validator";

export class SearchUserItemDto extends SearchItemDto {
    @IsOptional()
    userId?: string
}