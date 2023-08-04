import React, {ReactElement} from "react";
import Navbar from "@/components/Navbar";

export default function Layout({ children }: {children?: ReactElement}) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
        </>
    )
}