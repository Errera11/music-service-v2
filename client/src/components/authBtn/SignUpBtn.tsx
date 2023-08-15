import React from 'react';
import styles from './signUp.module.scss';
import {useRouter} from "next/router";

const SignUpBtn = () => {
    const router = useRouter();
    return (
        <div className={styles.container} onClick={() => router.push('/signup/SignUp')}>
            Sign Up
        </div>
    );
};

export default SignUpBtn;