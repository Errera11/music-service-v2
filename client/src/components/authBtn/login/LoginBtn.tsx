import React from 'react';
import styles from './loginBtn.module.scss'
import {useRouter} from "next/router";
import {AppRoutes} from "@/assets/appRoutes";

const LoginBtn = () => {
    const router = useRouter();
    return (
        <div className={styles.container} onClick={() => router.push(AppRoutes.LOGIN_PAGE)}>
            Log In
        </div>
    );
};

export default LoginBtn;