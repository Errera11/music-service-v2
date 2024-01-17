import React from 'react';
import styles from './adminSidebar.module.scss';
import AdminSidebarBtn from "@/components/admin/adminSidebarBtn/AdminSidebarBtn";
import {useRouter} from "next/router";
import {adminRoutes} from "@/assets/adminRoutes";

const AdminSidebar = () => {

    const router = useRouter();

    const btns = [{
        title: 'Songs',
        onCLick: () => router.push(adminRoutes.SONG_PAGE)
    },
        {
            title: 'Albums',
            onCLick: () => router.push(adminRoutes.ALBUM_PAGE)
        },
        {
            title: 'Users',
            onCLick: () => router.push(adminRoutes.USERS_PAGE)
        },
        {
            title: 'Back to service',
            onCLick: () => router.push(adminRoutes.BACK_TO_SERVICE)
        }
    ]

    return (
        <div className={styles.container}>
            {btns.map(item => <div>
                <AdminSidebarBtn title={item.title} onClick={item.onCLick}/>
            </div>)}
        </div>
    );
};

export default AdminSidebar;