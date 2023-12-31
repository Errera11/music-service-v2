import {PaginationLimitDto} from "./PaginationLimit.dto";
import {IsOptional} from "class-validator";

export class SearchItemsDto extends PaginationLimitDto {
    @IsOptional()
    readonly query?: string
}