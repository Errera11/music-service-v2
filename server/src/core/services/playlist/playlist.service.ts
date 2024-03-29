import {Injectable} from "@nestjs/common";
import {IPlaylistService} from "./IPlaylistService";
import {Song} from "../../domain/Song";
import {PlaylistRepository} from "../../../infrastructure/db/repository/PlaylistRepository";
import {GetUserItemDto} from "../../../common/dtos/GetUserItem.dto";
import {Playlist} from "../../domain/Playlist";
import {DropboxService} from "../../../infrastructure/cloud/dropbox.service";
import {CreatePlaylistDto} from "../../../common/dtos/infrastructureDto/playlistDto/CreatePlaylist.dto";
import {GetItemsListDto} from "../../../common/dtos/GetItemsList.dto";
import {UpdatePlaylistDto} from "../../../common/dtos/infrastructureDto/playlistDto/UpdatePlaylist.dto";
import {GetParentItemsDto} from "../../../common/dtos/GetParentItems.dto";
import {GetUserItemsDto} from "../../../common/dtos/GetUserItems.dto";
import {PaginationLimitDto} from "../../../common/dtos/PaginationLimit.dto";
import {ParentItemDto} from "../../../common/dtos/ParentItem.dto";
const uuid = require('uuid');

@Injectable()
export class PlaylistService implements IPlaylistService {
    constructor(private playlistRepository: PlaylistRepository,
                private cloud: DropboxService) {}

    async addSongToPlaylist(dto: ParentItemDto & {userId: string}): Promise<Song> {
        const song = await this.playlistRepository.addSongToPlaylist(dto);
        return {
            ...song,
            image: (await this.cloud.getFileStreamableUrl(song.image)).result.link,
            audio: (await this.cloud.getFileStreamableUrl(song.audio)).result.link,
        }
    }

    async createPlaylist(dto: CreatePlaylistDto): Promise<Playlist> {
        let savedPlaylistImageId;
        if(dto.image) {
            const playlistImageName = uuid.v4() + dto.image.originalname.split('.').pop();
            const savedPlaylistImageId = (await this.cloud.uploadFile(dto.image.buffer, 'image', playlistImageName)).result.id;
        }

        return this.playlistRepository.createPlaylist({
            ...dto,
            image: savedPlaylistImageId
        });
    }

    async deletePlaylist(dto: GetUserItemDto): Promise<Playlist> {
        const playlist = await this.playlistRepository.getPlaylistById(dto);
        await this.cloud.deleteFile(playlist.image);
        return this.playlistRepository.deletePlaylist(dto)
    }

    async getPlaylistById(dto: GetUserItemDto & PaginationLimitDto): Promise<Playlist & { playlist_songs: GetItemsListDto<Song> }> {
        const playlist = await this.playlistRepository.getPlaylistById(dto);
        return {
            ...playlist,
            playlist_songs: {
                ...playlist.playlist_songs,
                items: await Promise.all(playlist.playlist_songs.items.map(async (song) => ({
                    ...song,
                    image: (await this.cloud.getFileStreamableUrl(song.image)).result.link,
                    audio: (await this.cloud.getFileStreamableUrl(song.song)).result.link
                })))
            }
        }
    }

    async getPlaylistSongs(dto: GetParentItemsDto): Promise<GetItemsListDto<Song>> {
        const songs = await this.playlistRepository.getPlaylistSongs(dto);
        return {
            ...songs,
            items: await Promise.all(songs.items.map( async (song) => ({
                ...song,
                image: (await this.cloud.getFileStreamableUrl(song.image)).result.link,
                audio: (await this.cloud.getFileStreamableUrl(song.audio)).result.link,
            })))
        }
    }

    async getUserPlaylists(dto: GetUserItemsDto): Promise<GetItemsListDto<Playlist>> {
        const playlists = await this.playlistRepository.getUserPlaylists(dto);
        return {
            ...playlists,
            items: await Promise.all(playlists.items.map( async (playlist) => ({
                ...playlist,
                image: (await this.cloud.getFileStreamableUrl(playlist.image)).result.link,
            })))
        }
    }

    removeSongFromPlaylist(dto: ParentItemDto & { userId: string }): Promise<Song> {
        return this.playlistRepository.removeSongFromPlaylist(dto);
    }

    async updatePlaylist(dto: UpdatePlaylistDto): Promise<Playlist> {
        let newPlaylistImage;
        const playlist = await this.playlistRepository.getPlaylistById({
            itemId: dto.playlist_id,
            userId: dto.user_id
        })
        if(dto.image) {
            const imageName = uuid.v4() + dto.image.originalname.split('.').pop();
            await this.cloud.deleteFile(playlist.image);
            newPlaylistImage = await this.cloud.uploadFile(dto.image.buffer, 'image', imageName);
        }
        const updatedPlaylist = await this.playlistRepository.updatePlaylist({
            ...dto,
            image: newPlaylistImage && newPlaylistImage.result.id
        })
        return {
            ...updatedPlaylist,
            image: updatedPlaylist?.image && (await this.cloud.getFileStreamableUrl(updatedPlaylist.image)).result.link
        }
    }
}

