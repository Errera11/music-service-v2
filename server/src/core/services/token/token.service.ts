import {Injectable} from "@nestjs/common";
import {SignTokenDTO} from "../../../common/types/token";
import {ITokenService} from "./ITokenService";
import {TokenRepository} from "../../../infrastructure/db/repository/TokenRepository";
import {SearchUserItemDto} from "../../../common/dtos/SearchUserItem.dto";

//TODO rewrite to DI/JWT service
const jwt_decode = require('jwt-decode');
const jwt = require('jsonwebtoken');

@Injectable()
export class TokenService implements ITokenService {

    constructor(private tokenRepository: TokenRepository) {
    }

    disableRefreshToken(dto: SearchUserItemDto): Promise<string> {
        return this.tokenRepository.deleteRefreshToken(dto);
    }

    async signTokens(dto: SignTokenDTO): Promise<{
        refreshToken: string,
        authToken: string
    }> {
        const authToken = jwt.sign({
            id: dto.id,
            email: dto.email,
            name: dto.name,
            role: dto.role,
            created_at: new Date()
        }, process.env.SECRET_ACCESS, {expiresIn: '1min'})
        const refreshToken = jwt.sign({
            id: dto.id,
            email: dto.email,
            name: dto.name,
            role: dto.role,
            created_at: new Date()
        }, process.env.SECRET_REFRESH, {expiresIn: '1h'})
        await this.tokenRepository.saveRefreshToken({
            userId: dto.id,
            itemId: refreshToken
        })
        return {
            authToken: `Bearer Authorization ${authToken}`,
            refreshToken: `Bearer Refresh ${refreshToken}`
        };
    }

    async verifyAuthToken(token: string): Promise<SignTokenDTO> {
        try {
            const tokenCode = token.split(' ').pop();
            return jwt.verify(tokenCode, process.env.SECRET_ACCESS)
        } catch (e) {
            throw new Error('Invalid authorization token');
        }
    }

    async verifyRefreshToken(token: string): Promise<SignTokenDTO> {
        try {
            const tokenCode = token.split(' ').pop();
            jwt.verify(tokenCode, process.env.SECRET_REFRESH)
            return jwt_decode(tokenCode);
        } catch (e) {
            throw new Error('Invalid refresh token');
        }
    }
}



