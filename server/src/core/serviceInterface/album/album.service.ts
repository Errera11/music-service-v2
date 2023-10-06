import {AlbumRepository} from "../../domainInterface/AlbumRepository/AlbumRepository";
import {CreateAlbumDto} from "../../../common/dtos/CreateAlbum.dto";
import {PrismaService} from "../../../infrastructure/prisma.service";
import {Album} from "../../domain/Album";
import {AlbumSongs} from "../../domain/AlbumSongs";
import {UpdateAlbumDto} from "../../../common/dtos/UpdateAlbum.dto";
import {DropboxService} from "../../../infrastructure/cloud/dropbox.service";
import {Song} from "../../domain/Song";
import * as uuid from 'uuid';
import {Inject} from "@nestjs/common";

export class AlbumService implements AlbumRepository {

    constructor(@Inject(DropboxService) private cloud: DropboxService, private prisma: PrismaService) {}

    addSongToAlbum(songId: number, albumId: number): Promise<AlbumSongs> {
        return this.prisma.albumSongs.create({
            data: {song_id: songId, album_id: albumId},
        })
    }

    async createAlbum(dto: CreateAlbumDto): Promise<Album & { album_songs: number[] }> {
        const {album_songs, image,  ...createData} = dto;
        const albumUuid = uuid.v4() + image.originalname.split('.').pop();
        const response = await this.cloud.uploadFile(dto.image, 'image', albumUuid);
        const album = await this.prisma.album.create({
            data: {
                ...createData,
                image: response.result.id,
                album_songs: {
                    createMany: {
                        data: album_songs?.map(item => ({song_id: item})) || []
                    }
                },
            },
            include: {
                album_songs: {
                    select: {
                        song_id: true
                    }
                }
            }
        })
        return {
            ...album,
            album_songs: album.album_songs.map(song => song.song_id)
        }
    }

    deleteAlbum(albumId: number): Promise<Album> {
        return this.prisma.album.delete({
            where: {
                id: albumId
            }
        })
    }

    async deleteSongFromAlbum(songId: number, albumId: number): Promise<{ song_id: number }> {
        const data = await this.prisma.albumSongs.deleteMany({
            where: {
                album_id: albumId,
                song_id: songId,
            }
        });
        return data[0].song_id;
    }

    async updateAlbum(album: UpdateAlbumDto): Promise<Album & { album_songs: number[] }> {
        const {id, album_songs, ...rest} = album;
        let imageId = undefined;
        if(album.image) {
            const fileName = album.image.originalname.split('.').pop();
            const response = await this.cloud.uploadFile(album.image.buffer, 'image', fileName);
            imageId = response.result.id;
        }
        const updatedAlbum = await this.prisma.album.update({
            where: {
                id
            },
            data: {
                ...rest,
                image: imageId,
                album_songs: {
                    createMany: {
                        data: album_songs.map(id => ({song_id: id}))
                    }
                },
            },
            include: {
                album_songs: {
                    select: {
                        song_id: true
                    }
                }
            }
        })
        return {
            ...updatedAlbum,
            album_songs: updatedAlbum.album_songs.map(song => song.song_id)
        }
    }

    getAlbums(skip?: number, take?: number): Promise<Album[]> {
        return this.prisma.album.findMany({
            skip: skip || 0,
            take: take || 10,
            include: {
                album_songs: {
                    select: {
                        song_id: true
                    }
                }
            }
        })
    }

    async getAlbumById(albumId: number): Promise<Album & { songs: Song[] }> {
        const album = await this.prisma.album.findUnique({
            where: {
                id: albumId
            },
            include: {
                album_songs: {
                    select: {
                        song_id: true
                    }
                }
            }
        })
        const albumSongs = await this.prisma.song.findMany({
            where: {
                id: {
                    in: album.album_songs.map(obj => obj.song_id)
                }
            }
        })
        return {
            ...album,
            songs: await Promise.all(albumSongs.map(async (song) => ({
                ...song,
                image: (await this.cloud.getFileStreamableUrl(song.image)).result.link,
                audio: (await this.cloud.getFileStreamableUrl(song.audio)).result.link,
            })))
        }
    }
}