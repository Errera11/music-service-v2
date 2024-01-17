import React, {useState} from 'react';
import styles from '../../styles/login/login.module.scss';
import Image from "next/image";
import WavePic from "@/assets/wave.png";
import Link from "next/link";
import Head from "next/head";
import {appRoutes} from "@/assets/appRoutes";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {useRouter} from "next/router";
import {signupThunk} from "@/store/auth";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import AuthError from "@/components/authError/AuthError";

const SignUp = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [name, setName] = useState<string>('')

    const dispatch = useAppDispatch()

    const router = useRouter()

    const err = useTypedSelector(state => state.auth.error)

    function signUp() {
        dispatch(signupThunk({email, password, name}))
            .unwrap()
            .then((data ) => {
                router.push(appRoutes.HOME_PAGE)
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <Head>
                <title>Sign Up</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.login}>
                    <Image src={WavePic} width={50} height={50} alt={''}/>
                    <h2>Sign Up</h2>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={'Email'}/>
                    <input
                        type={'password'}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={'Password'}/>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        placeholder={'How should we call you?'}/>
                    <button onClick={e => signUp()}>Sign Up</button>
                    {err && <AuthError error={err[0].constraints} />}
                    <div className={styles.createAccount}>
                        Already have an account?&nbsp;
                        <Link href={appRoutes.LOGIN_PAGE}>Log In!</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;