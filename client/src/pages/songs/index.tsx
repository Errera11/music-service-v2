import React from 'react';
import {Song} from "@/assets/types/Song";
import styles from '../../styles/songs/songs.module.scss';
import wave from '../../assets/wave.png';
import Layout from "@/components/Layout";
import Head from "next/head";
import SongsList from "@/components/songsList/SongsList";

const mock: Song = {
    id: '123',
    name: 'Bueno dias',
    description: 'descr',
    artist: 'Poco loko',
    image: 'downloadlink'
}

const Index = () => {
    return (
        <Layout>
            <>
                <Head>
                    <title>Songs</title>
                </Head>
                <div className={styles.container}>
                    <div className={styles.songsInfo}>
                        <img src={wave.src}/>
                        <span className={styles.title}>My Songs</span>
                        <span className={styles.songName}>{mock.name}</span>
                        <span className={styles.songCount}>123</span>
                    </div>
                    <div className={styles.songList}>
                        <SongsList songs={[mock]} />
                    </div>
                </div>
            </>
        </Layout>
    );
};

export default Index;