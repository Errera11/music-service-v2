import {SongRepository} from "../../domainInterface/SongRepository/SongRepository";
import {PrismaService} from "../../../infrastructure/prisma.service";
import {Song, SongWithAudio} from "../../domain/Song";
import {DropboxService} from "../../../infrastructure/cloud/dropbox.service";
import {Injectable} from "@nestjs/common";
import * as uuid from "uuid";

@Injectable()
export class SongService implements SongRepository{
    constructor(private prisma: PrismaService, private cloud: DropboxService) {}

    getTrackById(id: string): Promise<SongWithAudio> {
        const song = this.prisma.song.findUnique({
            where: {
                id
            }
        })
        return Promise.all(songs.map(async (item) => ({...item.song, image: (await this.cloud.getFileStreamableUrl(item.song.image)).result.link, audio: (await this.cloud.getFileStreamableUrl(item.song.audio)).result.link})));
    }
    async getUserSongs(userId: string): Promise<Song[]> {
        const songs =  await this.prisma.favorite.findMany({
            where: {
                user_id: userId
            },
            include: {
                song: true
            }
        })
        return Promise.all(songs.map(async (item) => ({...item.song, image: (await this.cloud.getFileStreamableUrl(item.song.id)).result.link})));
    }

    getAll(): Promise<Song[]> {
        return this.prisma.song.findMany();
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
                description: data.description,
                artist: data.artist,
                image: imageResponse.result.id,
                audio: musicResponse.result.id,
            }
        })
    }

    // TODO cloud delete
    delete(id: string): Promise<Song> {
        return this.prisma.song.delete({
            where: {
                id
            }
        });
    }

}