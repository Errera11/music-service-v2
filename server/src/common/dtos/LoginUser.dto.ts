import {IsEmail, IsNotEmpty, MaxLength, MinLength} from "class-validator";

export class LoginUserDto {
    @IsEmail()
    readonly email: string
    @IsNotEmpty()
    @MaxLength(20)
    @MinLength(3)
    readonly password: string
}