import {
    Body,
    Controller, Delete,
    Get,
    InternalServerErrorException, Param, ParseIntPipe,
    Post, Put,
    Query,
    UploadedFiles,
    UseInterceptors, ValidationPipe
} from "@nestjs/common";
import {AlbumService} from "../../core/services/album/album.service";
import {CreateAlbumDto} from "../../common/dtos/infrastructureDto/albumDto/CreateAlbum.dto";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {UpdateAlbumDto} from "../../common/dtos/infrastructureDto/albumDto/UpdateAlbum.dto";
import {SearchUserItemDto} from "../../common/dtos/SearchUserItem.dto";

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
    getAll(@Query(new ValidationPipe({transform: true})) dto: SearchUserItemDto) {
        try {
            return this.albumService.getAlbums({
                ...dto
            })
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException()
        }
    }

    @Post('create')
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'image', maxCount: 1}
    ]))
    createAlbum(@Body(new ValidationPipe({transform: true})) dto: CreateAlbumDto, @UploadedFiles() files: {image: Express.Multer.File[],}) {
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
    updateAlbum(@Body(new ValidationPipe({transform: true})) album: UpdateAlbumDto, @UploadedFiles() files: {image?: Express.Multer.File[] | undefined}) {
        try {
            return this.albumService.updateAlbum({
                ...album,
                image: files.image ? files.image[0] : undefined
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