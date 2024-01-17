import React, {FormEvent, useState} from 'react';
import AlbumPageLayout from "@/components/admin/adminPageLayouts/AlbumPageLayout";
import AdminAlbumList from "@/components/admin/adminAlbumList/AdminAlbumList";
import PaginationBar from "@/components/admin/paginationBar/PaginationBar";
import usePagination from "@/hooks/usePagination";
import {albumApi} from "@/api/album";
import useFetch from "@/hooks/useFetch";
import AdminSearchBar from "@/components/admin/adminSearchBar/AdminSearchBar";
import styles from '../../../../styles/admin/album/album.module.scss';
import {Album} from "@/assets/types/Album";

const Index = () => {

    const takeVolume = 5;
    const [query, setQuery] = useState('');
    const [searchedAlbums, setSearchedAlbums] = useState<Album[]>();
    const [searchedTotalCount, setSearchedTotalCount] = useState(0);

    const {
        fetch: searchAlbum,
        isError,
        isLoading
    } = useFetch<typeof albumApi.getAll>(albumApi.getAll)
    const {currentPage, totalPages, setPage} = usePagination(takeVolume, searchedTotalCount)
    const onSearchAlbum = (e: FormEvent) => {
        e.preventDefault()
        searchAlbum({
            query,
            take: takeVolume,
            skip: (currentPage - 1) * takeVolume,
        }).then(response => {
            setSearchedAlbums(response.data.items);
            setSearchedTotalCount(response.data.totalCount);
        })
    }
    return (
        <AlbumPageLayout title={'Search albumDto'}>
            <div className={styles.container}>
                <form className={styles.searchBar} onSubmit={e => onSearchAlbum(e)}>
                    <AdminSearchBar value={query} onChange={e => setQuery(e.target.value)}
                                    placeholder={'Search for albumDto'}/>
                </form>
                {(!isLoading && searchedAlbums) && <div className={styles.albumList}><AdminAlbumList albums={searchedAlbums}/></div>}
                {isLoading && <div>Loading...</div>}
                {(!isLoading && searchedAlbums?.length) && <div>No albums found</div>}
                <div className={styles.paginationBar}>
                    <PaginationBar currentPage={currentPage} totalPages={totalPages} setPage={setPage}/>
                </div>
            </div>
        </AlbumPageLayout>
    );
};

export default Index;

