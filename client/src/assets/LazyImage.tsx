import {useEffect, useRef, useState} from "react";
import colors from '../assets/colors.module.scss';
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

    return <div className={className} style={{overflow: 'hidden'}}>
        {/*{isLoading && <div style={{background: colors.description, width: '100%', height: '100%', filter: 'blur(10px)'}}/>}*/}
        {isLoading && <div style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Loader/></div>}
        <img ref={ref} onLoad={() => onLoad()} src={src} style={{width: '100%', height: '100%'}}/>
    </div>
}