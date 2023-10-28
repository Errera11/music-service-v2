import {useRouter} from "next/router";

interface IReturnType {
    currentPage: number
    setPage: (page: number) => void
    totalPages: number
}

interface IProps {
    totalItemsCount: number,
    takeVolume: number
}

export default ({totalItemsCount, takeVolume}: IProps): IReturnType => {

    const router = useRouter();
    const {page, take} = router.query;
    const setCurrentPage = (page: number) => {
        router.replace({
            query: { page, take: takeVolume },
        });
    }

    return  {
        currentPage: Number.parseInt((page || 1) as string),
        setPage: setCurrentPage,
        totalPages: Math.ceil(totalItemsCount / takeVolume) || 1
    }
}