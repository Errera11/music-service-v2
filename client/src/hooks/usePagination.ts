import {useMemo, useState} from "react";

interface IProps {
    volume: number // volume of items to load
    totalItemsCount: number
}

interface IReturnType {
    setPage: (page: number) => void
    currentPage: number
    totalPages: number
}

export default ({volume, totalItemsCount}: IProps): IReturnType => {

    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalPages = useMemo(() => Math.floor(totalItemsCount / volume), [])

    return {
        setPage: (page: number) => setCurrentPage(page),
        currentPage,
        totalPages
    }
}