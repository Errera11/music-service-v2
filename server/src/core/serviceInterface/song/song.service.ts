import {SongRepository} from "../../domainInterface/SongRepository/SongRepository";
import {PrismaService} from "../../../infrastructure/prisma.service";
import {Song} from "../../domain/Song";
import {DropboxService} from "../../../infrastructure/cloud/dropbox.service";
import {Injectable, InternalServerErrorException} from "@nestjs/common";
import * as uuid from "uuid";
import {CreateSongDto} from "../../../common/dtos/CreateSong.dto";
import {UpdateSongDto} from "src/common/dtos/UpdateSong.dto";
import {IGenre} from "../../../common/types/Genre";
import {skip} from "rxjs";

const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');

@Injectable()
export class SongService implements SongRepository {

    constructor(private prisma: PrismaService, private cloud: DropboxService) {
    }

    async updateSong(dto: UpdateSongDto): Promise<Song> {
        const song = await this.prisma.song.findUnique({
            where: {
                id: dto.id
            },
            select: {
                audio: true,
                image: true
            }
        })
        let imageId= null;
        let audioId = null;

        if (dto.audio) {
            await this.cloud.deleteFile(song.audio);
            const audioName = uuid.v4() + '.' + dto.audio.originalname.split('.').pop();
            audioId = (await this.cloud.uploadFile(dto.audio.buffer, 'music', audioName)).result.id;
        }

        if (dto.image) {
            await this.cloud.deleteFile(song.image);
            const imageName = uuid.v4() + '.' + dto.image.originalname.split('.').pop();
            imageId = (await this.cloud.uploadFile(dto.image.buffer, 'image', imageName)).result.id;
        }

        return this.prisma.song.update({
            where: {
                id: dto.id
            },

            data: {
                title: dto.title,
                artist: dto.artist,
                description: dto.description || '',
                genre: {
                    deleteMany: {
                        song_id: dto.id
                    },
                    createMany: {
                        data: dto.genre.map(item => ({genre_id: item}))
                    }
                },
                image: imageId || undefined,
                audio: audioId || undefined
            }
        })
    }

    createSongGenre(genre: string): Promise<{ id: number, genre: string }> {
        return this.prisma.genres.create({
            data: {
                genre
            }
        })
    }

    getAllGenres() {
        return this.prisma.genres.findMany();
    }


    addToFavorite(userId: string, songId: number): Promise<any> {
        return this.prisma.favorite.create({
            data: {
                user_id: userId,
                song_id: songId
            }
        })
    }

    async getTrackById(id: number, userId?: string): Promise<Song & { genre: IGenre[] }> {
        const song = await this.prisma.song.findUnique({
            where: {
                id
            },
            include: {
                genre: {
                    select: {
                        genre: true
                    }
                }
            }
        })
        return {
            ...song,
            genre: song.genre.map(genreObj => ({id: genreObj.genre.id, genre: genreObj.genre.genre})),
            image: (await this.cloud.getFileStreamableUrl(song.image)).result.link,
            audio: (await this.cloud.getFileStreamableUrl(song.audio)).result.link,
        }
    }

    async getUserSongs(userId: string, skip: number, take: number): Promise<{
        songs: (Song & { isLiked: boolean })[],
        totalCount: number
    }> {
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

        const songsCount = await this.prisma.favorite.count();
        return {
            songs: await Promise.all(songs.map(async ({song: item}) => ({
                ...item,
                image: (await this.cloud.getFileStreamableUrl(item.image)).result.link,
                audio: (await this.cloud.getFileStreamableUrl(item.audio)).result.link,
                isLiked: true,
            }))),
            totalCount: songsCount
        };
    }

    async getAll(skip: number, take: number, userId?: string): Promise<{
        songs: (Song & { isLiked: boolean })[],
        totalCount: number
    }> {
        const songs = await this.prisma.song.findMany({
            skip: skip || 0,
            take: take || 15
        });
        const songsCount = await this.prisma.song.count();
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

    async createSong(dto: CreateSongDto, image: Express.Multer.File, audio: Express.Multer.File): Promise<Song> {
        const imageExt = image.originalname.split('.').pop();
        const imageName = uuid.v4() + `.${imageExt}`;
        const imageResponse = await this.cloud.uploadFile(image.buffer, 'image', imageName)
        const musicExt = audio.originalname.split('.').pop();
        const musicName = uuid.v4() + `.${musicExt}`;
        const musicResponse = await this.cloud.uploadFile(audio.buffer, 'music', musicName);

        return this.prisma.song.create({
            data: {
                title: dto.title,
                description: dto.description,
                artist: dto.artist,
                image: imageResponse.result.id,
                audio: musicResponse.result.id,
                duration: 0,
                genre: {
                    createMany: {
                        data: dto.genre.map(item => ({genre_id: item}))
                    }
                }
            }
        })
    }

    // TODO cloud delete
    async delete(id: number): Promise<Song> {
        const song = await this.prisma.song.findUnique({where: {id}})
        const deletedSong = await this.prisma.song.delete({
            where: {
                id
            },
        });
        await Promise.all([this.cloud.deleteFile(song.image), this.cloud.deleteFile(song.audio)])
        return deletedSong;
    }

    async searchSong(query: string, skip?: number, take?: number, userId?: string): Promise<{
        songs: (Song & { isLiked: boolean })[],
        totalCount: number
    }> {
        const songs = await this.prisma.song.findMany({
            skip: skip || 0,
            take: take || 15,
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
        const songsCount = await this.prisma.song.count({
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
                })) : false,
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