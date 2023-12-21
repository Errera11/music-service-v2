import {
    Body,
    Controller,
    Delete,
    Get, Param, ParseIntPipe,
    Post,
    Put,
    Query,
    Req,
    UploadedFiles,
    UseGuards,
    UseInterceptors, ValidationPipe
} from "@nestjs/common";
import {SearchUserItemDto} from "../../common/dtos/SearchUserItem.dto";
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
import {UserItemParentDto} from "../../common/dtos/UserItemParent.dto";


@Controller('playlist')
export class PlaylistController {

    constructor(private playlistService: PlaylistService) {}

    @Post('addSong')
    @Roles(UserRoles.USER)
    @UseGuards(AuthGuard)
    addSongToPlaylist(@Query(new ValidationPipe({transform: true})) dto: UserItemParentDto): Promise<Song> {
        return this.playlistService.addSongToPlaylist({
            userId: dto.userId,
            itemId: dto.parentId,
            songId: dto.itemId
        });
    }

    @Post('create')
    @Roles(UserRoles.USER)
    @UseGuards(AuthGuard)
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'image', maxCount: 1}
    ]))
    async createPlaylist(@Body() dto: CreatePlaylistDto, @Req() req: AuthReq, @UploadedFiles() file): Promise<Playlist> {
        const user = req.user;
        return this.playlistService.createPlaylist({
            ...dto,
            image: file[0].image,
            user_id: user.id
        })
    }

    @Roles(UserRoles.USER)
    @UseGuards(AuthGuard)
    @Delete('delete/:id')
    async deletePlaylist(@Param('id', ParseIntPipe) id: number, @Req() req: AuthReq): Promise<Playlist> {
        const user = req.user;
        return this.playlistService.deletePlaylist({
            itemId: id,
            userId: user.id
        })
    }

    @Roles(UserRoles.USER)
    @UseGuards(AuthGuard)
    @Get('/:id')
    getPlaylistById(@Param('id', ParseIntPipe) id: number, @Req() req: AuthReq): Promise<Playlist> {
        const user = req.user;
        return this.playlistService.getPlaylistById({
            itemId: id,
            userId: user.id
        });
    }

    @Roles(UserRoles.USER)
    @UseGuards(AuthGuard)
    @Get('/songs/:id')
    getPlaylistSongs(@Param('id', ParseIntPipe) id: number,
                     @Req() req: AuthReq,
                     @Query() dto: PaginationLimitDto): Promise<GetItemsListDto<Song>> {
        const user = req.user;
        return this.playlistService.getPlaylistSongs({
            ...dto,
            userId: user.id,
            parentId: id
        });
    }

    @Roles(UserRoles.USER)
    @UseGuards(AuthGuard)
    @Get('')
    getUserPlaylists(@Query() dto: PaginationLimitDto, @Req() req: AuthReq): Promise<GetItemsListDto<Playlist>> {
        const user = req.user;
        return this.playlistService.getPlaylistSongs({
            ...dto,
            userId: user.id
        });
    }

    @Roles(UserRoles.USER)
    @UseGuards(AuthGuard)
    @Delete('removeSong')
    removeSongFromPlaylist(dto: SearchUserItemDto & { songId: number }, @Req() req: AuthReq): Promise<Song> {
        const user = req.user;
        return this.playlistService.removeSongFromPlaylist({
            ...dto,
            userId: user.id
        });
    }

    @Roles(UserRoles.USER)
    @UseGuards(AuthGuard)
    @Put('update')
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'image', maxCount: 1}
    ]))
    async updatePlaylist(@Body() dto: UpdatePlaylistDto, @UploadedFiles() file, @Req() req: AuthReq): Promise<Playlist> {
            return this.playlistService.updatePlaylist({
                ...dto,
                user_id: req.user.id,
                image: file[0].image
            })
    }

}