import React from 'react';
import {Song} from "@/assets/types/Song";
import styles from "@/components/song/song.module.scss";
import MusicNoteSvg from "@/assets/svg/MusicNoteSvg";
import {useSong} from "@/hooks/useSong";

interface IProps {
    song: Song
}

const Song: React.FC<IProps> = ({song}) => {

    const [playerSong, setSong] = useSong();

    return (
        <div className={styles.container} onClick={() => setSong(song)}>
            <div className={styles.song + ' ' + (playerSong.id === song.id ? styles.active : '')}>
                <div className={styles.songNote}>
                    <MusicNoteSvg width={'25px'} height={'25px'} isActive={false}/>
                </div>
                <div className={styles.songInfo}>
                    <span className={styles.title}>
                        {song.title}
                    </span>
                    <span className={styles.artist}>
                        {song.artist}
                    </span>
                </div>
                <div className={styles.duration}>
                    {song.duration}
                </div>
            </div>
        </div>
    );
};

export default React.memo(Song);