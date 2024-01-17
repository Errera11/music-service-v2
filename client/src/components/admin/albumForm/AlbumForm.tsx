import React, {useEffect, useRef, useState} from 'react';
import {Album, AlbumById} from "@/assets/types/Album";
import styles from './albumForm.module.scss';
import AdminPageInput from "@/components/admin/adminPageInput/AdminPageInput";
import AdminPageBtn from "@/components/admin/adminPageBtn/AdminPageBtn";
import {ICreateAlbum} from "@/assets/types/ICreateAlbum";
import AdminSongListItem from "@/components/admin/adminSongListItem/AdminSongListItem";
import PaginationBar from "@/components/admin/paginationBar/PaginationBar";
import useFetch from "@/hooks/useFetch";
import {songsApi} from "@/api/songs";
import usePagination from "@/hooks/usePagination";
import AdminSearchBar from "@/components/admin/adminSearchBar/AdminSearchBar";
import {IUpdateAlbum} from "@/assets/types/IUpdateAlbum";
import {AxiosResponse} from "axios";
import {Song} from "@/assets/types/Song";

export interface IProps {
    onSubmit: (dto: ICreateAlbum | IUpdateAlbum) => Promise<AxiosResponse<Album>>,
    btnAction: 'Create' | 'Edit',
    album?: AlbumById
}

const AlbumForm: React.FC<IProps> = ({onSubmit, album, btnAction}) => {

    const [isDisabled, setIsDisabled] = useState(false)
    const [title, setTitle] = useState(album?.title || '');
    const [author, setAuthor] = useState(album?.author || '');
    const [description, setDescription] = useState(album?.description || '');
    const [image, setImage] = useState<File | undefined>();
    const [albumSongs, setAlbumSongs] = useState<Song[]>(album?.songs || [])
    const [songsTotalCount, setSongsTotalCount] = useState(0);

    const imageRef = useRef<HTMLInputElement>(null);

    const [songSearchQuery, setSongSearchQuery] = useState('');
    const [searchedSongs, setSearchedSongs] = useState<Song[]>([]);
    const {fetch: fetchSongs, isLoading, isError} = useFetch<typeof songsApi.getAllSongs>(songsApi.getAllSongs);
    const songsTakeVolume = 5;
    const {setPage, currentPage, totalPages} = usePagination(songsTakeVolume, songsTotalCount)

    const handleSearchSong = (e: React.FormEvent) => {
        e.preventDefault();
        fetchSongs({
            take: songsTakeVolume,
            skip: 0,
            query: songSearchQuery
        })
    }

    useEffect(() => {
        fetchSongs({
            take: songsTakeVolume,
            skip: songsTakeVolume * (currentPage - 1),
            query: songSearchQuery
        }).then(response => {
            setSearchedSongs(response.data.items);
            setSongsTotalCount(response.data.totalCount);
        })
    }, [currentPage])

    const onFormSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDisabled(true);
        return onSubmit({
            id: album?.id,
            title,
            image,
            description,
            author,
            album_songs: albumSongs.map(song => song.id) || []} as IUpdateAlbum)
            .finally(() => setIsDisabled(false))
    }

    return (
        <div className={styles.container}>
            <h1>{btnAction + ' albumDto'}</h1>
            <form className={styles.form}>
                <div className={styles.imageSelect}>
                    <input onChange={e => setImage(e.target.files![0])} style={{display: 'none'}} type={'file'}
                           accept={'image/*'} ref={imageRef}/>
                    <div className={styles.imageCreate} onClick={() => imageRef.current?.click()}>
                        {album?.image && <img src={typeof album.image === 'string' ? album.image : URL.createObjectURL(album.image)}/>}
                        <div className={styles.hover}>Select image</div>
                    </div>
                </div>
                <div>
                    <AdminPageInput
                        placeholder={'Album title'}
                        value={title}
                        onChange={e => setTitle(e.target.value)}/>
                    <AdminPageInput
                        placeholder={'Album author'}
                        value={author}
                        onChange={e => setAuthor(e.target.value)}/>
                    <AdminPageInput
                        placeholder={'Album description'}
                        value={description}
                        onChange={e => setDescription(e.target.value)}/>
                    <div className={styles.submitBtn}>
                        <AdminPageBtn disabled={isDisabled} onClick={e => onFormSubmit(e)} title={btnAction}/>
                    </div>
                </div>
            </form>
            <div className={styles.searchSong}>
                <form onSubmit={handleSearchSong}>
                    <div className={styles.songSearchBar}>
                        <AdminSearchBar
                            placeholder={'Search for song'}
                            value={songSearchQuery}
                            onChange={e => setSongSearchQuery(e.target.value)}/>
                    </div>
                </form>
                {
                    albumSongs.map(item => <div className={styles.songListItem}>
                        <AdminSongListItem song={item}/>
                        <div className={styles.addToAlbumBtn}>
                            <AdminPageBtn title={'Remove from albumDto'}
                                          onClick={() => setAlbumSongs(albumSongs.filter(song => song !== item))}/>
                        </div>
                    </div>)
                }
                <br />
                {isLoading && <div>Loading...</div>}
                {(!isLoading && !isError) && <div className={styles.songList}>
                    {searchedSongs.filter(item => !albumSongs.map(song => song.id).includes(item.id)).map(item => <div className={styles.songListItem}>
                        <AdminSongListItem song={item}/>
                        <div className={styles.addToAlbumBtn}>
                            <AdminPageBtn title={'Add to albumDto'}
                                          onClick={() => setAlbumSongs(prev => [...prev, item])}/>
                        </div>
                    </div>)}
                    {!!totalPages &&
                        <div className={styles.paginationBar}>
                            <PaginationBar currentPage={currentPage} totalPages={totalPages} setPage={setPage}/>
                        </div>}
                </div>}
                {(searchedSongs.length && !isLoading && !isError) && <div>No songs found</div>}
                {isError && <div>Some error occurred</div>}
            </div>
        </div>
    );
};

export default AlbumForm;