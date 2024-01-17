import React, {ReactElement, useEffect} from "react";
import Navbar from "@/components/navbar/Navbar";
import AuthBtns from "@/components/authBtn/AuthBtns";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import dynamic from "next/dynamic";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import PopupSuccess from "@/components/popupSuccess/PopupSuccess";
import {loginByRefreshTokenThunk} from "@/store/auth";

const ClientPlayer = React.memo(dynamic(() => import('../components/player/Player'), {
    ssr: false,
}));

export default function Layout({children}: { children?: ReactElement }) {

    const dispatch = useAppDispatch();
    const audio = useTypedSelector(state => state.player.duration)

    useEffect(() => {
        dispatch(loginByRefreshTokenThunk())
    }, [])

    return (
        <div style={{margin: '10px'}}>
            <nav style={{position: 'fixed', height: audio ? '86vh' : '97vh'}}><Navbar/></nav>
            <AuthBtns/>
            <main style={{marginLeft: '20.5vw', height: '97vh', borderRadius: '15px', overflowX: 'hidden'}}>{children}</main>
            <ClientPlayer/>
            <PopupSuccess/>
        </div>
    )
}