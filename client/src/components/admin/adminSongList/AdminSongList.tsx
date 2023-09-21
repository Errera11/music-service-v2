import React from 'react';
import {Song} from "@/assets/types/Song";
import AdminSongListItem from "@/components/admin/adminSongListItem/AdminSongListItem";
import styles from './adminSongList.module.scss';

// const mock: Song = {
//     title: 'Emine',
//     artist: 'E,iner',
//     duration: '123'
// }

interface IProps {
    songs: Song[]
}

const AdminSongList: React.FC<IProps> = ({songs}) => {

    return (
        <div className={styles.container}>
            {songs.map(song => <div className={styles.listItem}>
                <AdminSongListItem song={song} />
            </div>)}
        </div>
    );
};

export default AdminSongList;
