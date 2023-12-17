import {SignTokenDTO} from "../../../common/types/token";
import {UserItemDto} from "../../../common/dtos/UserItem.dto";

export interface ITokenService {
    disableRefreshToken(dto: UserItemDto): Promise<string>
    verifyRefreshToken(token: string): Promise<SignTokenDTO>
    verifyAuthToken(token: string): Promise<SignTokenDTO>
    signTokens(dto: SignTokenDTO): Promise<{
        refreshToken: string,
        authToken: string
    }>
}