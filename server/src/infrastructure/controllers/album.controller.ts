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
import {ParentItemDto} from "../../common/dtos/ParentItem.dto";
import {GetUserItemsDto} from "../../common/dtos/GetUserItems.dto";

@Controller('api/albums')
export class AlbumController {
    constructor(private albumService: AlbumService) {}

    @Post('songs')
    addSongToAlbum(@Query(ParseIntPipe) dto: ParentItemDto) {
        try {
            return this.albumService.addSongToAlbum({
                songId: dto.itemId,
                albumId: dto.parentId
            });
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException()
        }
    }

    @Get('')
    getAll(@Query(new ValidationPipe({transform: true})) dto: GetUserItemsDto) {
        try {
            return this.albumService.getAlbums({
                ...dto
            })
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException()
        }
    }

    @Post('')
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

    @Put('')
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

    @Delete('songs')
    removeSong(@Query() dto: ParentItemDto) {
        try {
            return this.albumService.deleteSongFromAlbum({
                songId: dto.itemId,
                albumId: dto.parentId
            });
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }

    @Delete('/:id')
    deleteAlbum(@Param('id', ParseIntPipe) id: number) {
        try {
            return this.albumService.deleteAlbum({
                albumId: id
            })
        } catch(e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }

    @Get('/:id')
    getAlbumById(@Param('id', ParseIntPipe) id: number) {
        try {
            return this.albumService.getAlbumById({
                albumId: id
            });
        } catch(e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }

}