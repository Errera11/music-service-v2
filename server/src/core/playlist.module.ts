import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import {PlaylistService} from "./services/playlist/playlist.service";
import {PlaylistController} from "../infrastructure/controllers/playlist.controller";
import {DropboxService} from "../infrastructure/cloud/dropbox.service";
import {PrismaService} from "../infrastructure/prisma.service";
import {PlaylistRepository} from "../infrastructure/db/repository/PlaylistRepository";
import {SongMapper} from "../infrastructure/db/mappers/Song.mapper";
import {TokenModule} from "./token.module";
import {SessionMiddleware} from "../infrastructure/middlewares/SessionMiddleware";

@Module({
    imports: [TokenModule],
    controllers: [PlaylistController],
    providers: [PlaylistService, DropboxService, PrismaService, PlaylistRepository, SongMapper]
})
export class PlaylistModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer
            .apply(SessionMiddleware)
            .forRoutes(PlaylistController)
    }
}