import React from 'react';
import styles from './adminSidebar.module.scss';
import AdminSidebarBtn from "@/components/adminSidebarBtn/AdminSidebarBtn";
import {useRouter} from "next/router";
import {AdminRoutes} from "@/assets/adminRoutes";

const AdminSidebar = () => {

    const router = useRouter();

    const btns = [{
        title: 'Songs',
        onCLick: () => 1
    },
        {
            title: 'Albums',
            onCLick: () => 1
        },
        {
            title: 'Users',
            onCLick: () => 1
        },
        {
            title: 'Back to service',
            onCLick: () => 1
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