import React, {useState} from 'react';
import AlbumPageLayout from "@/components/admin/adminPageLayouts/AlbumPageLayout";
import AlbumForm from "@/components/admin/albumForm/AlbumForm";
import {albumApi} from "@/api/album";
import {ISongApiResponse, songsApi} from "@/api/songs";
import AdminSearchBar from "@/components/admin/adminSearchBar/AdminSearchBar";
import useFetch from "@/hooks/useFetch";
import AdminSongListItem from "@/components/admin/adminSongListItem/AdminSongListItem";
import usePagination from "@/hooks/usePagination";
import PaginationBar from "@/components/admin/paginationBar/PaginationBar";
import styles from '../../../../styles/admin/album/albumCreatePage.module.scss';
import {CreateAlbumDto} from "@/assets/dto/CreateAlbumDto";

const Index = () => {

    const [songSearchQuery, setSongSearchQuery] = useState('');

    const [fetchSongs, isLoading, isError, data] = useFetch<ISongApiResponse, Parameters<typeof songsApi.searchSongs>[0]>(songsApi.searchSongs);
    const songsTakeVolume = 5;
    const {setPage, currentPage, totalPages} = usePagination(songsTakeVolume, data?.totalCount || 0)

    const onSubmit = (dto: CreateAlbumDto) => {
        return albumApi.createAlbum(dto)
            .then((resp) => console.log(resp))
            .catch(e => console.log(e))
    }

    const handleSearchSong = (e: React.FormEvent) => {
        e.preventDefault();
        fetchSongs({
            take: songsTakeVolume,
            skip: songsTakeVolume * (currentPage - 1),
            query: songSearchQuery
        })
    }

    return (
        <AlbumPageLayout title={'Create album'}>
            <AlbumForm btnAction={'Create'} onSubmit={onSubmit}/>
            <div className={styles.searchSong}>
                <form onSubmit={handleSearchSong}>
                    <div className={styles.songSearchBar}>
                        <AdminSearchBar
                            placeholder={'Search for song'}
                            value={songSearchQuery}
                            onChange={e => setSongSearchQuery(e.target.value)}/>
                    </div>
                </form>
                {isLoading ? <div>Loading...</div> :
                    data?.songs.length && data.songs.map(item => <div>
                        <AdminSongListItem song={item}/><span>add to album</span>
                        <PaginationBar currentPage={currentPage} totalPages={totalPages} setPage={setPage}/>
                    </div>)}
            </div>
        </AlbumPageLayout>
    );
};

export default Index;