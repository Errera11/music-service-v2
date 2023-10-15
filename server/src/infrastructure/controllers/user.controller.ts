import {
    BadRequestException,
    Body,
    Controller, Delete, Get,
    HttpException,
    HttpStatus, InternalServerErrorException,
    Post, Put, Query, Req, Res, UnauthorizedException,
} from "@nestjs/common";
import {UserService} from "../../core/serviceInterface/user/user.service";
import {LoginUserDto} from "../../common/dtos/LoginUser.dto";
import {SignUpUserDto} from "../../common/dtos/SignUpUser.dto";
import {AuthFormValidationPipe} from "../../common/AuthFormValidationPipe";
import {AuthException} from "../../common/AuthException";
import {AuthUserDto} from "../../common/dtos/AuthUser.dto";
import {Request, Response} from "express";
import {PaginationLimitDto} from "../../common/dtos/PaginationLimit.dto";
import {SetUserRoleDto} from "../../common/dtos/SetUserRole.dto";

@Controller('')
export class UserController {
    constructor(private userService: UserService) {
    }

    @Post('login')
    async login(@Body(AuthFormValidationPipe()) dto: LoginUserDto, @Res({passthrough: true}) response: Response): Promise<Omit<AuthUserDto, 'refreshToken'>> {
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
    async create(@Body(AuthFormValidationPipe()) dto: SignUpUserDto, @Res({passthrough: true}) response: Response): Promise<Omit<AuthUserDto, 'refreshToken'>> {
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
    async logout(@Res({passthrough: true}) response: Response, @Req() request: Request) {
        try {
            response.cookie('refreshToken', ' ');
            const refreshToken = request.cookies['refreshToken'];
            if (!refreshToken) throw new UnauthorizedException();
            return this.userService.logout(refreshToken);
        } catch (e) {
            console.log(e);
            throw new UnauthorizedException();
        }
    }

    @Post('refreshSession')
    async refreshSession(@Res({passthrough: true}) response: Response, @Req() request: Request): Promise<Omit<AuthUserDto, 'refreshToken'>> {
        try {
            const oldRefreshToken = request.cookies['refreshToken'];
            console.log(request.cookies['refreshToken']);
            const {refreshToken, ...userData} = await this.userService.refreshSession(oldRefreshToken);
            response['cookie']('refreshToken', refreshToken, {httpOnly: true});
            return userData;
        } catch (e) {
            console.log(e);
            throw new BadRequestException();
        }
    }

    @Get('loginByAuthToken')
    async loginByAuthToken(@Req() request: Request) {
        try {
            return this.userService.loginByToken(request.headers.authorization)
        } catch (e) {
            console.log(e);
            throw new BadRequestException()
        }
    }

    @Get('getUsers')
    async getAllUsers(@Query() dto: PaginationLimitDto) {
        try {
            return this.userService.getAll(dto);
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }

    @Put('makeAdmin')
    async makeAdmin(@Body() dto: SetUserRoleDto) {
        try {
            return this.userService.makeAdmin(dto);
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }

    @Put('revokeAdmin')
    async revokeAdmin(@Body() dto: SetUserRoleDto) {
        try {
            return this.userService.revokeAdmin(dto);
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }
}