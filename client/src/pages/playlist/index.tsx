import React, {useEffect, useState} from 'react';
import Head from "next/head";
import PlaylistList from "@/components/playlistList/PlaylistList";
import styles from '../../styles/playlist/playlist.module.scss';
import ToCreatePlaylistPlate from "@/components/playlistPlate/ToCreatePlaylistPlate";
import CreatePlaylistModal from "@/components/createPlaylistModal/CreatePlaylistModal";
import {ICreatePlaylist, playlistApi} from "@/api/playlist";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {IGetItemsList} from "@/assets/types/IGetItemsList";
import {Playlist} from "@/assets/types/Playlist";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {popUpActions} from "@/store/popUp";
import {useTypedSelector} from "@/hooks/useTypedSelector";

const Index = ({items, totalCount}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const [isModal, setModal] = useState(false);
    const [playlists, setPlaylists] = useState<Playlist[]>();

    useEffect(() => {
        setPlaylists(items)
    }, [])

    const createPlaylist = playlistApi.createPlaylist;
    const dispatch = useAppDispatch();
    const {setPopUp, resetPopUp} = popUpActions;

    const user = useTypedSelector(state => state.auth.user?.id);

    const onCreatePlaylist = (playlist: ICreatePlaylist) => {
        createPlaylist(playlist)
            .then(reponse => {
                dispatch(setPopUp({
                    message: 'Playlist created successfully',
                    isSuccess: true
                }))
                playlists ? setPlaylists([...playlists, reponse.data]) : setPlaylists([reponse.data])
            })
            .catch(() => dispatch(setPopUp({
                message: 'Some error occurred',
                isSuccess: false
            })))
    }

    return (
        <>
            <Head>
                <title>Playlists</title>
            </Head>
            {isModal && <CreatePlaylistModal onCreatePlaylist={onCreatePlaylist} closeModal={() => setModal(false)}/>}
            {
                !user ? <div className={styles.unauthMessage}>
                        <span>
                            You have to authorize to add new playlists!
                        </span>
                </div> : <div><h1 className={styles.title}>My playlists</h1>
                    <div className={styles.playlistList}>
                        <div className={styles.toCreatePlate}>
                            <ToCreatePlaylistPlate onClick={() => setModal(true)}/>
                        </div>
                        <PlaylistList playlists={playlists || []}/>
                    </div>
                </div>
            }
        </>
    );
};

export default Index;

export const getServerSideProps: GetServerSideProps<IGetItemsList<Playlist>> = async (context) => {
    try {
        const response = await playlistApi.getUserPlaylists({}, {
            headers: {
                cookie: context.req.headers.cookie
            }
        });
        return {
            props: response.data
        };
    } catch (e) {
        console.log(e);
        return {
            props: {
                items: [],
                totalCount: 0
            }
        };
    }
}