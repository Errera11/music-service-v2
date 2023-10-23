import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus, InternalServerErrorException,
    Param, ParseIntPipe,
    Post, Put, Query, Req,
    UploadedFiles,
    UseInterceptors, ValidationPipe
} from "@nestjs/common";
import {SongService} from "../../core/serviceInterface/song/song.service";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {CreateSongDto} from "../../common/dtos/CreateSong.dto";
import {PaginationLimitDto} from "../../common/dtos/PaginationLimit.dto";
import {UpdateSongDto} from "../../common/dtos/UpdateSong.dto";

@Controller('songs')
export class SongController {

    constructor(private songService: SongService) {}

    @Get('search')
    searchSong(@Query(new ValidationPipe({transform: true})) dto: PaginationLimitDto,
               @Query() query: { query: string, userId?: string }) {
        try {
            return this.songService.searchSong(query.query, dto.skip, dto.take, query?.userId);
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }

    @Delete('delete/:id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        try {
            return await this.songService.delete(id)
        } catch (e) {
            console.log(e);
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Post('create')
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
                throw new HttpException('Image and audio must be provided', HttpStatus.BAD_REQUEST);
            }
            return await this.songService.createSong(
                dto,
                files.image[0],
                files.audio[0],
            )
        } catch (e) {
            console.log(e);
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Put('update')
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
    async getAllGenres() {
        try {
            const resp = await this.songService.getAllGenres();
            return resp
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }

    @Post('createGenre')
    async createGenre(@Body() data: { genre: string }) {
        try {
            return this.songService.createSongGenre(data.genre)
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }

    @Post('favorite')
    addToFavorite(@Body() dto: { userId: string, songId: number }) {
        try {
            return this.songService.addToFavorite(dto.userId, dto.songId);
        } catch (e) {
            console.log(e);
            throw new BadRequestException();
        }
    }

    @Get('mySongs')
    getUserSongs(@Query(new ValidationPipe({transform: true})) paginationLimit: PaginationLimitDto,
                 @Query() queryParams: { id: string, userId?: string }) {
        try {
            return this.songService.getUserSongs(queryParams.id, paginationLimit.skip, paginationLimit.take);
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }

    @Delete('removeFavorite')
    removeFromFavorite(@Query() queryParams: { userId: string, songId: number }) {
        try {
            return this.songService.removeFromFavorite(queryParams.userId, queryParams.songId)
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }

    @Get('')
    getAll(@Query(new ValidationPipe({transform: true})) paginationLimit: PaginationLimitDto) {
        try {
            return this.songService.getAll(paginationLimit.skip, paginationLimit.take)
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }

    @Get('/:id')
    getTrackById(@Param('id', ParseIntPipe) id: number) {
        try {
            return this.songService.getTrackById(id);
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }

}