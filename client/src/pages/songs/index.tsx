import React from 'react';
import styles from '../../styles/songs/songs.module.scss';
import wave from '../../assets/wave.png';
import Layout from "@/components/Layout";
import Head from "next/head";
import SongsList from "@/components/songsList/SongsList";
import {songsApi} from "@/api/songs";
import {InferGetStaticPropsType} from "next";
import {getStaticProps} from "@/pages";
import {useTypedSelector} from "@/hooks/useTypedSelector";

const Index = ({songs, totalCount}: InferGetStaticPropsType<typeof getStaticProps>) => {

    const {title, image} = useTypedSelector(state => state.player)

    return (
        <Layout>
            <>
                <Head>
                    <title>Songs</title>
                </Head>
                <div className={styles.container}>
                    <div className={styles.songsInfo}>
                        {image ?
                            <img src={image} /> :
                            <img src={wave.src}/>}
                        <h3 className={styles.title}>My Songs</h3>
                        <span className={styles.songName}>{title ? title : "Select song"}</span>
                        <span className={styles.songCount}>123</span>
                    </div>
                    <div className={styles.songList}>
                        <SongsList songs={songs} type={'list'}/>
                    </div>
                </div>
            </>
        </Layout>
    );
};

export default Index;

export const getServerSideProps = async () => {
    try {
        const {songs, totalCount} = (await songsApi.getAllSongs()).data
        return {
            props: {
                songs,
                totalCount
            }
        }
    } catch (e) {
        console.log(e);
    }
}