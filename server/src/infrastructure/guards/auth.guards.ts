import {
    Injectable,
    CanActivate,
    ExecutionContext, Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import {Reflector} from "@nestjs/core";
import {TokenService} from "../../core/services/token/token.service";
import {UserRoles} from "../../core/domain/User";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private reflector: Reflector, private tokenService: TokenService) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        // Check if it is necessary user to be authorized to pass through
        // Comfy use for parsing token
        const roles = this.reflector.get<UserRoles[] | undefined>('roles', context.getHandler());
        try {
            const request: Request = context.switchToHttp().getRequest();
            const user = this.tokenService.verifyAuthToken(request.credentials['authorization'])
                .then(user => {
                    if(roles?.some(role => user.role.includes(role))) {
                        request['user'] = user;
                        return true;
                    }
                    return false
                })
        } catch (e) {
            console.log(e);
            // if roles are empty there is no restriction to pass through guard
            // (useful to use guard for parsing token)
            if(!roles) return true
            return false;
        }

    }
}