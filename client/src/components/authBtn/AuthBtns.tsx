import React from 'react';
import LoginBtn from "@/components/authBtn/LoginBtn";
import SignUpBtn from "@/components/authBtn/SignUpBtn";
import styles from './authBtns.module.scss';

const AuthBtns = () => {
    console.log("AuthBtns");
    return (
        <div className={styles.container}>
            <SignUpBtn />
            <LoginBtn />
        </div>
    );
};

export default AuthBtns;