import React, {useState} from 'react';
import styles from './popupSuccess.module.scss';
import {animated, useSpring} from "@react-spring/web";

interface IProps {
    message: string,
    isFailure: boolean,
    isSuccess: boolean
}

const PopupSuccess: React.FC<IProps> = ({message, isFailure, isSuccess}) => {

    const [show, setShow] = useState(true)
    setTimeout(() => setShow(false), 3000)

    const [props] = useSpring(() => ({
        from: {
            y: -10
        },
        to: {
            y: 5
        },
        config: {tension: 300, friction: 20}
    }))

    if(!show) return <></>;

    return <animated.div style={props} className={styles.container}>
        {isFailure ?
            <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green"
                     viewBox="0 0 16 16">
                    <path
                        d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
                    <path
                        d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
                </svg>
                <div>{message}</div>
            </> :
            <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red"
                     viewBox="0 0 16 16">
                    <path
                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
                <div>{message}</div>
            </>}
    </animated.div>

};

export default PopupSuccess;