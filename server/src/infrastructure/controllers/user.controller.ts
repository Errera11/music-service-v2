import {Body, Controller, HttpException, HttpStatus, Post} from "@nestjs/common";
import {UserService} from "../../core/serviceInterface/user.service";
import {LoginUserDto} from "../../common/dtos/LoginUser.dto";
import {SignUpUserDto} from "../../common/dtos/SignUpUser.dto";

@Controller('')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('login')
    async login(@Body() dto: LoginUserDto) {
        try {
            return await this.userService.login(dto);
        } catch (e) {
            console.log(e);
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('signup')
    async create(@Body() dto: SignUpUserDto) {
        try {
            return await this.userService.create(dto);
        } catch (e) {
            console.log(e);
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }
}