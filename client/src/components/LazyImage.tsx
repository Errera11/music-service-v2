import {useEffect, useRef, useState} from "react";
import Loader from "@/components/loader/Loader";
import Image from "next/image";

export const LazyImage = ({src, className}: { src: string, className?: string }) => {
    const [isLoading, setIsLoading] = useState(true)

    function onLoad() {
        setIsLoading(false)
    }
    //TODO check IMAGE
    return <>
        {isLoading && <Loader/>}

        <Image onLoadingComplete={() => setIsLoading(false)} src={src} alt={'image'} loading={'lazy'}/>
    </>
}