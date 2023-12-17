import {UpdateSongDto} from "../../../common/dtos/infrastructureDto/songDto/UpdateSong.dto";
import {Song} from "../../domain/Song";
import {CreateSongDto} from "../../../common/dtos/infrastructureDto/songDto/CreateSong.dto";
import {Genre} from "../../domain/Genre";
import {SearchItemDto} from "../../../common/dtos/SearchItem.dto";
import {SearchUserItemDto} from "../../../common/dtos/SearchUserItem.dto";
import {UserItemDto} from "../../../common/dtos/UserItem.dto";
import {GetItemsListDto} from "../../../common/dtos/GetItemsList.dto";

export interface ISongService {
    updateSong(dto: UpdateSongDto): Promise<Song>
    createSongGenre(genre: string): Promise<Genre>
    getAllGenres(dto: SearchItemDto): Promise<Genre[]>
    addToFavorite(dto: UserItemDto): Promise<Song>
    getSongById(id: number): Promise<Song>
    getUserFavSongs(dto: SearchUserItemDto): Promise<GetItemsListDto<Song>>
    getAll(dto: SearchItemDto): Promise<GetItemsListDto<Song>>
    createSong(dto: CreateSongDto): Promise<Song>
    delete(id: number): Promise<Song>
    removeFromFavorite(dto: UserItemDto): Promise<Song>
}