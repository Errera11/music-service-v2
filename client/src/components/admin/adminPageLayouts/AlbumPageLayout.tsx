import React from 'react';
import AdminPageBtn from "@/components/admin/adminPageBtn/AdminPageBtn";
import {AdminRoutes} from "@/assets/AdminRoutes";
import {useRouter} from "next/router";
import styles from './adminPageLayout.module.scss';

interface IProps {
    title: string,
    children?: React.ReactNode
}

const AlbumPageLayout: React.FC<IProps> = ({title, children}) => {

    const router = useRouter();

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>{title}</h1>
                <div className={styles.btns}>
                    <AdminPageBtn onClick={() => router.push(AdminRoutes.ALBUM_PAGE)} title={'All albums'}/>
                    <AdminPageBtn onClick={() => router.push(AdminRoutes.ALBUM_CREATE)} title={'Create album'}/>
                    <AdminPageBtn onClick={() => router.push(AdminRoutes.ALBUM_SEARCH)} title={'Search'}/>
                </div>
            </header>
            <>
                {children}
            </>
        </div>
    );
};

export default AlbumPageLayout;