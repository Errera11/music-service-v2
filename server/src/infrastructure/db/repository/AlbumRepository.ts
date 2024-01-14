import {Injectable} from "@nestjs/common";
import {Album} from "src/core/domain/Album";
import {Song} from "../../../core/domain/Song";
import {PrismaService} from "../../prisma.service";
import {CreateAlbumDto} from "../../../common/dtos/repositoryDto/albumDto/CreateAlbum.dto";
import {AlbumMapper} from "../mappers/Album.mapper";
import {GetItemsListDto} from "../../../common/dtos/GetItemsList.dto";
import {UpdateAlbumDto} from "../../../common/dtos/repositoryDto/albumDto/UpdateAlbum.dto";
import {IAlbumRepository} from "../../../core/repositoryInterface/AlbumRepository/IAlbumRepository";
import {SongMapper} from "../mappers/Song.mapper";
import {GetUserItemsDto} from "../../../common/dtos/GetUserItems.dto";

@Injectable()
export class AlbumRepository implements IAlbumRepository {

    constructor(private prisma: PrismaService,
                private albumsMapper: AlbumMapper,
                private songMapper: SongMapper) {
    }

    async addSongToAlbum(songId: number, albumId: number): Promise<Song> {
        await this.prisma.albumSongs.create({
            data: {song_id: songId, album_id: albumId},
        })
        const addedSong = await this.prisma.song.findUnique({
            where: {
                id: songId
            },
            include: {
                favorite: true,
                genre: {
                    include: {
                        genre: true
                    }
                }
            }
        })
        return this.songMapper.songEntityToDomain(addedSong);
    }

    async createAlbum(dto: CreateAlbumDto): Promise<Album> {
        const albumEntity = await this.prisma.album.create({
            data: {
                title: dto.title,
                description: dto.description,
                author: dto.author,
                image: dto.image,
                album_songs: {
                    createMany: {
                        data: dto.album_songs.map(item => ({song_id: item}))
                    }
                },
            },
            include: {
                album_songs: {
                    select: {
                        song: {
                            include: {
                                genre: {
                                    select: {
                                        genre: true
                                    }
                                },
                                favorite: true
                            }
                        }
                    }
                }
            }
        })
        return this.albumsMapper.albumEntityToDomain(albumEntity)
    }

    async deleteAlbum(albumId: number): Promise<Omit<Album, 'album_songs'>> {
        const albumEntity = await this.prisma.album.delete({
            where: {
                id: albumId,
            }
        })
        return this.albumsMapper.albumEntityToDomain(albumEntity)
    }

    async deleteSongFromAlbum(songId: number, albumId: number): Promise<Song> {
        const songEntity = await this.prisma.song.findUnique({
            where: {
                id: songId
            },
            include: {
                album_songs: {
                    where: {
                        song_id: songId,
                        album_id: albumId
                    }
                },
                genre: {
                    include: {
                        genre: true
                    }
                }
            }
        })
        await this.prisma.albumSongs.deleteMany({
            where: {
                id: songEntity.album_songs[0].id
            }
        });
        return {
            ...this.songMapper.songEntityToDomain(songEntity)
        }
    }

    async getAlbumById(albumId: number): Promise<Album> {
        const album = await this.prisma.album.findUnique({
            where: {
                id: albumId
            },
            include: {
                album_songs: {
                    select: {
                        song: {
                            include: {
                                genre: {
                                    select: {
                                        genre: true
                                    }
                                },
                                favorite: true
                            },
                        }
                    }
                },
            }
        })
        return this.albumsMapper.albumEntityToDomain(album);
    }

    async getAlbums(dto: GetUserItemsDto): Promise<GetItemsListDto<Omit<Album, 'album_songs'>> | void> {
        const albums = await this.prisma.album.findMany({
            take: dto?.take || 5,
            skip: dto?.skip || 0,
            where: {
                title: {
                    contains: dto?.query || '',
                    mode: "insensitive"
                }
            },
            include: {
                user_album_favorite: {
                    where: {
                        user_id: dto?.userId
                    }
                }
            }
        })
        const totalCount = await this.prisma.album.count({
            where: {
                title: {
                    contains: dto?.query || '',
                    mode: "insensitive"
                }
            },
        })
        return {
            items: albums.map(album => this.albumsMapper.albumEntityToDomain(album)),
            totalCount
        }
    }

    async updateAlbum(album: UpdateAlbumDto): Promise<Album> {
        const updatedAlbum = await this.prisma.album.update({
            where: {
                id: album.id
            },
            data: {
                ...album,
                image: album?.image || undefined,
                album_songs: {
                    deleteMany: {
                        song_id: {
                            notIn: album.album_songs
                        }
                    },
                    createMany: {
                        data: album.album_songs.map(id => ({song_id: id}))
                    }
                },
            },
            include: {
                album_songs: {
                    select: {
                        song: {
                            include: {
                                genre: {
                                    include: {
                                        genre: true
                                    }
                                },
                                favorite: true
                            },
                        },

                    }
                }
            }
        })
        return this.albumsMapper.albumEntityToDomain(updatedAlbum);
    }
}