import {Injectable} from "@nestjs/common";
import {SignTokenDTO} from "../../common/types/token";
import {TokenRepository} from "../../core/domainInterface/TokenRepository/TokenRepository";

const jwt_decode = require('jwt-decode');
const jwt = require('jsonwebtoken');

@Injectable()
export class TokenService implements TokenRepository{

    signTokens(dto: SignTokenDTO) {
        return {
            authToken: `Bearer Authorization ${jwt.sign({
                email: dto.email,
                name: dto.name,
                role: dto.role,
            }, process.env.SECRET_ACCESS, {expiresIn: '1min'})}`,
            refreshToken: `Bearer Refresh ${jwt.sign({
                email: dto.email,
                name: dto.name,
                role: dto.role,
            }, process.env.SECRET_REFRESH, {expiresIn: '1h'})}`
        };
    }

    verifyAuthToken(token: string) {
        const tokenCode = token.split(' ').pop();
        return jwt.verify(tokenCode, process.env.SECRET_ACCESS);
    }

    verifyRefreshToken(token: string): SignTokenDTO {
        const tokenCode = token.split(' ').pop();
        if (!jwt.verify(tokenCode, process.env.REFRESH_REFRESH)) {
            throw new Error('Invalid refresh token');
        }
        return jwt_decode(tokenCode);
    }
}

