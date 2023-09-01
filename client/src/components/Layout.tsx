import React, {ReactElement, useEffect} from "react";
import Navbar from "@/components/navbar/Navbar";
import AuthBtns from "@/components/authBtn/AuthBtns";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {loginByTokenThunk} from "@/store/auth";
import dynamic from "next/dynamic";

const ClientPlayer = React.memo(dynamic(() => import('../components/player/Player'), {
    ssr: false,
}));

export default function Layout({children}: { children?: ReactElement }) {
    console.log('Layot render');

    const dispatch = useAppDispatch();

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
            <Navbar/>
            <AuthBtns/>
            <main style={{marginLeft: '20vw'}}>{children}</main>
            <ClientPlayer/>
        </div>
    )
}