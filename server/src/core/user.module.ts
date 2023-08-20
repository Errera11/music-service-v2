import {Module} from "@nestjs/common";
import {UserService} from "./serviceInterface/user/user.service";
import {UserController} from "../infrastructure/controllers/user.controller";
import {PrismaService} from "../infrastructure/prisma.service";
import {SongModule} from "./song.module";
import {TokenModule} from "./token.module";

@Module(
    {
        imports: [
            SongModule,
            TokenModule
        ],
        providers: [
            PrismaService,
            UserService
        ],
        controllers: [UserController]
    }
)
export class UserModule {}
