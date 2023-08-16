import React, {ReactElement} from "react";
import Navbar from "@/components/navbar/Navbar";
import AuthBtns from "@/components/authBtn/AuthBtns";

export default function Layout({ children }: {children?: ReactElement}) {
    console.log('Layot render');
    return (
        <div style={{margin: '10px'}}>
            <Navbar />
            <AuthBtns />
            <main style={{marginLeft: '20vw'}}>{children}</main>
        </div>
    )
}