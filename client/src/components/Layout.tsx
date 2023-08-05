import React, {ReactElement} from "react";
import Navbar from "@/components/Navbar";
import AuthBtns from "@/components/authBtn/AuthBtns";

export default function Layout({ children }: {children?: ReactElement}) {
    return (
        <>
            <Navbar />
            <AuthBtns />
            <main>{children}</main>
        </>
    )
}