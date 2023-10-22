import {useState} from "react";
import Image from "next/image";
import styles from './lazyImage.module.scss';

export const LazyImage = ({src, className}: { src: string, className?: string }) => {
    const [isLoading, setIsLoading] = useState(true)

    return <>
        {isLoading && <div className={styles.loader}>
            <div className={styles.flash} />
        </div>}
        <Image style={!isLoading ? {display: 'block'} : {display: 'none'} }  className={className} unoptimized width={100} height={100} onLoadingComplete={() => setIsLoading(false)}
                src={src} alt={'image'} loading={'lazy'}/>
    </>
}