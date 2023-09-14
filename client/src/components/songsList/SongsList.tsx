import React, {LegacyRef, MutableRefObject} from 'react';
import {Song} from "@/assets/types/Song";
import styles from './songsList.module.scss';
import SongItem from '../song/Song';
import SongPlate from "@/components/songPlate/SongPlate";

const SongsList = ({songs, type, lastElementRef}: { songs: Song[], type: 'plate' | 'list', lastElementRef?: LegacyRef<any> }) => {

    if(type === 'plate') return (
        <div className={styles.container + ' ' + styles.plate}>
            {songs.map((song, index) => {
                if(index === (songs.length - 1) && lastElementRef) return <div ref={lastElementRef} key={song.id} className={styles.song}>
                    <SongPlate song={song}/>
                </div>

                return <div key={song.id} className={styles.song}>
                    <SongPlate song={song}/>
                </div>
            })}
        </div>
    );

    else if(type === 'list') return (
        <div className={styles.container}>
            {songs.map((song, index) => {
                if(index === (songs.length - 1) && lastElementRef) return <div key={song.id} ref={lastElementRef} className={styles.song}>
                    <SongItem song={song}/>
                </div>
                return <div key={song.id} className={styles.song}>
                    <SongItem song={song}/>
                </div>
            })}
        </div>
    );

    return <></>

};

export default SongsList;