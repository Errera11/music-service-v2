import React, {useEffect, useState} from 'react';
import AlbumForm from "@/components/admin/albumForm/AlbumForm";
import {albumApi} from "@/api/album";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {UpdateAlbumDto} from "@/assets/dto/CreateAlbumDto";
import AlbumPageLayout from "@/components/admin/adminPageLayouts/AlbumPageLayout";
import AdminSongListItem from "@/components/admin/adminSongListItem/AdminSongListItem";
import PaginationBar from "@/components/admin/paginationBar/PaginationBar";
import useFetch from "@/hooks/useFetch";
import {ISongApiResponse, songsApi} from "@/api/songs";
import usePagination from "@/hooks/usePagination";
import styles from '../../../../styles/admin/album/albumEditPage.module.scss';
import AdminSearchBar from "@/components/admin/adminSearchBar/AdminSearchBar";

const Id = ({album}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

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

    const onUpdateAlbum = (dto: UpdateAlbumDto) => {
        albumApi.updateAlbum(dto);
    }

    return (
        <AlbumPageLayout title={'Edit album'}>
            <AlbumForm onSubmit={(dto) => onUpdateAlbum(dto as UpdateAlbumDto)} btnAction={'Edit'} album={album}/>
            <div className={styles.searchSong}>
                <form onSubmit={handleSearchSong}>
                    <div className={styles.songSearchBar}>
                        <AdminSearchBar
                            placeholder={'Search for song'}
                            value={songSearchQuery}
                            onChange={e => setSongSearchQuery(e.target.value)}/>
                    </div>
                </form>
                {isLoading && <div>Loading...</div>}
                {!isLoading && <div className={styles.songList}>
                    {data?.songs.map(item => <div>
                        <AdminSongListItem song={item}/><span>add to album</span>
                    </div>)}
                        {!!totalPages &&
                            <div className={styles.paginationBar}>
                                <PaginationBar currentPage={currentPage} totalPages={totalPages} setPage={setPage}/>
                            </div>}
                </div>}
                {(!data?.songs.length && !isLoading) && <div>No songs found</div>}
            </div>
        </AlbumPageLayout>
    );
};

export default Id;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    try {
        const {data} = await albumApi.getAlbumById(Number.parseInt(params?.id as string))
        return {
            props: {
                album: data
            }
        }
    } catch (e) {
        console.log(e);
        return {
            props: {
                album: {}
            }
        }
    }
}