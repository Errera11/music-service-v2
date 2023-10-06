import { Module } from '@nestjs/common';
import {SongModule} from "./song.module";
import {TokenModule} from "./token.module";
import {UserModule} from "./user.module";
import {AlbumModule} from "./album.module";
import {DropboxService} from "../infrastructure/cloud/dropbox.service";

@Module({
  imports: [
      AlbumModule,
      SongModule,
      TokenModule,
      UserModule,
  ],
})
export class AppModule {}
