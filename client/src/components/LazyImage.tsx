import {useEffect, useRef, useState} from "react";
import Loader from "@/components/loader/Loader";

export const LazyImage = ({src, className}: { src: string, className?: string }) => {
    const [isLoading, setIsLoading] = useState(true)

    const ref = useRef<HTMLImageElement>(null)
    useEffect(() => {
        if(ref?.current?.complete) setIsLoading(false)
    }, [])

    function onLoad() {
        setIsLoading(false)
    }

    return <>
        {isLoading && <Loader/>}
        <img className={className} ref={ref} onLoad={() => onLoad()} src={src}/>
    </>
}