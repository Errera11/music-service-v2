import {Module} from "@nestjs/common";
import {SongService} from "./services/song/song.service";
import {SongController} from "../infrastructure/controllers/song.controller";
import {DropboxService} from "../infrastructure/cloud/dropbox.service";
import {PrismaService} from "../infrastructure/prisma.service";
import {TokenService} from "./services/token/token.service";
import {SongMapper} from "../infrastructure/db/mappers/Song.mapper";
import {SongRepository} from "../infrastructure/db/repository/SongRepository";
import {TokenModule} from "./token.module";

@Module(
    {
        imports: [TokenModule],
        providers: [SongService, DropboxService, PrismaService, SongMapper, SongRepository],
        controllers: [SongController],
        exports: [SongService]
    }
)
export class SongModule {}
// export class SongModule implements NestModule {
//     configure(consumer: MiddlewareConsumer): any {
//         consumer
//             .apply(SessionMiddleware)
//             .forRoutes('/songs/favorite', '/songs/mySongs', '/songs/removeFromFavorite')
//     }
//
// }
