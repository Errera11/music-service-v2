import {SignTokenDTO} from "../../../common/types/token";

export interface TokenRepository {
    signTokens(dto: SignTokenDTO): {
        refreshToken: string,
        authToken: string
    }
    verifyAuthToken(token: string): string
    verifyRefreshToken(token: string): SignTokenDTO
}