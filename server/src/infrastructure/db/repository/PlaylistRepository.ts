import {IPlaylistRepository} from "../../../core/repositoryInterface/PlaylistRepository/IPlaylistRepository";
import {Song} from "../../../core/domain/Song";
import {CreatePlaylistDto} from "../../../common/dtos/CreatePlaylist.dto";
import {Playlist} from "../../../core/domain/Playlist";
import {PrismaService} from "../../prisma.service";
import {SongMapper} from "../mappers/Song.mapper";
import {PaginationLimitDto} from "../../../common/dtos/PaginationLimit.dto";
import {GetItemsListDto} from "../../../common/dtos/GetItemsList.dto";

export class PlaylistRepository implements IPlaylistRepository {

    constructor(private prisma: PrismaService,
                private songMapper: SongMapper) {
    }

    async addToPlaylist({songId, playlistId}: {songId: number, playlistId: number}): Promise<Song> {
        await this.prisma.playlist.update({
            where: {
                id: playlistId
            },
            data: {
                playlist_songs: {
                    create: {
                        song_id: songId
                    }
                }
            }
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

    async createPlaylist(dto: CreatePlaylistDto): Promise<Playlist> {
        const playlist = await this.prisma.playlist.create({
            data: {
                user_id: dto.user_id,
                title: dto.title,
                description: dto.description
            }
        })
        return {
            ...playlist,
            songs: []
        }
    }

    async deletePlaylist({playlistId}: {playlistId: number}): Promise<Playlist> {
        const playlist = await this.prisma.playlist.findUnique({
            where: {
                id: playlistId
            }
        })
        await this.prisma.playlist.delete({
            where: {
                id: playlistId
            }
        })
        return {
            ...playlist,
            songs: []
        }
    }

    async getUserPlaylists(dto: { userId: string } & PaginationLimitDto): Promise<GetItemsListDto<Omit<Playlist, 'songs'>>> {
        const playlists = await this.prisma.playlist.findMany({
            where: {
                user_id: dto.userId,
            },
            skip: dto.skip || 0,
            take: dto.take || 5,
        })
        const userPlaylistsTotalCount = await this.prisma.playlist.count({
            where: {
                user_id: dto.userId
            }
        })
        return {
            items: playlists,
            totalCount: userPlaylistsTotalCount
        }
    }

    async removeFromPlaylist({songId, playlistId}: { songId: number; playlistId: number }): Promise<Song> {
        const songToRemove = await this.prisma.song.findUnique({
            where: {
                id: songId
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
                playlist_id: playlistId,
                song_id: songId
            }
        })
        return this.songMapper.songEntityToDomain(songToRemove);
    }

    async getPlaylistById({userId, playlistId}: { userId: string; playlistId: number }): Promise<Playlist> {
        const playlist = await this.prisma.playlist.findUnique({
            where: {
                id: playlistId,
            },
            include: {
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
        return {
            ...playlist,
            songs: playlist.playlist_songs.map(song => this.songMapper.songEntityToDomain(song.song))
        }
    }

}