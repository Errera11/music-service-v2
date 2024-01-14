import {ISongRepository} from "../../../core/repositoryInterface/SongRepository/ISongRepository";
import {PrismaService} from "../../prisma.service";
import {UpdateSongDto} from "../../../common/dtos/repositoryDto/songDto/UpdateSong.dto";
import {Song} from "../../../core/domain/Song";
import {SongMapper} from "../mappers/Song.mapper";
import {CreateSongDto} from "../../../common/dtos/repositoryDto/songDto/CreateSong.dto";
import {Genre} from "../../../core/domain/Genre";
import {SearchItemsDto} from "../../../common/dtos/SearchItems.dto";
import {GetUserItemDto} from "../../../common/dtos/GetUserItem.dto";
import {GetItemsListDto} from "../../../common/dtos/GetItemsList.dto";
import {Inject} from "@nestjs/common";
import {GetUserItemsDto} from "../../../common/dtos/GetUserItems.dto";

export class SongRepository implements ISongRepository {

    constructor(@Inject(PrismaService) private prisma: PrismaService, private songMapper: SongMapper) {}

    async createSong(dto: CreateSongDto): Promise<Song> {
        const song = await this.prisma.song.create({
            data: {
                title: dto.title,
                description: dto.description,
                artist: dto?.artist,
                image: dto.image,
                audio: dto.audio,
                duration: 0,
                genre: {
                    createMany: {
                        data: dto.genre.map(id => ({genre_id: id}))
                    },
                }
            },
            include: {
                genre: {
                    include: {
                        genre: true
                    }
                },
                favorite: true
            }
        })
        return this.songMapper.songEntityToDomain(song);
    }

    createSongGenre(genre: string): Promise<Genre> {
        return this.prisma.genres.create({
            data: {
                genre
            }
        })
    }

    async delete(id: number): Promise<Song> {
        const song = await this.prisma.song.findUnique({
            where: {
                id
            },
            include: {
                genre: {
                    include: {
                        genre: true
                    }
                },
                favorite: true
            }
        })
        await this.prisma.song.delete({
            where: {
                id
            },
        });
        return this.songMapper.songEntityToDomain(song);
    }

    async getAll(dto: GetUserItemsDto): Promise<GetItemsListDto<Song>> {
        const songs = await this.prisma.song.findMany({
            skip: dto.skip || 0,
            take: dto.take || 15,
            where: {
                title: {
                    contains: dto.query,
                    mode: 'insensitive'
                }
            },
            include: {
                genre: {
                    include: {
                        genre: true
                    }
                },
                favorite: {
                    where: {
                        user_id: dto.userId
                    }
                }
            }
        });
        if (!songs) return {
            items: [],
            totalCount: 0
        }
        const songsCount = await this.prisma.song.count({
            where: {
                title: {
                    contains: dto.query,
                    mode: 'insensitive'
                }
            },
        })
        return {
            items: songs.map(song => this.songMapper.songEntityToDomain(song)),
            totalCount: songsCount
        }
    }

    getAllGenres(dto: SearchItemsDto): Promise<Genre[]> {
        return this.prisma.genres.findMany({
            where: {
                genre: {
                    contains: dto.query,
                    mode: 'insensitive'
                }
            },
            take: dto.take,
            skip: dto.skip
        });
    }

    async getSongById(id: number): Promise<Song> {
        const song = await this.prisma.song.findUnique({
            where: {
                id
            },
            include: {
                genre: {
                    select: {
                        genre: true
                    }
                },
                favorite: true
            }
        })
        return this.songMapper.songEntityToDomain(song);
    }

    async getUserFavSongs(dto: GetUserItemsDto): Promise<GetItemsListDto<Song>> {
        const userSongs = await this.prisma.favorite.findMany({
            where: {
                user_id: dto.userId,
                song: {
                    title: {
                        contains: dto?.query,
                        mode: 'insensitive'
                    }
                }
            },
            include: {
                song: {
                    include: {
                        genre: {
                            include: {
                                genre: true
                            }
                        }
                    }
                }
            }
        })
        const totalUserSongsCount = await this.prisma.favorite.count({
            where: {
                user_id: dto.userId
            },
            take: dto.take,
            skip: dto.skip
        })
        return {
            items: userSongs.map(song => ({
                ...this.songMapper.songEntityToDomain(song.song),
                isLiked: true
            })),
            totalCount: totalUserSongsCount
        }
    }

    async updateSong(dto: UpdateSongDto): Promise<Song> {
        const song = await this.prisma.song.update({
            where: {
                id: dto.id
            },
            data: {
                title: dto?.title || undefined,
                artist: dto?.artist || undefined,
                description: dto?.description || undefined,
                genre: {
                    createMany: {
                        data: dto.genre.map(item => ({genre_id: item}))
                    },
                    deleteMany: {
                        song_id: {
                            notIn: dto.genre
                        }
                    },
                },
                image: dto?.image || undefined,
                audio: dto?.audio || undefined
            },
            include: {
                genre: {
                    include: {
                        genre: true
                    }
                },
                favorite: true
            }
        })
        return this.songMapper.songEntityToDomain(song)
    }

    async addToFavorite(dto: GetUserItemDto): Promise<Song> {
        const song = await this.prisma.song.findUnique({
            where: {
                id: dto.itemId as number
            },
            include: {
                genre: {
                    include: {
                        genre: true
                    }
                },
                favorite: true
            }
        })
        return {
            ...this.songMapper.songEntityToDomain(song),
            isLiked: true
        }
    }

    removeFromFavorite(dto: GetUserItemDto) {
        return this.prisma.favorite.deleteMany({
            where: {
                user_id: dto.userId,
                song_id: dto.itemId as number
            },
        })
    }
}