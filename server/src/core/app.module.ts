import { Module } from '@nestjs/common';
import {PrismaService} from "../infrastructure/prisma.service";
import {SongModule} from "./song.module";
import {TokenModule} from "./token.module";
import {UserModule} from "./user.module";

@Module({
  imports: [
      SongModule,
      TokenModule,
      UserModule
  ]
})
export class AppModule {}
