import React from 'react';
import SongPageLayout from "@/components/admin/adminPageLayouts/SongPageLayout";
import {songsApi} from "@/api/songs";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import AdminSongList from "@/components/admin/adminSongList/AdminSongList";
import PaginationBar from "@/components/admin/paginationBar/PaginationBar";
import styles from '../../../styles/admin/album/album.module.scss';
import useSsgPagination from "@/components/admin/useSsgPagination/useSsgPaginaton";
import {Song} from "@/assets/types/Song";
import {IGetItemsList} from "@/assets/types/IGetItemsList";

const Index = ({items, totalCount}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const songTakeVolume = 5;
    const {setPage, totalPages, currentPage} = useSsgPagination({
        totalItemsCount: totalCount,
        takeVolume: songTakeVolume
    })

    return (
        <SongPageLayout title={'All songs'}>
            <div className={styles.container}>
                <div className={styles.songList}>
                    <AdminSongList songs={items}/>
                </div>
                <div className={styles.paginationBar}>
                    {!!items.length && <PaginationBar currentPage={currentPage} totalPages={totalPages} setPage={setPage}/>}
                </div>
            </div>
        </SongPageLayout>
    );
};

export default Index;

export const getServerSideProps: GetServerSideProps<IGetItemsList<Song>> = async ({query}) => {
    try {
        const page = ((query && query['page']) || 1) as number;
        const takeVolume = ((query && query['takeVolume']) || 5) as number;
        const {data} = await songsApi.getAllSongs({
            take: takeVolume,
            skip: (page - 1) * takeVolume
        });
        return {
            props: data
        }
    } catch (e) {
        console.log(e);
        return {
            props: {} as IGetItemsList<Song>
        }
    }
}