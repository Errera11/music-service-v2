import {Transform} from "class-transformer";
import {IsOptional} from "class-validator";
import {PaginationLimitDto} from "./PaginationLimit.dto";

export class SearchSongDto extends PaginationLimitDto{
    @IsOptional()
    readonly query: string
}