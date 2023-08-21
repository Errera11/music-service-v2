import React, {useState, useRef, useEffect} from 'react';
import LoginBtn from "@/components/authBtn/login/LoginBtn";
import SignUpBtn from "@/components/authBtn/signup/SignUpBtn";
import styles from './authBtns.module.scss';
import {useTypedSelector} from "@/hooks/useTypedSelector";
import UserIconSvg from "@/assets/svg/UserIconSvg";
import {Pages} from "@/assets/types/Pages";
import LogoutBtn from "@/components/authBtn/LogoutBtn";
import ChevronDownSvg from "@/assets/svg/ChevronDownSvg";
import {animated, useTransition} from '@react-spring/web'

const AuthBtns = () => {

        const user = useTypedSelector(state => state.auth.user);

        const currentPage = useTypedSelector(state => state.AppPage.currentPage);

        const [isMenu, setIsMenu] = useState(false);

        const dropdownRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            document.addEventListener('onclick', (e) => {
                if(e.target instanceof HTMLElement && !dropdownRef?.current?.contains(e.target)) {
                    setIsMenu(false)
                }
            })
        }, [])

        const transitions = useTransition(isMenu ? [<>
            <ul>
                <li>Profile</li>
            </ul>
        </>] : [], {
            from: {
                top: '30px',
                opacity: '0%'
            },
            enter: {
                top: '40px',
                opacity: '100%'
            },
            leave: {
                top: '30px',
                opacity: '0%'
            },

        })

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
                        <div ref={dropdownRef} onClick={(e) => setIsMenu(prev => prev!)}
                             className={styles.email + '' + (currentPage === Pages.USER ? styles.active : '')}>
                            {user.name}
                            <ChevronDownSvg isActive={currentPage === Pages.USER} width={'15px'} height={'15px'}/>
                            <>
                                {transitions((style, item) => (
                                    <animated.div style={style} className={styles.dropdown}>
                                        {item}
                                    </animated.div>
                                ))}
                            </>
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
    }
;


export default AuthBtns;