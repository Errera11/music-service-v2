import {Module} from "@nestjs/common";
import {TokenService} from "./serviceInterface/token/token.service";

@Module(
    {
        providers: [TokenService]
    }
)
export class TokenModule {}
