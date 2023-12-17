import {Injectable} from "@nestjs/common";
import {PlaylistController} from "../../../infrastructure/controllers/playlist.controller";
import {IPlaylistRepository} from "../../repositoryInterface/PlaylistRepository/IPlaylistRepository";
import {CreatePlaylistDto} from "../../../common/dtos/CreatePlaylist.dto";
import {Song} from "../../domain/Song";
import {Playlist} from "../../domain/Playlist";
@Injectable()
export class PlaylistService {
    constructor() {}


    createPlaylist(dto: CreatePlaylistDto): Playlist {
        return undefined;
    }

    deletePlaylist({playlist_id}: { playlist_id: number }): Playlist {
        return undefined;
    }

    removeFromPlaylist({song_id, user_id}: { song_id: number; user_id: number }): Song {
        return undefined;
    }

}

