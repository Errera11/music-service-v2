import {SongRepository} from "../../domainInterface/SongRepository/SongRepository";
import {CreateSongDto} from "../../../common/dtos/CreateSong.dto";
import {PrismaService} from "../../../infrastructure/prisma.service";
import * as path from 'path';
import * as fs from 'fs';
import { Song } from "../../domain/Song";
import {DropboxService} from "../../../infrastructure/cloud/dropbox.service";
import {Injectable} from "@nestjs/common";

@Injectable()
export class SongService implements SongRepository{
    constructor(private prisma: PrismaService, private cloud: DropboxService) {}

    async getAll(): Promise<Song[]> {
        return await this.prisma.song.findMany();
    }

    async create(dto, image, audio): Promise<Song> {
        console.log(image.buffer);
        const imageResponse = await this.cloud.uploadFile(image.buffer, 'image', image.originalname)
        const musicResponse = await this.cloud.uploadFile(audio.buffer, 'music', audio.originalname)
        console.log(musicResponse);
        // const song = await this.prisma.song.create({
        //     data: {
        //         name: dto.name,
        //         description: dto.description,
        //         artist: dto.artist,
        //         image: dto.image
        //     }
        // });
        return;
    }

    async delete(id: number): Promise<Song> {
        return await this.prisma.song.delete({
            where: {
                id
            }
        });
    }

}