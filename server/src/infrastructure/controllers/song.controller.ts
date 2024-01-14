import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    InternalServerErrorException,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    Req,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
    ValidationPipe
} from "@nestjs/common";
import {SongService} from "../../core/services/song/song.service";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {CreateSongDto} from "../../common/dtos/infrastructureDto/songDto/CreateSong.dto";
import {UpdateSongDto} from "../../common/dtos/infrastructureDto/songDto/UpdateSong.dto";
import {Roles} from "../guards/roles.decorator";
import {AuthGuard} from "../guards/auth.guards";
import {UserRoles} from "../../core/domain/User";
import {SearchItemsDto} from "../../common/dtos/SearchItems.dto";
import {SearchUserItemsDto} from "../../common/dtos/SearchUserItems.dto";
import {GetUserItemDto} from "../../common/dtos/GetUserItem.dto";
import {GetUserItemsDto} from "../../common/dtos/GetParentItems.dto";
import {AuthReq} from "../../common/types/authReq";

@Controller('songs')
export class SongController {

    constructor(private songService: SongService) {}

    @Delete('delete/:id')
    @Roles(UserRoles.ADMIN)
    @UseGuards(AuthGuard)
    async delete(@Param('id', ParseIntPipe) id: number) {
        try {
            return await this.songService.delete(id)
        } catch (e) {
            console.log(e);
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Post('create')
    @Roles(UserRoles.ADMIN)
    @UseGuards(AuthGuard)
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'audio', maxCount: 1},
        {name: 'image', maxCount: 1},
    ]))
    async create(@Body(new ValidationPipe({transform: true})) dto: CreateSongDto, @UploadedFiles() files: {
        audio: Express.Multer.File[],
        image: Express.Multer.File[],
    }) {
        try {
            if (!files.image[0] || !files.audio[0]) {
                return new HttpException('Image and audio must be provided', HttpStatus.BAD_REQUEST);
            }
            return await this.songService.createSong(
                {
                    ...dto,
                    image: files.image[0],
                    audio: files.audio[0],
                }
            )
        } catch (e) {
            console.log(e);
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Put('update')
    @Roles(UserRoles.ADMIN)
    @UseGuards(AuthGuard)
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'audio', maxCount: 1},
        {name: 'image', maxCount: 1},
    ]))
    async updateSong(@Req() req: Request, @Body(new ValidationPipe({transform: true})) dto: UpdateSongDto, @UploadedFiles() files: {
        audio: Express.Multer.File[],
        image: Express.Multer.File[],
    }) {
        try {
            const audio = files.audio && (files.audio[0] as Express.Multer.File).buffer.length ? files?.audio[0] : undefined;
            const image = files.image && (files.image[0] as Express.Multer.File).buffer.length ? files?.image[0] : undefined;
            return this.songService.updateSong({...dto, audio, image});
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }

    @Get('genres')
    async getAllGenres(@Query() dto: SearchItemsDto) {
        try {
            return await this.songService.getAllGenres(dto);
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }

    @Post('createGenre')
    @Roles(UserRoles.ADMIN)
    @UseGuards(AuthGuard)
    async createGenre(@Body() data: { genre: string }) {
        try {
            return this.songService.createSongGenre(data.genre)
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }

    @Post('favorite')
    @Roles(UserRoles.USER)
    @UseGuards(AuthGuard)
    addToFavorite(@Body() dto: { userId: string, songId: number }) {
        try {
            return this.songService.addToFavorite({
                userId: dto.userId,
                itemId: dto.songId
            });
        } catch (e) {
            console.log(e);
            throw new BadRequestException();
        }
    }

    @Get('mySongs')
    @Roles(UserRoles.USER)
    @UseGuards(AuthGuard)
    getUserFavSongs(@Query(new ValidationPipe({transform: true})) dto: GetUserItemsDto, @Req() req: AuthReq) {
        try {
            return this.songService.getUserFavSongs({
                ...dto,
                userId: req.user.id
            });
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }

    @Delete('removeFromFavorite')
    @Roles(UserRoles.USER)
    @UseGuards(AuthGuard)
    removeFromFavorite(@Query() dto: GetUserItemDto) {
        try {
            return this.songService.removeFromFavorite(dto)
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }

    @Get('')
    getAll(@Query(new ValidationPipe({transform: true})) dto: SearchUserItemsDto) {
        try {
            return this.songService.getAll(dto)
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }

    @Get('/:id')
    getTrackById(@Param('id', ParseIntPipe) id: number) {
        try {
            return this.songService.getSongById(id);
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }

}