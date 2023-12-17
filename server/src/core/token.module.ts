import {Module} from "@nestjs/common";
import {TokenService} from "./services/token/token.service";
import {PrismaService} from "../infrastructure/prisma.service";
import {TokenRepository} from "../infrastructure/db/repository/TokenRepository";

@Module(
    {
        providers: [TokenService, PrismaService, TokenRepository],
        exports: [TokenService]
    }
)
export class TokenModule {}
