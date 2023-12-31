import {SignTokenDTO} from "../../../common/types/token";
import {SearchUserItemDto} from "../../../common/dtos/SearchUserItem.dto";

export interface ITokenService {
    disableRefreshToken(dto: SearchUserItemDto): Promise<string>
    verifyRefreshToken(token: string): Promise<SignTokenDTO>
    verifyAuthToken(token: string): Promise<SignTokenDTO>
    signTokens(dto: SignTokenDTO): Promise<{
        refreshToken: string,
        authToken: string
    }>
}