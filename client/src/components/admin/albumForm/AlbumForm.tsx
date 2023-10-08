import React, {useEffect, useRef, useState} from 'react';
import {AlbumById} from "@/assets/types/Album";
import styles from './albumForm.module.scss';
import AdminPageInput from "@/components/admin/adminPageInput/AdminPageInput";
import AdminPageBtn from "@/components/admin/adminPageBtn/AdminPageBtn";
import {CreateAlbumDto, UpdateAlbumDto} from "@/assets/dto/CreateAlbumDto";
import AdminSongListItem from "@/components/admin/adminSongListItem/AdminSongListItem";
import PaginationBar from "@/components/admin/paginationBar/PaginationBar";
import {Song} from "@/assets/types/Song";
import useFetch from "@/hooks/useFetch";
import {ISongApiResponse, songsApi} from "@/api/songs";
import usePagination from "@/hooks/usePagination";
import AdminSearchBar from "@/components/admin/adminSearchBar/AdminSearchBar";

export interface IProps {
    onSubmit: (dto: CreateAlbumDto | UpdateAlbumDto) => void,
    btnAction: 'Create' | 'Edit',
    album?: AlbumById
}

const AlbumForm: React.FC<IProps> = ({onSubmit, album, btnAction}) => {

    const [title, setTitle] = useState(album?.title || '');
    const [author, setAuthor] = useState(album?.author || '');
    const [description, setDescription] = useState(album?.description || '');
    const [image, setImage] = useState<File | string | null>(album?.image || '')
    const [albumSongs, setAlbumSongs] = useState<Song[]>([])

    const imageRef = useRef<HTMLInputElement>(null);

    const [songSearchQuery, setSongSearchQuery] = useState('');
    const [fetchSongs, isLoading, isError, data] = useFetch<ISongApiResponse, Parameters<typeof songsApi.searchSongs>[0]>(songsApi.searchSongs);
    const songsTakeVolume = 5;
    const {setPage, currentPage, totalPages} = usePagination(songsTakeVolume, data?.totalCount || 0)
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
        })
    }, [currentPage])

    const onFormSubmit = (e: React.MouseEvent) => {
        e.preventDefault()
        if(title && author && (image instanceof File)) {
            onSubmit({id: album?.id, title, image, description, author, album_songs: albumSongs.map(song => song.id) || []})
        }
    }

    return (
        <div className={styles.container}>
            <h1>{btnAction + ' album'}</h1>
            <form className={styles.form}>
                <div className={styles.imageSelect}>
                    <input onChange={e => setImage(e.target.files![0])} style={{display: 'none'}} type={'file'}
                           accept={'image/*'} ref={imageRef}/>
                    <div className={styles.imageCreate} onClick={() => imageRef.current?.click()}>
                        {image && <img src={typeof image === 'string' ? image : URL.createObjectURL(image)}/>}
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
                        <AdminPageBtn onClick={e => onFormSubmit(e)} title={btnAction}/>
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
                            <AdminPageBtn title={'Remove from album'}
                                          onClick={() => setAlbumSongs(albumSongs.filter(song => song !== item))}/>
                        </div>
                    </div>)
                }
                <br />
                {isLoading && <div>Loading...</div>}
                {(!isLoading && !isError) && <div className={styles.songList}>
                    {data?.songs.filter(item => !albumSongs.map(song => song.id).includes(item.id)).map(item => <div className={styles.songListItem}>
                        <AdminSongListItem song={item}/>
                        <div className={styles.addToAlbumBtn}>
                            <AdminPageBtn title={'Add to album'}
                                          onClick={() => setAlbumSongs(prev => [...prev, item])}/>
                        </div>
                    </div>)}
                    {!!totalPages &&
                        <div className={styles.paginationBar}>
                            <PaginationBar currentPage={currentPage} totalPages={totalPages} setPage={setPage}/>
                        </div>}
                </div>}
                {(!data?.songs.length && !isLoading && !isError) && <div>No songs found</div>}
                {isError && <div>Some error occurred</div>}
            </div>
        </div>
    );
};

export default AlbumForm;