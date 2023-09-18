import React, {ReactElement} from 'react';
import Head from "next/head";
import AdminSidebar from "@/components/adminSidebar/AdminSidebar";

const AdminLayout = ({children}: { children?: ReactElement }) => {
    return (
        <>
            <Head>
               <title>Admin</title>
            </Head>
            <div>
                <nav><AdminSidebar /></nav>
                <main style={{marginLeft: '25vw'}}>{children}</main>
            </div>
        </>
    );
};

export default AdminLayout;