import React from 'react';
import AlbumPageLayout from "@/components/admin/adminPageLayouts/AlbumPageLayout";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {albumApi} from "@/api/album";
import AdminAlbumList from "@/components/admin/adminAlbumList/AdminAlbumList";
import useSsgPagination from "@/components/admin/useSsgPagination/useSsgPaginaton";
import PaginationBar from "@/components/admin/paginationBar/PaginationBar";
import styles from '../../../styles/admin/album/album.module.scss';
import {IGetItemsList} from "@/assets/types/IGetItemsList";
import {Album} from "@/assets/types/Album";

const Index = ({items, totalCount}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const takeVolume = 5;
    const {setPage, totalPages, currentPage} = useSsgPagination({totalItemsCount: totalCount, takeVolume});
    return (
        <AlbumPageLayout title={'Search albums'}>
            <div className={styles.container}>
                {items && <div className={styles.albumList}>
                    <AdminAlbumList albums={items}/>
                </div>}
                <div>
                    {!!items.length && <PaginationBar currentPage={currentPage} totalPages={totalPages} setPage={setPage} />}
                </div>
            </div>
        </AlbumPageLayout>
    );
};

export default Index;

export const getServerSideProps: GetServerSideProps<IGetItemsList<Album>> = async ({query}) => {
    try {
        const paginate: {page?: number, take?: number} = query;
        const page = paginate?.page ?? 1;
        const take = paginate?.take ?? 5;
        const {data} = await albumApi.getAll({
            skip: (page - 1) * take,
            take
        });
        return {
            props: data
        }
    } catch (e) {
        console.log(e);
        return {
            props: {} as IGetItemsList<Album>
        }
    }
}