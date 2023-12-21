import {UpdateSongDto} from "../../../common/dtos/infrastructureDto/songDto/UpdateSong.dto";
import {Song} from "../../domain/Song";
import {CreateSongDto} from "../../../common/dtos/infrastructureDto/songDto/CreateSong.dto";
import {Genre} from "../../domain/Genre";
import {SearchItemsDto} from "../../../common/dtos/SearchItems.dto";
import {SearchUserItemsDto} from "../../../common/dtos/SearchUserItems.dto";
import {SearchUserItemDto} from "../../../common/dtos/SearchUserItem.dto";
import {GetItemsListDto} from "../../../common/dtos/GetItemsList.dto";

export interface ISongService {
    updateSong(dto: UpdateSongDto): Promise<Song>
    createSongGenre(genre: string): Promise<Genre>
    getAllGenres(dto: SearchItemsDto): Promise<Genre[]>
    addToFavorite(dto: SearchUserItemDto): Promise<Song>
    getSongById(id: number): Promise<Song>
    getUserFavSongs(dto: SearchUserItemsDto): Promise<GetItemsListDto<Song>>
    getAll(dto: SearchItemsDto): Promise<GetItemsListDto<Song>>
    createSong(dto: CreateSongDto): Promise<Song>
    delete(id: number): Promise<Song>
    removeFromFavorite(dto: SearchUserItemDto): Promise<Song>
}