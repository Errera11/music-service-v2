import React from 'react';
import {Song} from "@/assets/types/Song";
import styles from './songsList.module.scss';
import SongItem from '../song/Song';
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {playerActions} from "@/store/player";

const SongsList = ({songs}: { songs: Song[] }) => {

    const dispatch = useAppDispatch();
    const {setSong} = playerActions;

    return (
        <div className={styles.container}>
            {songs.map(song => <div onClick={() => dispatch(setSong(song))} className={styles.song}>
                <SongItem song={song}/>
            </div>)}
        </div>
    );
};

export default SongsList;