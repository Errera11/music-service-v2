import React, {ReactElement, useEffect} from "react";
import Navbar from "@/components/navbar/Navbar";
import AuthBtns from "@/components/authBtn/AuthBtns";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {loginByTokenThunk} from "@/store/auth";
import dynamic from "next/dynamic";
import {useTypedSelector} from "@/hooks/useTypedSelector";

const ClientPlayer = React.memo(dynamic(() => import('../components/player/Player'), {
    ssr: false,
}));

export default function Layout({children}: { children?: ReactElement }) {
    console.log('Layot render');

    const dispatch = useAppDispatch();
    const {audio} = useTypedSelector(state => state.player)

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            dispatch(loginByTokenThunk({authToken}))
                .unwrap()
                .catch(e => {
                });
        }
    }, [])

    return (
        <div style={{margin: '10px'}}>
            <nav><Navbar/></nav>
            <AuthBtns/>
            <main style={{marginLeft: '20vw', height: (audio ? '86vh' : '96vh')}}>{children}</main>
            <ClientPlayer/>
        </div>
    )
}