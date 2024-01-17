import styles from '../../styles/login/login.module.scss';
import Link from "next/link";
import Image from "next/image";
import WavePic from '../../assets/wave.png';
import React, {useState} from "react";
import {appRoutes} from "@/assets/appRoutes";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {useRouter} from "next/router";
import {loginThunk} from "@/store/auth";
import AuthError from "@/components/authError/AuthError";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import Head from "next/head";

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
                router.push(appRoutes.HOME_PAGE)
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
                    <button onClick={e => loginHandler()}>Sign In</button>
                    {err && <AuthError error={err[0].constraints}/>}
                    <div className={styles.createAccount}>
                        Don't have an account?&nbsp;
                        <Link href={appRoutes.SIGNUP_PAGE}>Sign Up!</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;