import {CreateSongDto} from "../../../common/dtos/repositoryDto/songDto/CreateSong.dto";
import {Song} from "../../domain/Song";
import {UpdateSongDto} from "../../../common/dtos/repositoryDto/songDto/UpdateSong.dto";
import {SearchItemsDto} from "../../../common/dtos/SearchItems.dto";
import {Genre} from "../../domain/Genre";
import {GetItemsListDto} from "../../../common/dtos/GetItemsList.dto";
import {GetUserItemsDto} from "../../../common/dtos/GetUserItems.dto";
import {GetUserItemDto} from "../../../common/dtos/GetUserItem.dto";

export interface ISongRepository {
    createSong(dto: CreateSongDto): Promise<Song>
    createSongGenre(genre: string): Promise<Genre>
    delete(id: number): Promise<Song>
    getAll(dto: GetUserItemsDto): Promise<GetItemsListDto<Song>>
    getAllGenres(dto: SearchItemsDto): Promise<Genre[]>
    getSongById(id: number): Promise<Song>
    getUserFavSongs(dto: GetUserItemsDto): Promise<GetItemsListDto<Song>>
    updateSong(dto: UpdateSongDto): Promise<Song>
    addToFavorite(dto: GetUserItemDto): Promise<Song>
}