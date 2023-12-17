import {UserItemDto} from "../../../common/dtos/UserItem.dto";

export interface ITokenRepository {
    deleteRefreshToken(dto: UserItemDto): Promise<string>
    saveRefreshToken(dto: UserItemDto): Promise<any>
}