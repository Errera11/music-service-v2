import React, {useState} from 'react';
import SongPageLayout from "@/components/admin/adminPageLayouts/SongPageLayout";
import {songsApi} from "@/api/songs";
import AdminSongList from "@/components/admin/adminSongList/AdminSongList";
import PaginationBar from "@/components/admin/paginationBar/PaginationBar";
import AdminSearchBar from "@/components/admin/adminSearchBar/AdminSearchBar";
import styles from '../../../../styles/admin/album/album.module.scss';
import {Song} from "@/assets/types/Song";
import {GetServerSideProps} from "next";
import {IGetItemsList} from "@/assets/types/IGetItemsList";
import useSsgPaginaton from "@/components/admin/useSsgPagination/useSsgPaginaton";
import {useRouter} from "next/router";

let timeoutId: ReturnType<typeof setTimeout>;

const Index = () => {

    const router = useRouter();

    const songSearchVolume = 5;
    const [songs, setSongs] = useState<Song[]>();
    const [songsTotalCount, setSongsTotalCount] = useState(0);
    const {setPage, currentPage, totalPages} = useSsgPaginaton({
        takeVolume: songSearchVolume,
        totalItemsCount: songsTotalCount
    });
    const [searchQuery, setSearchSongQuery] = useState('');



    // const onSongSearch = (e: FormEvent) => {
    //     e.preventDefault()
    //     setPage(1);
    //     searchSongs({
    //         query: searchQuery,
    //         skip: 0,
    //         take: songSearchVolume
    //     }).then(response => {
    //         setSongsTotalCount(response.data.totalCount);
    //         setSongs(response.data.items);
    //     });
    // }

    function onChangeQuery(e: string) {
        clearTimeout(timeoutId);
        setSearchSongQuery(e);
        setTimeout(() => {
            router.query['skip'] = String(songSearchVolume * (currentPage - 1));
            router.query['take'] = String(songSearchVolume);
            router.query['query'] = searchQuery;
            router.push(router);
        }, 1500)
    }

    return (
        <SongPageLayout title={'Search songs'}>
            <div className={styles.container}>
                <div className={styles.searchBar}>
                    <form>
                        <AdminSearchBar
                            placeholder={'Search for song'} value={searchQuery}
                            onChange={e => onChangeQuery(e.target.value)}/>
                    </form>
                </div>
                <>
                    <div className={styles.songList}>
                        {!!songs?.length && <AdminSongList songs={songs}/>}
                    </div>
                    <div className={styles.paginationBar}>
                        <PaginationBar currentPage={currentPage} totalPages={totalPages} setPage={setPage}/>
                    </div>
                </>
                {/*{(isLoading && !isError) && <div>Loading...</div>}*/}
                {/*{isError && <div>Some error occurred</div>}*/}
            </div>
        </SongPageLayout>
    );
};

export default Index;

export const getServerSideProps: GetServerSideProps<IGetItemsList<Song>> = async (context) => {
    try {
        const response = await songsApi.getAllSongs({
            take: Number(context.query['take']),
            skip: Number(context.query['skip']),
            query: context.query['query'] as string,
        });
        return {
            props: response.data
        }
    } catch (e) {
        return {
            props: {
                items: [],
                totalCount: 0
            }
        }
    }
}