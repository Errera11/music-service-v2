import React from 'react';
import {Song} from "@/assets/types/Song";
import {useSong} from "@/hooks/useSong";
import styles from './songPlate.module.scss'
import play from '../../assets/svg/play-circle.svg';
import {LazyImage} from "@/components/lazyImage/LazyImage";

const SongPlate: React.FC<{ song: Song }> = ({song}) => {
    const {setSong} = useSong()
    const {image, title, artist} = song;
    return (
        <div onClick={() => setSong(song)} className={styles.container}>
            <div className={styles.imageWrapper}>
                <LazyImage className={styles.image} src={image} />
            </div>
            <div className={styles.songInfo}>
                <span className={styles.title}>{title}</span>
                <span className={styles.artist}>{artist}</span>
            </div>
            <div className={styles.playButton}>
                <img src={play.src} />
            </div>
        </div>
    );
};

export default SongPlate;