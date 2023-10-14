import {Inject, Injectable, UnauthorizedException} from "@nestjs/common";
import {UserRepository} from "../../domainInterface/UserRepository/UserRepository";
import {LoginUserDto} from "../../../common/dtos/LoginUser.dto";
import {PrismaService} from "../../../infrastructure/prisma.service";
import * as uuid from 'uuid';
import * as bcrypt from 'bcrypt';
import {AuthUserDto} from "../../../common/dtos/AuthUser.dto";
import {SignUpUserDto} from "../../../common/dtos/SignUpUser.dto";
import {TokenService} from "../../../infrastructure/token/token.service";
import {User} from "src/core/domain/User";
import {SetUserRoleDto} from "../../../common/dtos/SetUserRole.dto";
import {PaginationLimitDto} from "../../../common/dtos/PaginationLimit.dto";
import {DropboxService} from "../../../infrastructure/cloud/dropbox.service";

@Injectable()
export class UserService implements UserRepository {
    constructor(
        private prisma: PrismaService,
        private tokenService: TokenService,
        @Inject(DropboxService) private cloud: DropboxService
    ) {
    }

    async getAll(dto: PaginationLimitDto): Promise<(Omit<User, 'password'> & {is_email_auth: boolean})[]> {
        return await Promise.all((await this.prisma.user.findMany({
            take: dto.take || 5,
            skip: dto.skip || 0,
            include: {
                email_auth: {
                    select: {
                        is_email_auth: true
                    }
                }
            }
        })).map(async (user) => {
            const {password, avatar, email_auth, ...userData} = user;
            return {
                ...userData,
                avatar: avatar ? (await this.cloud.getFileStreamableUrl(user.avatar)).result.link : '',
                is_email_auth: email_auth.is_email_auth
            }
        }))
    }

    async setUserRole(dto: SetUserRoleDto): Promise<Omit<User, 'password'>> {
        const {password, ...user} =  await this.prisma.user.update({
            where: {
                id: dto.userId,
            },
            data: {
                role:  {
                    push:  dto.role
                }
            }
        })
        return user;
    }

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
                password: hashedPassword,
                email_auth: {
                    create: {
                        is_email_auth: false
                    }
                },
            }
        })
        const {authToken, refreshToken} = this.tokenService.signTokens({
            email: newUser.email,
            name: newUser.name,
            role: newUser.role,
        })
        await this.prisma.tokenSession.create({
            data: {
                user_id: newUser.id,
                refreshToken
            }
        });
        return {
            email: newUser.email,
            name: newUser.name,
            role: newUser.role,
            is_email_auth: false,
            avatar: undefined,
            authToken: authToken,
            refreshToken: refreshToken
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
        if (!user)
            throw new Error(`User with email ${dto.email} doesn't exists`);
        const isValidPassword = bcrypt.compare(dto.password, user?.password);
        if (!isValidPassword) throw new Error(`Invalid email or password`);
        const {authToken, refreshToken} = this.tokenService.signTokens({
            email: user.email,
            name: user.name,
            role: user.role,
        })
        // Check out count of user sessions and if there are more than 5, drop all
        // sessions except currently created in case of security
        const userSessionsCount = await this.prisma.tokenSession.count({
            where: {
                user_id: user.id
            }
        });
        if (userSessionsCount >= 5) {
            this.prisma.tokenSession.deleteMany({
                where: {
                    user_id: user.id
                }
            })
        }
        await this.prisma.tokenSession.create({
            data: {
                user_id: user.id,
                refreshToken
            }
        });
        return {
            email: user.email,
            name: user.name,
            role: user.role,
            is_email_auth: user.email_auth.is_email_auth,
            avatar: user.avatar,
            authToken: authToken,
            refreshToken: refreshToken
        }
    }

    async logout(refreshToken: string) {
        return this.prisma.tokenSession.delete({
            where: {
                refreshToken: refreshToken
            }
        })
    }

    async refreshSession(oldRefreshToken: string): Promise<AuthUserDto> {
        try {
            const decodedUser = this.tokenService.verifyRefreshToken(oldRefreshToken);
            // Check out if there are such of session
            const session = await this.prisma.tokenSession.delete({
                where: {
                    refreshToken: oldRefreshToken
                }
            })
            const user = await this.prisma.user.findUnique({
                where: {
                    email: decodedUser.email
                },
                include: {
                    email_auth: true
                }
            })
            const {authToken, refreshToken} = this.tokenService.signTokens(user);
            await this.prisma.tokenSession.create({
                data: {
                    user_id: user.id,
                    refreshToken
                }
            })
            return {
                email: user.email,
                name: user.name,
                role: user.role,
                is_email_auth: user.email_auth.is_email_auth,
                avatar: user.avatar,
                authToken: authToken,
                refreshToken: refreshToken
            }
        } catch (e) {
            console.log(e);
            throw new Error('Session logged out');
        }
    }

    async loginByToken(authToken: string): Promise<Omit<AuthUserDto, 'refreshToken' | 'authToken'>> {
        try {
            const userDecoded = this.tokenService.verifyAuthToken(authToken);
            const user = await this.prisma.user.findUnique({
                where: {
                    email: userDecoded.email
                },
                include: {
                    email_auth: {
                        select: {
                            is_email_auth: true
                        }
                    }
                }
            })
            return {
                ...user,
                is_email_auth: user.email_auth.is_email_auth
            }
        } catch (e) {
            throw new UnauthorizedException();
        }

    }
}