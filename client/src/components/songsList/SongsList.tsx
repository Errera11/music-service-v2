import React from 'react';
import {Song} from "@/assets/types/Song";
import styles from './songsList.module.scss';
import SongItem  from '../song/Song';

const SongsList = ({songs}: { songs: Song[] }) => {
    return (
        <div className={styles.container}>
            <SongItem song={songs[0]}/>
        </div>
    );
};

export default SongsList;