import styles from '../../styles/login/login.module.scss';
import Link from "next/link";
import Image from "next/image";
import WavePic from '../../assets/wave.png';
import {useState} from "react";

export default () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    return (
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
                <button>Sign In</button>
                <div className={styles.createAccount}>
                    Don't have an account?&nbsp;
                    <Link href={'../signup/SignUp'}>Sign Up!</Link>
                </div>
            </div>
        </div>
    )
}