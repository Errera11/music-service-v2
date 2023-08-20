import {
    Body,
    Controller, Delete,
    HttpException,
    HttpStatus, InternalServerErrorException,
    Post, Req, Res, UnauthorizedException,
} from "@nestjs/common";
import {UserService} from "../../core/serviceInterface/user/user.service";
import {LoginUserDto} from "../../common/dtos/LoginUser.dto";
import {SignUpUserDto} from "../../common/dtos/SignUpUser.dto";
import {AuthFormValidationPipe} from "../../common/AuthFormValidationPipe";
import {AuthException} from "../../common/AuthException";
import {AuthUserDto} from "../../common/dtos/AuthUser.dto";
import {Request, Response} from "express";

@Controller('')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('login')
    async login(@Body(AuthFormValidationPipe()) dto: LoginUserDto, @Res({ passthrough: true }) response: Response): Promise<Omit<AuthUserDto, 'refreshToken'>> {
        try {
            const {refreshToken, ...data} = await this.userService.login(dto);
            response.cookie('refreshToken', refreshToken, {httpOnly: true});
            return data;
        } catch (e) {
            console.log(new AuthException('none', e.message, HttpStatus.BAD_REQUEST));
            throw new AuthException('none', e.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('signup')
    async create(@Body(AuthFormValidationPipe()) dto: SignUpUserDto, @Res({ passthrough: true }) response: Response): Promise<Omit<AuthUserDto, 'refreshToken'>> {
        try {
            const {refreshToken, ...data} = await this.userService.create(dto);
            response.cookie('refreshToken', refreshToken, {httpOnly: true});
            return data;
        } catch (e) {
            console.log(e);
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete('logout')
    async logout(@Res({ passthrough: true }) response: Response, @Req() request: Request) {
        try {
            response.cookie('refreshToken', ' ');
            const refreshToken = request.cookies['refreshToken'];
            if(!refreshToken) throw new UnauthorizedException();
            return this.userService.logout(refreshToken);
        } catch (e) {
            console.log(e);
            throw new UnauthorizedException();
        }
    }

    @Post('refreshSession')
    async refreshSession(@Body() dto: {refreshToken: string}, @Res({ passthrough: true }) response: Response) {
        try {
            const {refreshToken, authToken} = await this.userService.refreshSession(dto.refreshToken);
            response['cookie']('refreshToken', refreshToken, {httpOnly: true});
            return {authToken}
        } catch (e) {
            console.log(e);
            throw new UnauthorizedException();
        }
    }
}