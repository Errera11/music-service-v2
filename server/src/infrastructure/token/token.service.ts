import {Injectable} from "@nestjs/common";
import {SignTokenDTO} from "../../common/types/token";
import {PrismaService} from "../prisma.service";
import {TokenRepository} from "../../core/domainInterface/TokenRepository/TokenRepository";

const jwt_decode = require('jwt_decode');
const jwt = require('jsonwebtoken');

@Injectable()
export class TokenService implements TokenRepository{

    constructor(private prisma: PrismaService) {}

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
        return jwt.verify(token, process.env.SECRET_ACCESS);
    }

    verifyRefreshToken(token: string) {
        if (!jwt.verify(token, process.env.REFRESH_REFRESH)) {

        }
        const decodedToken: SignTokenDTO = jwt_decode(token);
        return this.signTokens(decodedToken);
    }
}

