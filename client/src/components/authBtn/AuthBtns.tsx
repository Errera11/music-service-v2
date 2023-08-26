import React, {useState, useRef, useEffect} from 'react';
import LoginBtn from "@/components/authBtn/login/LoginBtn";
import SignUpBtn from "@/components/authBtn/signup/SignUpBtn";
import styles from './authBtns.module.scss';
import {useTypedSelector} from "@/hooks/useTypedSelector";
import UserIconSvg from "@/assets/svg/UserIconSvg";
import LogoutBtn from "@/components/authBtn/LogoutBtn";
import ChevronDownSvg from "@/assets/svg/ChevronDownSvg";
import {animated, useTransition} from '@react-spring/web'
import {useRouter} from "next/router";
import { AppRoutes } from '../../assets/appRoutes';

const AuthBtns = () => {

        const user = useTypedSelector(state => state.auth.user);

        const router = useRouter();
        const [isMenu, setIsMenu] = useState(false);

        const dropdownRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            document.addEventListener('click', (e) => {
                if(e.target instanceof HTMLElement && !dropdownRef?.current?.contains(e.target)) {
                    setIsMenu(false)
                }
            })
        }, [])

        const transitions = useTransition(isMenu ? [<>
            <ul>
                <li onClick={() => router.push(AppRoutes.USER_PAGE)}>Profile</li>
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
        })

        return (
            <div className={styles.container}>
                {user ?
                    <>
                        <div className={styles.avatar}>
                            {user?.avatar ?
                                <img src={user.avatar}/>
                                :
                                <UserIconSvg isActive={router.route === AppRoutes.USER_PAGE} width={'25px'} height={'25px'}/>}
                        </div>
                        <div ref={dropdownRef} onClick={(e) => setIsMenu(prev => !prev)}
                             className={styles.email + ' ' + (router.route === AppRoutes.USER_PAGE ? styles.active : '')}>
                            {user.name}
                            <ChevronDownSvg isActive={router.route === AppRoutes.USER_PAGE} width={'15px'} height={'15px'}/>
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