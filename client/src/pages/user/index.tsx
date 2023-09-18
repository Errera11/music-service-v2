import React from 'react';
import styles from '@/styles/user/user.module.scss';
import {useTypedSelector} from "@/hooks/useTypedSelector";
import UserIconSvg from "@/assets/svg/UserIconSvg";
import Layout from "@/components/Layout";
import Head from "next/head";

const Index = () => {

    const user = useTypedSelector(state => state.auth.user);

    return (
        <>
            <Head>
                <title>Profile</title>
            </Head>
            <div className={styles.container}>
                <span className={styles.title}>Profile</span>
                {user?.avatar ?
                    <img src={user.avatar}/>
                    :
                    <UserIconSvg isActive={true} width={'200'} height={'200'}/>}
                <span className={styles.username}>{user?.name}</span>
                <span className={styles.email}>{user?.email}</span>
            </div>
        </>
    );
};

export default Index;