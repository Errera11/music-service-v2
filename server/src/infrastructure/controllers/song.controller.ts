import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus, InternalServerErrorException,
    Param,
    Post, Query,
    UploadedFiles,
    UseInterceptors
} from "@nestjs/common";
import {SongService} from "../../core/serviceInterface/song/song.service";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {CreateSongDto} from "../../common/dtos/CreateSong.dto";
import {convertToArray} from "class-validator/types/utils";

@Controller('songs')
export class SongController {

    constructor(private songService: SongService) {
    }

    @Delete('delete')
    async delete(@Param('id') id: number) {
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
    async create(@Body() dto: CreateSongDto, @UploadedFiles() files: {
        audio: Express.Multer.File[],
        image: Express.Multer.File[],
    }) {
        try {
            if (!files.image[0] || !files.audio[0]) {
                throw new HttpException('Image and audio must be provided', HttpStatus.BAD_REQUEST);
            }
            return await this.songService.createSong({
                ...dto,
                audio: files.audio[0],
                image: files.image[0]
            })
        } catch (e) {
            console.log(e);
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
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

    @Get('')
    getAll(@Query() queryParams: { take: number, skip: number }) {
        try {
            return this.songService.getAll(queryParams.skip, queryParams.take)
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }

    @Get('song/:id')
    getTrackById(@Param('id') id: number) {
        try {
            return this.songService.getTrackById(id);
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }

    @Get('mySongs')
    getUserSongs(@Query() queryParams: { skip: number, take: number, id: string, userId?: string }) {
        try {
            return this.songService.getUserSongs(queryParams.id, queryParams.skip, queryParams.take);
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }

    @Get('search')
    searchSong(@Query() queryParams: { skip?: number, take?: number, query: string, userId?: string }) {
        try {
            return this.songService.searchSong(queryParams.query, queryParams.skip, queryParams.take, queryParams?.userId);
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

}