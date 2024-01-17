import React from 'react';
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import SongsList from "@/components/songsList/SongsList";
import styles from '../../styles/playlist/playlistItem.module.scss';
import {playlistApi} from "@/api/playlist";
import {PlaylistById} from "@/assets/types/Playlist";
import {LazyImage} from "@/components/lazyImage/LazyImage";
import {useRouter} from "next/router";
import Loader from "@/components/loader/Loader";

const Playlist = (playlist: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const router = useRouter();
    if(router.isFallback) {
        return <div className={styles.loader}>
            <Loader />
        </div>
    }

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.playlistImage}>
                    {
                        playlist.image && <LazyImage src={playlist.image} alt={'Playlist img'} />
                    }
                </div>
                <div className={styles.playlistInfo}>
                    <span>Playlist</span>
                    <h1>{playlist.title}</h1>
                    <div className={styles.playlistDescription}>
                        {playlist.description}
                    </div>
                </div>
            </div>
            <div>
                {
                    !!playlist.playlist_songs.items.length ?
                        <SongsList songs={playlist.playlist_songs.items} /> :
                        <div>You have not added any songs yet!</div>
                }
            </div>
        </div>
    );
};

export default Playlist;

export const getServerSideProps: GetServerSideProps<PlaylistById> = async (context) => {
    try {
        const response = await playlistApi.getPlaylistById({
            playlistId: Number(context.params && context.params['id'])
        }, {
            headers: context.req.headers
        })
        return {
            props: response.data
        }
    } catch (e) {
        console.log(e);
        return {
            props: {} as PlaylistById
        }
    }
}