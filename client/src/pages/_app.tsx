import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {Allerta} from 'next/font/google'
import {wrapper} from "@/store/store";
import {Provider} from "react-redux";
import React, {useEffect} from "react";
import Layout from "@/components/Layout";
import AdminLayout from "@/components/AdminLayout";
import {useRouter} from "next/router";

const allerta = Allerta({
    weight: "400",
    subsets: ["latin"]
})

export default function App({Component, pageProps, ...rest}: AppProps) {

    const {store, props} = wrapper.useWrappedStore(rest);
    const router = useRouter();
    useEffect(() => {
        if(!router.route.includes('admin')) document!.querySelector('body')!.style.background = 'white';
    }, [])


    return (
        <Provider store={store}>
            <main className={allerta.className} style={{ height: '100vh'}}>
                <AdminLayout><Component {...pageProps} /></AdminLayout>
            </main>
        </Provider>
    )

    return (
        <Provider store={store}>
            <main className={allerta.className} style={{background: 'black', height: '100vh'}}>
                <Layout><Component {...pageProps} /></Layout>
            </main>
        </Provider>
    )
}