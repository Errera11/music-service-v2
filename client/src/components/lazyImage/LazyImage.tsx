import {useState} from "react";
import Image, {ImageProps} from "next/image";
import styles from './lazyImage.module.scss';

export const LazyImage = ({src, className, quality, onLoad}: ImageProps) => {

    const [isLoading, setIsLoading] = useState(true)

    return <>
        {isLoading && <div className={styles.loader}>
            <div className={styles.flash} />
        </div>}
        <Image onLoad={() => onLoad} style={!isLoading ? {display: 'block'} : {display: 'none'} }  className={className} unoptimized fill onLoadingComplete={() => setIsLoading(false)}
                src={src} alt={'image'} loading={'lazy'}/>
    </>
}