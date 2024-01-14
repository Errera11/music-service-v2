import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import {UserService} from "./services/user/user.service";
import {UserController} from "../infrastructure/controllers/user.controller";
import {PrismaService} from "../infrastructure/prisma.service";
import {SongModule} from "./song.module";
import {TokenModule} from "./token.module";
import {DropboxService} from "../infrastructure/cloud/dropbox.service";
import {UserRepository} from "../infrastructure/db/repository/UserRepository";
import {UserMapper} from "../infrastructure/db/mappers/User.mapper";
import {SessionMiddleware} from "../infrastructure/middlewares/SessionMiddleware";

@Module(
    {
        imports: [
            SongModule,
            TokenModule
        ],
        providers: [
            PrismaService,
            UserService,
            DropboxService,
            UserRepository,
            UserMapper,
        ],
        controllers: [UserController]
    }
)
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer
            .apply(SessionMiddleware)
            .forRoutes('getUserById/:id', '/revokeAdmin', '/makeAdmin', '/getUsers')
    }

}
