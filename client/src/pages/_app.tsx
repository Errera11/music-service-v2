import '@/styles/globals.css';
import type {AppProps} from 'next/app';
import {Allerta} from 'next/font/google';
import {wrapper} from "@/store/store";
import {Provider} from "react-redux";
import React from "react";
import Layout from "@/components/Layout";
import AdminLayout from "@/components/AdminLayout";
import {useRouter} from "next/router";
import {appRoutes} from "@/assets/appRoutes";
import {adminRoutes} from "@/assets/adminRoutes";

const allerta = Allerta({
    weight: "400",
    subsets: ["latin"]
})

export default function App({Component, pageProps, ...rest}: AppProps) {

    const {store, props} = wrapper.useWrappedStore(rest);
    const router = useRouter();


    if (router.route.includes(adminRoutes.ADMIN_HOME)) {
        return (
            <main className={allerta.className} style={{height: '100vh'}}>
                <style jsx global>
                    {`
                      body {
                        background: white;
                      }
                    `}
                </style>
                <AdminLayout><Component {...pageProps} /></AdminLayout>
            </main>
        )
    }

    //Remove layout
    if (router.route.includes(appRoutes.SIGNUP_PAGE) || router.route.includes(appRoutes.LOGIN_PAGE)) {
        return (
            <Provider store={store}>
                <main className={allerta.className}>
                    <Component {...pageProps} />
                </main>
            </Provider>
        )
    }

    return (
        <Provider store={store}>
            <main className={allerta.className}>
                <style jsx global>
                    {`
                      body {
                        background: black;
                      }
                    `}
                </style>
                <Layout><Component {...pageProps} /></Layout>
            </main>
        </Provider>
    )
}