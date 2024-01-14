import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import {SongService} from "./services/song/song.service";
import {SongController} from "../infrastructure/controllers/song.controller";
import {DropboxService} from "../infrastructure/cloud/dropbox.service";
import {PrismaService} from "../infrastructure/prisma.service";
import {SongMapper} from "../infrastructure/db/mappers/Song.mapper";
import {SongRepository} from "../infrastructure/db/repository/SongRepository";
import {TokenModule} from "./token.module";
import {SessionMiddleware} from "../infrastructure/middlewares/SessionMiddleware";

@Module(
    {
        imports: [TokenModule],
        providers: [SongService, DropboxService, PrismaService, SongMapper, SongRepository],
        controllers: [SongController],
        exports: [SongService]
    }
)

export class SongModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer
            .apply(SessionMiddleware)
            .exclude('/songs')
            .forRoutes(SongController)
    }
}
