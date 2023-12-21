import {SearchUserItemDto} from "../../../common/dtos/SearchUserItem.dto";

export interface ITokenRepository {
    deleteRefreshToken(dto: SearchUserItemDto): Promise<string>
    saveRefreshToken(dto: SearchUserItemDto): Promise<any>
}