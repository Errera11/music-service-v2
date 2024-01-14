import {GetUserItemDto} from "../../../common/dtos/GetUserItem.dto";

export interface ITokenRepository {
    deleteRefreshToken(dto: GetUserItemDto): Promise<string>
    saveRefreshToken(dto: GetUserItemDto): Promise<any>
}