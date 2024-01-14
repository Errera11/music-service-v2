import {SignTokenDTO} from "../../../common/types/token";
import {GetUserItemDto} from "../../../common/dtos/GetUserItem.dto";

export interface ITokenService {
    disableRefreshToken(dto: GetUserItemDto): Promise<string>
    verifyRefreshToken(token: string): Promise<SignTokenDTO>
    verifyAuthToken(token: string): Promise<SignTokenDTO>
    signTokens(dto: SignTokenDTO): Promise<{
        refreshToken: string,
        authToken: string
    }>
}