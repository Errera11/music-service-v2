import React from 'react';
import styles from './loginBtn.module.scss'
import {useRouter} from "next/router";
import {appRoutes} from "@/assets/appRoutes";

const LoginBtn = () => {
    const router = useRouter();
    return (
        <div className={styles.container} onClick={() => router.push(appRoutes.LOGIN_PAGE)}>
            Log In
        </div>
    );
};

export default LoginBtn;