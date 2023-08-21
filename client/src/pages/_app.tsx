import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {Allerta} from 'next/font/google'
import {wrapper} from "@/store/store";
import {Provider} from "react-redux";
import React, {useEffect} from "react";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {loginByTokenThunk, loginThunk} from "@/store/auth";

const allerta = Allerta({
    weight: "400",
    subsets: ["latin"]
})

export default function App({Component, ...rest}: AppProps) {

    const {store, props} = wrapper.useWrappedStore(rest);

    return (
        <Provider store={store}>
            <main className={allerta.className}>
                <Component {...rest} />
            </main>
        </Provider>
    )
}