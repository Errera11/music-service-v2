import React from 'react';
import styles from './signUp.module.scss';
import {useRouter} from "next/router";
import {appRoutes} from "@/assets/appRoutes";

const SignUpBtn = () => {
    const router = useRouter();
    return (
        <div className={styles.container} onClick={() => router.push(appRoutes.SIGNUP_PAGE)}>
            Sign Up
        </div>
    );
};

export default SignUpBtn;