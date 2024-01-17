import React from 'react';
import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from "next";
import {albumApi} from "@/api/album";
import {AlbumById} from "@/assets/types/Album";
import Head from "next/head";
import SongsList from "@/components/songsList/SongsList";
import styles from '../../styles/album/album.module.scss';

const AlbumPage = ({album}: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <>
            <Head>
                <title>{album.title}</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.albumInfo}>
                    <div className={styles.albumImage}>
                        <img src={album.image} alt={'Album img'}/>
                    </div>
                    <div className={styles.title}>
                        {album.title}
                    </div>
                    <div className={styles.author}>
                        {album.author}
                    </div>
                    <div className={styles.totalSongs}>
                        Total songs: {album.songs.length}
                    </div>
                </div>
                <div className={styles.songList}>
                    <SongsList songs={album.songs} />
                </div>
            </div>
        </>
    );
};

export default AlbumPage;

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [], //Todo pass args
        fallback: 'blocking' // Todo make some loader
    }
}

export const getStaticProps: GetStaticProps = (async (context) => {
    try {
        const albumId = context.params?.id;
        if (albumId) {
            const {data} = await albumApi.getAlbumById(Number.parseInt(albumId as string))
            return {
                props: {
                    album: data
                },
                revalidate: 60*60*60
            }
        }
        return {
            props: {
                album: {} as AlbumById[]
            }
        }
    } catch (e) {
        console.log(e);
        return {
            props: {
                album: {} as AlbumById[]
            }
        }
    }
})