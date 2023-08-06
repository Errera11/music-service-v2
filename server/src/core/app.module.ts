import { Module } from '@nestjs/common';
import {UserController} from "../infrastructure/controllers/user.controller";
import {PrismaService} from "../infrastructure/prisma.service";
import {UserService} from "./serviceInterface/user.service";

@Module({
  imports: [],
  controllers: [UserController],
  providers: [PrismaService, UserService],
})
export class AppModule {}
