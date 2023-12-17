import {CreateAlbumDto} from "../../../common/dtos/infrastructureDto/albumDto/CreateAlbum.dto";
import {Album} from "../../domain/Album";
import {UpdateAlbumDto} from "../../../common/dtos/infrastructureDto/albumDto/UpdateAlbum.dto";
import {DropboxService} from "../../../infrastructure/cloud/dropbox.service";
import {Song} from "../../domain/Song";
import * as uuid from 'uuid';
import {Inject} from "@nestjs/common";
import {AlbumRepository} from "../../../infrastructure/db/repository/AlbumRepository";
import {IAlbumService} from "./IAlbumService";
import {GetItemsListDto} from "../../../common/dtos/GetItemsList.dto";
import {SearchUserItemDto} from "../../../common/dtos/SearchUserItem.dto";

export class AlbumService implements IAlbumService {

    constructor(@Inject(DropboxService) private cloud: DropboxService,
                private albumRepository: AlbumRepository) {}

    async addSongToAlbum(songId: number, albumId: number): Promise<Song> {
        return this.albumRepository.addSongToAlbum(songId, albumId);
    }

    async createAlbum(dto: CreateAlbumDto): Promise<Album> {
        const {album_songs, image, ...createData} = dto;
        const albumUuid = uuid.v4() + '.' + image.originalname.split('.').pop();
        const response = await this.cloud.uploadFile(dto.image, 'image', albumUuid);
        const createdAlbum = await this.albumRepository.createAlbum({
            ...dto,
            image: response.result.id
        });
        return {
            ...createdAlbum,
            album_songs: await Promise.all(createdAlbum.album_songs.map(async (song) => ({
                ...song,
                image: (await this.cloud.getFileStreamableUrl(song.image)).result.link,
                audio: (await this.cloud.getFileStreamableUrl(song.audio)).result.link
            })))
        }
    }

    async deleteAlbum(albumId: number): Promise<Omit<Album, 'album_songs'>> {
        const album = await this.albumRepository.getAlbumById(albumId)
        await this.cloud.deleteFile(album.image)
        return this.albumRepository.deleteAlbum(albumId);
    }

    async deleteSongFromAlbum(songId: number, albumId: number): Promise<Song> {
        return this.albumRepository.deleteSongFromAlbum(songId, albumId);
    }

    async updateAlbum(album: UpdateAlbumDto): Promise<Album> {
        let imageId = undefined;
        if (album.image) {
            const fileName = uuid.v4() + '.' + album.image.originalname.split('.').pop();
            imageId = (await this.cloud.uploadFile(album.image.buffer, 'image', fileName)).result.id;
            const {image: imageToDelete} = await this.albumRepository.getAlbumById(album.id)
            await this.cloud.deleteFile(imageToDelete);
        }
        const updatedAlbum = await this.albumRepository.updateAlbum({
            ...album,
            image: imageId
        })
        return {
            ...updatedAlbum,
            album_songs: await Promise.all(updatedAlbum.album_songs.map(async (song) => ({
                ...song,
                image: (await this.cloud.getFileStreamableUrl(song.image)).result.link,
                audio: (await this.cloud.getFileStreamableUrl(song.audio)).result.link
            })))
        }
    }

    async getAlbums(dto: SearchUserItemDto): Promise<GetItemsListDto<Omit<Album, 'album_songs'>>> {
        const albums = await this.albumRepository.getAlbums({
            ...dto
        })
        const albumsWithImageUrl = await Promise.all(albums.items.map(async (album) => ({
            ...album,
            image: (await this.cloud.getFileStreamableUrl(album.image)).result.link
        })))
        return {
            ...albums,
            items: albumsWithImageUrl
        };
    }

    async getAlbumById(albumId: number): Promise<Album & { songs: Song[] }> {
        const album = await this.albumRepository.getAlbumById(albumId)
        return {
            ...album,
            image: (await this.cloud.getFileStreamableUrl(album.image)).result.link,
            songs: await Promise.all(album.album_songs.map(async (song) => ({
                ...song,
                image: (await this.cloud.getFileStreamableUrl(song.image)).result.link,
                audio: (await this.cloud.getFileStreamableUrl(song.audio)).result.link,
            })))
        }
    }
}