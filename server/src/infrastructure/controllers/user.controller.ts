import {
    BadRequestException,
    Body,
    Controller, Delete, Get,
    HttpStatus, InternalServerErrorException, Param,
    Post, Put, Query, Req, Res, UnauthorizedException, UseGuards,
} from "@nestjs/common";
import {UserService} from "../../core/services/user/user.service";
import {LoginUserDto} from "../../common/dtos/infrastructureDto/userDto/LoginUser.dto";
import {SignUpUserDto} from "../../common/dtos/infrastructureDto/userDto/SignUpUser.dto";
import {AuthFormValidationPipe} from "../../common/AuthFormValidationPipe";
import {AuthException} from "../../common/AuthException";
import {AuthUserDto} from "../../common/dtos/AuthUser.dto";
import {Request, Response} from "express";
import {PaginationLimitDto} from "../../common/dtos/PaginationLimit.dto";
import {SetUserRoleDto} from "../../common/dtos/SetUserRole.dto";
import {UserRoles} from "../../core/domain/User";
import {Roles} from "../guards/roles.decorator";
import {AuthGuard} from "../guards/auth.guards";
import {TokenService} from "../../core/services/token/token.service";

@Controller('/api/users')
export class UserController {
    constructor(private userService: UserService,
                private tokenService: TokenService) {
    }

    @Post('login')
    async login(@Body(AuthFormValidationPipe()) dto: LoginUserDto, @Res({passthrough: true}) response: Response): Promise<Omit<AuthUserDto, 'refreshToken' | 'authToken'>> {
        try {
            const {refreshToken, authToken,  ...data} = await this.userService.login(dto);
            response.cookie('refreshToken', refreshToken, {httpOnly: true});
            response.cookie('authToken', authToken, {httpOnly: true});
            return data;
        } catch (e) {
            console.log(e);
            throw new AuthException('', e.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('signup')
    async create(@Body(AuthFormValidationPipe()) dto: SignUpUserDto, @Res({passthrough: true}) response: Response): Promise<Omit<AuthUserDto, 'refreshToken' | 'authToken'>> {
        try {
            const {refreshToken, authToken, ...data} = await this.userService.create(dto);
            response.cookie('refreshToken', refreshToken, {httpOnly: true});
            response.cookie('authToken', authToken, {httpOnly: true});
            return data;
        } catch (e) {
            console.log(e);
            throw new AuthException('', e.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete('logout')
    async logout(@Res({passthrough: true}) response: Response, @Req() request: Request) {
        try {
            response.cookie('refreshToken', ' ');
            response.cookie('authToken', ' ');
            const refreshToken = request.cookies['refreshToken'];
            if (!refreshToken) throw 'No refresh token';
            return this.userService.logout(refreshToken);
        } catch (e) {
            console.log(e);
            throw new UnauthorizedException();
        }
    }

    @Post('refreshSession')
    async refreshSession(@Res({passthrough: true}) response: Response, @Req() request: Request): Promise<Omit<AuthUserDto, 'refreshToken' | 'authToken'>> {
        try {
            const oldRefreshToken = request.cookies['refreshToken'];
            const {refreshToken, authToken, ...userData} = await this.userService.refreshSession(oldRefreshToken);
            response['cookie']('authToken', authToken, {httpOnly: true});
            response['cookie']('refreshToken', refreshToken, {httpOnly: true});
            return userData;
        } catch (e) {
            console.log(e);
            throw new BadRequestException();
        }
    }

    @Get('loginByRefreshToken')
    async loginByRefreshToken(@Req() request: Request) {
        const refreshToken = request.cookies['refreshToken'];
        if(!refreshToken) throw new UnauthorizedException();
        try {
            return await this.userService.loginByToken(request.cookies['refreshToken']);
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }

    @Get('')
    @Roles(UserRoles.ADMIN)
    @UseGuards(AuthGuard)
    async getAllUsers(@Query() dto: PaginationLimitDto) {
        try {
            return await this.userService.getAll(dto);
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }

    @Put('makeAdmin')
    @Roles(UserRoles.ADMIN)
    @UseGuards(AuthGuard)
    async makeAdmin(@Body() dto: SetUserRoleDto) {
        try {
            return await this.userService.makeAdmin(dto.userId);
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }

    @Put('revokeAdmin')
    @Roles(UserRoles.ADMIN)
    @UseGuards(AuthGuard)
    async revokeAdmin(@Body() dto: SetUserRoleDto) {
        try {
            return await this.userService.revokeAdmin(dto.userId);
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }

    @Get('/:id')
    @Roles(UserRoles.ADMIN)
    @UseGuards(AuthGuard)
    async getUserById(@Param('id') id: string) {
        try {
            return await this.userService.getUserById(id);
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }

    @Get('session')
    async getCurrentSessionUserInfo (@Req() req: Request) {
        try {
            return await this.tokenService.verifyAuthToken(req.cookies['authToken']);
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }
}