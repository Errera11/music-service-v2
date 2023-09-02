import {SongRepository} from "../../domainInterface/SongRepository/SongRepository";
import {PrismaService} from "../../../infrastructure/prisma.service";
import {Song} from "../../domain/Song";
import {DropboxService} from "../../../infrastructure/cloud/dropbox.service";
import {Injectable} from "@nestjs/common";
import * as uuid from "uuid";

@Injectable()
export class SongService implements SongRepository{
    constructor(private prisma: PrismaService, private cloud: DropboxService) {}

    addToFavorite(userId: string, songId: number): Promise<any> {
        return this.prisma.favorite.create({
            data: {
                user_id: userId,
                song_id: songId
            }
        })
    }

    async getTrackById(id: number): Promise<Song> {
        const song = await this.prisma.song.findUnique({
            where: {
                id
            }
        })

        return {...song, image: (await this.cloud.getFileStreamableUrl(song.image)).result.link, audio: (await this.cloud.getFileStreamableUrl(song.audio)).result.link}
    }
    async getUserSongs(userId: string, skip: number, take: number): Promise<Song[]> {
        const songs =  await this.prisma.favorite.findMany({
            skip: skip || 0,
            take: take || 15,
            where: {
                user_id: userId
            },
            include: {
                song: true
            }
        })
        return Promise.all(songs.map(async (item) => ({
            ...item.song,
            image: (await this.cloud.getFileStreamableUrl(item.song.image)).result.link,
            audio: (await this.cloud.getFileStreamableUrl(item.song.audio)).result.link,
        })));
    }

    async getAll(skip: number, take: number): Promise<Song[]> {
        const songs = await this.prisma.song.findMany({
            skip: skip || 0,
            take: take || 15
        });
        return Promise.all(songs.map(async (item) => ({
            ...item,
            image: (await this.cloud.getFileStreamableUrl(item.image)).result.link,
            audio: (await this.cloud.getFileStreamableUrl(item.audio)).result.link,
        })));
    }

    async createSong(data): Promise<Song> {
        const imageExt = data.image.originalname.split('.').pop();
        const imageName = uuid.v4() + `.${imageExt}`;
        const imageResponse = await this.cloud.uploadFile(data.image.buffer, 'image', imageName)
        const musicExt = data.audio.originalname.split('.').pop();
        const musicName = uuid.v4() + `.${musicExt}`;
        const musicResponse = await this.cloud.uploadFile(data.audio.buffer, 'music', musicName);
        return this.prisma.song.create({
            data: {
                name: musicName,
                title: data.title,
                description: data.description,
                artist: data.artist,
                image: imageResponse.result.id,
                audio: musicResponse.result.id,
                duration: 0
            }
        })
    }

    // TODO cloud delete
    delete(id: number): Promise<Song> {
        return this.prisma.song.delete({
            where: {
                id
            }
        });
    }

    searchSong(query: string, skip: number, take: number): Promise<Song[]> {
        return this.prisma.song.findMany({
            skip,
            take,
            where: {
                OR: [
                    {
                        artist: {contains: query}
                    },
                    {
                        title: {contains: query}
                    }
                ]
            }
        })
    }

}