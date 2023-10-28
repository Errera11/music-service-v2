import React, {FormEvent, useEffect, useState} from 'react';
import SongPageLayout from "@/components/admin/adminPageLayouts/SongPageLayout";
import {ISongApiResponse, songsApi} from "@/api/songs";
import AdminSongList from "@/components/admin/adminSongList/AdminSongList";
import useFetch from "@/hooks/useFetch";
import usePagination from "@/hooks/usePagination";
import PaginationBar from "@/components/admin/paginationBar/PaginationBar";
import AdminSearchBar from "@/components/admin/adminSearchBar/AdminSearchBar";
import styles from '../../../../styles/admin/album/album.module.scss';

const Index = () => {

    const {fetch: searchSongs, isLoading, isError, data} = useFetch<ISongApiResponse, Parameters<typeof songsApi.searchSongs>[0]>(songsApi.searchSongs);
    const songSearchVolume = 5;
    const {setPage, currentPage, totalPages} = usePagination(songSearchVolume, data?.totalCount || 0);
    const [searchQuery, setSearchSongQuery] = useState('');

    useEffect(() => {
        searchSongs({
            query: searchQuery,
            skip: songSearchVolume * (currentPage - 1),
            take: songSearchVolume
        });
    }, [currentPage])

    const onSongSearch = (e: FormEvent) => {
        e.preventDefault()
        setPage(1);
        searchSongs({
            query: searchQuery,
            skip: 0,
            take: songSearchVolume
        })
    }

    return (
        <SongPageLayout title={'Search songs'}>
            <div className={styles.container}>
                <div className={styles.searchBar}>
                    <form onSubmit={e => onSongSearch(e)}>
                        <AdminSearchBar
                            placeholder={'Search for song'} value={searchQuery}
                            onChange={e => setSearchSongQuery(e.target.value)}/>
                    </form>
                </div>
                {(!isError && !isLoading) && <>
                    <div className={styles.songList}>
                        {data?.songs && <AdminSongList songs={data?.songs}/>}
                    </div>
                    <div className={styles.paginationBar}>
                        <PaginationBar currentPage={currentPage} totalPages={totalPages} setPage={setPage}/>
                    </div>
                </>}
                {(isLoading && !isError) && <div>Loading...</div>}
                {isError && <div>Some error occurred</div>}
            </div>
        </SongPageLayout>
    );
};

export default Index;