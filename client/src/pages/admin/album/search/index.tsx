import React, {FormEvent, useState} from 'react';
import AlbumPageLayout from "@/components/admin/adminPageLayouts/AlbumPageLayout";
import AdminAlbumList from "@/components/admin/adminAlbumList/AdminAlbumList";
import PaginationBar from "@/components/admin/paginationBar/PaginationBar";
import usePagination from "@/hooks/usePagination";
import {albumApi, IGetAllAlbumResponse} from "@/api/album";
import useFetch from "@/hooks/useFetch";
import AdminSearchBar from "@/components/admin/adminSearchBar/AdminSearchBar";
import styles from '../../../../styles/admin/album/album.module.scss';

const Index = () => {
    const takeVolume = 5;
    const [query, setQuery] = useState('');
    const {
        fetch: searchAlbum,
        isError,
        isLoading,
        data
    } = useFetch<IGetAllAlbumResponse, Parameters<typeof albumApi.searchAlbum>[0]>(albumApi.searchAlbum)
    const {currentPage, totalPages, setPage} = usePagination(takeVolume, data?.totalCount || 0)
    const onSearchAlbum = (e: FormEvent) => {
        e.preventDefault()
        searchAlbum({
            query,
            take: takeVolume,
            skip: (currentPage - 1) * takeVolume,
        })
    }
    return (
        <AlbumPageLayout title={'Search album'}>
            <div className={styles.container}>
                <form className={styles.searchBar} onSubmit={e => onSearchAlbum(e)}>
                    <AdminSearchBar value={query} onChange={e => setQuery(e.target.value)}
                                    placeholder={'Search for album'}/>
                </form>
                {(!isLoading && data?.albums) && <div className={styles.albumList}><AdminAlbumList albums={data?.albums}/></div>}
                {isLoading && <div>Loading...</div>}
                {(!isLoading && !data?.albums.length) && <div>No albums found</div>}
                <div className={styles.paginationBar}>
                    <PaginationBar currentPage={currentPage} totalPages={totalPages} setPage={setPage}/>
                </div>
            </div>
        </AlbumPageLayout>
    );
};

export default Index;

