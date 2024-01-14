import {Injectable, NestMiddleware} from '@nestjs/common';
import {Response, NextFunction} from 'express';
import {TokenService} from "../../core/services/token/token.service";
import {AuthReq} from "../../common/types/authReq";

@Injectable()
export class SessionMiddleware implements NestMiddleware {

    constructor(private tokenService: TokenService) {}

    async use(request: AuthReq, res: Response, next: NextFunction) {
        try {
            const authToken = request.cookies['authToken'];
            request.user = await this.tokenService.verifyAuthToken(authToken);
        }
        catch (e) {}
        next();
    }
}
