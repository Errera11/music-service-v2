import React, {useEffect, useRef, useState} from 'react';
import {Album} from "@/assets/types/Album";
import styles from './adminAlbumListItem.module.scss';
import gear from '../../../assets/svg/gear.svg';
import {useRouter} from "next/router";
import {AdminRoutes} from "@/assets/AdminRoutes";
import SettingPopup from "@/components/admin/settingPopup/SettingPopup";

interface IProps {
    album: Album
}

const AdminAlbumListItem: React.FC<IProps> = ({album}) => {

    const router = useRouter();
    const [isSettingsMenu, setIsSettingsMenu] = useState(false);
    const settingsRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const listener = (e: MouseEvent) => {
            if(e.target instanceof HTMLElement && !settingsRef.current?.contains(e.target)) {
                setIsSettingsMenu(false);
            }
        }
        document.addEventListener('click', listener)
        return () => document.removeEventListener('click', listener);
    }, [])
    return (
        <div className={styles.wrapper}>
            <img src={album.image}/>
            <div className={styles.albumInfo}>
                <span className={styles.title}>{album.title}</span>
                <span className={styles.author}>{album.author}</span>
                <span className={styles.description}>{album.description || ''}</span>
            </div>
            <img ref={settingsRef} onClick={() => setIsSettingsMenu(prev => !prev)} className={styles.settings} src={gear.src}/>
            {isSettingsMenu &&
                <div className={styles.settingsPopup}>
                    <SettingPopup properties={[{property: 'Edit', onClick: () => router.push(AdminRoutes.ALBUM_EDIT + album.id)}]} />
                </div>}
        </div>
    );
};

export default AdminAlbumListItem;