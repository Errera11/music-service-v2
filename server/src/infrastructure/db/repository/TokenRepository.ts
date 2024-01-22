import {ITokenRepository} from "../../../core/repositoryInterface/TokenRepository/ITokenRepository";
import {PrismaService} from "../../prisma.service";
import {GetUserItemDto} from "../../../common/dtos/GetUserItem.dto";
import {Injectable} from "@nestjs/common";

@Injectable()
export class TokenRepository implements ITokenRepository {

    constructor(private prisma: PrismaService) {}

    async deleteRefreshToken(dto: GetUserItemDto): Promise<string> {
        const refreshToken = await this.prisma.tokenSession.deleteMany({
            where: {
                refreshToken: String(dto.itemId),
                user_id: dto.userId
            }
        })
        return String(dto.itemId);
    }

    saveRefreshToken(dto: GetUserItemDto) {
        return this.prisma.tokenSession.create({
            data: {
                user_id: dto.userId,
                refreshToken: String(dto.itemId)
            }
        })
    }

}