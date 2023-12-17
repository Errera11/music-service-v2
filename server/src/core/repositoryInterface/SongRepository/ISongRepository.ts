import {CreateSongDto} from "../../../common/dtos/repositoryDto/songDto/CreateSong.dto";
import {Song} from "../../domain/Song";
import {UpdateSongDto} from "../../../common/dtos/repositoryDto/songDto/UpdateSong.dto";
import {SearchItemDto} from "../../../common/dtos/SearchItem.dto";
import {Genre} from "../../domain/Genre";
import {SearchUserItemDto} from "../../../common/dtos/SearchUserItem.dto";
import {UserItemDto} from "../../../common/dtos/UserItem.dto";
import {GetItemsListDto} from "../../../common/dtos/GetItemsList.dto";

export interface ISongRepository {
    createSong(dto: CreateSongDto): Promise<Song>
    createSongGenre(genre: string): Promise<Genre>
    delete(id: number): Promise<Song>
    getAll(dto: SearchUserItemDto): Promise<GetItemsListDto<Song>>
    getAllGenres(dto: SearchItemDto): Promise<Genre[]>
    getSongById(id: number): Promise<Song>
    getUserFavSongs(dto: SearchUserItemDto): Promise<GetItemsListDto<Song>>
    updateSong(dto: UpdateSongDto): Promise<Song>
    addToFavorite(dto: UserItemDto): Promise<any>
}