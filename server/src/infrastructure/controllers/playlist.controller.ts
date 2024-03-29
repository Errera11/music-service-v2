import {
    Body,
    Controller,
    Delete,
    Get, InternalServerErrorException, Param, ParseIntPipe,
    Post,
    Put,
    Query,
    Req,
    UploadedFiles,
    UseGuards,
    UseInterceptors, ValidationPipe
} from "@nestjs/common";
import {Song} from "../../core/domain/Song";
import {CreatePlaylistDto} from "../../common/dtos/infrastructureDto/playlistDto/CreatePlaylist.dto";
import {Playlist} from "../../core/domain/Playlist";
import {GetItemsListDto} from "../../common/dtos/GetItemsList.dto";
import {UpdatePlaylistDto} from "../../common/dtos/infrastructureDto/playlistDto/UpdatePlaylist.dto";
import {PlaylistService} from "../../core/services/playlist/playlist.service";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {AuthReq} from "../../common/types/authReq";
import {Roles} from "../guards/roles.decorator";
import {UserRoles} from "../../core/domain/User";
import {AuthGuard} from "../guards/auth.guards";
import {PaginationLimitDto} from "../../common/dtos/PaginationLimit.dto";
import {ParentItemDto} from "../../common/dtos/ParentItem.dto";
import {SearchItemsDto} from "../../common/dtos/SearchItems.dto";

@Controller('api/playlists')
export class PlaylistController {

    constructor(private playlistService: PlaylistService) {
    }

    @Post('songs')
    @Roles(UserRoles.USER)
    @UseGuards(AuthGuard)
    addSongToPlaylist(@Req() req: AuthReq, @Query(new ValidationPipe({transform: true})) dto: ParentItemDto): Promise<Song> {
        try {
            return this.playlistService.addSongToPlaylist({
                ...dto,
                userId: req.user.id
            });
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException()
        }
    }

    @Post('')
    @Roles(UserRoles.USER)
    @UseGuards(AuthGuard)
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'image', maxCount: 1}
    ]))
    async createPlaylist(@Body() dto: CreatePlaylistDto, @Req() req: AuthReq, @UploadedFiles() file): Promise<Playlist> {
        try {
            return this.playlistService.createPlaylist({
                ...dto,
                image: file[0]?.image,
                user_id: req.user.id
            })
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException()
        }
    }

    @Delete('/:id')
    @Roles(UserRoles.USER)
    @UseGuards(AuthGuard)
    async deletePlaylist(@Param('id', ParseIntPipe) id: number, @Req() req: AuthReq): Promise<Playlist> {
        try {
            return this.playlistService.deletePlaylist({
                itemId: id,
                userId: req.user.id
            })
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException()
        }
    }

    @Get('/:id')
    @Roles(UserRoles.USER)
    @UseGuards(AuthGuard)
    getPlaylistById(@Param('id', ParseIntPipe) id: number, @Req() req: AuthReq, @Query() dto: PaginationLimitDto): Promise<Playlist> {
        try {
            return this.playlistService.getPlaylistById({
                itemId: id,
                userId: req.user.id,
                ...dto
            });
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException()
        }
    }

    @Get('/songs/:id')
    @Roles(UserRoles.USER)
    @UseGuards(AuthGuard)
    async getPlaylistSongs(@Param('id', ParseIntPipe) id: number,
                           @Req() req: AuthReq,
                           @Query() dto: SearchItemsDto): Promise<GetItemsListDto<Song>> {
        try {
            return this.playlistService.getPlaylistSongs({
                ...dto,
                parentId: id
            });
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException()
        }
    }

    @Get('/user/:id')
    @Roles(UserRoles.USER)
    @UseGuards(AuthGuard)
    getUserPlaylists(@Param('id') userId, @Query() dto: PaginationLimitDto, @Req() req: AuthReq): Promise<GetItemsListDto<Playlist>> {
        try {
            return this.playlistService.getUserPlaylists({
                ...dto,
                userId: userId
            });
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException()
        }
    }

    @Delete('/songs')
    @Roles(UserRoles.USER)
    @UseGuards(AuthGuard)
    removeSongFromPlaylist(@Query() dto: ParentItemDto, @Req() req: AuthReq): Promise<Song> {
        try {
            return this.playlistService.removeSongFromPlaylist({
                ...dto,
                userId: req.user.id
            });
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException()
        }
    }

    @Put('')
    @Roles(UserRoles.USER)
    @UseGuards(AuthGuard)
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'image', maxCount: 1}
    ]))
    async updatePlaylist(@Body() dto: UpdatePlaylistDto, @UploadedFiles() file, @Req() req: AuthReq): Promise<Playlist> {
        try {
            return this.playlistService.updatePlaylist({
                ...dto,
                user_id: req.user.id,
                image: file[0].image
            })
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException()
        }
    }

}