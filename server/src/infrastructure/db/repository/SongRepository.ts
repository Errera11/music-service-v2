import {ISongRepository} from "../../../core/repositoryInterface/SongRepository/ISongRepository";
import {PrismaService} from "../../prisma.service";
import {UpdateSongDto} from "../../../common/dtos/repositoryDto/songDto/UpdateSong.dto";
import {Song} from "../../../core/domain/Song";
import {SongMapper} from "../mappers/Song.mapper";
import {CreateSongDto} from "../../../common/dtos/repositoryDto/songDto/CreateSong.dto";
import {Genre} from "../../../core/domain/Genre";
import {SearchItemsDto} from "../../../common/dtos/SearchItems.dto";
import {SearchUserItemDto} from "../../../common/dtos/SearchUserItem.dto";
import {SearchUserItemsDto} from "../../../common/dtos/SearchUserItems.dto";
import {GetItemsListDto} from "../../../common/dtos/GetItemsList.dto";

export class SongRepository implements ISongRepository {

    constructor(private prisma: PrismaService, private songMapper: SongMapper) {}

    async createSong(dto: CreateSongDto): Promise<Song> {
        try {
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
        } catch (e) {
            console.log(e);
        }
    }

    createSongGenre(genre: string): Promise<Genre> {
        try {
            return this.prisma.genres.create({
                data: {
                    genre
                }
            })
        } catch (e) {
            console.log(e);
        }
    }

    async delete(id: number): Promise<Song> {
        try {
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
        } catch (e) {
            console.log(e);
        }
    }

    async getAll(dto: SearchUserItemsDto): Promise<GetItemsListDto<Song> | void> {
        try {
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
        } catch (e) {
            console.log(e);
        }
    }

    getAllGenres(dto: SearchItemsDto): Promise<Genre[] | void> {
        try {
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
        } catch (e) {
            console.log(e);
        }
    }

    async getSongById(id: number): Promise<Song> {
        try {
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
        } catch (e) {
            console.log(e);
        }
    }

    async getUserFavSongs(dto: SearchUserItemsDto): Promise<GetItemsListDto<Song> | void> {
        try {
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
        } catch (e) {
            console.log(e);
        }
    }

    async updateSong(dto: UpdateSongDto): Promise<Song> {
        try {
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
        } catch (e) {
            console.log(e);
        }
    }

    async addToFavorite(dto: SearchUserItemDto): Promise<Song> {
        try {
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
        } catch (e) {
            console.log(e);
        }
    }

    removeFromFavorite(dto: SearchUserItemDto) {
        try {
            return this.prisma.favorite.deleteMany({
                where: {
                    user_id: dto.userId,
                    song_id: dto.itemId as number
                },
            })
        } catch (e) {
            console.log(e);
        }
    }
}