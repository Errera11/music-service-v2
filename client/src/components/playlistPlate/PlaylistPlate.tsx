import React from 'react';
import {Playlist} from "@/assets/types/Playlist";
import Image from "next/image";
import styles from './playlistPlate.module.scss';

interface IProps {
    playlist: Playlist
}

const PlaylistPlate: React.FC<IProps> = ({playlist}) => {
    return (
        <div className={styles.container}>
            <div className={styles.image}>
                {playlist?.image ? <Image width={100} height={100} src={playlist.image} alt={'Playlist img'} /> : <div style={{background: 'black', width: '100%', height: '100%'}}/>}
                <div className={styles.playBtn}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"
                          viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path
                            d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>
                    </svg>
                </div>
            </div>
            <span className={styles.title}>{playlist.title}</span>
        </div>
    );
};

export default PlaylistPlate;