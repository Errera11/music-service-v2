import React from 'react';
import styles from './loginBtn.module.scss'
import {useRouter} from "next/router";
import {logoutThunk} from "@/store/auth";
import {useAppDispatch} from "@/hooks/useAppDispatch";

const LogoutBtn = () => {

    const router = useRouter();

    const dispatch = useAppDispatch();

    const onClickHandler = () => {
        router.push('/')
        dispatch(logoutThunk());
    }

    return (
        <div className={styles.container} onClick={onClickHandler}>
            Log Out
        </div>
    );
};

export default LogoutBtn;