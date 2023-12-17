import {IUserRepository} from "../../../core/repositoryInterface/UserRepository/IUserRepository";
import {GetItemsListDto} from "../../../common/dtos/GetItemsList.dto";
import {SearchItemDto} from "../../../common/dtos/SearchItem.dto";
import {User, UserRoles} from "../../../core/domain/User";
import {PrismaService} from "../../prisma.service";
import {CreateUserDto} from "../../../common/dtos/repositoryDto/userDto/CreateUser.dto";
import {UserMapper} from "../mappers/User.mapper";

export class UserRepository implements IUserRepository {

    constructor(private prisma: PrismaService, private userMapper: UserMapper) {}

    async create(dto: CreateUserDto): Promise<User> {
        const user = await this.prisma.user.create({
            data: {
                ...dto,
                email_auth: {
                    create: {
                        is_email_auth: false
                    }
                },
            },
            include: {
                email_auth: true
            }
        })
        return this.userMapper.userEntityToDomain(user);
    }

    async getAll(dto: SearchItemDto): Promise<GetItemsListDto<User>> {
        const users = await this.prisma.user.findMany({
            skip: dto.skip || 0,
            take: dto.take || 5,
            where: {
                name: {
                    contains: dto.query,
                    mode: "insensitive"
                }
            },
            include: {
                email_auth: true
            }
        })
        const usersCount = await this.prisma.user.count({
            skip: dto.skip,
            take: dto.take,
            where: {
                name: {
                    contains: dto.query,
                    mode: "insensitive"
                }
            }
        })
        return {
            totalCount: usersCount,
            items: users.map(user => this.userMapper.userEntityToDomain(user))
        }
    }

    async getUserByEmail(email: string): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: {
                email
            },
            include: {
                email_auth: true
            }
        });
        return this.userMapper.userEntityToDomain(user);
    }

    async getUserById(userId: string): Promise<{ user: User; userFavSongsCount: number; userPlaylistsCount: number }> {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                email_auth: true
            }
        })
        const userFavSongsCount = await this.prisma.favorite.count({
            where: {
                user: {
                    id: userId
                }
            },
        })
        const userPlaylistsCount = await this.prisma.playlist.count({
            where: {
                user_id: userId
            }
        })
        return {
            user: this.userMapper.userEntityToDomain(user),
            userFavSongsCount,
            userPlaylistsCount
        }
    }

    async makeAdmin(userId: string): Promise<User> {
        const user = await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                role: {
                    push: UserRoles.ADMIN
                }
            },
            include: {
                email_auth: true
            }
        });
        return this.userMapper.userEntityToDomain(user);
    }

    async revokeAdmin(userId: string): Promise<User> {
        const user = await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                role: {
                    set: [UserRoles.USER]
                }
            },
            include: {
                email_auth: true
            }
        });
        return this.userMapper.userEntityToDomain(user);
    }

}