import {
    Injectable,
    CanActivate,
    ExecutionContext, UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import {Reflector} from "@nestjs/core";
import {UserRoles} from "../../core/domain/User";
import {AuthReq} from "../../common/types/authReq";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const roles = this.reflector.get<UserRoles[] | undefined>('roles', context.getHandler());
            const request: AuthReq = context.switchToHttp().getRequest();
            return request.user.role.some(role => roles.includes(role as UserRoles));
        } catch (e) {
            console.log(e);
            throw new UnauthorizedException();
        }

    }
}