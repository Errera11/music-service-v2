import styles from '../../styles/login/login.module.scss';
import Link from "next/link";
import Image from "next/image";
import WavePic from '../../assets/wave.png';
import React, {useState} from "react";
import {AppRoutes} from "@/assets/appRoutes";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {useRouter} from "next/router";
import {loginThunk} from "@/store/auth";
import AuthError from "@/components/authError/AuthError";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import Head from "next/head";
import {AuthSuccessResponse} from "@/assets/types/HttpAuth";

const Login = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const dispatch = useAppDispatch()

    const router = useRouter()

    const err = useTypedSelector(state => state.auth.error);

    function loginHandler() {
        dispatch(loginThunk({email, password}))
            .unwrap()
            .then((data) => {
                localStorage.setItem('authToken', (data as AuthSuccessResponse).authToken);
                router.push(AppRoutes.HOME_PAGE)
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.login}>
                    <Image src={WavePic} width={50} height={50} alt={''}/>
                    <h2>Sign In</h2>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={'Email'}/>
                    <input
                        type={'password'}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={'Password'}/>
                    {err && <AuthError error={err[0].constraints}/>}
                    <button onClick={e => loginHandler()}>Sign In</button>
                    <div className={styles.createAccount}>
                        Don't have an account?&nbsp;
                        <Link href={AppRoutes.SIGNUP_PAGE}>Sign Up!</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;