import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    UploadedFiles,
    UseInterceptors
} from "@nestjs/common";
import {SongService} from "../../core/serviceInterface/song/song.service";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {CreateSongDto} from "../../common/dtos/CreateSong.dto";

@Controller('songs')
export class SongController {

    constructor(private songService: SongService) {}

    @Get()
    async getAll() {
        try {
            return await this.songService.getAll();
        } catch (e) {
            console.log(e);
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Delete('delete')
    async delete(@Param('id') id: string) {
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
            if(!files.image[0] || !files.audio[0]) {
                throw new HttpException('Image and auido must be provided', HttpStatus.BAD_REQUEST);
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

}