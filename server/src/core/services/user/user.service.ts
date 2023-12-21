import {Inject, Injectable, UnauthorizedException} from "@nestjs/common";
import {LoginUserDto} from "../../../common/dtos/infrastructureDto/userDto/LoginUser.dto";
import * as uuid from 'uuid';
import * as bcrypt from 'bcrypt';
import {AuthUserDto} from "../../../common/dtos/AuthUser.dto";
import {SignUpUserDto} from "../../../common/dtos/infrastructureDto/userDto/SignUpUser.dto";
import {TokenService} from "../token/token.service";
import {DropboxService} from "../../../infrastructure/cloud/dropbox.service";
import {SearchItemsDto} from "../../../common/dtos/SearchItems.dto";
import {IUserService} from "./IUserService";
import {UserRepository} from "../../../infrastructure/db/repository/UserRepository";
import {UserDto} from "../../../common/dtos/infrastructureDto/userDto/User.dto";
import {SearchUserItemDto} from "../../../common/dtos/SearchUserItem.dto";

@Injectable()
export class UserService implements IUserService {

    constructor(
        private userRepository: UserRepository,
        @Inject(TokenService) private tokenService: TokenService,
        @Inject(DropboxService) private cloud: DropboxService
    ) {
    }

    async getAll(dto: SearchItemsDto) {
        const users = await this.userRepository.getAll(dto);
        return {
            ...users,
            users: Promise.all(users.items.map(async (user) => ({
                ...user,
                avatar: (await this.cloud.getFileStreamableUrl(user.avatar)).result.link
            })))
        }
    }

    async makeAdmin(userId: string): Promise<UserDto> {
        const {password, ...user} = await this.userRepository.makeAdmin(userId)
        return {
            ...user,
            avatar: (await this.cloud.getFileStreamableUrl(user.avatar)).result.link
        }
    }

    async revokeAdmin(userId: string): Promise<UserDto> {
        const {password, ...user} = await this.userRepository.revokeAdmin(userId);
        return {
            ...user,
            avatar: (await this.cloud.getFileStreamableUrl(user.avatar)).result.link
        }
    }

    async create(dto: SignUpUserDto): Promise<AuthUserDto> {
        dto = {
            ...dto,
            name: dto.name.trim()
        }
        const existingUser = await this.userRepository.getUserByEmail(dto.email);
        if (existingUser) {
            throw new Error(`User with email ${dto.email} already exists`);
        }
        const userWithSameName = await this.userRepository.getUserByName(dto.name);
        if (userWithSameName) {
            throw new Error(`User with name ${dto.name} already exists`);
        }
        const uudid: string = uuid.v4();
        const hashedPassword = await bcrypt.hash(dto.password, 3);
        const newUser = await this.userRepository.create({
            ...dto,
            id: uudid,
            password: hashedPassword,
        })
        const {authToken, refreshToken} = await this.tokenService.signTokens({
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            role: newUser.role,
        })
        return {
            ...newUser,
            avatar: undefined,
            authToken: authToken,
            refreshToken: refreshToken
        }
    }

    async login(dto: LoginUserDto): Promise<AuthUserDto> {
        const user = await this.userRepository.getUserByEmail(dto.email);
        if (!user)
            throw new Error(`User with email ${dto.email} doesn't exists`);
        const isValidPassword = await bcrypt.compare(dto.password, user.password);
        if (!isValidPassword) throw new Error(`Invalid email or password`);
        const {authToken, refreshToken} = await this.tokenService.signTokens({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        })
        return {
            ...user,
            avatar: (await this.cloud.getFileStreamableUrl(user.avatar)).result.link,
            authToken: authToken,
            refreshToken: refreshToken
        }
    }

    async logout(dto: SearchUserItemDto) {
        return this.tokenService.disableRefreshToken(dto);
    }

    async refreshSession(oldRefreshToken: string): Promise<AuthUserDto> {
        try {
            const decodedUser = await this.tokenService.verifyRefreshToken(oldRefreshToken);
            const deletedRefreshToken = await this.tokenService.disableRefreshToken({
                userId: decodedUser.id,
                itemId: oldRefreshToken
            });
            if (!deletedRefreshToken) throw new Error('Session logged out');
            const user = await this.userRepository.getUserByEmail(decodedUser.email);
            const {authToken, refreshToken} = await this.tokenService.signTokens(user);
            return {
                ...user,
                avatar: (await this.cloud.getFileStreamableUrl(user.avatar)).result.link,
                authToken: authToken,
                refreshToken: refreshToken
            }
        } catch (e) {
            console.log(e);
            throw new Error('Session logged out');
        }
    }

    async loginByToken(token: string): Promise<UserDto> {
        try {
            const userDecoded = await this.tokenService.verifyAuthToken(token);
            const {password, ...user} = await this.userRepository.getUserByEmail(userDecoded.email);
            if (!user) throw new Error(`User doesn't exists`);
            return {
                ...user,
                avatar: (await this.cloud.getFileStreamableUrl(user.email)).result.link
            }
        } catch (e) {
            throw new UnauthorizedException();
        }

    }

    getUserById(userId: string): Promise<{
        user: UserDto,
        userFavSongsCount: number,
        userPlaylistsCount: number
    }> {
        return this.userRepository.getUserById(userId);
    }
}