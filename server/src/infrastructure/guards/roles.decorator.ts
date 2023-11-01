import {SetMetadata} from "@nestjs/common";
import {UserRoles} from "../../core/domain/User";

export const Roles = (...roles: UserRoles[]) => SetMetadata('roles', roles);