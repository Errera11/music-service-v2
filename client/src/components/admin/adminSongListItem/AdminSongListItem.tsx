import {Song} from '@/assets/types/Song';
import React, { useEffect, useRef, useState} from 'react';
import styles from './adminSongListItem.module.scss'
import gear from '../../../assets/svg/gear.svg';
import Image from 'next/image';
import {songsApi} from "@/api/songs";
import {useRouter} from "next/router";
import {AdminRoutes} from "@/assets/AdminRoutes";

interface IProps {
    song: Song
}

const AdminSongListItem: React.FC<IProps> = ({song}) => {

    const router = useRouter();

    const [isSongSetting, setIsSongSettings] = useState(false);

    const popupRef = useRef<HTMLDivElement>(null);
    const settingBtnRef = useRef<HTMLImageElement>(null);

    const onDeleteSong = () => {
        songsApi.deleteSong(song.id).then(response => {
            console.log(response)
        })
            .catch(e => console.log(e))
    }

    useEffect(() => {

        const listener = (e: MouseEvent) => {
            if(e.target instanceof HTMLElement &&
                !popupRef.current?.contains(e.target) &&
                !settingBtnRef.current?.contains(e.target)
            ) setIsSongSettings(false);
        }

        document.addEventListener('click', listener);

        return () => {
            document.removeEventListener('click', listener)
        }

    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.song}>
                <div className={styles.image}>
                    <img src={song.image} />
                </div>
                <div className={styles.songInfo}>
                    <span className={styles.title}>{song.title}</span>
                    <span className={styles.author}>{song.artist}</span>
                </div>
                <span className={styles.duration}>{song.duration}</span>
                <Image ref={settingBtnRef} onClick={() => setIsSongSettings(prev => !prev)}
                    style={{cursor: 'pointer'}} width={25} height={25} src={gear} alt={'Image'}/>
            </div>
            {
                isSongSetting && <div ref={popupRef} className={styles.songSettingsPopup}>
                    <span onClick={() => router.push(AdminRoutes.SONG_EDIT + song.id)}>Edit</span>
                    <span onClick={onDeleteSong}>Delete song</span>
                    <span>Add to album</span>
                </div>
            }
        </div>
    );
};

export default AdminSongListItem;