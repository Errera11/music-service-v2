import {useCallback, useEffect, useRef, useState} from "react";

export const useDynamicPagination = ({volume, totalCount}: {volume: number, totalCount: number}) => {
    const [currentPage, setPage] = useState(1)
    const observer = useRef<null | IntersectionObserver>(null);
    const lastElementRef = useCallback((node: HTMLElement) => {
        if(node) {
            observer.current?.disconnect()
            observer.current?.observe(node)
        }
    }, [])

    useEffect(() => {
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && ((currentPage - 1) * volume < totalCount)) {
                return setPage(prev => prev + 1)
            }
            observer.current?.disconnect();
        })
    }, [])

    return {
        currentPage,
        lastElementRef,
        setPage
    }
}