import {IsOptional} from "class-validator";
import {Transform} from "class-transformer";

export class PaginationLimitDto {
    @IsOptional()
    @Transform(({value}) => Number.parseInt(value))
    skip?: number;

    @IsOptional()
    @Transform(({value}) => Number.parseInt(value))
    take?: number;
}