import React from 'react';
import styles from './albumPlate.module.scss'
import play from '../../assets/svg/play-circle.svg';
import {LazyImage} from "@/components/lazyImage/LazyImage";
import {Album} from "@/assets/types/Album";

const AlbumPlate: React.FC<{ album: Album }> = ({album}) => {
    const {image, title, author} = album;
    return (
        <div className={styles.container}>
            <div className={styles.imageWrapper}>
                <LazyImage className={styles.image} src={image} alt={'Album img'}/>
                <div className={styles.playButton}>
                    <img src={play.src}/>
                </div>
            </div>
            <div className={styles.songInfo}>
                <span className={styles.title}>{title}</span>
                <span className={styles.artist}>{author}</span>
            </div>
        </div>
    );
};

export default AlbumPlate;