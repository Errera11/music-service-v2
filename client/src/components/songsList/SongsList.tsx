import React from 'react';
import {Song} from "@/assets/types/Song";
import styles from './songsList.module.scss';
import SongItem from '../song/Song';
import SongPlate from "@/components/songPlate/SongPlate";

const SongsList = ({songs, type}: { songs: Song[], type: 'plate' | 'list' }) => {

    if(type === 'plate') return (
        <div className={styles.container + ' ' + styles.plate}>
            {songs.map(song => <div key={song.id} className={styles.song}>
                <SongPlate song={song}/>
            </div>)}
        </div>
    );

    else if(type === 'list') return (
        <div className={styles.container}>
            {songs.map(song => <div key={song.id} className={styles.song}>
                <SongItem song={song}/>
            </div>)}
        </div>
    );

    return <></>

};

export default SongsList;