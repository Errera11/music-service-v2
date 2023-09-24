import {AlbumRepository} from "../../domainInterface/AlbumRepository/AlbumRepository";
import {CreateAlbumDto} from "../../../common/dtos/CreateAlbum.dto";
import {PrismaService} from "../../../infrastructure/prisma.service";
import {Album} from "../../domain/Album";
import {Song} from "../../domain/Song";

export class AlbumService implements AlbumRepository {

    constructor(private prisma: PrismaService) {
    }

    addSongToAlbum(songId: number, albumId: number): Promise<{song_id: number}> {
        return this.prisma.albumSongs.create({
            data: {
                album_id: albumId,
                song_id: songId
            },
            select: {
                song_id: true
            }
        })
    }

    async createAlbum(dto: CreateAlbumDto): Promise<Album> {
        const {album_songs, ...createData} = dto;
        const album = await this.prisma.album.create({
            data: {
                ...createData,
                album_songs: {
                    createMany: {
                        data: album_songs.map(item => ({song_id: item}))
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

    async deleteSongFromAlbum(songId: number, albumId: number): Promise<{song_id: number}> {
        const data =  await this.prisma.albumSongs.deleteMany({
            where: {
                album_id: albumId,
                song_id: songId,
            }
        });
        return data[0].song_id;
    }

    updateAlbum(album: Album): Promise<Album> {
        const {id, album_songs, ...rest} = album;
        return this.prisma.album.update({
            where: {
                id
            },
            data: {
                ...rest
            }
        })
    }

}