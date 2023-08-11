import {Module} from "@nestjs/common";
import {UserService} from "./serviceInterface/user/user.service";
import {UserController} from "../infrastructure/controllers/user.controller";
import {PrismaService} from "../infrastructure/prisma.service";
import {SongModule} from "./song.module";

@Module(
    {
        imports: [
            SongModule
        ],
        providers: [
            PrismaService,
            UserService
        ],
        controllers: [UserController]
    }
)
export class UserModule {}
