import { Prisma} from '@prisma/client';
import {LoginUserDto} from "../../../common/dtos/LoginUser.dto";
import {AuthUserDto} from "../../../common/dtos/AuthUser.dto";

export interface UserRepository {
    create(dto: Prisma.UserCreateInput): Promise<AuthUserDto>
    login(dto: LoginUserDto): Promise<AuthUserDto>
}