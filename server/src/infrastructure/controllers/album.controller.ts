import {
    Body,
    Controller, Delete,
    Get,
    InternalServerErrorException, Param, ParseIntPipe,
    Post, Put,
    Query,
    UploadedFiles,
    UseInterceptors
} from "@nestjs/common";
import {AlbumService} from "../../core/serviceInterface/album/album.service";
import {PaginationLimitDto} from "../../common/dtos/PaginationLimit.dto";
import {CreateAlbumDto} from "../../common/dtos/CreateAlbum.dto";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {UpdateAlbumDto} from "../../common/dtos/UpdateAlbum.dto";

@Controller('album')
export class AlbumController {
    constructor(private albumService: AlbumService) {}

    @Post('addSong')
    addSongToAlbum(@Query(ParseIntPipe) dto: {songId: number, albumId: number}) {
        try {
            return this.albumService.addSongToAlbum(Number(dto.songId), Number(dto.albumId));
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException()
        }
    }

    @Get('')
    getAll(@Query() dto: PaginationLimitDto) {
        try {
            return this.albumService.getAlbums(dto.skip, dto.take)
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException()
        }
    }

    @Post('create')
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'image', maxCount: 1}
    ]))
    createAlbum(@Body() dto: CreateAlbumDto, @UploadedFiles() files: {image: Express.Multer.File[],}) {
        try {
            return this.albumService.createAlbum({
                ...dto,
                image: files.image[0]
            });
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException()
        }
    }

    @Put('update')
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'image', maxCount: 1}
    ]))
    updateAlbum(album: UpdateAlbumDto, @UploadedFiles() files: {image: Express.Multer.File[]}) {
        try {
            return this.albumService.updateAlbum({
                ...album,
                image: files.image[0]
            })
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }

    @Delete('removeSong')
    removeSong(@Query() dto: {songId: number, albumId: number}) {
        try {
            return this.albumService.deleteSongFromAlbum(Number(dto.songId), Number(dto.albumId));
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }

    @Delete('delete/:id')
    deleteAlbum(@Param('id', ParseIntPipe) id: number) {
        try {
            return this.albumService.deleteAlbum(id)
        } catch(e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }

    @Get('getAlbumById/:id')
    getAlbumById(@Param('id', ParseIntPipe) id: number) {
        try {
            return this.albumService.getAlbumById(id);
        } catch(e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }

}