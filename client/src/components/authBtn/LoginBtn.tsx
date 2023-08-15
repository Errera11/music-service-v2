import React from 'react';
import styles from './loginBtn.module.scss'
import {useRouter} from "next/router";

const LoginBtn = () => {
    const router = useRouter();
    return (
        <div className={styles.container} onClick={() => router.push('/login/Login')}>
            Log In
        </div>
    );
};

export default LoginBtn;