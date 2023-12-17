import {Module} from "@nestjs/common";
import {AlbumController} from "../infrastructure/controllers/album.controller";
import {AlbumService} from "./services/album/album.service";
import {DropboxService} from "../infrastructure/cloud/dropbox.service";
import {PrismaService} from "../infrastructure/prisma.service";
import {AlbumRepository} from "../infrastructure/db/repository/AlbumRepository";
import {AlbumMapper} from "../infrastructure/db/mappers/Album.mapper";
import {SongMapper} from "../infrastructure/db/mappers/Song.mapper";


@Module(
    {
        controllers: [AlbumController],
        providers: [AlbumService, DropboxService, PrismaService, AlbumRepository, AlbumMapper, SongMapper],
        exports: [AlbumService]
    }
)
export class AlbumModule {}