import {IsNotEmpty, IsString} from "class-validator";

export class SetUserRoleDto {
    @IsNotEmpty()
    @IsString()
    readonly userId: string
}