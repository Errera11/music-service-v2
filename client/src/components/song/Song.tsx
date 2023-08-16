import React from 'react';
import {Song} from "@/assets/types/Song";
import styles from "@/components/song/song.module.scss";
import MusicNoteSvg from "@/assets/svg/MusicNoteSvg";

interface IProps {
    song: Song
}

const Song: React.FC<IProps> = ({song}) => {
    return (
        <div className={styles.container}>
            <div className={styles.song}>
                <div className={styles.songNote}>
                    <MusicNoteSvg width={'25px'} height={'25px'} isActive={false}/>
                </div>
                <div className={styles.title}>
                    title
                </div>
                <div className={styles.artist}>
                    desct
                </div>
                <div className={styles.duration}>
                    1:23
                </div>
            </div>
        </div>
    );
};

export default Song;