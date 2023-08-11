import {Module} from "@nestjs/common";
import {SongService} from "./serviceInterface/song/song.service";
import {SongController} from "../infrastructure/controllers/song.controller";
import {DropboxService} from "../infrastructure/cloud/dropbox.service";
import {PrismaService} from "../infrastructure/prisma.service";

@Module(
    {
        providers: [SongService, DropboxService, PrismaService],
        controllers: [SongController],
        exports: [SongService]
    }
)
export class SongModule {}
