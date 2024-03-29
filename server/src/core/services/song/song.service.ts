import {PrismaService} from "../../../infrastructure/prisma.service";
import {Song} from "../../domain/Song";
import {DropboxService} from "../../../infrastructure/cloud/dropbox.service";
import {Injectable} from "@nestjs/common";
import * as uuid from "uuid";
import {CreateSongDto} from "../../../common/dtos/infrastructureDto/songDto/CreateSong.dto";
import {UpdateSongDto} from "src/common/dtos/infrastructureDto/songDto/UpdateSong.dto";
import {ISongService} from "./ISongService";
import {SongRepository} from "../../../infrastructure/db/repository/SongRepository";
import {Genre} from "../../domain/Genre";
import {SearchItemsDto} from "../../../common/dtos/SearchItems.dto";
import {GetUserItemDto} from "../../../common/dtos/GetUserItem.dto";
import {GetItemsListDto} from "../../../common/dtos/GetItemsList.dto";
import {GetUserItemsDto} from "../../../common/dtos/GetUserItems.dto";

@Injectable()
export class SongService implements ISongService {

    constructor(private prisma: PrismaService,
                private cloud: DropboxService,
                private songRepository: SongRepository) {
    }

    async updateSong(dto: UpdateSongDto): Promise<Song> {
        let audioId;
        let imageId;
        const existingSongRecord = await this.songRepository.getSongById(dto.id);
        if (dto.audio) {
            await this.cloud.deleteFile(existingSongRecord.audio);
            const audioName = uuid.v4() + '.' + dto.audio.originalname.split('.').pop();
            audioId = (await this.cloud.uploadFile(dto.audio.buffer, 'music', audioName)).result.id;
        }
        if (dto.image) {
            await this.cloud.deleteFile(existingSongRecord.image);
            const imageName = uuid.v4() + '.' + dto.image.originalname.split('.').pop();
            imageId = (await this.cloud.uploadFile(dto.image.buffer, 'image', imageName)).result.id;
        }
        return this.songRepository.updateSong({
            ...dto,
            audio: audioId,
            image: imageId
        })
    }

    createSongGenre(genre: string): Promise<Genre> {
        return this.songRepository.createSongGenre(genre)
    }

    async getAllGenres(dto: SearchItemsDto) {
        const genres =  await this.songRepository.getAllGenres(dto);
        if (!genres) return [] as Genre[]
        return genres
    }


    addToFavorite(dto: GetUserItemDto): Promise<Song> {
        return this.songRepository.addToFavorite(dto)
    }

    async getSongById(id: number): Promise<Song> {
        const song = await this.songRepository.getSongById(id);
        return {
            ...song,
            image: (await this.cloud.getFileStreamableUrl(song.image)).result.link,
            audio: (await this.cloud.getFileStreamableUrl(song.audio)).result.link,
        }
    }

    async getUserFavSongs(dto: GetUserItemsDto): Promise<GetItemsListDto<Song>> {
        const songs = await this.songRepository.getUserFavSongs(dto);
        if(!songs) return {
            items: [],
            totalCount: 0
        }
        return {
            ...songs,
            items: await Promise.all(songs.items.map(async (song) => ({
                ...song,
                image: (await this.cloud.getFileStreamableUrl(song.image)).result.link,
                audio: (await this.cloud.getFileStreamableUrl(song.audio)).result.link
            })))
        };
    }

    async getAll(dto: GetUserItemsDto): Promise<GetItemsListDto<Song>> {
        const songs = await this.songRepository.getAll(dto)
        if(!songs.items.length) return {
            items: [] as Song[],
            totalCount: 0
        }
        return {
            ...songs,
            items: await Promise.all(songs.items.map(async (item) => ({
                ...item,
                image: (await this.cloud.getFileStreamableUrl(item.image)).result.link,
                audio: (await this.cloud.getFileStreamableUrl(item.audio)).result.link,
            }))),
        };
    }

    async createSong(dto: CreateSongDto): Promise<Song> {
        const imageExt = dto.image.originalname.split('.').pop();
        const imageName = uuid.v4() + `.${imageExt}`;
        const imageResponse = await this.cloud.uploadFile(dto.image.buffer, 'image', imageName)
        const musicExt = dto.audio.originalname.split('.').pop();
        const musicName = uuid.v4() + `.${musicExt}`;
        const musicResponse = await this.cloud.uploadFile(dto.audio.buffer, 'music', musicName);
        return this.songRepository.createSong({
            ...dto,
            image: imageResponse.result.id,
            audio: musicResponse.result.id,
        })
    }

    async delete(id: number): Promise<Song> {
        const song = await this.songRepository.getSongById(id);
        await Promise.all([this.cloud.deleteFile(song.image), this.cloud.deleteFile(song.audio)])
        return this.songRepository.delete(id);
    }

    async removeFromFavorite(dto: GetUserItemDto): Promise<Song> {
        await this.songRepository.removeFromFavorite(dto);
        return this.songRepository.getSongById(dto.itemId as number);
    }
}