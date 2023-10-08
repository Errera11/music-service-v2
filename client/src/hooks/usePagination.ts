import {useMemo, useState} from "react";

interface IReturnType {
    setPage: (page: number) => void
    currentPage: number
    totalPages: number
}

export default (volume: number = 5, totalItemsCount: number): IReturnType => {

    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalPages = useMemo(() => Math.ceil(totalItemsCount / volume), [totalItemsCount])

    return {
        setPage: (page: number) => setCurrentPage(page),
        currentPage,
        totalPages
    }
}