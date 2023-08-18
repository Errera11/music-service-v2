import React from 'react';
import styles from './loginBtn.module.scss'
import {useRouter} from "next/router";

const LogoutBtn = () => {
    const router = useRouter();
    return (
        <div className={styles.container}>
            Log Out
        </div>
    );
};

export default LogoutBtn;