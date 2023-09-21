import {useState} from "react";
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
        <Image style={!isLoading ? {display: 'block'} : {display: 'none'} }  className={className} unoptimized width={100} height={100} onLoadingComplete={() => setIsLoading(false)}
                src={src} alt={'image'} loading={'lazy'}/>
    </>
}