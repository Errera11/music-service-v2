import {AuthUserDto} from "../../../common/dtos/AuthUser.dto";

export interface TokenRepository {
    signTokens(dto: AuthUserDto): {
        refreshToken: string,
        accessToken: string
    }
    verifyToken(token: string, type: 'refreshToken' | 'accessToken'): AuthUserDto
}