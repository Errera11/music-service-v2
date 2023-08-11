import {Injectable} from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import {AuthUserDto} from "../../../common/dtos/AuthUser.dto";
import * as process from "process";
import {TokenRepository} from "../../domainInterface/TokenRepository/TokenRepository";
import jwt_decode from "jwt-decode";

@Injectable()
export class TokenService implements TokenRepository {
    signTokens(dto): {
        refreshToken: string,
        accessToken: string
    } {
        return {
            accessToken: jwt.sign(dto, process.env.SECRET_ACCESS, '15min'),
            refreshToken: jwt.sign(dto, process.env.SECRET_REFRESH, '30d')
        }
    }

    verifyToken(token, type): AuthUserDto {
        const isValid = jwt.verify(token, type === 'refreshToken' ? process.env.SECRET_REFRESH : process.env.SECRET_ACCESS);
        if (isValid) return jwt_decode(token);
        throw new Error('Invalid token');
    }
}