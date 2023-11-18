import React, {LegacyRef} from 'react';
import {Song} from "@/assets/types/Song";
import styles from './songsList.module.scss';
import SongItem from '../song/Song';

const SongsList = ({songs, lastElementRef}: {
    songs: Song[],
    lastElementRef?: LegacyRef<any>
}) => {

    return (
        <div className={styles.container}>
            {songs.map((song, index) => {
                if (index === (songs.length - 1) && lastElementRef) return <div key={song.id} ref={lastElementRef}
                                                                                className={styles.song}>
                    <SongItem song={song}/>
                </div>
                return <div key={song.id} className={styles.song}>
                    <SongItem song={song}/>
                </div>
            })}
        </div>
    );

};

export default SongsList;