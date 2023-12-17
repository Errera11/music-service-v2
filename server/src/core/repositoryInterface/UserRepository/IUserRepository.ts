import {User} from "../../domain/User";
import {SearchItemDto} from "../../../common/dtos/SearchItem.dto";
import {GetItemsListDto} from "../../../common/dtos/GetItemsList.dto";
import {CreateUserDto} from "../../../common/dtos/repositoryDto/userDto/CreateUser.dto";

export interface IUserRepository {
    create(dto: CreateUserDto): Promise<User>
    getAll(dto: SearchItemDto): Promise<GetItemsListDto<User>>
    makeAdmin(userId: string): Promise<User>
    revokeAdmin(userId: string): Promise<User>
    getUserById(userId: string): Promise<{
        user: User,
        userFavSongsCount: number,
        userPlaylistsCount: number
    }>
    getUserByEmail(email: string): Promise<User>
}