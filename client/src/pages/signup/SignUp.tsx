import React, {useState} from 'react';
import styles from '../../styles/login/login.module.scss';
import Image from "next/image";
import WavePic from "@/assets/wave.png";
import Link from "next/link";
import Head from "next/head";

const SignUp = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [name, setName] = useState<string>('')
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
                    <button>Sign Up</button>
                    <div className={styles.createAccount}>
                        Already have an account?&nbsp;
                        <Link href={'../login/Login'}>Log In!</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;