import {IsEmail, IsNotEmpty, MaxLength, MinLength} from 'class-validator';

export class SignUpUserDto {
    @IsEmail()
    readonly email: string
    @IsNotEmpty()
    @MaxLength(20)
    @MinLength(3)
    readonly password: string
    @IsNotEmpty()
    @MaxLength(10)
    @MinLength(3)
    readonly name: string
}