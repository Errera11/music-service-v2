import React from 'react';
import styles from './adminSidebar.module.scss';
import AdminSidebarBtn from "@/components/admin/adminSidebarBtn/AdminSidebarBtn";
import {useRouter} from "next/router";
import {AdminRoutes} from "@/assets/AdminRoutes";

const AdminSidebar = () => {

    const router = useRouter();

    const btns = [{
        title: 'Songs',
        onCLick: () => router.push(AdminRoutes.SONG_PAGE)
    },
        {
            title: 'Albums',
            onCLick: () => router.push(AdminRoutes.ALBUM_PAGE)
        },
        {
            title: 'Users',
            onCLick: () => router.push(AdminRoutes.USERS_PAGE)
        },
        {
            title: 'Back to service',
            onCLick: () => router.push(AdminRoutes.BACK_TO_SERVICE)
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