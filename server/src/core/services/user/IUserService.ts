import {SearchItemDto} from "../../../common/dtos/SearchItem.dto";
import {GetItemsListDto} from "../../../common/dtos/GetItemsList.dto";
import {SignUpUserDto} from "../../../common/dtos/infrastructureDto/userDto/SignUpUser.dto";
import {AuthUserDto} from "../../../common/dtos/AuthUser.dto";
import {LoginUserDto} from "../../../common/dtos/infrastructureDto/userDto/LoginUser.dto";
import {UserDto} from "../../../common/dtos/infrastructureDto/userDto/User.dto";
import {UserItemDto} from "../../../common/dtos/UserItem.dto";

export interface IUserService {
    getAll(dto: SearchItemDto): Promise<GetItemsListDto<UserDto>>
    makeAdmin(userId: string): Promise<UserDto>
    revokeAdmin(userId: string): Promise<UserDto>
    create(dto: SignUpUserDto): Promise<AuthUserDto>
    login(dto: LoginUserDto): Promise<AuthUserDto>
    logout(dto: UserItemDto): Promise<any>
    refreshSession(userId: string): Promise<AuthUserDto>
    loginByToken(token: string): Promise<UserDto>
    getUserById(userId: string): Promise<{
        user: UserDto,
        userFavSongsCount: number,
        userPlaylistsCount: number
    }>
}