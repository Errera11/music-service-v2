import {IPlaylistRepository} from "../../../core/repositoryInterface/PlaylistRepository/IPlaylistRepository";
import {PrismaService} from "../../prisma.service";
import {SongMapper} from "../mappers/Song.mapper";
import {GetUserItemDto} from "../../../common/dtos/GetUserItem.dto";
import {CreatePlaylistDto} from "../../../common/dtos/repositoryDto/playlistDto/CreatePlaylist.dto";
import {Playlist} from "../../../core/domain/Playlist";
import {Song} from "../../../core/domain/Song";
import {GetItemsListDto} from "../../../common/dtos/GetItemsList.dto";
import {UpdatePlaylistDto} from "../../../common/dtos/repositoryDto/playlistDto/UpdatePlaylist.dto";
import {Injectable} from "@nestjs/common";
import {GetParentItemsDto} from "../../../common/dtos/GetParentItems.dto";
import {GetUserItemsDto} from "../../../common/dtos/GetUserItems.dto";
import {PaginationLimitDto} from "../../../common/dtos/PaginationLimit.dto";
import {PlaylistMapper} from "../mappers/Playlist.mapper";
import {ParentItemDto} from "../../../common/dtos/ParentItem.dto";

@Injectable()
export class PlaylistRepository implements IPlaylistRepository {

    constructor(private prisma: PrismaService,
                private songMapper: SongMapper) {
    }

    async addSongToPlaylist(dto: ParentItemDto & { userId: string }): Promise<Song> {
        await this.prisma.playlist.update({
            where: {
                id: dto.parentId,
                user_id: dto.userId
            },
            data: {
                playlist_songs: {
                    create: {
                        song_id: dto.itemId,
                    }
                }
            }
        })
        const song = await this.prisma.song.findUnique({
            where: {
                id: dto.itemId
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
            },
        })
        return this.songMapper.songEntityToDomain(song);
    }

    createPlaylist(dto: CreatePlaylistDto): Promise<Playlist> {
        return this.prisma.playlist.create({
            data: {
                title: dto.title,
                description: dto.description,
                image: dto.image,
                user_id: dto.user_id,
                playlist_songs: {
                    createMany: {
                        data: dto.songs.map(songId => ({song_id: songId}))
                    }
                }
            }
        })
    }

    async deletePlaylist(dto: GetUserItemDto): Promise<Playlist> {
        const playlist = await this.prisma.playlist.findUnique({
            where: {
                user_id: dto.userId,
                id: dto.itemId as number
            }
        })
        await this.prisma.playlist.delete({
            where: {
                id: dto.itemId as number,
                user_id: dto.userId
            }
        })
        return playlist;
    }

    async getPlaylistById(dto: GetUserItemDto & PaginationLimitDto): Promise<Playlist & {playlist_songs: GetItemsListDto<Song>}> {
        const playlist =  await this.prisma.playlist.findUnique({
            where: {
                id: dto.itemId as number,
                user_id: dto.userId
            },
            include: {
                playlist_songs: {
                    skip: dto?.skip || 0,
                    take: dto?.take || 0,
                    select: {
                        song: {
                            include: {
                                favorite: true,
                                genre: {
                                    include: {
                                        genre: true
                                    }
                                }
                            },
                        },
                    }
                }
            }
        })
        const playlistSongsTotalCount = await this.prisma.playlistSongs.count({
            where: {
                playlist_id: dto.itemId as number
            }
        })

        return {
            ...playlist,
            playlist_songs: {
                items: this.songMapper.songEntitiesToDomains(playlist.playlist_songs),
                totalCount: playlistSongsTotalCount
            }
        };
    }

    async getPlaylistSongs(dto: GetParentItemsDto): Promise<GetItemsListDto<Song>> {
        const playlistSongs = await this.prisma.playlist.findMany({
            where: {
                id: Number(dto.parentId)
            },
            skip: dto.skip || 0,
            take: dto.take || 10,
            select: {
                playlist_songs: {
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
        const songsTotalCount = await this.prisma.playlistSongs.count({
            where: {
                playlist: {
                    id: Number(dto.parentId),
                }
            }
        })
        return {
            items: !!playlistSongs[0] && playlistSongs[0].playlist_songs.map(song => this.songMapper.songEntityToDomain(song.song)),
            totalCount: songsTotalCount
        }
    }

    async getUserPlaylists(dto: GetUserItemsDto): Promise<GetItemsListDto<Playlist>> {
        const playlists = await this.prisma.playlist.findMany({
            where: {
                user_id: dto.userId,
                title: {
                    contains: dto.query,
                    mode: "insensitive"
                }
            },
            skip: dto.skip,
            take: dto.take
        })
        const userPlaylistsTotalCount = await this.prisma.playlist.count({
            where: {
                user_id: dto.userId
            },
        })
        return {
            items: playlists,
            totalCount: userPlaylistsTotalCount
        }
    }

    async removeSongFromPlaylist(dto: ParentItemDto & { userId: string }): Promise<Song> {
        const song = await this.prisma.song.findUnique({
            where: {
                id: dto.itemId
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
        await this.prisma.playlistSongs.deleteMany({
            where: {
                song_id: dto.itemId,
                playlist_id: dto.parentId,
            }
        })
        return this.songMapper.songEntityToDomain(song);
    }

    updatePlaylist(dto: UpdatePlaylistDto): Promise<Playlist> {
        return this.prisma.playlist.update({
            where: {
                id: dto.playlist_id,
                user_id: dto.user_id
            },
            data: {
                title: dto.title,
                description: dto.description,
                image: dto.image
            }
        })
    }

}