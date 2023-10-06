import React from 'react';
import {Album} from "@/assets/types/Album";
import styles from './adminAlbumList.module.scss';
import AdminAlbumListItem from "@/components/admin/adminAlbumListItem/AdminAlbumListItem";

interface IProps {
    albums: Album[]
}

const AdminAlbumList: React.FC<IProps> = ({albums}) => {
    return (
        <div className={styles.container}>
            {albums?.map(album => <div key={album.id} className={styles.albumItem}>
                <AdminAlbumListItem album={album} />
            </div>)}
        </div>
    );
};

export default AdminAlbumList;