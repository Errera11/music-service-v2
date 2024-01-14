import { Module } from '@nestjs/common';
import {SongModule} from "./song.module";
import {TokenModule} from "./token.module";
import {UserModule} from "./user.module";
import {AlbumModule} from "./album.module";
import {PlaylistModule} from "./playlist.module";

@Module({
  imports: [
      AlbumModule,
      SongModule,
      TokenModule,
      UserModule,
      PlaylistModule
  ],
})
export class AppModule {}
