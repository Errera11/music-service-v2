import {Module} from "@nestjs/common";
import {AlbumController} from "../infrastructure/controllers/album.controller";
import {AlbumService} from "./serviceInterface/album/album.service";
import {DropboxService} from "../infrastructure/cloud/dropbox.service";
import {PrismaService} from "../infrastructure/prisma.service";


@Module(
    {
        controllers: [AlbumController],
        providers: [AlbumService, DropboxService, PrismaService],
        exports: [AlbumService]
    }
)
export class AlbumModule {}