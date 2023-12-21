import {CreateSongDto} from "../../../common/dtos/repositoryDto/songDto/CreateSong.dto";
import {Song} from "../../domain/Song";
import {UpdateSongDto} from "../../../common/dtos/repositoryDto/songDto/UpdateSong.dto";
import {SearchItemsDto} from "../../../common/dtos/SearchItems.dto";
import {Genre} from "../../domain/Genre";
import {SearchUserItemsDto} from "../../../common/dtos/SearchUserItems.dto";
import {SearchUserItemDto} from "../../../common/dtos/SearchUserItem.dto";
import {GetItemsListDto} from "../../../common/dtos/GetItemsList.dto";

export interface ISongRepository {
    createSong(dto: CreateSongDto): Promise<Song>
    createSongGenre(genre: string): Promise<Genre>
    delete(id: number): Promise<Song>
    getAll(dto: SearchUserItemsDto): Promise<GetItemsListDto<Song> | void>
    getAllGenres(dto: SearchItemsDto): Promise<Genre[] | void>
    getSongById(id: number): Promise<Song>
    getUserFavSongs(dto: SearchUserItemsDto): Promise<GetItemsListDto<Song> | void>
    updateSong(dto: UpdateSongDto): Promise<Song>
    addToFavorite(dto: SearchUserItemDto): Promise<Song>
}