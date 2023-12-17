import {PaginationLimitDto} from "./PaginationLimit.dto";
import {IsOptional} from "class-validator";

export class SearchItemDto extends PaginationLimitDto {
    @IsOptional()
    readonly query?: string
}