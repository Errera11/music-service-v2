import { UserService } from "../../core/serviceInterface/user.service";
import { LoginUserDto } from "../../common/dtos/LoginUser.dto";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    login(dto: LoginUserDto): Promise<import("../../common/dtos/AuthUser.dto").AuthUserDto>;
    create(dto: LoginUserDto): Promise<import("../../common/dtos/AuthUser.dto").AuthUserDto>;
}
