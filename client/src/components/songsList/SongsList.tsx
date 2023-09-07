import React from 'react';
import {Song} from "@/assets/types/Song";
import styles from './songsList.module.scss';
import SongItem from '../song/Song';

const SongsList = ({songs}: { songs: Song[] }) => {

    return (
        <div className={styles.container}>
            {songs.map(song => <div key={song.id} className={styles.song}>
                <SongItem song={song}/>
            </div>)}
        </div>
    );
};

export default SongsList;