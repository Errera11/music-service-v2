import {Module} from "@nestjs/common";
import {TokenService} from "./../infrastructure/token/token.service";
import {PrismaService} from "../infrastructure/prisma.service";

@Module(
    {
        providers: [TokenService, PrismaService],
        exports: [TokenService]
    }
)
export class TokenModule {}
