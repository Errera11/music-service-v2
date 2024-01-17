import React, {useEffect} from 'react';
import styles from '../../styles/songs/songs.module.scss';
import wave from '../../assets/wave.png';
import Head from "next/head";
import SongsList from "@/components/songsList/SongsList";
import {songsApi} from "@/api/songs";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {LazyImage} from "@/components/lazyImage/LazyImage";
import {useTransition} from "@react-spring/web";
import {animated} from "@react-spring/web"
import {useSong} from "@/hooks/useSong";
import Image from "next/image";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {IGetItemsList} from "@/assets/types/IGetItemsList";
import {Song} from "@/assets/types/Song";

const Index = ({totalCount, items}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const {title, image} = useTypedSelector(state => state.songs.currentSong)
    const user = useTypedSelector(state => state.auth.user)

    const {currentSong, setSongs, songsList} = useSong();

    useEffect(() => {
        if(!!items?.length) setSongs(items);
    }, [])

    const transitions = useTransition(image, {
        from: {
            opacity: 0,
        },
        enter: {
            delay: 2000,
            opacity: 1,
        },
        leave: {
            opacity: 0,
        },
        config: {
            duration: 400
        }
    });

    return (
        <>
            <Head>
                <title>Songs</title>
            </Head>
            {user?.id ?
                <div className={styles.container}>
                    {!!songsList.length ? <>
                        <div className={styles.bgColor}/>
                        {transitions((style, image) => {
                            return <animated.div
                                style={style} className={styles.bgImage}>
                                <Image unoptimized src={image} alt={'Some bg'} width={100} height={100}/>
                            </animated.div>
                        })}
                        <div className={styles.gradient}/>
                        <div className={styles.songsInfo}>
                            <div className={styles.songImage}>
                                {image ?
                                    <LazyImage src={image} alt={'Song img'}/> :
                                    <LazyImage src={wave.src} alt={'Song img'}/>
                                }
                            </div>
                            <h3 className={styles.title}>My Songs</h3>
                            <span className={styles.songName}>{title ? title : "Select song"}</span>
                            <span className={styles.songCount}>123</span>
                        </div>
                        <div style={{height: currentSong ? '75vh' : ''}} className={styles.songList}>
                            <SongsList songs={songsList}/>
                        </div>
                    </> : <div className={styles.noSongsMsg}>
                        <span>You have no songs saved yet</span>
                    </div>}
                </div> : <div className={styles.unauthorizedMessage}>
                    <span>You have to login to save songs!</span>
                </div>}
        </>
    );
};

export default Index;

export const getServerSideProps: GetServerSideProps<IGetItemsList<Song>> = async (context) => {
    try {
        const response = await songsApi.getUserFavSongs({}, {
            withCredentials: false,
            headers: {
                cookie: context.req.headers.cookie
            }
        })
        return {
            props: {
                items: response.data.items,
                totalCount: response.data.totalCount
            }
        }
    } catch (e) {
        console.log(e);
        return {
            props: {
                items: [],
                totalCount: 0
            }
        }
    }
}