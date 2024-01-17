import React from 'react';
import {Playlist} from "@/assets/types/Playlist";
import PlaylistPlate from "@/components/playlistPlate/PlaylistPlate";
import styles from './playlistList.module.scss';
import {useRouter} from "next/router";
import {appRoutes} from "@/assets/appRoutes";

interface IProps {
    playlists: Playlist[]
}

const PlaylistList: React.FC<IProps> = ({playlists}) => {
    const router = useRouter();
    return (
        <>
            {playlists.map(playlist => <div onClick={() => router.push(`${appRoutes.PLAYLIST_PAGE}/${playlist.id}`)} className={styles.playlist}>
                <PlaylistPlate playlist={playlist}/>
            </div>)}
        </>
    );
};

export default PlaylistList;