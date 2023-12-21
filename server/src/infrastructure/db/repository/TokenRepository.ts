import {ITokenRepository} from "../../../core/repositoryInterface/TokenRepository/ITokenRepository";
import {PrismaService} from "../../prisma.service";
import {SearchUserItemDto} from "../../../common/dtos/SearchUserItem.dto";
import {Injectable} from "@nestjs/common";

@Injectable()
export class TokenRepository implements ITokenRepository {

    constructor(private prisma: PrismaService) {}

    async deleteRefreshToken(dto: SearchUserItemDto): Promise<string> {
        const refreshToken = await this.prisma.tokenSession.deleteMany({
            where: {
                refreshToken: dto.itemId as string,
                user_id: dto.userId
            }
        })
        return dto.itemId as string;
    }

    saveRefreshToken(dto: SearchUserItemDto) {
        return this.prisma.tokenSession.create({
            data: {
                user_id: dto.userId,
                refreshToken: dto.itemId as string
            }
        })
    }

}