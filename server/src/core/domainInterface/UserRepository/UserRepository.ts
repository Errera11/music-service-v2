import {LoginUserDto} from "../../../common/dtos/LoginUser.dto";
import {AuthUserDto} from "../../../common/dtos/AuthUser.dto";
import {User} from "../../domain/User";
import {PaginationLimitDto} from "../../../common/dtos/PaginationLimit.dto";
import {SetUserRoleDto} from "../../../common/dtos/SetUserRole.dto";

export interface UserRepository {
    create(dto: User): Promise<AuthUserDto>
    login(dto: LoginUserDto): Promise<AuthUserDto>
    logout(refreshToken: string): Promise<any>
    refreshSession(refreshToken: string): Promise<{
        refreshToken: string,
        authToken: string
    }>
    loginByToken(authToken: string): Promise<Omit<AuthUserDto, 'refreshToken' | 'authToken'>>
    getAll(dto: PaginationLimitDto): Promise<{
        users: (Omit<User, 'password'> & {is_email_auth: boolean})[],
        totalCount: number
    }>
    makeAdmin(dto: SetUserRoleDto): Promise<Omit<User, 'password'>>
    revokeAdmin(dto: SetUserRoleDto): Promise<Omit<User, 'password'>>
    getUserById(userId: string): Promise<{
        user: Omit<User, 'password'>,
        userFavSongsCount: number,
        userPlaylistsCount: number
    }>
}