import {IsOptional} from "class-validator";
import {Transform} from "class-transformer";

export class PaginationLimitDto {
    @IsOptional()
    @Transform(({value}) => value === 'true')
    @Transform(({value}) => Number.parseInt(value))
    skip?: number;

    @IsOptional()
    @Transform(({value}) => value === 'true')
    @Transform(({value}) => Number.parseInt(value))
    take?: number;
}