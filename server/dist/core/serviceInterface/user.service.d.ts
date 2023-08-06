import { UserRepository } from "../domainInterface/UserRepository/UserRepository";
import { LoginUserDto } from "../../common/dtos/LoginUser.dto";
import { PrismaService } from "../../infrastructure/prisma.service";
import { Prisma } from '@prisma/client';
import { AuthUserDto } from "../../common/dtos/AuthUser.dto";
export declare class UserService implements UserRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: Prisma.UserCreateInput): Promise<AuthUserDto>;
    login(dto: LoginUserDto): Promise<AuthUserDto>;
}
