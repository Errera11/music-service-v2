import {SongRepository} from "../../domainInterface/SongRepository/SongRepository";
import {PrismaService} from "../../../infrastructure/prisma.service";
import {Song} from "../../domain/Song";
import {DropboxService} from "../../../infrastructure/cloud/dropbox.service";
import {Injectable} from "@nestjs/common";
import * as uuid from "uuid";
const ffmpeg = require('fluent-ffmpeg');

@Injectable()
export class SongService implements SongRepository {
    constructor(private prisma: PrismaService, private cloud: DropboxService) {
    }

    addToFavorite(userId: string, songId: number): Promise<any> {
        return this.prisma.favorite.create({
            data: {
                user_id: userId,
                song_id: songId
            }
        })
    }

    async getTrackById(id: number, userId?: string): Promise<Song> {
        const song = await this.prisma.song.findUnique({
            where: {
                id
            }
        })

        return {
            ...song,
            image: (await this.cloud.getFileStreamableUrl(song.image)).result.link,
            audio: (await this.cloud.getFileStreamableUrl(song.audio)).result.link,
        }
    }

    async getUserSongs(userId: string, skip: number, take: number): Promise<{songs: (Song & {isLiked: boolean})[],  totalCount: number}> {
        const songs = await this.prisma.favorite.findMany({
            skip: skip || 0,
            take: take || 15,
            where: {
                user_id: userId
            },
            include: {
                song: true
            },
        })
        const songsCount = songs.length;
        })
        return {
            songs: await Promise.all(songs.map(async ({song: item}) => ({
                ...item,
                image: (await this.cloud.getFileStreamableUrl(item.image)).result.link,
                audio: (await this.cloud.getFileStreamableUrl(item.audio)).result.link,
                isLiked: true}))),
            totalCount: songsCount
        };
    }

    async getAll(skip: number, take: number, userId?: string): Promise<{songs: (Song & {isLiked: boolean})[],  totalCount: number}> {
        const songs = await this.prisma.song.findMany({
            skip: skip || 0,
            take: take || 15
        });
        const songsCount = songs.length;
        return {
            songs: await Promise.all(songs.map(async (item) => ({
                ...item,
                image: (await this.cloud.getFileStreamableUrl(item.image)).result.link,
                audio: (await this.cloud.getFileStreamableUrl(item.audio)).result.link,
                isLiked: userId ? Boolean(await this.prisma.favorite.findFirst({
                    where: {
                        user_id: userId,
                        song_id: item.id,
                    }
                })) : false
            }))),
            totalCount: songsCount
        };
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


    // @ts-ignore
    async searchSong(query: string, skip?: number, take?: number, userId?: string): Promise<{songs: (Song & {isLiked: boolean})[],  totalCount: number}> {
        const songs = await this.prisma.song.findMany({
            skip: Number(skip) || 0,
            take: Number(take) || 15,
            where: {
                OR: [
                    {
                        artist: {contains: query, mode: "insensitive"}
                    },
                    {
                        title: {contains: query, mode: "insensitive"}
                    }
                ],
            }
        });
        const songsCount = songs.length;
        return {
            songs: await Promise.all(songs.map(async (item) => ({
                ...item,
                image: (await this.cloud.getFileStreamableUrl(item.image)).result.link,
                audio: (await this.cloud.getFileStreamableUrl(item.audio)).result.link,
                isLiked: userId ? Boolean(await this.prisma.favorite.findFirst({
                    where: {
                        user_id: userId,
                        song_id: item.id,
                    }
                })) : false
            }))),
            totalCount: songsCount
        };
    }

    removeFromFavorite(userId, songId) {
        return this.prisma.favorite.deleteMany({
            where: {
                user_id: userId,
                song_id: songId
            }
        })
    }
}