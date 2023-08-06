import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {UserRepository} from "../domainInterface/UserRepository/UserRepository";
import {LoginUserDto} from "../../common/dtos/LoginUser.dto";
import {PrismaService} from "../../infrastructure/prisma.service";
import {Prisma} from '@prisma/client';
import * as bcrypt from 'bcrypt';
import {AuthUserDto} from "../../common/dtos/AuthUser.dto";
import {UserRoles} from "../../common/UserRoles";

@Injectable()
export class UserService implements UserRepository {
    constructor(private prisma: PrismaService) {
    }

    async create(dto: Prisma.UserCreateInput): Promise<AuthUserDto> {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })
        if (user) {
            throw new Error(`User with email ${dto.email} already exists`);
        }
        const hashedPassword = bcrypt.hash(dto.password);
        const userId: string = bcrypt.v4();
        const newUser = await this.prisma.user.create({
            data: {
                ...dto,
                id: userId,
                role: [UserRoles.USER],
                password: hashedPassword,
                email_auth: {
                    create: {
                        is_auth: false
                    }
                }
            }
        })
        return {
            email: newUser.email,
            name: newUser.name,
            role: newUser.role,
            is_email_auth: false
        }
    }

    async login(dto: LoginUserDto): Promise<AuthUserDto> {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            },
            include: {
                email_auth: true
            }
        })
        const isValidPassword = bcrypt.compare(dto.password, user.password);
        if(!isValidPassword || !user) throw new Error(`Invalid email or password`);
        return {
            email: user.email,
            name: user.name,
            role: user.role,
            is_email_auth: user.email_auth.is_auth
        }
    }
}