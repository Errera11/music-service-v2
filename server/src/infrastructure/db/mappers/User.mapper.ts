import {EmailAuth, User as UserEntity} from "@prisma/client";
import {User} from "../../../core/domain/User";

export class UserMapper {
    userEntityToDomain(user: UserEntity & {email_auth: EmailAuth}): User {
        return {
            ...user,
            is_email_auth: user.email_auth.is_email_auth
        }
    }
}