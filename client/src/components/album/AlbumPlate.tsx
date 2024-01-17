import React from 'react';
import styles from './albumPlate.module.scss'
import play from '../../assets/svg/play-circle.svg';
import {LazyImage} from "@/components/lazyImage/LazyImage";
import {Album} from "@/assets/types/Album";
import {useRouter} from "next/router";
import {AppRoutes} from "@/assets/appRoutes";
import {useSong} from "@/hooks/useSong";
import {albumApi} from "@/api/album";
import Image from 'next/image'

const AlbumPlate: React.FC<{ album: Album }> = ({album}) => {

    const {image, title, author} = album;
    const {setSongs, setSong} = useSong()
    const router = useRouter()

    const onAlbumPlay = (e: React.MouseEvent) => {
        e.stopPropagation()
        albumApi.getAlbumById(album.id)
            .then(response => {
                setSongs(response.data.songs)
                setSong(response.data.songs[0])
            })
    }

    return (
        <div className={styles.container} onClick={() => router.push(AppRoutes.ALBUM_PAGE + '/' + album.id)}>
            <div className={styles.imageWrapper} onClick={(e) => onAlbumPlay(e)}>
                <LazyImage className={styles.image} src={image} alt={'Album img'}/>
                <div className={styles.playButton}>
                    <Image src={play.src} alt={'Play btn'} width={100} height={100}/>
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