import React from 'react';
import AdminPageBtn from "@/components/admin/adminPageBtn/AdminPageBtn";
import {adminRoutes} from "@/assets/adminRoutes";
import {useRouter} from "next/router";
import styles from './adminPageLayout.module.scss';

interface IProps {
    title: string,
    children?: React.ReactNode
}

const SongPageLayout: React.FC<IProps> = ({title, children}) => {

    const router = useRouter();

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>{title}</h1>
                <div className={styles.btns}>
                    <AdminPageBtn onClick={() => router.push(adminRoutes.SONG_CREATE)} title={'Create'}/>
                    <AdminPageBtn onClick={() => router.push(adminRoutes.SONG_PAGE)} title={'All songs'}/>
                    <AdminPageBtn onClick={() => router.push(adminRoutes.SEARCH_SONGS)} title={'Search'}/>
                </div>
            </header>
            <>
                {children}
            </>
        </div>
    );
};

export default SongPageLayout;