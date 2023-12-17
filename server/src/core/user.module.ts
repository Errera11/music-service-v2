import {Module} from "@nestjs/common";
import {UserService} from "./services/user/user.service";
import {UserController} from "../infrastructure/controllers/user.controller";
import {PrismaService} from "../infrastructure/prisma.service";
import {SongModule} from "./song.module";
import {TokenModule} from "./token.module";
import {DropboxService} from "../infrastructure/cloud/dropbox.service";
import {UserRepository} from "../infrastructure/db/repository/UserRepository";

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
            UserRepository
        ],
        controllers: [UserController]
    }
)
export class UserModule {}
