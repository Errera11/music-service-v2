import {UpdateSongDto} from "../../../common/dtos/infrastructureDto/songDto/UpdateSong.dto";
import {Song} from "../../domain/Song";
import {CreateSongDto} from "../../../common/dtos/infrastructureDto/songDto/CreateSong.dto";
import {Genre} from "../../domain/Genre";
import {SearchItemsDto} from "../../../common/dtos/SearchItems.dto";
import {GetItemsListDto} from "../../../common/dtos/GetItemsList.dto";
import {GetUserItemDto} from "../../../common/dtos/GetUserItem.dto";
import {GetUserItemsDto} from "../../../common/dtos/GetUserItems.dto";

export interface ISongService {
    updateSong(dto: UpdateSongDto): Promise<Song>
    createSongGenre(genre: string): Promise<Genre>
    getAllGenres(dto: SearchItemsDto): Promise<Genre[]>
    addToFavorite(dto: GetUserItemDto): Promise<Song>
    getSongById(id: number): Promise<Song>
    getUserFavSongs(dto: GetUserItemsDto): Promise<GetItemsListDto<Song>>
    getAll(dto: SearchItemsDto): Promise<GetItemsListDto<Song>>
    createSong(dto: CreateSongDto): Promise<Song>
    delete(id: number): Promise<Song>
    removeFromFavorite(dto: GetUserItemDto): Promise<Song>
}