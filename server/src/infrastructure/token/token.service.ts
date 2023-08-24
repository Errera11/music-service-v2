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

    verifyAuthToken(token: string): SignTokenDTO {
        try {
            console.log(token);
            const tokenCode = token.split(' ').pop();
            console.log(tokenCode);
            jwt.verify(tokenCode, process.env.SECRET_ACCESS)
            return jwt_decode(tokenCode);
        } catch (e) {
            throw new Error('Invalid authorization token');
        }
    }

    verifyRefreshToken(token: string): SignTokenDTO {
        try {
            const tokenCode = token.split(' ').pop();
            jwt.verify(tokenCode, process.env.SECRET_REFRESH)
            console.log(process.env.SECRET_REFRESH);
            return jwt_decode(tokenCode);
        } catch (e) {
            throw new Error('Invalid refresh token');
        }
    }
}



