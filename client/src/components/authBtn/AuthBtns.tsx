import React from 'react';
import LoginBtn from "@/components/authBtn/LoginBtn";
import SignUpBtn from "@/components/authBtn/SignUpBtn";
import styles from './authBtns.module.scss';
import {useTypedSelector} from "@/hooks/useTypedSelector";
import UserIconSvg from "@/assets/svg/UserIconSvg";
import {Pages} from "@/assets/types/Pages";
import LogoutBtn from "@/components/authBtn/LogoutBtn";
import ChevronDownSvg from "@/assets/svg/ChevronDownSvg";

const AuthBtns = () => {

    const user = useTypedSelector(state => state.auth.user);

    const currentPage = useTypedSelector(state => state.AppPage.currentPage);

    return (
        <div className={styles.container}>
            {user ?
                <>
                    <div className={styles.avatar}>
                        {user?.avatar ?
                            <img src={user.avatar}/>
                            :
                            <UserIconSvg isActive={currentPage === Pages.USER} width={'25px'} height={'25px'}/>}
                    </div>
                    <div className={styles.email + '' + (currentPage === Pages.USER ? styles.active : '')}>
                        {user.name}
                        <ChevronDownSvg isActive={currentPage === Pages.USER} width={'15px'} height={'15px'} />
                    </div>
                    <LogoutBtn/>

                </>
                :
                <>
                    <SignUpBtn/>
                    <LoginBtn/>
                </>
            }
        </div>
    );
};

export default AuthBtns;