import {Injectable} from "@nestjs/common";
import {UserRepository} from "../../domainInterface/UserRepository/UserRepository";
import {LoginUserDto} from "../../../common/dtos/LoginUser.dto";
import {PrismaService} from "../../../infrastructure/prisma.service";
import * as uuid from 'uuid';
import * as bcrypt from 'bcrypt';
import {AuthUserDto} from "../../../common/dtos/AuthUser.dto";
import {UserRoles} from "../../../common/UserRoles";
import {SignUpUserDto} from "../../../common/dtos/SignUpUser.dto";

@Injectable()
export class UserService implements UserRepository {
    constructor(private prisma: PrismaService) {}

    async create(dto: SignUpUserDto): Promise<AuthUserDto> {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })
        if (user) {
            throw new Error(`User with email ${dto.email} already exists`);
        }
        const hashedPassword = await bcrypt.hash(dto.password, 3);
        const userId: string = uuid.v4();
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
                },
            }
        })
        return {
            email: newUser.email,
            name: newUser.name,
            role: newUser.role,
            is_email_auth: false,
            avatar: undefined
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
        if(!user) throw new Error(`User with email ${dto.email} doesn't exists`);
        const isValidPassword = bcrypt.compare(dto.password, user?.password);
        if(!isValidPassword) throw new Error(`Invalid email or password`);
        return {
            email: user.email,
            name: user.name,
            role: user.role,
            is_email_auth: user.email_auth.is_auth,
            avatar: user.avatar
        }
    }

    async logout() {
        // Todo make refresh/access token invalid
    }
}