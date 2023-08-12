import {SongRepository} from "../../domainInterface/SongRepository/SongRepository";
import {PrismaService} from "../../../infrastructure/prisma.service";
import { Song } from "../../domain/Song";
import {DropboxService} from "../../../infrastructure/cloud/dropbox.service";
import {Injectable} from "@nestjs/common";
import * as uuid from "uuid";

@Injectable()
export class SongService implements SongRepository{
    constructor(private prisma: PrismaService, private cloud: DropboxService) {}

    async getTrackAudio(id: string) {
        const response = await this.cloud.downloadFileById(id);
        return response.result.fileBinary;
    }

    async getTrackImage(id: string) {
        const response = await this.cloud.downloadFileById(id);
        return response.result.fileBinary;
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
                id: musicResponse.result.id,
                name: musicName,
                description: data.description,
                artist: data.artist,
                image: imageResponse.result.id
            }
        })
    }

    delete(id: string): Promise<Song> {
        return this.prisma.song.delete({
            where: {
                id
            }
        });
    }

}